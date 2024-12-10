import {createCanvas as $aVFho$createCanvas, ImageData as $aVFho$ImageData} from "canvas";
import $aVFho$picaindexjs from "pica/index.js";
import {createWriteStream as $aVFho$createWriteStream} from "fs";



/**
 * @typedef {{x: number, y: number}} Tuple
 */ class $60afc80b4c160a7b$var$CanvasUtil {
    /**
     * @param image {Image|HTMLImageElement}
     * @param width {number}
     * @param height {number}
     * @param options {{
     *     sx: {number},
     *     sy: {number},
     *     sw: {number},
     *     sh: {number},
     * }}
     * @return {Uint8ClampedArray}
     */ async resizeImageAndGetData(image, width, height, options = {}) {
        let canvas = await this.resizeImage(image, width, height, options);
        const ctx = canvas.getContext("2d");
        return ctx.getImageData(0, 0, width, height).data;
    }
    async resizeImage(image, width, height, options) {
        const { sx: sx , sy: sy , sw: sw , sh: sh  } = options;
        if (typeof window !== "undefined") image.setAttribute("crossOrigin", "Anonymous");
        let fromCanvas = this.getImageCanvas(image, sx, sy, sw, sh);
        let toCanvas;
        let pica;
        if (typeof window === "undefined") {
            // This is not a browser, use the canvas package
            toCanvas = (0, $aVFho$createCanvas)(width, height);
            toCanvas.width = width;
            toCanvas.height = height;
            // Trick pica into thinking that this is a normal HTML cavas
            fromCanvas[Symbol.toStringTag] = "HTMLCanvasElement";
            pica = new (0, $aVFho$picaindexjs)({
                tile: 1024,
                concurrency: 1,
                features: [
                    "js"
                ],
                idle: 2000,
                createCanvas: $aVFho$createCanvas
            });
        } else {
            function browserCreateCanvas(width, height) {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                return canvas;
            }
            pica = new (0, $aVFho$picaindexjs)({
                tile: 1024,
                concurrency: 1,
                features: [
                    "js",
                    "wasm"
                ],
                idle: 2000,
                browserCreateCanvas: browserCreateCanvas
            });
            toCanvas = browserCreateCanvas(width, height);
        }
        await pica.resize(fromCanvas, toCanvas);
        return toCanvas;
    }
    getImageCanvas(image, sx, sy, sw, sh) {
        if (Object.prototype.toString.call(image) === "[object HTMLCanvasElement]" && sx === undefined) return image;
        const canvas = typeof window === "undefined" ? (0, $aVFho$createCanvas)(sw || image.width, sh || image.height) : document.createElement("canvas");
        canvas.width = image.naturalWidth || sw;
        canvas.height = image.naturalHeight || sh;
        const ctx = canvas.getContext("2d");
        if (sx !== undefined) {
            const sCtx = image.getContext("2d");
            const imageData = sCtx.getImageData(sx, sy, sw, sh);
            canvas[Symbol.toStringTag] = "HTMLCanvasElement";
            ctx.putImageData(imageData, 0, 0);
        } else ctx.drawImage(image, 0, 0);
        return canvas;
    }
}
const $60afc80b4c160a7b$export$b800e0a7c023911d = new $60afc80b4c160a7b$var$CanvasUtil();
class $60afc80b4c160a7b$var$GrayScaleConverter {
    /**
     *
     * RGBA -> L (ITU-R 601-2 luma transform)
     *
     * @param imgData {Uint8ClampedArray}
     */ convert(imgData) {
        const arr = new Uint8ClampedArray(imgData.length / 4);
        for(let i = 0; i < imgData.length; i += 4)arr[i >> 2] = Math.round(imgData[i] * 299 / 1000 + imgData[i + 1] * 587 / 1000 + imgData[i + 2] * 114 / 1000);
        return arr;
    }
}
const $60afc80b4c160a7b$export$a0eca36e8a395edb = new $60afc80b4c160a7b$var$GrayScaleConverter();


