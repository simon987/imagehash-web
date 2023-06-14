import {ImageHash} from "./hash";
import {Image} from "canvas";

export function phash(image: Image | HTMLImageElement, size: number = 8, highFrequencyFactor: number = 4): ImageHash;

export function ahash(image: Image | HTMLImageElement, size: number = 8): ImageHash;

export function dhash(image: Image | HTMLImageElement, size: number = 8): ImageHash;

export function whash(image: Image | HTMLImageElement, size: number = 8, removeMaxHaarLL: boolean = false): ImageHash;

export class ImageHash {
    constructor(arr: Uint8ClampedArray);

    toHexStringReversed();

    toHexString();

    toBase64();

    hammingDistance(hash: ImageHash): number

    static fromHexString(s: string): ImageHash

    static fromHexStringReversed(s: string): ImageHash

    static fromBase64(s: string): ImageHash
}