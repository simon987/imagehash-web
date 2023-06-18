import {ImageHash, ImageMultiHash} from "../lib/hash.js";

test("multi hash hashDiff", () => {
    const hash1 = new ImageHash([0, 1, 0, 0, 0, 0, 0, 0]);
    const hash2 = new ImageHash([0, 1, 1, 0, 0, 0, 0, 0]);
    const hash3 = new ImageHash([0, 1, 1, 1, 0, 0, 0, 0]);

    const hash4 = new ImageHash([0, 1, 0, 0, 0, 0, 0, 0]);
    const hash5 = new ImageHash([0, 1, 1, 0, 0, 0, 0, 0]);
    const hash6 = new ImageHash([1, 1, 1, 1, 1, 1, 1, 1]);

    const mHash1 = new ImageMultiHash([hash1, hash2, hash3])
    const mHash2 = new ImageMultiHash([hash4, hash5, hash6])

    expect(mHash1.hashDiff(mHash2, 1)).toStrictEqual({
        num: 2,
        sum: 0
    });
});

test("multi hash toJSON", () => {
    const hash1 = new ImageHash([0, 1, 0, 0, 0, 0, 0, 0]);
    const hash2 = new ImageHash([0, 1, 1, 0, 0, 0, 0, 0]);
    const hash3 = new ImageHash([0, 1, 1, 1, 0, 0, 0, 0]);

    const mHash1 = new ImageMultiHash([hash1, hash2, hash3])

    expect(mHash1.toJSON()).toStrictEqual(["02", "06", "0e"])
});

test("multi hash fromJSON", () => {
    expect(ImageMultiHash.fromJSON(["02", "06", "0e"]).toJSON()).toStrictEqual(["02", "06", "0e"])
});