class $93ae3f685705f1d4$export$8d4a4db4f3b072e1 {
    binArray;
    /**
     * @param binArray {Uint8ClampedArray}
     */ constructor(binArray){
        this.binArray = binArray;
    }
    static fromBase64(s) {
        const buf = atob(s);
        const arr = new Uint8ClampedArray(buf.length * 8);
        for(let i = 0; i < buf.length; i++){
            const c = buf.charCodeAt(i);
            arr[i * 8] = c & 0x01;
            arr[i * 8 + 1] = (c & 0x02) >> 1;
            arr[i * 8 + 2] = (c & 0x04) >> 2;
            arr[i * 8 + 3] = (c & 0x08) >> 3;
            arr[i * 8 + 4] = (c & 0x10) >> 4;
            arr[i * 8 + 5] = (c & 0x20) >> 5;
            arr[i * 8 + 6] = (c & 0x40) >> 6;
            arr[i * 8 + 7] = (c & 0x80) >> 7;
        }
        return new $93ae3f685705f1d4$export$8d4a4db4f3b072e1(arr);
    }
    static fromHexStringReversed(s) {
        if (s.length % 2 !== 0) throw Error("hex string length must be a multiple of 2");
        const arr = new Uint8ClampedArray(s.length * 4);
        for(let i = 0; i < s.length; i += 2){
            const c = Number.parseInt(s.slice(i, i + 2), 16);
            if (Number.isNaN(c)) throw Error("Invalid hex string");
            arr[i * 4] = (c & 0x80) >> 7;
            arr[i * 4 + 1] = (c & 0x40) >> 6;
            arr[i * 4 + 2] = (c & 0x20) >> 5;
            arr[i * 4 + 3] = (c & 0x10) >> 4;
            arr[i * 4 + 4] = (c & 0x08) >> 3;
            arr[i * 4 + 5] = (c & 0x04) >> 2;
            arr[i * 4 + 6] = (c & 0x02) >> 1;
            arr[i * 4 + 7] = c & 0x01;
        }
        return new $93ae3f685705f1d4$export$8d4a4db4f3b072e1(arr);
    }
    static fromHexString(s) {
        if (s.length % 2 !== 0) throw Error("hex string length must be a multiple of 2");
        const arr = new Uint8ClampedArray(s.length * 4);
        for(let i = 0; i < s.length; i += 2){
            const c = Number.parseInt(s.slice(i, i + 2), 16);
            if (Number.isNaN(c)) throw Error("Invalid hex string");
            arr[i * 4] = c & 0x01;
            arr[i * 4 + 1] = (c & 0x02) >> 1;
            arr[i * 4 + 2] = (c & 0x04) >> 2;
            arr[i * 4 + 3] = (c & 0x08) >> 3;
            arr[i * 4 + 4] = (c & 0x10) >> 4;
            arr[i * 4 + 5] = (c & 0x20) >> 5;
            arr[i * 4 + 6] = (c & 0x40) >> 6;
            arr[i * 4 + 7] = (c & 0x80) >> 7;
        }
        return new $93ae3f685705f1d4$export$8d4a4db4f3b072e1(arr);
    }
    toHexStringReversed() {
        let str = "";
        for(let i = 0; i < this.binArray.length; i += 8){
            const c = this.binArray[i] << 7 | this.binArray[i + 1] << 6 | this.binArray[i + 2] << 5 | this.binArray[i + 3] << 4 | this.binArray[i + 4] << 3 | this.binArray[i + 5] << 2 | this.binArray[i + 6] << 1 | this.binArray[i + 7];
            str += c.toString(16).padStart(2, "0");
        }
        return str;
    }
    toHexString() {
        let str = "";
        for(let i = 0; i < this.binArray.length; i += 8){
            const c = this.binArray[i] | this.binArray[i + 1] << 1 | this.binArray[i + 2] << 2 | this.binArray[i + 3] << 3 | this.binArray[i + 4] << 4 | this.binArray[i + 5] << 5 | this.binArray[i + 6] << 6 | this.binArray[i + 7] << 7;
            str += c.toString(16).padStart(2, "0");
        }
        return str;
    }
    toBase64() {
        let buf = [];
        for(let i = 0; i < this.binArray.length; i += 8)buf.push(this.binArray[i] | this.binArray[i + 1] << 1 | this.binArray[i + 2] << 2 | this.binArray[i + 3] << 3 | this.binArray[i + 4] << 4 | this.binArray[i + 5] << 5 | this.binArray[i + 6] << 6 | this.binArray[i + 7] << 7);
        return btoa(String.fromCharCode(...new Uint8Array(buf)));
    }
    /**
     * @param hash {ImageHash}
     * @returns number
     */ hammingDistance(hash) {
        if (hash.binArray.length !== this.binArray.length) throw new Error("Cannot compare two ImageHash instances of different sizes");
        let distance = 0;
        for(let i = 0; i < this.binArray.length; i++)if (this.binArray[i] !== hash.binArray[i]) distance += 1;
        return distance;
    }
}
class $93ae3f685705f1d4$export$88a288ed7909ebd3 {
    constructor(hashes){
        this.segmentHashes = hashes;
    }
    toJSON() {
        return this.segmentHashes.map((h)=>h.toHexString());
    }
    static fromJSON(json) {
        return new $93ae3f685705f1d4$export$88a288ed7909ebd3(json.map((s)=>$93ae3f685705f1d4$export$8d4a4db4f3b072e1.fromHexString(s)));
    }
    /**
     * @param hash {ImageMultiHash}
     * @param hammingCutoff {number}
     * @return {sum: number, num: number}
     */ hashDiff(hash, hammingCutoff) {
        let sum = 0;
        let num = 0;
        for(let i = 0; i < hash.segmentHashes.length; i++){
            const distances = [];
            for(let j = 0; j < this.segmentHashes.length; j++)distances.push(hash.segmentHashes[i].hammingDistance(this.segmentHashes[j]));
            const minDistance = Math.min(...distances);
            if (minDistance <= hammingCutoff) {
                sum += minDistance;
                num += 1;
            }
        }
        return {
            num: num,
            sum: sum
        };
    }
}


