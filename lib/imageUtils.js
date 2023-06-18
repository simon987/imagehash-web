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
     * @param options {{
     *     sx: {number},
     *     sy: {number},
     *     sw: {number},
     *     sh: {number},
     * }}
     * @return {Uint8ClampedArray}
     */
    async resizeImageAndGetData(image, width, height, options = {}) {
        let canvas = await this.resizeImage(image, width, height, options);

        const ctx = canvas.getContext("2d");
        return ctx.getImageData(0, 0, width, height).data;
    }

    async resizeImage(image, width, height, options) {
        const {sx, sy, sw, sh} = options;

        if (typeof window !== "undefined") {
            image.setAttribute("crossOrigin", "Anonymous");
        }

        let fromCanvas = this.getImageCanvas(image, sx, sy, sw, sh);
        let toCanvas;
        let pica;

        if (typeof window === "undefined") {
            // This is not a browser, use the canvas package
            toCanvas = createCanvas(width, height);
            toCanvas.width = width;
            toCanvas.height = height;

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

            toCanvas = browserCreateCanvas(width, height);
        }

        await pica.resize(fromCanvas, toCanvas);

        return toCanvas;
    }

    getImageCanvas(image, sx, sy, sw, sh) {

        if (Object.prototype.toString.call(image) === "[object HTMLCanvasElement]" && sx === undefined) {
            return image;
        }

        const canvas = (typeof window === "undefined")
            ? createCanvas(sw || image.width, sh || image.height)
            : document.createElement("canvas");

        canvas.width = image.naturalWidth || sw;
        canvas.height = image.naturalHeight || sh;

        const ctx = canvas.getContext("2d");

        if (sx !== undefined) {
            const sCtx = image.getContext("2d");
            const imageData = sCtx.getImageData(sx, sy, sw, sh);
            canvas[Symbol.toStringTag] = "HTMLCanvasElement";

            ctx.putImageData(imageData, 0, 0);
        } else {
            ctx.drawImage(image, 0, 0);
        }

        return canvas;
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

        for (let i = 0; i < imgData.length; i += 4) {
            arr[i>>2] = Math.round((imgData[i] * 299 / 1000 + imgData[i + 1] * 587 / 1000 + imgData[i + 2] * 114 / 1000))
        }

        return arr;
    }
}

export const grayScaleConverter = new GrayScaleConverter()
