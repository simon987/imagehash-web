const mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456];
const shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16];

class BlurStack {
    r = 0;
    next = null;
}

export function boxBlur(pixels, width, height, radius) {
    const div = 2 * radius + 1;

    const widthMinus1 = width - 1;
    const heightMinus1 = height - 1;
    const radiusPlus1 = radius + 1;
    const sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    const stackStart = new BlurStack();
    let stack = stackStart;
    let stackEnd;

    for (let i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();

        if (i === radiusPlus1) {
            stackEnd = stack;
        }
    }

    stack.next = stackStart;
    let stackIn = null;
    let stackOut = null;
    const mulSum = mulTable[radius];
    const shgSum = shgTable[radius];
    let p;
    let rbs;
    let yw = 0;
    let yi = 0;

    for (let y = 0; y < height; y++) {
        let pr = pixels[yi],
            rOutSum = radiusPlus1 * pr,
            rSum = sumFactor * pr;
        stack = stackStart;

        for (let _i5 = 0; _i5 < radiusPlus1; _i5++) {
            stack.r = pr;
            stack = stack.next;
        }

        let rInSum = 0;

        for (let _i6 = 1; _i6 < radiusPlus1; _i6++) {
            rSum += (stack.r = pr = pixels[yi + ((widthMinus1 < _i6 ? widthMinus1 : _i6))]) * (rbs = radiusPlus1 - _i6);
            rInSum += pr;
            stack = stack.next;
        }

        stackIn = stackStart;
        stackOut = stackEnd;

        for (let x = 0; x < width; x++) {
            pixels[yi] = rSum * mulSum >> shgSum;
            rSum -= rOutSum;
            rOutSum -= stackIn.r;
            rInSum += stackIn.r = pixels[yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)];
            rSum += rInSum;
            stackIn = stackIn.next;
            rOutSum += pr = stackOut.r;
            rInSum -= pr;
            stackOut = stackOut.next;
            yi += 1;
        }

        yw += width;
    }

    for (let _x2 = 0; _x2 < width; _x2++) {
        yi = _x2;

        let _pr2 = pixels[yi],
            _rOutSum2 = radiusPlus1 * _pr2,
            _rSum2 = sumFactor * _pr2,

            stack = stackStart;

        for (let _i7 = 0; _i7 < radiusPlus1; _i7++) {
            stack.r = _pr2;
            stack = stack.next;
        }

        let _rInSum2 = 0;

        for (let _i8 = 1, yp = width; _i8 <= radius; _i8++) {
            yi = yp + _x2;
            _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
            _rInSum2 += _pr2;
            stack = stack.next;

            if (_i8 < heightMinus1) {
                yp += width;
            }
        }

        yi = _x2;
        stackIn = stackStart;
        stackOut = stackEnd;

        for (let _y2 = 0; _y2 < height; _y2++) {
            p = yi;
            pixels[p] = _rSum2 * mulSum >> shgSum;
            _rSum2 -= _rOutSum2;
            _rOutSum2 -= stackIn.r;
            p = _x2 + ((p = _y2 + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width;
            _rSum2 += _rInSum2 += stackIn.r = pixels[p];
            stackIn = stackIn.next;
            _rOutSum2 += _pr2 = stackOut.r;
            _rInSum2 -= _pr2;
            stackOut = stackOut.next;
            yi += width;
        }
    }
}
