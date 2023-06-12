import {ImageHash} from "./hash";

export function phash(image, size: number, highFrequencyFactor: number): ImageHash;

export function ahash(image, size: number): ImageHash;

export function dhash(image, size: number): ImageHash;

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