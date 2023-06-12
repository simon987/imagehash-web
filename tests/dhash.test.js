import {loadImage} from "canvas";
import {dhash} from "../lib/dhash.js";


test("dhash_8_100px", async () => {
    const SIZE = 8;
    const image = await loadImage("./test_fixtures/100px.jpg");

    const hash = dhash(image, SIZE);

    expect(hash.toHexStringReversed()).toBe("130b55998d07f133")
    expect(hash.toHexString()).toBe("c8d0aa99b1e08fcc")
});

// test("dhash_16_100px", async () => {
//     const SIZE = 16;
//     const image = await loadImage("./test_fixtures/100px.jpg");
//
//     const hash = dhash(image, SIZE);
//
//     expect(hash.toHexStringReversed()).toBe("071c031e02470947207d336121e161c1856589d71427001b710379030c050490")
//     expect(hash.toHexString()).toBe("e038c07840e290e204becc8684878683a1a691eb28e400d88ec09ec030a02009")
// });
