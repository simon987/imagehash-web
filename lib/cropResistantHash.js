import {canvasUtil, grayScaleConverter} from "./imageUtils.js";
import {boxBlur} from "./blur.js";
import {dhash} from "./dhash.js";
import {ImageMultiHash} from "./hash.js";


// function debugSaveImage(pixels, filename, width, height) {
//
//     const rgba = new Uint8ClampedArray(width * height * 4);
//
//     let cur = 0;
//     for (let y = 0; y < height; y++) {
//         for (let x = 0; x < width; x++) {
//             const val = pixels[y * height + x]
//             rgba[cur++] = val;
//             rgba[cur++] = val;
//             rgba[cur++] = val;
//             rgba[cur++] = 255;
//         }
//     }
//
//     const canvas = createCanvas(width, height);
//     const ctx = canvas.getContext("2d");
//     const imgData = new ImageData(rgba, width, height);
//     ctx.putImageData(imgData, 0, 0);
//
//     const out = fs.createWriteStream(filename)
//     const stream = canvas.createPNGStream()
//     stream.pipe(out)
// }

function findRegion(thresholdPixels, alreadySegmented, size, hill) {

    const region = [];
    const newPixels = [];

    // Find the first pixel available
    for (let i = 0; i < thresholdPixels.length; i++) {
        if (thresholdPixels[i] === hill && alreadySegmented[i] === 0) {
            region.push(i);
            newPixels.push(i);
            alreadySegmented[i] = 1;
            break;
        }
    }

    while (newPixels.length > 0) {
        const newPixel = newPixels.pop();

        const top = newPixel - size;
        if (top > 0 && thresholdPixels[top] === hill && alreadySegmented[top] === 0) {
            region.push(top);
            newPixels.push(top);
            alreadySegmented[top] = 1;
        }

        const bottom = newPixel + size;
        if (bottom < thresholdPixels.length && thresholdPixels[bottom] === hill && alreadySegmented[bottom] === 0) {
            region.push(bottom);
            newPixels.push(bottom);
            alreadySegmented[bottom] = 1;
        }

        const left = newPixel - 1;
        if (newPixel % size !== 0 && thresholdPixels[left] === hill && alreadySegmented[left] === 0) {
            region.push(left);
            newPixels.push(left);
            alreadySegmented[left] = 1;
        }

        const right = newPixel + 1;
        if (right % size !== 0 && thresholdPixels[right] === hill && alreadySegmented[right] === 0) {
            region.push(right);
            newPixels.push(right);
            alreadySegmented[right] = 1;
        }
    }

    return region
}

function findAllSegments(pixels, segImgSize, segThreshold, minSegSize) {
    let hillCount = 0;

    const thresholdPixels = new Uint8ClampedArray(pixels.length);
    for (let i = 0; i < pixels.length; i++) {
        thresholdPixels[i] = pixels[i] > segThreshold;
        hillCount += pixels[i] > segThreshold;
    }

    const valleyCount = pixels.length - hillCount;

    const segments = [];

    const alreadySegmented = new Uint8ClampedArray(pixels.length);

    // Find all the "hill" regions
    let segmentedCount = 0;
    while (segmentedCount < hillCount) {
        const segment = findRegion(thresholdPixels, alreadySegmented, segImgSize, 1);
        if (segment.length > minSegSize) {
            segments.push(segment);
        }
        segmentedCount += segment.length;
    }

    // Find all the "valley" regions
    segmentedCount = 0;
    while (segmentedCount < valleyCount) {
        const segment = findRegion(thresholdPixels, alreadySegmented, segImgSize, 0);
        if (segment.length > minSegSize) {
            segments.push(segment);
        }
        segmentedCount += segment.length;
    }

    return segments;
}

export async function cropResistantHash(image,
                                        hashFunc = undefined,
                                        limitSegments = undefined,
                                        segmentThreshold = 128,
                                        minSegmentSize = 500,
                                        segmentationImageSize = 300) {

    if (hashFunc === undefined) {
        hashFunc = dhash;
    }

    segmentationImageSize = Math.min(image.naturalWidth, image.naturalHeight, segmentationImageSize);

    const imageCanvas = canvasUtil.getImageCanvas(image);

    const pixels = grayScaleConverter.convert(await canvasUtil.resizeImageAndGetData(imageCanvas, segmentationImageSize, segmentationImageSize));

    boxBlur(pixels, segmentationImageSize, segmentationImageSize, 8);

    const segments = findAllSegments(pixels, segmentationImageSize, segmentThreshold, minSegmentSize);

    if (limitSegments) {
        segments.sort((a, b) => b.length - a.length).splice(limitSegments);
    }

    const origW = image.naturalWidth;
    const origH = image.naturalHeight;

    const scaleW = origW / segmentationImageSize
    const scaleH = origH / segmentationImageSize

    const hashPromises = [];

    for (let i = 0; i < segments.length; i++) {
        const x = segments[i].map(num => num % segmentationImageSize);
        const y = segments[i].map(num => num / segmentationImageSize);
        const sx = Math.min(...x) * scaleW;
        const sy = Math.min(...y) * scaleH;
        const sw = Math.max(...x) * scaleW - sx;
        const sh = Math.max(...y) * scaleH - sy;

        const cropCanvas = canvasUtil.getImageCanvas(
            imageCanvas,
            sx, sy, sw, sh
        );
        hashPromises.push(hashFunc(cropCanvas));
    }

    const hashes = await Promise.all(hashPromises);

    return new ImageMultiHash(hashes);
}