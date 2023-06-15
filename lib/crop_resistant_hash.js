import {canvasUtil, grayScaleConverter} from "./imageUtils.js";
import * as fs from "fs"

export async function crop_resistant_hash(image,
                                          hash_func,
                                          limit_segments,
                                          segment_threshold = 128,
                                          min_segment_size = 500,
                                          segmentationImageSize = 300) {


    const imageCanvas = canvasUtil.getImageCanvas(image);

    const segImage = grayScaleConverter.convert(
        canvasUtil.resizeImage(imageCanvas, segmentationImageSize, segmentationImageSize, {blur: true}));
}