import {loadImage} from "canvas";
import {crop_resistant_hash} from "../lib/crop_resistant_hash.js";


test("cropResistantHash_8_1000px", async () => {
    const SIZE = 8;
    const image = await loadImage("./test_fixtures/1000px.jpg");

    const hash = await crop_resistant_hash(image, SIZE, false);

    expect(hash.toHexStringReversed()).toBe("ffc7e3c5c5c11100")
});