async function $43b78a639e865778$export$3ff5a4f04de7e52e(image, size = 8) {
    const pixels = (0, $60afc80b4c160a7b$export$a0eca36e8a395edb).convert(await (0, $60afc80b4c160a7b$export$b800e0a7c023911d).resizeImageAndGetData(image, size, size));
    const hash = new Uint8ClampedArray(size * size);
    let sum = 0;
    for(let i = 0; i < pixels.length; i++)sum += pixels[i];
    const avg = sum / pixels.length;
    for(let i = 0; i < pixels.length; i++)hash[i] = pixels[i] > avg;
    return new (0, $93ae3f685705f1d4$export$8d4a4db4f3b072e1)(hash);
}




async function $ab16a554088e5511$export$a54d5a9c851b86d5(image, size = 8) {
    const pixels = (0, $60afc80b4c160a7b$export$a0eca36e8a395edb).convert(await (0, $60afc80b4c160a7b$export$b800e0a7c023911d).resizeImageAndGetData(image, size + 1, size));
    const hash = new Uint8ClampedArray(size * size);
    const nRows = size;
    const nCols = size + 1;
    let offset = 0;
    for(let i = 0; i < nRows; i++)for(let j = 1; j < nCols; j++)hash[offset++] = pixels[i * nCols + j] > pixels[i * nCols + j - 1];
    return new (0, $93ae3f685705f1d4$export$8d4a4db4f3b072e1)(hash);
}




