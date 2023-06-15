import {createCanvas} from "canvas";
import Pica from "pica/index.js";

/**
 * @typedef {{x: number, y: number}} Tuple
 */

class CanvasUtil {

    /**
     * @param image {Image|HTMLImageElement}
     * @param width {number}
     * @param height {number}
     * @return {Uint8ClampedArray}
     */
    async resizeImage(image, width, height) {

        let fromCanvas;
        let toCanvas;
        let pica;

        if (typeof window === "undefined") {
            // This is not a browser, use the canvas package
            toCanvas = createCanvas(width, height);
            toCanvas.width = width;
            toCanvas.height = height;
            fromCanvas = createCanvas(image.width, image.height);
            fromCanvas.width = image.width;
            fromCanvas.height = image.height;

            // Trick pica into thinking that this is a normal HTML cavas
            fromCanvas[Symbol.toStringTag] = "HTMLCanvasElement";

            pica = new Pica({
                tile: 1024,
                concurrency: 1,
                features: ["js"],
                idle: 2000,
                createCanvas
            });
        } else {
            function browserCreateCanvas(width, height) {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                return canvas;
            }

            pica = new Pica({
                tile: 1024,
                concurrency: 1,
                features: ["js", "wasm"], // Disable web workers & cib
                idle: 2000,
                browserCreateCanvas
            });
            image.setAttribute("crossOrigin", "Anonymous");

            toCanvas = browserCreateCanvas(width, height);
            fromCanvas = browserCreateCanvas(image.width, image.height);
        }

        const fromCtx = fromCanvas.getContext("2d");
        fromCtx.drawImage(image, 0, 0);

        await pica.resize(fromCanvas, toCanvas)

        const toCtx = toCanvas.getContext("2d");
        return toCtx.getImageData(0, 0, width, height).data;
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
