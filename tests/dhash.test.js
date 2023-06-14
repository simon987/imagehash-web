import {loadImage} from "canvas";
import {dhash} from "../lib/dhash.js";


test("dhash_8_100px", async () => {
    const SIZE = 8;
    const image = await loadImage("./test_fixtures/100px.jpg");

    const hash = await dhash(image, SIZE);

    expect(hash.toHexStringReversed()).toBe("13335599894761e0")
    expect(hash.toHexString()).toBe("c8ccaa9991e28607");
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
