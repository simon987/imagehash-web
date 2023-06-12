import {ahash} from "./ahash.js";
import {dhash} from "./dhash.js";
import {phash} from "./phash.js";
import {ImageHash} from "./hash.js";


module.exports = [
    ahash,
    dhash,
    phash,
    ImageHash
]

window.ahash = ahash;
window.dhash = dhash;
window.phash = phash;
window.ImageHash = ImageHash;
