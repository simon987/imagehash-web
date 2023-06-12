# imagehash-web

Javascript implementation of various image hashing algorithms.

The methods used to compute the image hashes
the same as the `imagehash` python library, however, due to
some slight differences in the way your browser vs Pillow images are resized,
the final image hashes are not always exactly the same.

Implemented algorithms:

* `ahash` Average hash
* `dhash` Difference hash
* `phash` Perceptual hash

### Example usage

```javascript
import {phash, ImageHash} from "imagehash-web";

const im = document.getElementById("#my-image");

const hash = phash(im, 8);
const precomputed = ImageHash.fromHexString("5dbfb5310a81a361")

console.log(hash.hammingDistance(precomputed));
```

### Example usage (browser)
```html

<script src="https://unpkg.com/imagehash-web@1.0.3/dist/imagehash-web.min.js"></script>
<script>
    const im = document.getElementById("#my-image");

    const hash = phash(im, 8);
    const precomputed = ImageHash.fromHexString("5dbfb5310a81a361")

    console.log(hash.hammingDistance(precomputed));
</script>
```
