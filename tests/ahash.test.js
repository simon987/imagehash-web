import {loadImage} from "canvas";
import {ahash} from "../lib/ahash.js";


test("dhash_8_100px", async () => {
    const SIZE = 8;
    const image = await loadImage("./test_fixtures/100px.jpg");

    const hash = await ahash(image, SIZE);

    expect(hash.toHexStringReversed()).toBe("ffc3e14404810100")
    expect(hash.toHexString()).toBe("ffc3872220818000")
    expect(hash.toBase64()).toBe("/8OHIiCBgAA=")
});

test("ahash_16_100px", async () => {
    const SIZE = 16;
    const image = await loadImage("./test_fixtures/100px.jpg");

    const hash = await ahash(image, SIZE);

    expect(hash.toHexStringReversed()).toBe("fffff1cfe007c003c20198819001107100710011000180038003000100000000")
    expect(hash.toHexString()).toBe("ffff8ff307e003c0438019810980088e008e0088008001c001c0008000000000")
});