const $c89020ba4491bc57$var$cosCache = {};
function $c89020ba4491bc57$var$precomputeCos(L) {
    if (L in $c89020ba4491bc57$var$cosCache) return $c89020ba4491bc57$var$cosCache[L];
    const piOver2L = Math.PI / (2 * L);
    const cos = {};
    for(let u = 0; u < L; u++){
        const uTimesPiOver2L = u * piOver2L;
        for(let x = 0; x < L; x++)cos[(u << 8) + x] = Math.cos((2 * x + 1) * uTimesPiOver2L);
    }
    $c89020ba4491bc57$var$cosCache[L] = cos;
    return cos;
}
/**
 * 2D DCT-II
 * @param matrix Must be a square matrix
 * @return {Array}
 */ function $c89020ba4491bc57$var$dctTransform(matrix) {
    const L = Math.round(Math.sqrt(matrix.length));
    const cos = $c89020ba4491bc57$var$precomputeCos(L);
    const dct = new Array(L * L);
    let _u, _v, sum;
    for(let u = 0; u < L; u++)for(let v = 0; v < L; v++){
        sum = 0;
        _u = u << 8;
        _v = v << 8;
        for(let x = 0; x < L; x++)for(let y = 0; y < L; y++)sum += matrix[x * L + y] * cos[_u + x] * cos[_v + y];
        dct[u * L + v] = sum;
    }
    return dct;
}
function $c89020ba4491bc57$var$median(values) {
    values.sort((a, b)=>a - b);
    return values[Math.floor(values.length / 2)];
}
async function $c89020ba4491bc57$export$1b9f82d63d7325c(image, size = 8, highFrequencyFactor = 4) {
    const imageSize = size * highFrequencyFactor;
    const pixels = (0, $60afc80b4c160a7b$export$a0eca36e8a395edb).convert(await (0, $60afc80b4c160a7b$export$b800e0a7c023911d).resizeImageAndGetData(image, imageSize, imageSize));
    const dctOut = $c89020ba4491bc57$var$dctTransform(pixels);
    const dctLowFreq = new Float64Array(size * size);
    const sorted = new Float64Array(size * size);
    let ptrLow = 0;
    let ptr = 0;
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            dctLowFreq[ptrLow] = dctOut[ptr];
            sorted[ptrLow] = dctOut[ptr];
            ptrLow += 1;
            ptr += 1;
        }
        ptr += imageSize - size;
    }
    let sum = 0;
    for(let i = 0; i < dctLowFreq.length; i++)sum += dctLowFreq[i];
    const med = $c89020ba4491bc57$var$median(sorted);
    const hash = new Uint8ClampedArray(size * size);
    for(let i = 0; i < hash.length; ++i)hash[i] = dctLowFreq[i] > med;
    return new (0, $93ae3f685705f1d4$export$8d4a4db4f3b072e1)(hash);
}





