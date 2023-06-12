import {canvasUtil, grayScaleConverter} from "./imageUtils.js";
import {ImageHash} from "./hash.js";

/**
 * @param image {Image}
 * @param size {number}
 */
export function dhash(image, size = 8) {

    const pixels = grayScaleConverter.convert(canvasUtil.resizeImage(image, size + 1, size));

    const hash = new Uint8ClampedArray(size * size);
    const nRows = size;
    const nCols = size + 1;

    let offset = 0;
    for (let i = 0; i < nRows; i++) {
        for (let j = 1; j < nCols; j++) {
            hash[offset++] = pixels[i * nCols + j] > pixels[i * nCols + j - 1];
        }
    }

    return new ImageHash(hash);
}