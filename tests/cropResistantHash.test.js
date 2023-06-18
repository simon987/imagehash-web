import {loadImage} from "canvas";
import {cropResistantHash} from "../lib/cropResistantHash.js";
import {phash} from "../lib/phash.js";

test("cropResistantHash_8_1000px", async () => {
    const image = await loadImage("./test_fixtures/1000px.jpg");

    const hashes = await cropResistantHash(image, phash);

    expect(hashes.segmentHashes.length).toBe(6);
    expect(hashes.segmentHashes[0].toHexStringReversed()).toBe("90ce70d7548d6c8b")
    // expect(hashes.segmentHashes[1].toHexStringReversed()).toBe("d0e4673fbc56901a")
    expect(hashes.segmentHashes[2].toHexStringReversed()).toBe("c1492f2730b33b99")
    expect(hashes.segmentHashes[3].toHexStringReversed()).toBe("aa4da23549b255ab")
    expect(hashes.segmentHashes[4].toHexStringReversed()).toBe("e3478e5ca049966d")
});

test("cropResistantHash_8_100px", async () => {
    const image = await loadImage("./test_fixtures/1000px.jpg");

    const hashes = await cropResistantHash(image, phash, 3, 128, 500, 300);
    expect(hashes.segmentHashes.length).toBe(3);
});

test("cropResistantHash_8_2000px", async () => {
    const image = await loadImage("./test_fixtures/2000px.jpg");

    const hashes = await cropResistantHash(image, phash);

    expect(hashes.segmentHashes.length).toBe(5);
    expect(hashes.segmentHashes[0].toHexStringReversed()).toBe("f33b638543e52344")
    expect(hashes.segmentHashes[1].toHexStringReversed()).toBe("f9fc403a1e3624c5")
    expect(hashes.segmentHashes[2].toHexStringReversed()).toBe("d0c3fd1aa49d8788")
    expect(hashes.segmentHashes[3].toHexStringReversed()).toBe("eb90c55792e1139c")
    expect(hashes.segmentHashes[4].toHexStringReversed()).toBe("d1f93e86c781311c")
});