const $5f085270a95018a7$var$HaarWavelet = [
    1 / Math.SQRT2,
    1 / Math.SQRT2
];
function $5f085270a95018a7$var$waveletFromScalingNumbers(scalingNumbers) {
    const waveletNumbers = scalingNumbers.slice().reverse().map((value, index)=>index % 2 === 0 ? value : -value);
    return {
        dec: {
            low: scalingNumbers.slice(),
            high: waveletNumbers.slice()
        },
        rec: {
            low: scalingNumbers.slice(),
            high: waveletNumbers.slice()
        }
    };
}
const $5f085270a95018a7$var$HaarBasis = $5f085270a95018a7$var$waveletFromScalingNumbers($5f085270a95018a7$var$HaarWavelet);
function $5f085270a95018a7$var$getBasis(wavelet) {
    if (wavelet === "haar") return $5f085270a95018a7$var$HaarBasis;
    throw new Error("Invalid wavelet");
}
function $5f085270a95018a7$var$dot(a, b) {
    /* Calculate dot product. */ return a.reduce((dot, value, index)=>dot + value * b[index], 0);
}
function $5f085270a95018a7$var$add(a, b) {
    /* Calculate element-wise sum. */ return a.map((value, index)=>value + b[index]);
}
function $5f085270a95018a7$var$mulScalar(scalar, array) {
    return array.map((value)=>scalar * value);
}
function $5f085270a95018a7$var$dwt(data, wavelet) {
    const waveletBasis = $5f085270a95018a7$var$getBasis(wavelet);
    const filters = waveletBasis.dec;
    const filterLength = filters.low.length;
    let approx = [];
    let detail = [];
    /* Calculate coefficients. */ for(let offset = 0; offset + filterLength <= data.length; offset += 2){
        const values = data.slice(offset, offset + filterLength);
        approx.push($5f085270a95018a7$var$dot(values, filters.low));
        detail.push($5f085270a95018a7$var$dot(values, filters.high));
    }
    return [
        approx,
        detail
    ];
}
function $5f085270a95018a7$var$idwt(approx, detail, waveletBasis) {
    const filters = waveletBasis.rec;
    const filterLength = filters.low.length;
    /* Initialize transform. */ const coeffLength = approx.length;
    let pad = new Array(filterLength + (coeffLength - 1) * 2);
    pad.fill(0);
    /* Perform inverse Discrete Wavelet Transform. */ for(let i = 0; i < coeffLength; i++){
        const offset = 2 * i;
        /* Calculate values. */ let values = pad.slice(offset, offset + filterLength);
        values = $5f085270a95018a7$var$add(values, $5f085270a95018a7$var$mulScalar(approx[i], filters.low));
        values = $5f085270a95018a7$var$add(values, $5f085270a95018a7$var$mulScalar(detail[i], filters.high));
        /* Update values. */ pad = pad.slice(0, offset).concat(values).concat(pad.slice(offset + values.length));
    }
    /* Remove padding. */ return pad.slice(filterLength - 2, pad.length - (filterLength - 2));
}
function $5f085270a95018a7$var$wavedec(data, wavelet, level) {
    /*  Initialize transform. */ let coeffs = [];
    let approx = data.slice();
    /* Transform. */ for(let i = 0; i < level; i++){
        /* Perform single level transform. */ const approxDetail = $5f085270a95018a7$var$dwt(approx, wavelet);
        approx = approxDetail[0];
        /* Prepend detail coefficients. */ coeffs.unshift(approxDetail[1].slice());
    }
    /* Prepend last approximation. */ coeffs.unshift(approx.slice());
    return coeffs;
}
function $5f085270a95018a7$var$waverec(coeffs, wavelet) {
    wavelet = $5f085270a95018a7$var$getBasis(wavelet);
    let approx = coeffs[0];
    for(let i = 1; i < coeffs.length; i++){
        const detail = coeffs[i];
        if (approx.length === detail.length + 1) approx = approx.slice(0, approx.length - 1);
        approx = $5f085270a95018a7$var$idwt(approx, detail, wavelet);
    }
    return approx.slice();
}
function $5f085270a95018a7$var$median(values) {
    values.sort((a, b)=>a - b);
    return values[Math.floor(values.length / 2)];
}
function $5f085270a95018a7$var$wavedec2(data, wavelet, level) {
    const L = Math.round(Math.sqrt(data.length));
    const rows = new Array(L);
    for(let y = 0; y < L; y++){
        const row = new Array(L);
        for(let x = 0; x < L; x++)row[x] = data[y * L + x];
        rows[y] = row;
    }
    const cols = new Array(L);
    for(let i = 0; i < L; i++)cols[i] = new Array(L);
    // Rows
    for(let y = 0; y < L; y++){
        const coeffs = $5f085270a95018a7$var$wavedec(rows[y], "haar", level).flat();
        for(let x = 0; x < L; x++)cols[x][y] = coeffs[x];
    }
    const result = new Array(L * L);
    // Cols
    for(let x = 0; x < L; x++){
        const coeffs = $5f085270a95018a7$var$wavedec(cols[x], "haar", level).flat();
        for(let y = 0; y < L; y++)result[y * L + x] = coeffs[y];
    }
    return result;
}
function $5f085270a95018a7$var$unflatten(data, level) {
    const result = [];
    const sizes = [];
    let n = data.length;
    for(let i = 0; i < level; i++){
        n /= 2;
        sizes.unshift(n);
    }
    sizes.unshift(n);
    let cur = 0;
    for(let i = 0; i < sizes.length; i++){
        result.push(data.slice(cur, cur + sizes[i]));
        cur += sizes[i];
    }
    return result;
}
function $5f085270a95018a7$var$waverec2(data, wavelet, level) {
    const L = Math.round(Math.sqrt(data.length));
    const cols = new Array(L);
    for(let x = 0; x < L; x++){
        const col = new Array(L);
        for(let y = 0; y < L; y++)col[y] = data[y * L + x];
        cols[x] = col;
    }
    const rows = new Array(L);
    for(let i = 0; i < L; i++)rows[i] = new Array(L);
    // Cols
    for(let x = 0; x < L; x++){
        const rec = $5f085270a95018a7$var$waverec($5f085270a95018a7$var$unflatten(cols[x], level), "haar");
        for(let y = 0; y < L; y++)rows[y][x] = rec[y];
    }
    const result = new Array(L * L);
    // Rows
    for(let y = 0; y < L; y++){
        const rec = $5f085270a95018a7$var$waverec($5f085270a95018a7$var$unflatten(rows[y], level), "haar");
        for(let x = 0; x < L; x++)result[y * L + x] = rec[x];
    }
    return result;
}
async function $5f085270a95018a7$export$75b483db6f260202(image, size = 8, removeMaxHaarLL = true) {
    const imageNaturalScale = 2 ** Math.floor(Math.log2(Math.min(image.naturalWidth, image.naturalHeight)));
    const imageSize = Math.max(imageNaturalScale, size);
    const llMaxLevel = Math.floor(Math.log2(imageSize));
    const level = Math.floor(Math.log2(size));
    const dwtLevel = llMaxLevel - level;
    const pixels = (0, $60afc80b4c160a7b$export$a0eca36e8a395edb).convert(await (0, $60afc80b4c160a7b$export$b800e0a7c023911d).resizeImageAndGetData(image, imageSize, imageSize));
    let data = new Array(pixels.length);
    for(let i = 0; i < pixels.length; i++)data[i] = pixels[i] / 255;
    if (removeMaxHaarLL) {
        const coeffs = $5f085270a95018a7$var$wavedec2(data, "haar", llMaxLevel);
        coeffs[0] = 0;
        data = $5f085270a95018a7$var$waverec2(coeffs, "haar", llMaxLevel);
    }
    const result = $5f085270a95018a7$var$wavedec2(data, "haar", dwtLevel);
    const ll = new Float64Array(size * size);
    const sorted = new Float64Array(size * size);
    let ptr = 0;
    let ptrLow = 0;
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            ll[ptrLow] = result[ptr];
            sorted[ptrLow] = result[ptr];
            ptr += 1;
            ptrLow += 1;
        }
        ptr += imageSize - size;
    }
    const hash = new Uint8ClampedArray(size * size);
    const med = $5f085270a95018a7$var$median(sorted);
    for(let i = 0; i < hash.length; i++)hash[i] = ll[i] > med;
    return new (0, $93ae3f685705f1d4$export$8d4a4db4f3b072e1)(hash);
}




