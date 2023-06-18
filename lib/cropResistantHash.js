import {canvasUtil, grayScaleConverter} from "./imageUtils.js";
import {boxBlur} from "./blur.js";
import {dhash} from "./dhash.js";
import {ImageMultiHash} from "./hash.js";
import {createCanvas, ImageData} from "canvas";
import * as fs from "fs";


function debugSaveImage(pixels, filename, width, height) {

    const rgba = new Uint8ClampedArray(width * height * 4);

    let cur = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const val = pixels[y * height + x]
            rgba[cur++] = val;
            rgba[cur++] = val;
            rgba[cur++] = val;
            rgba[cur++] = 255;
        }
    }

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const imgData = new ImageData(rgba, width, height);
    ctx.putImageData(imgData, 0, 0);

    const out = fs.createWriteStream(filename)
    const stream = canvas.createPNGStream()
    stream.pipe(out)
}

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

    let top, bottom, left, right, newPixel;
    while (newPixels.length > 0) {
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
    const imageWidth = image.naturalWidth || image.width;
    const imageHeight = image.naturalHeight || image.height;

    segmentationImageSize = Math.min(imageWidth, imageHeight, segmentationImageSize);

    const imageCanvas = canvasUtil.getImageCanvas(image);

    const pixels = grayScaleConverter.convert(await canvasUtil.resizeImageAndGetData(imageCanvas, segmentationImageSize, segmentationImageSize));

    boxBlur(pixels, segmentationImageSize, segmentationImageSize, 4);

    const segments = findAllSegments(pixels, segmentationImageSize, segmentThreshold, minSegmentSize);

    if (limitSegments) {
        segments.sort((a, b) => b.length - a.length).splice(limitSegments);
    }

    const scaleW = imageWidth / segmentationImageSize;
    const scaleH = imageHeight / segmentationImageSize;

    const hashPromises = [];

    for (let i = 0; i < segments.length; i++) {
        const x = segments[i].map(num => num % segmentationImageSize);
        const y = segments[i].map(num => num / segmentationImageSize);

        const sx = Math.min(...x);
        const sy = Math.min(...y);
        const sw = Math.max(...x) + 1 - sx;
        const sh = Math.max(...y) + 1 - sy;

        const cropCanvas = canvasUtil.getImageCanvas(
            canvasUtil.getImageCanvas(image),
            sx * scaleW, sy * scaleH, sw * scaleW, sh * scaleH
        );
        hashPromises.push(hashFunc(cropCanvas));
    }

    const hashes = await Promise.all(hashPromises);

    return new ImageMultiHash(hashes);
}