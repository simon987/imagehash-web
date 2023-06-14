import {loadImage} from "canvas";
import {whash} from "../lib/whash.js";


test("whash_8_100px", async () => {
    const SIZE = 8;
    const image = await loadImage("./test_fixtures/100px.jpg");

    const hash = whash(image, SIZE, false);

    expect(hash.toHexStringReversed()).toBe("ffcfe3c5c5c10100")
});

test("whash_rm_8_100px", async () => {
    const SIZE = 8;
    const image = await loadImage("./test_fixtures/100px.jpg");

    const hash = whash(image, SIZE, true);

    expect(hash.toHexStringReversed()).toBe("ffcfe3c5c5c10100")
});

test("whash_8_1000px", async () => {
    const image = await loadImage("./test_fixtures/1000px.jpg");

    const hash = whash(image, 8, false);

    expect(hash.toHexStringReversed()).toBe("0c3f7fff02001c0f")
});
