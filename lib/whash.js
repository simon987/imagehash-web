import {Image} from "canvas";
import {canvasUtil, grayScaleConverter} from "./imageUtils.js";
import {ImageHash} from "./hash.js";

const HaarWavelet = [
    1 / Math.SQRT2,
    1 / Math.SQRT2
];

function waveletFromScalingNumbers(scalingNumbers) {

    const waveletNumbers = scalingNumbers
        .slice()
        .reverse()
        .map((value, index) => (index % 2 === 0) ? value : -value);

    return {
        dec: {
            low: scalingNumbers.slice(),
            high: waveletNumbers.slice(),
        },
        rec: {
            low: scalingNumbers.slice(),
            high: waveletNumbers.slice()
        },
    };
}

const HaarBasis = waveletFromScalingNumbers(HaarWavelet);

function getBasis(wavelet) {
    if (wavelet === "haar") {
        return HaarBasis;
    }

    throw new Error("Invalid wavelet");
}

function dot(a, b) {
    /* Calculate dot product. */
    return a.reduce((dot, value, index) => dot + value * b[index], 0);
}

function add(a, b) {
    /* Calculate element-wise sum. */
    return a.map((value, index) => value + b[index]);
}

function mulScalar(scalar, array) {
    return array.map(value => scalar * value);
}


function dwt(data, wavelet) {
    const waveletBasis = getBasis(wavelet);
    const filters = waveletBasis.dec;
    const filterLength = filters.low.length;

    let approx = [];
    let detail = [];

    /* Calculate coefficients. */
    for (let offset = 0; offset + filterLength <= data.length; offset += 2) {
        const values = data.slice(offset, offset + filterLength);

        approx.push(dot(values, filters.low));
        detail.push(dot(values, filters.high));
    }

    return [approx, detail];
}

function idwt(approx, detail, waveletBasis) {
    const filters = waveletBasis.rec;
    const filterLength = filters.low.length;

    /* Initialize transform. */
    const coeffLength = approx.length;
    let pad = new Array(filterLength + (coeffLength - 1) * 2);
    pad.fill(0);

    /* Perform inverse Discrete Wavelet Transform. */
    for (let i = 0; i < coeffLength; i++) {
        const offset = 2 * i;

        /* Calculate values. */
        let values = pad.slice(offset, offset + filterLength);
        values = add(values, mulScalar(approx[i], filters.low));
        values = add(values, mulScalar(detail[i], filters.high));

        /* Update values. */
        pad = pad
            .slice(0, offset)
            .concat(values)
            .concat(pad.slice(offset + values.length));
    }

    /* Remove padding. */
    return pad.slice(filterLength - 2, pad.length - (filterLength - 2));
}


function wavedec(data, wavelet, level) {
    /*  Initialize transform. */
    let coeffs = [];
    let approx = data.slice();

    /* Transform. */
    for (let i = 0; i < level; i++) {
        /* Perform single level transform. */
        const approxDetail = dwt(approx, wavelet);
        approx = approxDetail[0];

        /* Prepend detail coefficients. */
        coeffs.unshift(approxDetail[1].slice());
    }

    /* Prepend last approximation. */
    coeffs.unshift(approx.slice());

    return coeffs;
}

function waverec(coeffs, wavelet) {
    wavelet = getBasis(wavelet)

    let approx = coeffs[0];

    for (let i = 1; i < coeffs.length; i++) {
        const detail = coeffs[i];

        if (approx.length === detail.length + 1) {
            approx = approx.slice(0, approx.length - 1);
        }

        approx = idwt(approx, detail, wavelet);
    }

    return approx.slice();
}


function median(values) {
    values.sort((a, b) => a - b);
    return values[Math.floor(values.length / 2)];
}

function wavedec2(data, wavelet, level) {
    const L = Math.round(Math.sqrt(data.length));

    const rows = new Array(L);

    for (let y = 0; y < L; y++) {
        const row = new Array(L);

        for (let x = 0; x < L; x++) {
            row[x] = data[y * L + x];
        }

        rows[y] = row;
    }

    const cols = new Array(L);
    for (let i = 0; i < L; i++) {
        cols[i] = new Array(L);
    }

    // Rows
    for (let y = 0; y < L; y++) {
        const coeffs = wavedec(rows[y], "haar", level).flat();
        for (let x = 0; x < L; x++) {
            cols[x][y] = coeffs[x];
        }
    }

    const result = new Array(L * L);

    // Cols
    for (let x = 0; x < L; x++) {
        const coeffs = wavedec(cols[x], "haar", level).flat();

        for (let y = 0; y < L; y++) {
            result[y * L + x] = coeffs[y];
        }
    }

    return result;
}

function unflatten(data, level) {
    const result = [];

    const sizes = [];

    let n = data.length;
    for (let i = 0; i < level; i++) {
        n /= 2;
        sizes.unshift(n)
    }
    sizes.unshift(n);

    let cur = 0;
    for (let i = 0; i < sizes.length; i++) {
        result.push(data.slice(cur, cur + sizes[i]));
        cur += sizes[i];
    }

    return result;
}

function waverec2(data, wavelet, level) {
    const L = Math.round(Math.sqrt(data.length));

    const cols = new Array(L);

    for (let x = 0; x < L; x++) {
        const col = new Array(L);

        for (let y = 0; y < L; y++) {
            col[y] = data[y * L + x];
        }

        cols[x] = col;
    }

    const rows = new Array(L);
    for (let i = 0; i < L; i++) {
        rows[i] = new Array(L);
    }

    // Cols
    for (let x = 0; x < L; x++) {
        const rec = waverec(unflatten(cols[x], level), "haar")

        for (let y = 0; y < L; y++) {
            rows[y][x] = rec[y];
        }
    }

    const result = new Array(L * L);

    // Rows
    for (let y = 0; y < L; y++) {
        const rec = waverec(unflatten(rows[y], level), "haar");
        for (let x = 0; x < L; x++) {
            result[y * L + x] = rec[x];
        }
    }

    return result;
}

/**
 * @param image {Image}
 * @param size {number}
 * @param removeMaxHaarLL {boolean}
 */
export async function whash(image, size = 8, removeMaxHaarLL = true) {

    const imageNaturalScale = 2 ** Math.floor(Math.log2(Math.min(image.width, image.height)))
    const imageSize = Math.max(imageNaturalScale, size)

    const llMaxLevel = Math.floor(Math.log2(imageSize))

    const level = Math.floor(Math.log2(size))
    const dwtLevel = llMaxLevel - level

    const pixels = grayScaleConverter.convert(await canvasUtil.resizeImage(image, imageSize, imageSize));
    let data = new Array(pixels.length);

    for (let i = 0; i < pixels.length; i++) {
        data[i] = pixels[i] / 255;
    }

    if (removeMaxHaarLL) {
        const coeffs = wavedec2(data, "haar", llMaxLevel);
        coeffs[0] = 0;
        data = waverec2(coeffs, "haar", llMaxLevel)
    }

    const result = wavedec2(data, "haar", dwtLevel);
    const ll = new Float64Array(size * size);
    const sorted = new Float64Array(size * size);

    let ptr = 0;
    let ptrLow = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            ll[ptrLow] = result[ptr];
            sorted[ptrLow] = result[ptr];
            ptr += 1;
            ptrLow += 1;
        }
        ptr += imageSize - size;
    }

    const hash = new Uint8ClampedArray(size * size);
    const med = median(sorted);

    for (let i = 0; i < hash.length; i++) {
        hash[i] = ll[i] > med;
    }

    return new ImageHash(hash)
}
