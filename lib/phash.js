import {canvasUtil, grayScaleConverter} from "./imageUtils.js";
import {ImageHash} from "./hash.js";

const cosCache = {};

function precomputeCos(L) {
    if (L in cosCache) {
        return cosCache[L];
    }

    const piOver2L = Math.PI / (2 * L)

    const cos = {};

    for (let u = 0; u < L; u++) {
        const uTimesPiOver2L = u * piOver2L;
        for (let x = 0; x < L; x++) {
            cos[(u << 8) + x] = Math.cos((2 * x + 1) * uTimesPiOver2L);
        }
    }

    cosCache[L] = cos;

    return cos;
}

/**
 * 2D DCT-II
 * @param matrix Must be a square matrix
 * @return {Array}
 */
function dctTransform(matrix) {

    const L = Math.round(Math.sqrt(matrix.length));

    const cos = precomputeCos(L);
    const dct = new Array(L * L);

    let _u, _v, sum;

    for (let u = 0; u < L; u++) {
        for (let v = 0; v < L; v++) {
            sum = 0;

            _u = u << 8;
            _v = v << 8;

            for (let x = 0; x < L; x++) {
                for (let y = 0; y < L; y++) {
                    sum += matrix[x * L + y] * cos[_u + x] * cos[_v + y];
                }
            }

            dct[u * L + v] = sum;
        }
    }

    return dct
}


function median(values) {
    values.sort((a, b) => a - b);
    return values[Math.floor(values.length / 2)];
}

/**
 * @param image {Image}
 * @param size {number}
 * @param highFrequencyFactor {number}
 */
export async function phash(image, size = 8, highFrequencyFactor = 4) {
    const imageSize = size * highFrequencyFactor;

    const pixels = grayScaleConverter.convert(await canvasUtil.resizeImageAndGetData(image, imageSize, imageSize));

    const dctOut = dctTransform(pixels);

    const dctLowFreq = new Float64Array(size * size)
    const sorted = new Float64Array(size * size)

    let ptrLow = 0;
    let ptr = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            dctLowFreq[ptrLow] = dctOut[ptr];
            sorted[ptrLow] = dctOut[ptr];
            ptrLow += 1;
            ptr += 1;
        }
        ptr += imageSize - size;
    }

    let sum = 0;
    for (let i = 0; i < dctLowFreq.length; i++) {
        sum += dctLowFreq[i];
    }
    const med = median(sorted);

    const hash = new Uint8ClampedArray(size * size);

    for (let i = 0; i < hash.length; ++i) {
        hash[i] = dctLowFreq[i] > med;
    }

    return new ImageHash(hash);
}