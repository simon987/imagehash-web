import {loadImage} from "canvas";
import {cropResistantHash} from "../lib/cropResistantHash.js";
import {phash} from "../lib/phash.js";

test("cropResistantHash_8_1000px", async () => {
    const image = await loadImage("./test_fixtures/1000px.jpg");

    const hashes = await cropResistantHash(image);

    expect(hashes.segmentHashes.length).toBe(6);
    expect(hashes.segmentHashes[0].toHexStringReversed()).toBe("3cf8f1f0fc7cd89e")
    expect(hashes.segmentHashes[1].toHexStringReversed()).toBe("86c3c082919cece4")
    expect(hashes.segmentHashes[2].toHexStringReversed()).toBe("c7e2c088d4d46eac")
    expect(hashes.segmentHashes[3].toHexStringReversed()).toBe("1737373f7b7ffddd")
});

test("cropResistantHash_8_100px", async () => {
    const image = await loadImage("./test_fixtures/1000px.jpg");

    const hashes = await cropResistantHash(image, phash, 3, 128, 500, 300);
    expect(hashes.segmentHashes.length).toBe(3);
});
