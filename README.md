# imagehash-web

![npm](https://img.shields.io/npm/v/imagehash-web)

Javascript implementation of various image hashing algorithms.

```bash
npm install imagehash-web
```

The methods used to compute the image hashes
the same as the `imagehash` python library. Due to
some slight differences in the downsampling algorithm of
your browser vs Pillow, the final image hashes are not
always exactly the same as the reference library.

Implemented algorithms:

* `ahash` Average hash
* `dhash` Difference hash
* `phash` Perceptual hash

### Example usage (browser)

```html

<script src="https://unpkg.com/imagehash-web@1.0.5/dist/imagehash-web.min.js"></script>
<script>
    const im = document.getElementById("my-image");

    const hash = phash(im, 8);
    const precomputed = ImageHash.fromHexString("5dbfb5310a81a361")

    console.log(hash.hammingDistance(precomputed));
</script>
```

### Example usage (NodeJS)

```javascript
import {loadImage} from "canvas";
import {phash, ImageHash} from "imagehash-web";

const im = await loadImage("./my_image.jpg");

const hash = phash(im, 8);
const precomputed = ImageHash.fromHexString("5dbfb5310a81a361")

console.log(hash.hammingDistance(precomputed));
```

