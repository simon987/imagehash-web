import {ahash} from "./ahash.js";
import {dhash} from "./dhash.js";
import {phash} from "./phash.js";
import {whash} from "./whash.js";
import {ImageHash} from "./hash.js";
import {cropResistantHash} from "./cropResistantHash.js";


export {
    ahash,
    dhash,
    phash,
    whash,
    cropResistantHash,
    ImageHash
}

if (typeof window !== 'undefined') {
    window.ahash = ahash;
    window.dhash = dhash;
    window.phash = phash;
    window.whash = whash;
    window.cropResistantHash = cropResistantHash;
    window.ImageHash = ImageHash;
}

