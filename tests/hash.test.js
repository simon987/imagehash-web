import {ImageHash} from "../lib/hash.js";


test("distance1", async () => {
    const hash1 = new ImageHash([0, 1, 0]);
    const hash2 = new ImageHash([0, 1, 1]);

    expect(hash1.hammingDistance(hash2)).toBe(1)
});

test("distance2", async () => {
    const hash1 = new ImageHash([0, 1, 0]);
    const hash2 = new ImageHash([0, 1, 0]);

    expect(hash1.hammingDistance(hash2)).toBe(0)
});

test("distance3", async () => {
    const hash1 = new ImageHash([0, 0, 0]);
    const hash2 = new ImageHash([1, 1, 1]);

    expect(hash1.hammingDistance(hash2)).toBe(3)
});

test("distanceErr", async () => {
    const hash1 = new ImageHash([0, 0, 0]);
    const hash2 = new ImageHash([1, 1, 1, 1]);

    let threwErrr = false;
    try {
        hash1.hammingDistance(hash2)
    } catch (e) {
        threwErrr = true;
    }

    expect(threwErrr).toBe(true);
});

test("fromHexString", async () => {
    const hash1 = new ImageHash([0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    expect(ImageHash.fromHexString(hash1.toHexString()).toHexString()).toBe(hash1.toHexString());
});

test("fromHexStringReversed", async () => {
    const hash1 = new ImageHash([0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    expect(ImageHash.fromHexStringReversed(hash1.toHexStringReversed()).toHexStringReversed()).toBe(hash1.toHexStringReversed());
});

test("fromBase64", async () => {
    const hash1 = new ImageHash([0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    expect(ImageHash.fromBase64(hash1.toBase64()).toBase64()).toBe(hash1.toBase64());
});

test("fromBase64", async () => {
    const hash1 = new ImageHash([0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    expect(ImageHash.fromBase64(hash1.toBase64()).toBase64()).toBe(hash1.toBase64());
});