const $d7133e4d97c09948$var$mulTable = [
    512,
    512,
    456,
    512,
    328,
    456,
    335,
    512,
    405,
    328,
    271,
    456
];
const $d7133e4d97c09948$var$shgTable = [
    9,
    11,
    12,
    13,
    13,
    14,
    14,
    15,
    15,
    15,
    15,
    16
];
class $d7133e4d97c09948$var$BlurStack {
    r = 0;
    next = null;
}
function $d7133e4d97c09948$export$3763232abdebfe34(pixels, width, height, radius) {
    const div = 2 * radius + 1;
    const widthMinus1 = width - 1;
    const heightMinus1 = height - 1;
    const radiusPlus1 = radius + 1;
    const sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    const stackStart = new $d7133e4d97c09948$var$BlurStack();
    let stack = stackStart;
    let stackEnd;
    for(let i = 1; i < div; i++){
        stack = stack.next = new $d7133e4d97c09948$var$BlurStack();
        if (i === radiusPlus1) stackEnd = stack;
    }
    stack.next = stackStart;
    let stackIn = null;
    let stackOut = null;
    const mulSum = $d7133e4d97c09948$var$mulTable[radius];
    const shgSum = $d7133e4d97c09948$var$shgTable[radius];
    let p;
    let rbs;
    let yw = 0;
    let yi = 0;
    for(let y = 0; y < height; y++){
        let pr = pixels[yi], rOutSum = radiusPlus1 * pr, rSum = sumFactor * pr;
        stack = stackStart;
        for(let _i5 = 0; _i5 < radiusPlus1; _i5++){
            stack.r = pr;
            stack = stack.next;
        }
        let rInSum = 0;
        for(let _i6 = 1; _i6 < radiusPlus1; _i6++){
            rSum += (stack.r = pr = pixels[yi + (widthMinus1 < _i6 ? widthMinus1 : _i6)]) * (rbs = radiusPlus1 - _i6);
            rInSum += pr;
            stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for(let x = 0; x < width; x++){
            pixels[yi] = rSum * mulSum >> shgSum;
            rSum -= rOutSum;
            rOutSum -= stackIn.r;
            rInSum += stackIn.r = pixels[yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)];
            rSum += rInSum;
            stackIn = stackIn.next;
            rOutSum += pr = stackOut.r;
            rInSum -= pr;
            stackOut = stackOut.next;
            yi += 1;
        }
        yw += width;
    }
    for(let _x2 = 0; _x2 < width; _x2++){
        yi = _x2;
        let _pr2 = pixels[yi], _rOutSum2 = radiusPlus1 * _pr2, _rSum2 = sumFactor * _pr2, stack = stackStart;
        for(let _i7 = 0; _i7 < radiusPlus1; _i7++){
            stack.r = _pr2;
            stack = stack.next;
        }
        let _rInSum2 = 0;
        for(let _i8 = 1, yp = width; _i8 <= radius; _i8++){
            yi = yp + _x2;
            _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
            _rInSum2 += _pr2;
            stack = stack.next;
            if (_i8 < heightMinus1) yp += width;
        }
        yi = _x2;
        stackIn = stackStart;
        stackOut = stackEnd;
        for(let _y2 = 0; _y2 < height; _y2++){
            p = yi;
            pixels[p] = _rSum2 * mulSum >> shgSum;
            _rSum2 -= _rOutSum2;
            _rOutSum2 -= stackIn.r;
            p = _x2 + ((p = _y2 + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width;
            _rSum2 += _rInSum2 += stackIn.r = pixels[p];
            stackIn = stackIn.next;
            _rOutSum2 += _pr2 = stackOut.r;
            _rInSum2 -= _pr2;
            stackOut = stackOut.next;
            yi += width;
        }
    }
}






function $5e7f9f03f6f326fa$var$debugSaveImage(pixels, filename, width, height) {
    const rgba = new Uint8ClampedArray(width * height * 4);
    let cur = 0;
    for(let y = 0; y < height; y++)for(let x = 0; x < width; x++){
        const val = pixels[y * height + x];
        rgba[cur++] = val;
        rgba[cur++] = val;
        rgba[cur++] = val;
        rgba[cur++] = 255;
    }
    const canvas = (0, $aVFho$createCanvas)(width, height);
    const ctx = canvas.getContext("2d");
    const imgData = new (0, $aVFho$ImageData)(rgba, width, height);
    ctx.putImageData(imgData, 0, 0);
    const out = $aVFho$createWriteStream(filename);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
}
function $5e7f9f03f6f326fa$var$findRegion(thresholdPixels, alreadySegmented, size, hill) {
    const region = [];
    const newPixels = [];
    // Find the first pixel available
    for(let i = 0; i < thresholdPixels.length; i++)if (thresholdPixels[i] === hill && alreadySegmented[i] === 0) {
        region.push(i);
        newPixels.push(i);
        alreadySegmented[i] = 1;
        break;
    }
    let top, bottom, left, right, newPixel;
    while(newPixels.length > 0){
        newPixel = newPixels.pop();
        top = newPixel - size;
        if (top > 0 && thresholdPixels[top] === hill && alreadySegmented[top] === 0) {
            region.push(top);
            newPixels.push(top);
            alreadySegmented[top] = 1;
        }
        bottom = newPixel + size;
        if (bottom < thresholdPixels.length && thresholdPixels[bottom] === hill && alreadySegmented[bottom] === 0) {
            region.push(bottom);
            newPixels.push(bottom);
            alreadySegmented[bottom] = 1;
        }
        left = newPixel - 1;
        if (newPixel % size !== 0 && thresholdPixels[left] === hill && alreadySegmented[left] === 0) {
            region.push(left);
            newPixels.push(left);
            alreadySegmented[left] = 1;
        }
        right = newPixel + 1;
        if (right % size !== 0 && thresholdPixels[right] === hill && alreadySegmented[right] === 0) {
            region.push(right);
            newPixels.push(right);
            alreadySegmented[right] = 1;
        }
    }
    return region;
}
function $5e7f9f03f6f326fa$var$findAllSegments(pixels, segImgSize, segThreshold, minSegSize) {
    let hillCount = 0;
    const thresholdPixels = new Uint8ClampedArray(pixels.length);
    for(let i = 0; i < pixels.length; i++){
        thresholdPixels[i] = pixels[i] > segThreshold;
        hillCount += pixels[i] > segThreshold;
    }
    const valleyCount = pixels.length - hillCount;
    const segments = [];
    const alreadySegmented = new Uint8ClampedArray(pixels.length);
    // Find all the "hill" regions
    let segmentedCount = 0;
    while(segmentedCount < hillCount){
        const segment = $5e7f9f03f6f326fa$var$findRegion(thresholdPixels, alreadySegmented, segImgSize, 1);
        if (segment.length > minSegSize) segments.push(segment);
        segmentedCount += segment.length;
    }
    // Find all the "valley" regions
    segmentedCount = 0;
    while(segmentedCount < valleyCount){
        const segment = $5e7f9f03f6f326fa$var$findRegion(thresholdPixels, alreadySegmented, segImgSize, 0);
        if (segment.length > minSegSize) segments.push(segment);
        segmentedCount += segment.length;
    }
    return segments;
}
async function $5e7f9f03f6f326fa$export$ac55b039577b3576(image, hashFunc, limitSegments, segmentThreshold = 128, minSegmentSize = 500, segmentationImageSize = 300) {
    if (hashFunc === undefined) hashFunc = (0, $ab16a554088e5511$export$a54d5a9c851b86d5);
    const imageWidth = image.naturalWidth || image.width;
    const imageHeight = image.naturalHeight || image.height;
    segmentationImageSize = Math.min(imageWidth, imageHeight, segmentationImageSize);
    const imageCanvas = (0, $60afc80b4c160a7b$export$b800e0a7c023911d).getImageCanvas(image);
    const pixels = (0, $60afc80b4c160a7b$export$a0eca36e8a395edb).convert(await (0, $60afc80b4c160a7b$export$b800e0a7c023911d).resizeImageAndGetData(imageCanvas, segmentationImageSize, segmentationImageSize));
    (0, $d7133e4d97c09948$export$3763232abdebfe34)(pixels, segmentationImageSize, segmentationImageSize, 4);
    const segments = $5e7f9f03f6f326fa$var$findAllSegments(pixels, segmentationImageSize, segmentThreshold, minSegmentSize);
    if (limitSegments) segments.sort((a, b)=>b.length - a.length).splice(limitSegments);
    const scaleW = imageWidth / segmentationImageSize;
    const scaleH = imageHeight / segmentationImageSize;
    const hashPromises = [];
    for(let i = 0; i < segments.length; i++){
        const x = segments[i].map((num)=>num % segmentationImageSize);
        const y = segments[i].map((num)=>num / segmentationImageSize);
        const sx = Math.min(...x);
        const sy = Math.min(...y);
        const sw = Math.max(...x) + 1 - sx;
        const sh = Math.max(...y) + 1 - sy;
        const cropCanvas = (0, $60afc80b4c160a7b$export$b800e0a7c023911d).getImageCanvas((0, $60afc80b4c160a7b$export$b800e0a7c023911d).getImageCanvas(image), sx * scaleW, sy * scaleH, sw * scaleW, sh * scaleH);
        hashPromises.push(hashFunc(cropCanvas));
    }
    const hashes = await Promise.all(hashPromises);
    return new (0, $93ae3f685705f1d4$export$88a288ed7909ebd3)(hashes);
}


if (typeof window !== "undefined") {
    window.ahash = (0, $43b78a639e865778$export$3ff5a4f04de7e52e);
    window.dhash = (0, $ab16a554088e5511$export$a54d5a9c851b86d5);
    window.phash = (0, $c89020ba4491bc57$export$1b9f82d63d7325c);
    window.whash = (0, $5f085270a95018a7$export$75b483db6f260202);
    window.cropResistantHash = (0, $5e7f9f03f6f326fa$export$ac55b039577b3576);
    window.ImageHash = (0, $93ae3f685705f1d4$export$8d4a4db4f3b072e1);
}


export {$43b78a639e865778$export$3ff5a4f04de7e52e as ahash, $ab16a554088e5511$export$a54d5a9c851b86d5 as dhash, $c89020ba4491bc57$export$1b9f82d63d7325c as phash, $5f085270a95018a7$export$75b483db6f260202 as whash, $5e7f9f03f6f326fa$export$ac55b039577b3576 as cropResistantHash, $93ae3f685705f1d4$export$8d4a4db4f3b072e1 as ImageHash};
//# sourceMappingURL=main.js.map
