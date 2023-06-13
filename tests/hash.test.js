import {ImageHash} from "../lib/hash.js";


test("distance1", () => {
    const hash1 = new ImageHash([0, 1, 0]);
    const hash2 = new ImageHash([0, 1, 1]);

    expect(hash1.hammingDistance(hash2)).toBe(1)
});

test("distance2", () => {
    const hash1 = new ImageHash([0, 1, 0]);
    const hash2 = new ImageHash([0, 1, 0]);

    expect(hash1.hammingDistance(hash2)).toBe(0)
});

test("distance3", () => {
    const hash1 = new ImageHash([0, 0, 0]);
    const hash2 = new ImageHash([1, 1, 1]);

    expect(hash1.hammingDistance(hash2)).toBe(3)
});

test("distanceErr", () => {
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

test("fromHexString", () => {
    const hash1 = new ImageHash([0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    expect(ImageHash.fromHexString(hash1.toHexString()).toHexString()).toBe(hash1.toHexString());
});

test("fromHexStringReversed", () => {
    const hash1 = new ImageHash([0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    expect(ImageHash.fromHexStringReversed(hash1.toHexStringReversed()).toHexStringReversed()).toBe(hash1.toHexStringReversed());
});

test("fromBase64", () => {
    const hash1 = new ImageHash([0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    expect(ImageHash.fromBase64(hash1.toBase64()).toBase64()).toBe(hash1.toBase64());
});

test("fromBase64", () => {
    const hash1 = new ImageHash([0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    expect(ImageHash.fromBase64(hash1.toBase64()).toBase64()).toBe(hash1.toBase64());
});

test("fromHexStringError1", () => {
    expect(() => {
        ImageHash.fromHexString("abc");
    }).toThrow();
});

test("fromHexStringError2", () => {
    expect(() => {
        ImageHash.fromHexString("fjkl");
    }).toThrow();
});

test("fromHexStringReversedError1", () => {
    expect(() => {
        ImageHash.fromHexStringReversed("abc");
    }).toThrow();
});

test("fromHexStringReversedError2", () => {
    expect(() => {
        ImageHash.fromHexStringReversed("fjkl");
    }).toThrow();
});

test("fromBase64Error", () => {
    expect(() => {
        ImageHash.fromBase64(".é.é()");
    }).toThrow();
});
