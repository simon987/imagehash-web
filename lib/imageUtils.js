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
    async resizeImage(image, width, height, options = {}) {

        const {sx, sy, sw, sh} = options;

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
            pica = new Pica();
            image.setAttribute("crossOrigin", "Anonymous");

            toCanvas = document.createElement("canvas");
            toCanvas.width = width;
            toCanvas.height = height;
        }

        await pica.resize(fromCanvas, toCanvas)

        const toCtx = toCanvas.getContext("2d");
        return toCtx.getImageData(0, 0, width, height).data;
    }

    getImageCanvas(image, sx, sy, sw, sh) {

        if (Object.prototype.toString.call(image) === "[object HTMLCanvasElement]" && sx === undefined) {
            return image;
        }

        const canvas = (typeof window === "undefined")
            ? createCanvas(sw || image.width, sh || image.height)
            : document.createElement("canvas");

        const ctx = canvas.getContext("2d");

        if (sx !== undefined) {
            if (Object.prototype.toString.call(image) !== "[object HTMLCanvasElement]") {
                throw new Error("FIXME: getImageCanvas parameter should be a canvas if sx is specified");
            }

            const sCtx = image.getContext("2d");
            const imageData = sCtx.getImageData(sx, sy, sw, sh);

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

        let j = 0;
        for (let i = 0; i < imgData.length; i += 4) {
            arr[j++] = Math.round((imgData[i] * 299 / 1000 + imgData[i + 1] * 587 / 1000 + imgData[i + 2] * 114 / 1000))
        }

        return arr;
    }
}

export const grayScaleConverter = new GrayScaleConverter()
