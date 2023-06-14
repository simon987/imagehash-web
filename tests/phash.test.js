import {loadImage} from "canvas";
import {phash} from "../lib/phash.js";


test("phash_8_100px", async () => {
    const SIZE = 8;
    const image = await loadImage("./test_fixtures/100px.jpg");

    const hash = await phash(image, SIZE);

    expect(hash.toHexStringReversed()).toBe("bafdad8c5081c586")
    expect(hash.toHexString()).toBe("5dbfb5310a81a361")
});

// test("dhash_16_100px", async () => {
//     const SIZE = 16;
//     const image = await loadImage("./test_fixtures/100px.jpg");
//
//     const hash = phash(image, SIZE);
//
//     expect(hash.toHexStringReversed()).toBe("faeafdc0ad158c17504881ffc5bfc68e9a6c5420a3b593cd824f2d572632b258")
//     expect(hash.toHexString()).toBe("5f57bf03b5a831e80a1281ffa3fd637159362a04c5adc9b341f2b4ea644c4d1a")
// });
