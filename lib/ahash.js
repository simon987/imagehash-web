import {canvasUtil, grayScaleConverter} from "./imageUtils.js";
import {ImageHash} from "./hash.js";


/**
 * @param image {Image}
 * @param size {number}
 */
export async function ahash(image, size = 8) {
    const pixels = grayScaleConverter.convert(await canvasUtil.resizeImageAndGetData(image, size, size));

    const hash = new Uint8ClampedArray(size * size);

    let sum = 0;
    for (let i = 0; i < pixels.length; i++) {
        sum += pixels[i];
    }
    const avg = sum / pixels.length;

    for (let i = 0; i < pixels.length; i++) {
        hash[i] = pixels[i] > avg;
    }

    return new ImageHash(hash);
}