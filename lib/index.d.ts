import {ImageHash, ImageMultiHash} from "./hash";
import {Image} from "canvas";

export async function phash(image: Image | HTMLImageElement, size: number = 8, highFrequencyFactor: number = 4): Promise<ImageHash>;

export async function ahash(image: Image | HTMLImageElement, size: number = 8): Promise<ImageHash>;

export async function dhash(image: Image | HTMLImageElement, size: number = 8): Promise<ImageHash>;

export async function whash(image: Image | HTMLImageElement, size: number = 8, removeMaxHaarLL: boolean = false): Promise<ImageHash>;

export async function cropResistantHash(image: Image | HTMLImageElement,
                                        hashFunc: Function = undefined,
                                        limitSegments: number = undefined,
                                        segmentThreshold: number = 128,
                                        minSegmentSize: number = 500,
                                        segmentationImageSize: number = 300): Promise<ImageMultiHash>;

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

export class ImageMultiHash {
    static fromJSON(s: string[])

    toJSON(): string[]

    hashDiff(hash: ImageMultiHash, hammingCutoff: number)
}
