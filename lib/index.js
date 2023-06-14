import {ahash} from "./ahash.js";
import {dhash} from "./dhash.js";
import {phash} from "./phash.js";
import {whash} from "./whash.js";
import {ImageHash} from "./hash.js";


module.exports = [
    ahash,
    dhash,
    phash,
    whash,
    ImageHash
]

window.ahash = ahash;
window.dhash = dhash;
window.phash = phash;
window.whash = whash;
window.ImageHash = ImageHash;
