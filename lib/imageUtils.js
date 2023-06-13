import {createCanvas} from "canvas";

/**
 * @typedef {{x: number, y: number}} Tuple
 */

class CanvasUtil {

    getContext2d(width, height) {
    }

    /**
     * @param image {Image|HTMLImageElement}
     * @param width {number}
     * @param height {number}
     * @return {Uint8ClampedArray}
     */
    resizeImage(image, width, height) {
        let ctx;
        if (typeof window === "undefined") {
            // This is not a browser, use the canvas package
            const canvas = createCanvas(width, height);
            ctx = canvas.getContext("2d");
        } else {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            image.setAttribute("crossOrigin", "Anonymous");

            ctx = canvas.getContext("2d");
        }

        ctx.webkitImageSmoothingEnabled = true;
        ctx.msImageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(image, 0, 0, width, height);
        return ctx.getImageData(0, 0, width, height).data;
    }
}

export const canvasUtil = new CanvasUtil();

class GrayScaleConverter {

    /**
     *
     * RGBA -> L (ITU-R 601-2 luma transform)
     *
     * @param imgData {Uint8ClampedArray}
     */
    convert(imgData) {
        const arr = new Uint8ClampedArray(imgData.length / 4);

        let j = 0;
        for (let i = 0; i < imgData.length; i += 4) {
            arr[j++] = Math.round((imgData[i] * 299 / 1000 + imgData[i + 1] * 587 / 1000 + imgData[i + 2] * 114 / 1000))
        }

        return arr;
    }
}

export const grayScaleConverter = new GrayScaleConverter()
