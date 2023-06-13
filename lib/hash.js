export class ImageHash {

    binArray;

    /**
     * @param binArray {Uint8ClampedArray}
     */
    constructor(binArray) {
        this.binArray = binArray;
    }

    static fromBase64(s) {
        const buf = atob(s);
        const arr = new Uint8ClampedArray(buf.length * 8);

        for (let i = 0; i < buf.length; i++) {
            const c = buf.charCodeAt(i);
            arr[i * 8] = (c & 0x01);
            arr[i * 8 + 1] = (c & 0x02) >> 1;
            arr[i * 8 + 2] = (c & 0x04) >> 2;
            arr[i * 8 + 3] = (c & 0x08) >> 3;
            arr[i * 8 + 4] = (c & 0x10) >> 4;
            arr[i * 8 + 5] = (c & 0x20) >> 5;
            arr[i * 8 + 6] = (c & 0x40) >> 6;
            arr[i * 8 + 7] = (c & 0x80) >> 7;
        }

        return new ImageHash(arr);
    }

    static fromHexStringReversed(s) {
        if (s.length % 2 !== 0) {
            throw Error("hex string length must be a multiple of 2");
        }
        const arr = new Uint8ClampedArray(s.length * 4);

        for (let i = 0; i < s.length; i += 2) {
            const c = Number.parseInt(s.slice(i, i + 2), 16);

            if (Number.isNaN(c)) {
                throw Error("Invalid hex string");
            }

            arr[i * 4] = (c & 0x80) >> 7;
            arr[i * 4 + 1] = (c & 0x40) >> 6;
            arr[i * 4 + 2] = (c & 0x20) >> 5;
            arr[i * 4 + 3] = (c & 0x10) >> 4;
            arr[i * 4 + 4] = (c & 0x08) >> 3;
            arr[i * 4 + 5] = (c & 0x04) >> 2;
            arr[i * 4 + 6] = (c & 0x02) >> 1;
            arr[i * 4 + 7] = (c & 0x01);
        }

        return new ImageHash(arr);
    }

    static fromHexString(s) {
        if (s.length % 2 !== 0) {
            throw Error("hex string length must be a multiple of 2");
        }
        const arr = new Uint8ClampedArray(s.length * 4);

        for (let i = 0; i < s.length; i += 2) {
            const c = Number.parseInt(s.slice(i, i + 2), 16);

            if (Number.isNaN(c)) {
                throw Error("Invalid hex string");
            }

            arr[i * 4] = (c & 0x01);
            arr[i * 4 + 1] = (c & 0x02) >> 1;
            arr[i * 4 + 2] = (c & 0x04) >> 2;
            arr[i * 4 + 3] = (c & 0x08) >> 3;
            arr[i * 4 + 4] = (c & 0x10) >> 4;
            arr[i * 4 + 5] = (c & 0x20) >> 5;
            arr[i * 4 + 6] = (c & 0x40) >> 6;
            arr[i * 4 + 7] = (c & 0x80) >> 7;
        }

        return new ImageHash(arr);
    }

    toHexStringReversed() {
        let str = "";

        for (let i = 0; i < this.binArray.length; i += 8) {
            const c =
                this.binArray[i] << 7 |
                this.binArray[i + 1] << 6 |
                this.binArray[i + 2] << 5 |
                this.binArray[i + 3] << 4 |
                this.binArray[i + 4] << 3 |
                this.binArray[i + 5] << 2 |
                this.binArray[i + 6] << 1 |
                this.binArray[i + 7];

            str += c.toString(16).padStart(2, "0");
        }

        return str;
    }

    toHexString() {
        let str = "";

        for (let i = 0; i < this.binArray.length; i += 8) {
            const c =
                this.binArray[i] |
                this.binArray[i + 1] << 1 |
                this.binArray[i + 2] << 2 |
                this.binArray[i + 3] << 3 |
                this.binArray[i + 4] << 4 |
                this.binArray[i + 5] << 5 |
                this.binArray[i + 6] << 6 |
                this.binArray[i + 7] << 7;

            str += c.toString(16).padStart(2, "0");
        }

        return str;
    }

    toBase64() {
        let buf = [];

        for (let i = 0; i < this.binArray.length; i += 8) {
            buf.push(this.binArray[i] |
                this.binArray[i + 1] << 1 |
                this.binArray[i + 2] << 2 |
                this.binArray[i + 3] << 3 |
                this.binArray[i + 4] << 4 |
                this.binArray[i + 5] << 5 |
                this.binArray[i + 6] << 6 |
                this.binArray[i + 7] << 7)
        }

        return btoa(String.fromCharCode(...new Uint8Array(buf)));
    }

    /**
     * @param hash {ImageHash}
     * @returns number
     */
    hammingDistance(hash) {
        if (hash.binArray.length !== this.binArray.length) {
            throw new Error("Cannot compare two ImageHash instances of different sizes");
        }

        let distance = 0;
        for (let i = 0; i < this.binArray.length; i++) {
            if (this.binArray[i] !== hash.binArray[i]) {
                distance += 1;
            }
        }

        return distance;
    }
}