import {createWriteStream as $4eXMr$createWriteStream} from "fs";

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire6ada"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire6ada"] = parcelRequire;
}
parcelRequire.register("2DSRQ", function(module, exports) {
var $1ec9c8ce20f4c416$var$bundleFn = arguments[3];
var $1ec9c8ce20f4c416$var$sources = arguments[4];
var $1ec9c8ce20f4c416$var$cache = arguments[5];
var $1ec9c8ce20f4c416$var$stringify = JSON.stringify;
module.exports = function(fn, options) {
    var wkey;
    var cacheKeys = Object.keys($1ec9c8ce20f4c416$var$cache);
    for(var i = 0, l = cacheKeys.length; i < l; i++){
        var key = cacheKeys[i];
        var exp = $1ec9c8ce20f4c416$var$cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }
    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for(var i = 0, l = cacheKeys.length; i < l; i++){
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        $1ec9c8ce20f4c416$var$sources[wkey] = [
            "function(require,module,exports){" + fn + "(self); }",
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
    var scache = {};
    scache[wkey] = wkey;
    $1ec9c8ce20f4c416$var$sources[skey] = [
        "function(require,module,exports){var f = require(" + $1ec9c8ce20f4c416$var$stringify(wkey) + ");" + "(f.default ? f.default : f)(self);" + "}",
        scache
    ];
    var workerSources = {};
    resolveSources(skey);
    function resolveSources(key) {
        workerSources[key] = true;
        for(var depPath in $1ec9c8ce20f4c416$var$sources[key][1]){
            var depKey = $1ec9c8ce20f4c416$var$sources[key][1][depPath];
            if (!workerSources[depKey]) resolveSources(depKey);
        }
    }
    var src = "(" + $1ec9c8ce20f4c416$var$bundleFn + ")({" + Object.keys(workerSources).map(function(key) {
        return $1ec9c8ce20f4c416$var$stringify(key) + ":[" + $1ec9c8ce20f4c416$var$sources[key][0] + "," + $1ec9c8ce20f4c416$var$stringify($1ec9c8ce20f4c416$var$sources[key][1]) + "]";
    }).join(",") + "},{},[" + $1ec9c8ce20f4c416$var$stringify(skey) + "])";
    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    var blob = new Blob([
        src
    ], {
        type: "text/javascript"
    });
    if (options && options.bare) return blob;
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};

});

parcelRequire.register("19T8x", function(module, exports) {
// Collection of math functions
//
// 1. Combine components together
// 2. Has async init to load wasm modules
//
"use strict";

var $49iNq = parcelRequire("49iNq");

var $1a9jM = parcelRequire("1a9jM");

var $2KSXN = parcelRequire("2KSXN");
function $0d8166b3945003c2$var$MathLib(requested_features) {
    const __requested_features = requested_features || [];
    let features = {
        js: __requested_features.indexOf("js") >= 0,
        wasm: __requested_features.indexOf("wasm") >= 0
    };
    $49iNq.call(this, features);
    this.features = {
        js: features.js,
        wasm: features.wasm && this.has_wasm()
    };
    this.use($1a9jM);
    this.use($2KSXN);
}
$0d8166b3945003c2$var$MathLib.prototype = Object.create($49iNq.prototype);
$0d8166b3945003c2$var$MathLib.prototype.constructor = $0d8166b3945003c2$var$MathLib;
$0d8166b3945003c2$var$MathLib.prototype.resizeAndUnsharp = function resizeAndUnsharp(options, cache) {
    let result = this.resize(options, cache);
    if (options.unsharpAmount) this.unsharp_mask(result, options.toWidth, options.toHeight, options.unsharpAmount, options.unsharpRadius, options.unsharpThreshold);
    return result;
};
module.exports = $0d8166b3945003c2$var$MathLib;

});
parcelRequire.register("49iNq", function(module, exports) {
"use strict";

var $fQtfM = parcelRequire("fQtfM");

var $kijxc = parcelRequire("kijxc");

var $3si4w = parcelRequire("3si4w");
var $3056953b666e0c8f$var$DEFAULT_OPTIONS = {
    js: true,
    wasm: true
};
function $3056953b666e0c8f$var$MultiMath(options) {
    if (!(this instanceof $3056953b666e0c8f$var$MultiMath)) return new $3056953b666e0c8f$var$MultiMath(options);
    var opts = $fQtfM({}, $3056953b666e0c8f$var$DEFAULT_OPTIONS, options || {});
    this.options = opts;
    this.__cache = {};
    this.__init_promise = null;
    this.__modules = opts.modules || {};
    this.__memory = null;
    this.__wasm = {};
    this.__isLE = new Uint32Array(new Uint8Array([
        1,
        0,
        0,
        0
    ]).buffer)[0] === 1;
    if (!this.options.js && !this.options.wasm) throw new Error('mathlib: at least "js" or "wasm" should be enabled');
}
$3056953b666e0c8f$var$MultiMath.prototype.has_wasm = $3si4w;
$3056953b666e0c8f$var$MultiMath.prototype.use = function(module1) {
    this.__modules[module1.name] = module1;
    // Pin the best possible implementation
    if (this.options.wasm && this.has_wasm() && module1.wasm_fn) this[module1.name] = module1.wasm_fn;
    else this[module1.name] = module1.fn;
    return this;
};
$3056953b666e0c8f$var$MultiMath.prototype.init = function() {
    if (this.__init_promise) return this.__init_promise;
    if (!this.options.js && this.options.wasm && !this.has_wasm()) return Promise.reject(new Error('mathlib: only "wasm" was enabled, but it\'s not supported'));
    var self = this;
    this.__init_promise = Promise.all(Object.keys(self.__modules).map(function(name) {
        var module1 = self.__modules[name];
        if (!self.options.wasm || !self.has_wasm() || !module1.wasm_fn) return null;
        // If already compiled - exit
        if (self.__wasm[name]) return null;
        // Compile wasm source
        return WebAssembly.compile(self.__base64decode(module1.wasm_src)).then(function(m) {
            self.__wasm[name] = m;
        });
    })).then(function() {
        return self;
    });
    return this.__init_promise;
};
////////////////////////////////////////////////////////////////////////////////
// Methods below are for internal use from plugins
// Simple decode base64 to typed array. Useful to load embedded webassembly
// code. You probably don't need to call this method directly.
//
$3056953b666e0c8f$var$MultiMath.prototype.__base64decode = $kijxc;
// Increase current memory to include specified number of bytes. Do nothing if
// size is already ok. You probably don't need to call this method directly,
// because it will be invoked from `.__instance()`.
//
$3056953b666e0c8f$var$MultiMath.prototype.__reallocate = function mem_grow_to(bytes) {
    if (!this.__memory) {
        this.__memory = new WebAssembly.Memory({
            initial: Math.ceil(bytes / 65536)
        });
        return this.__memory;
    }
    var mem_size = this.__memory.buffer.byteLength;
    if (mem_size < bytes) this.__memory.grow(Math.ceil((bytes - mem_size) / 65536));
    return this.__memory;
};
// Returns instantinated webassembly item by name, with specified memory size
// and environment.
// - use cache if available
// - do sync module init, if async init was not called earlier
// - allocate memory if not enougth
// - can export functions to webassembly via "env_extra",
//   for example, { exp: Math.exp }
//
$3056953b666e0c8f$var$MultiMath.prototype.__instance = function instance(name, memsize, env_extra) {
    if (memsize) this.__reallocate(memsize);
    // If .init() was not called, do sync compile
    if (!this.__wasm[name]) {
        var module1 = this.__modules[name];
        this.__wasm[name] = new WebAssembly.Module(this.__base64decode(module1.wasm_src));
    }
    if (!this.__cache[name]) {
        var env_base = {
            memoryBase: 0,
            memory: this.__memory,
            tableBase: 0,
            table: new WebAssembly.Table({
                initial: 0,
                element: "anyfunc"
            })
        };
        this.__cache[name] = new WebAssembly.Instance(this.__wasm[name], {
            env: $fQtfM(env_base, env_extra || {})
        });
    }
    return this.__cache[name];
};
// Helper to calculate memory aligh for pointers. Webassembly does not require
// this, but you may wish to experiment. Default base = 8;
//
$3056953b666e0c8f$var$MultiMath.prototype.__align = function align(number, base) {
    base = base || 8;
    var reminder = number % base;
    return number + (reminder ? base - reminder : 0);
};
module.exports = $3056953b666e0c8f$var$MultiMath;

});
parcelRequire.register("fQtfM", function(module, exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/ "use strict";
/* eslint-disable no-unused-vars */ var $b8926777c1f9d02b$var$getOwnPropertySymbols = Object.getOwnPropertySymbols;
var $b8926777c1f9d02b$var$hasOwnProperty = Object.prototype.hasOwnProperty;
var $b8926777c1f9d02b$var$propIsEnumerable = Object.prototype.propertyIsEnumerable;
function $b8926777c1f9d02b$var$toObject(val) {
    if (val === null || val === undefined) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(val);
}
function $b8926777c1f9d02b$var$shouldUseNative() {
    try {
        if (!Object.assign) return false;
        // Detect buggy property enumeration order in older V8 versions.
        // https://bugs.chromium.org/p/v8/issues/detail?id=4118
        var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") return false;
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test2 = {};
        for(var i = 0; i < 10; i++)test2["_" + String.fromCharCode(i)] = i;
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
        });
        if (order2.join("") !== "0123456789") return false;
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") return false;
        return true;
    } catch (err) {
        // We don't expect any of the above to throw, but better to be safe.
        return false;
    }
}
module.exports = $b8926777c1f9d02b$var$shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = $b8926777c1f9d02b$var$toObject(target);
    var symbols;
    for(var s = 1; s < arguments.length; s++){
        from = Object(arguments[s]);
        for(var key in from)if ($b8926777c1f9d02b$var$hasOwnProperty.call(from, key)) to[key] = from[key];
        if ($b8926777c1f9d02b$var$getOwnPropertySymbols) {
            symbols = $b8926777c1f9d02b$var$getOwnPropertySymbols(from);
            for(var i = 0; i < symbols.length; i++)if ($b8926777c1f9d02b$var$propIsEnumerable.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]];
        }
    }
    return to;
};

});

parcelRequire.register("kijxc", function(module, exports) {
// base64 decode str -> Uint8Array, to load WA modules
//
"use strict";
var $ec64a437626d5d15$var$BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
module.exports = function base64decode(str) {
    var input = str.replace(/[\r\n=]/g, ""), max = input.length;
    var out = new Uint8Array(max * 3 >> 2);
    // Collect by 6*4 bits (3 bytes)
    var bits = 0;
    var ptr = 0;
    for(var idx = 0; idx < max; idx++){
        if (idx % 4 === 0 && idx) {
            out[ptr++] = bits >> 16 & 0xFF;
            out[ptr++] = bits >> 8 & 0xFF;
            out[ptr++] = bits & 0xFF;
        }
        bits = bits << 6 | $ec64a437626d5d15$var$BASE64_MAP.indexOf(input.charAt(idx));
    }
    // Dump tail
    var tailbits = max % 4 * 6;
    if (tailbits === 0) {
        out[ptr++] = bits >> 16 & 0xFF;
        out[ptr++] = bits >> 8 & 0xFF;
        out[ptr++] = bits & 0xFF;
    } else if (tailbits === 18) {
        out[ptr++] = bits >> 10 & 0xFF;
        out[ptr++] = bits >> 2 & 0xFF;
    } else if (tailbits === 12) out[ptr++] = bits >> 4 & 0xFF;
    return out;
};

});

parcelRequire.register("3si4w", function(module, exports) {
// Detect WebAssembly support.
// - Check global WebAssembly object
// - Try to load simple module (can be disabled via CSP)
//
"use strict";
var $284201524565041a$var$wa;
module.exports = function hasWebAssembly() {
    // use cache if called before;
    if (typeof $284201524565041a$var$wa !== "undefined") return $284201524565041a$var$wa;
    $284201524565041a$var$wa = false;
    if (typeof WebAssembly === "undefined") return $284201524565041a$var$wa;
    // If WebAssenbly is disabled, code can throw on compile
    try {
        // https://github.com/brion/min-wasm-fail/blob/master/min-wasm-fail.in.js
        // Additional check that WA internals are correct
        /* eslint-disable comma-spacing, max-len */ var bin = new Uint8Array([
            0,
            97,
            115,
            109,
            1,
            0,
            0,
            0,
            1,
            6,
            1,
            96,
            1,
            127,
            1,
            127,
            3,
            2,
            1,
            0,
            5,
            3,
            1,
            0,
            1,
            7,
            8,
            1,
            4,
            116,
            101,
            115,
            116,
            0,
            0,
            10,
            16,
            1,
            14,
            0,
            32,
            0,
            65,
            1,
            54,
            2,
            0,
            32,
            0,
            40,
            2,
            0,
            11
        ]);
        var module1 = new WebAssembly.Module(bin);
        var instance = new WebAssembly.Instance(module1, {});
        // test storing to and loading from a non-zero location via a parameter.
        // Safari on iOS 11.2.5 returns 0 unexpectedly at non-zero locations
        if (instance.exports.test(4) !== 0) $284201524565041a$var$wa = true;
        return $284201524565041a$var$wa;
    } catch (__) {}
    return $284201524565041a$var$wa;
};

});


parcelRequire.register("1a9jM", function(module, exports) {
"use strict";



module.exports = {
    name: "unsharp_mask",
    fn: (parcelRequire("l1Xxr")),
    wasm_fn: (parcelRequire("5UGOk")),
    wasm_src: (parcelRequire("3Rekc"))
};

});
parcelRequire.register("l1Xxr", function(module, exports) {
// Unsharp mask filter
//
// http://stackoverflow.com/a/23322820/1031804
// USM(O) = O + (2 * (Amount / 100) * (O - GB))
// GB - gaussian blur.
//
// Image is converted from RGB to HSV, unsharp mask is applied to the
// brightness channel and then image is converted back to RGB.
//
"use strict";

var $is9XY = parcelRequire("is9XY");
function $f4f7e00ead93451e$var$hsv_v16(img, width, height) {
    var size = width * height;
    var out = new Uint16Array(size);
    var r, g, b, max;
    for(var i = 0; i < size; i++){
        r = img[4 * i];
        g = img[4 * i + 1];
        b = img[4 * i + 2];
        max = r >= g && r >= b ? r : g >= b && g >= r ? g : b;
        out[i] = max << 8;
    }
    return out;
}
module.exports = function unsharp(img, width, height, amount, radius, threshold) {
    var v1, v2, vmul;
    var diff, iTimes4;
    if (amount === 0 || radius < 0.5) return;
    if (radius > 2.0) radius = 2.0;
    var brightness = $f4f7e00ead93451e$var$hsv_v16(img, width, height);
    var blured = new Uint16Array(brightness); // copy, because blur modify src
    $is9XY(blured, width, height, radius);
    var amountFp = amount / 100 * 0x1000 + 0.5 | 0;
    var thresholdFp = threshold << 8;
    var size = width * height;
    /* eslint-disable indent */ for(var i = 0; i < size; i++){
        v1 = brightness[i];
        diff = v1 - blured[i];
        if (Math.abs(diff) >= thresholdFp) {
            // add unsharp mask to the brightness channel
            v2 = v1 + (amountFp * diff + 0x800 >> 12);
            // Both v1 and v2 are within [0.0 .. 255.0] (0000-FF00) range, never going into
            // [255.003 .. 255.996] (FF01-FFFF). This allows to round this value as (x+.5)|0
            // later without overflowing.
            v2 = v2 > 0xff00 ? 0xff00 : v2;
            v2 = v2 < 0x0000 ? 0x0000 : v2;
            // Avoid division by 0. V=0 means rgb(0,0,0), unsharp with unsharpAmount>0 cannot
            // change this value (because diff between colors gets inflated), so no need to verify correctness.
            v1 = v1 !== 0 ? v1 : 1;
            // Multiplying V in HSV model by a constant is equivalent to multiplying each component
            // in RGB by the same constant (same for HSL), see also:
            // https://beesbuzz.biz/code/16-hsv-color-transforms
            vmul = (v2 << 12) / v1 | 0;
            // Result will be in [0..255] range because:
            //  - all numbers are positive
            //  - r,g,b <= (v1/256)
            //  - r,g,b,(v1/256),(v2/256) <= 255
            // So highest this number can get is X*255/X+0.5=255.5 which is < 256 and rounds down.
            iTimes4 = i * 4;
            img[iTimes4] = img[iTimes4] * vmul + 0x800 >> 12; // R
            img[iTimes4 + 1] = img[iTimes4 + 1] * vmul + 0x800 >> 12; // G
            img[iTimes4 + 2] = img[iTimes4 + 2] * vmul + 0x800 >> 12; // B
        }
    }
};

});
parcelRequire.register("is9XY", function(module, exports) {
// Calculate Gaussian blur of an image using IIR filter
// The method is taken from Intel's white paper and code example attached to it:
// https://software.intel.com/en-us/articles/iir-gaussian-blur-filter
// -implementation-using-intel-advanced-vector-extensions
var $d6f292a51fd4f59d$var$a0, $d6f292a51fd4f59d$var$a1, $d6f292a51fd4f59d$var$a2, $d6f292a51fd4f59d$var$a3, $d6f292a51fd4f59d$var$b1, $d6f292a51fd4f59d$var$b2, $d6f292a51fd4f59d$var$left_corner, $d6f292a51fd4f59d$var$right_corner;
function $d6f292a51fd4f59d$var$gaussCoef(sigma) {
    if (sigma < 0.5) sigma = 0.5;
    var a = Math.exp(0.527076) / sigma, g1 = Math.exp(-a), g2 = Math.exp(-2 * a), k = (1 - g1) * (1 - g1) / (1 + 2 * a * g1 - g2);
    $d6f292a51fd4f59d$var$a0 = k;
    $d6f292a51fd4f59d$var$a1 = k * (a - 1) * g1;
    $d6f292a51fd4f59d$var$a2 = k * (a + 1) * g1;
    $d6f292a51fd4f59d$var$a3 = -k * g2;
    $d6f292a51fd4f59d$var$b1 = 2 * g1;
    $d6f292a51fd4f59d$var$b2 = -g2;
    $d6f292a51fd4f59d$var$left_corner = ($d6f292a51fd4f59d$var$a0 + $d6f292a51fd4f59d$var$a1) / (1 - $d6f292a51fd4f59d$var$b1 - $d6f292a51fd4f59d$var$b2);
    $d6f292a51fd4f59d$var$right_corner = ($d6f292a51fd4f59d$var$a2 + $d6f292a51fd4f59d$var$a3) / (1 - $d6f292a51fd4f59d$var$b1 - $d6f292a51fd4f59d$var$b2);
    // Attempt to force type to FP32.
    return new Float32Array([
        $d6f292a51fd4f59d$var$a0,
        $d6f292a51fd4f59d$var$a1,
        $d6f292a51fd4f59d$var$a2,
        $d6f292a51fd4f59d$var$a3,
        $d6f292a51fd4f59d$var$b1,
        $d6f292a51fd4f59d$var$b2,
        $d6f292a51fd4f59d$var$left_corner,
        $d6f292a51fd4f59d$var$right_corner
    ]);
}
function $d6f292a51fd4f59d$var$convolveMono16(src, out, line, coeff, width, height) {
    // takes src image and writes the blurred and transposed result into out
    var prev_src, curr_src, curr_out, prev_out, prev_prev_out;
    var src_index, out_index, line_index;
    var i, j;
    var coeff_a0, coeff_a1, coeff_b1, coeff_b2;
    for(i = 0; i < height; i++){
        src_index = i * width;
        out_index = i;
        line_index = 0;
        // left to right
        prev_src = src[src_index];
        prev_prev_out = prev_src * coeff[6];
        prev_out = prev_prev_out;
        coeff_a0 = coeff[0];
        coeff_a1 = coeff[1];
        coeff_b1 = coeff[4];
        coeff_b2 = coeff[5];
        for(j = 0; j < width; j++){
            curr_src = src[src_index];
            curr_out = curr_src * coeff_a0 + prev_src * coeff_a1 + prev_out * coeff_b1 + prev_prev_out * coeff_b2;
            prev_prev_out = prev_out;
            prev_out = curr_out;
            prev_src = curr_src;
            line[line_index] = prev_out;
            line_index++;
            src_index++;
        }
        src_index--;
        line_index--;
        out_index += height * (width - 1);
        // right to left
        prev_src = src[src_index];
        prev_prev_out = prev_src * coeff[7];
        prev_out = prev_prev_out;
        curr_src = prev_src;
        coeff_a0 = coeff[2];
        coeff_a1 = coeff[3];
        for(j = width - 1; j >= 0; j--){
            curr_out = curr_src * coeff_a0 + prev_src * coeff_a1 + prev_out * coeff_b1 + prev_prev_out * coeff_b2;
            prev_prev_out = prev_out;
            prev_out = curr_out;
            prev_src = curr_src;
            curr_src = src[src_index];
            out[out_index] = line[line_index] + prev_out;
            src_index--;
            line_index--;
            out_index -= height;
        }
    }
}
function $d6f292a51fd4f59d$var$blurMono16(src, width, height, radius) {
    // Quick exit on zero radius
    if (!radius) return;
    var out = new Uint16Array(src.length), tmp_line = new Float32Array(Math.max(width, height));
    var coeff = $d6f292a51fd4f59d$var$gaussCoef(radius);
    $d6f292a51fd4f59d$var$convolveMono16(src, out, tmp_line, coeff, width, height, radius);
    $d6f292a51fd4f59d$var$convolveMono16(out, src, tmp_line, coeff, height, width, radius);
}
module.exports = $d6f292a51fd4f59d$var$blurMono16;

});


parcelRequire.register("5UGOk", function(module, exports) {
"use strict";
module.exports = function unsharp(img, width, height, amount, radius, threshold) {
    if (amount === 0 || radius < 0.5) return;
    if (radius > 2.0) radius = 2.0;
    var pixels = width * height;
    var img_bytes_cnt = pixels * 4;
    var hsv_bytes_cnt = pixels * 2;
    var blur_bytes_cnt = pixels * 2;
    var blur_line_byte_cnt = Math.max(width, height) * 4; // float32 array
    var blur_coeffs_byte_cnt = 32; // float32 array
    var img_offset = 0;
    var hsv_offset = img_bytes_cnt;
    var blur_offset = hsv_offset + hsv_bytes_cnt;
    var blur_tmp_offset = blur_offset + blur_bytes_cnt;
    var blur_line_offset = blur_tmp_offset + blur_bytes_cnt;
    var blur_coeffs_offset = blur_line_offset + blur_line_byte_cnt;
    var instance = this.__instance("unsharp_mask", img_bytes_cnt + hsv_bytes_cnt + blur_bytes_cnt * 2 + blur_line_byte_cnt + blur_coeffs_byte_cnt, {
        exp: Math.exp
    });
    // 32-bit copy is much faster in chrome
    var img32 = new Uint32Array(img.buffer);
    var mem32 = new Uint32Array(this.__memory.buffer);
    mem32.set(img32);
    // HSL
    var fn = instance.exports.hsv_v16 || instance.exports._hsv_v16;
    fn(img_offset, hsv_offset, width, height);
    // BLUR
    fn = instance.exports.blurMono16 || instance.exports._blurMono16;
    fn(hsv_offset, blur_offset, blur_tmp_offset, blur_line_offset, blur_coeffs_offset, width, height, radius);
    // UNSHARP
    fn = instance.exports.unsharp || instance.exports._unsharp;
    fn(img_offset, img_offset, hsv_offset, blur_offset, width, height, amount, threshold);
    // 32-bit copy is much faster in chrome
    img32.set(new Uint32Array(this.__memory.buffer, 0, pixels));
};

});

parcelRequire.register("3Rekc", function(module, exports) {
// This is autogenerated file from math.wasm, don't edit.
//
"use strict";
/* eslint-disable max-len */ module.exports = "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";

});


parcelRequire.register("2KSXN", function(module, exports) {
"use strict";



module.exports = {
    name: "resize",
    fn: (parcelRequire("lbgpG")),
    wasm_fn: (parcelRequire("7j3Q3")),
    wasm_src: (parcelRequire("6ANEd"))
};

});
parcelRequire.register("lbgpG", function(module, exports) {
"use strict";

var $3dcUD = parcelRequire("3dcUD");

var $60Qut = parcelRequire("60Qut");
var $f6b75b6257b99410$require$convolveHor = $60Qut.convolveHor;
var $f6b75b6257b99410$require$convolveVert = $60Qut.convolveVert;
var $f6b75b6257b99410$require$convolveHorWithPre = $60Qut.convolveHorWithPre;
var $f6b75b6257b99410$require$convolveVertWithPre = $60Qut.convolveVertWithPre;
function $f6b75b6257b99410$var$hasAlpha(src, width, height) {
    let ptr = 3, len = width * height * 4 | 0;
    while(ptr < len){
        if (src[ptr] !== 255) return true;
        ptr = ptr + 4 | 0;
    }
    return false;
}
function $f6b75b6257b99410$var$resetAlpha(dst, width, height) {
    let ptr = 3, len = width * height * 4 | 0;
    while(ptr < len){
        dst[ptr] = 0xFF;
        ptr = ptr + 4 | 0;
    }
}
module.exports = function resize(options) {
    const src = options.src;
    const srcW = options.width;
    const srcH = options.height;
    const destW = options.toWidth;
    const destH = options.toHeight;
    const scaleX = options.scaleX || options.toWidth / options.width;
    const scaleY = options.scaleY || options.toHeight / options.height;
    const offsetX = options.offsetX || 0;
    const offsetY = options.offsetY || 0;
    const dest = options.dest || new Uint8Array(destW * destH * 4);
    const filter = typeof options.filter === "undefined" ? "mks2013" : options.filter;
    const filtersX = $3dcUD(filter, srcW, destW, scaleX, offsetX), filtersY = $3dcUD(filter, srcH, destH, scaleY, offsetY);
    const tmp = new Uint16Array(destW * srcH * 4);
    // Autodetect if alpha channel exists, and use appropriate method
    if ($f6b75b6257b99410$var$hasAlpha(src, srcW, srcH)) {
        $f6b75b6257b99410$require$convolveHorWithPre(src, tmp, srcW, srcH, destW, filtersX);
        $f6b75b6257b99410$require$convolveVertWithPre(tmp, dest, srcH, destW, destH, filtersY);
    } else {
        $f6b75b6257b99410$require$convolveHor(src, tmp, srcW, srcH, destW, filtersX);
        $f6b75b6257b99410$require$convolveVert(tmp, dest, srcH, destW, destH, filtersY);
        $f6b75b6257b99410$var$resetAlpha(dest, destW, destH);
    }
    return dest;
};

});
parcelRequire.register("3dcUD", function(module, exports) {
// Calculate convolution filters for each destination point,
// and pack data to Int16Array:
//
// [ shift, length, data..., shift2, length2, data..., ... ]
//
// - shift - offset in src image
// - length - filter length (in src points)
// - data - filter values sequence
//
"use strict";

var $5zZT4 = parcelRequire("5zZT4");
// Precision of fixed FP values
var $256c9a228ec665bf$var$FIXED_FRAC_BITS = 14;
function $256c9a228ec665bf$var$toFixedPoint(num) {
    return Math.round(num * ((1 << $256c9a228ec665bf$var$FIXED_FRAC_BITS) - 1));
}
module.exports = function resizeFilterGen(filter, srcSize, destSize, scale, offset) {
    var filterFunction = $5zZT4.filter[filter].fn;
    var scaleInverted = 1.0 / scale;
    var scaleClamped = Math.min(1.0, scale); // For upscale
    // Filter window (averaging interval), scaled to src image
    var srcWindow = $5zZT4.filter[filter].win / scaleClamped;
    var destPixel, srcPixel, srcFirst, srcLast, filterElementSize, floatFilter, fxpFilter, total, pxl, idx, floatVal, filterTotal, filterVal;
    var leftNotEmpty, rightNotEmpty, filterShift, filterSize;
    var maxFilterElementSize = Math.floor((srcWindow + 1) * 2);
    var packedFilter = new Int16Array((maxFilterElementSize + 2) * destSize);
    var packedFilterPtr = 0;
    var slowCopy = !packedFilter.subarray || !packedFilter.set;
    // For each destination pixel calculate source range and built filter values
    for(destPixel = 0; destPixel < destSize; destPixel++){
        // Scaling should be done relative to central pixel point
        srcPixel = (destPixel + 0.5) * scaleInverted + offset;
        srcFirst = Math.max(0, Math.floor(srcPixel - srcWindow));
        srcLast = Math.min(srcSize - 1, Math.ceil(srcPixel + srcWindow));
        filterElementSize = srcLast - srcFirst + 1;
        floatFilter = new Float32Array(filterElementSize);
        fxpFilter = new Int16Array(filterElementSize);
        total = 0.0;
        // Fill filter values for calculated range
        for(pxl = srcFirst, idx = 0; pxl <= srcLast; pxl++, idx++){
            floatVal = filterFunction((pxl + 0.5 - srcPixel) * scaleClamped);
            total += floatVal;
            floatFilter[idx] = floatVal;
        }
        // Normalize filter, convert to fixed point and accumulate conversion error
        filterTotal = 0;
        for(idx = 0; idx < floatFilter.length; idx++){
            filterVal = floatFilter[idx] / total;
            filterTotal += filterVal;
            fxpFilter[idx] = $256c9a228ec665bf$var$toFixedPoint(filterVal);
        }
        // Compensate normalization error, to minimize brightness drift
        fxpFilter[destSize >> 1] += $256c9a228ec665bf$var$toFixedPoint(1.0 - filterTotal);
        //
        // Now pack filter to useable form
        //
        // 1. Trim heading and tailing zero values, and compensate shitf/length
        // 2. Put all to single array in this format:
        //
        //    [ pos shift, data length, value1, value2, value3, ... ]
        //
        leftNotEmpty = 0;
        while(leftNotEmpty < fxpFilter.length && fxpFilter[leftNotEmpty] === 0)leftNotEmpty++;
        if (leftNotEmpty < fxpFilter.length) {
            rightNotEmpty = fxpFilter.length - 1;
            while(rightNotEmpty > 0 && fxpFilter[rightNotEmpty] === 0)rightNotEmpty--;
            filterShift = srcFirst + leftNotEmpty;
            filterSize = rightNotEmpty - leftNotEmpty + 1;
            packedFilter[packedFilterPtr++] = filterShift; // shift
            packedFilter[packedFilterPtr++] = filterSize; // size
            if (!slowCopy) {
                packedFilter.set(fxpFilter.subarray(leftNotEmpty, rightNotEmpty + 1), packedFilterPtr);
                packedFilterPtr += filterSize;
            } else // fallback for old IE < 11, without subarray/set methods
            for(idx = leftNotEmpty; idx <= rightNotEmpty; idx++)packedFilter[packedFilterPtr++] = fxpFilter[idx];
        } else {
            // zero data, write header only
            packedFilter[packedFilterPtr++] = 0; // shift
            packedFilter[packedFilterPtr++] = 0; // size
        }
    }
    return packedFilter;
};

});
parcelRequire.register("5zZT4", function(module, exports) {
// Filter definitions to build tables for
// resizing convolvers.
//
// Presets for quality 0..3. Filter functions + window size
//
"use strict";
const $41003a21599435da$var$filter = {
    // Nearest neibor
    box: {
        win: 0.5,
        fn: function(x) {
            if (x < 0) x = -x;
            return x < 0.5 ? 1.0 : 0.0;
        }
    },
    // // Hamming
    hamming: {
        win: 1.0,
        fn: function(x) {
            if (x < 0) x = -x;
            if (x >= 1.0) return 0.0;
            if (x < 1.19209290E-07) return 1.0;
            var xpi = x * Math.PI;
            return Math.sin(xpi) / xpi * (0.54 + 0.46 * Math.cos(xpi / 1.0));
        }
    },
    // Lanczos, win = 2
    lanczos2: {
        win: 2.0,
        fn: function(x) {
            if (x < 0) x = -x;
            if (x >= 2.0) return 0.0;
            if (x < 1.19209290E-07) return 1.0;
            var xpi = x * Math.PI;
            return Math.sin(xpi) / xpi * Math.sin(xpi / 2.0) / (xpi / 2.0);
        }
    },
    // Lanczos, win = 3
    lanczos3: {
        win: 3.0,
        fn: function(x) {
            if (x < 0) x = -x;
            if (x >= 3.0) return 0.0;
            if (x < 1.19209290E-07) return 1.0;
            var xpi = x * Math.PI;
            return Math.sin(xpi) / xpi * Math.sin(xpi / 3.0) / (xpi / 3.0);
        }
    },
    // Magic Kernel Sharp 2013, win = 2.5
    // http://johncostella.com/magic/
    mks2013: {
        win: 2.5,
        fn: function(x) {
            if (x < 0) x = -x;
            if (x >= 2.5) return 0.0;
            if (x >= 1.5) return -0.125 * (x - 2.5) * (x - 2.5);
            if (x >= 0.5) return 0.25 * (4 * x * x - 11 * x + 7);
            return 1.0625 - 1.75 * x * x;
        }
    }
};
module.exports = {
    filter: $41003a21599435da$var$filter,
    // Legacy mapping
    f2q: {
        box: 0,
        hamming: 1,
        lanczos2: 2,
        lanczos3: 3
    },
    q2f: [
        "box",
        "hamming",
        "lanczos2",
        "lanczos3"
    ]
};

});


parcelRequire.register("60Qut", function(module, exports) {
// Resize convolvers, pure JS implementation
//
"use strict";
// Precision of fixed FP values
//var FIXED_FRAC_BITS = 14;
function $460b75b11af11c35$var$clampTo8(i) {
    return i < 0 ? 0 : i > 255 ? 255 : i;
}
function $460b75b11af11c35$var$clampNegative(i) {
    return i >= 0 ? i : 0;
}
// Convolve image data in horizontal direction. Can be used for:
//
// 1. bitmap with premultiplied alpha
// 2. bitmap without alpha (all values 255)
//
// Notes:
//
// - output is transposed
// - output resolution is ~15 bits per channel(for better precision).
//
function $460b75b11af11c35$var$convolveHor(src, dest, srcW, srcH, destW, filters) {
    var r, g, b, a;
    var filterPtr, filterShift, filterSize;
    var srcPtr, srcY, destX, filterVal;
    var srcOffset = 0, destOffset = 0;
    // For each row
    for(srcY = 0; srcY < srcH; srcY++){
        filterPtr = 0;
        // Apply precomputed filters to each destination row point
        for(destX = 0; destX < destW; destX++){
            // Get the filter that determines the current output pixel.
            filterShift = filters[filterPtr++];
            filterSize = filters[filterPtr++];
            srcPtr = srcOffset + filterShift * 4 | 0;
            r = g = b = a = 0;
            // Apply the filter to the row to get the destination pixel r, g, b, a
            for(; filterSize > 0; filterSize--){
                filterVal = filters[filterPtr++];
                // Use reverse order to workaround deopts in old v8 (node v.10)
                // Big thanks to @mraleph (Vyacheslav Egorov) for the tip.
                a = a + filterVal * src[srcPtr + 3] | 0;
                b = b + filterVal * src[srcPtr + 2] | 0;
                g = g + filterVal * src[srcPtr + 1] | 0;
                r = r + filterVal * src[srcPtr] | 0;
                srcPtr = srcPtr + 4 | 0;
            }
            // Store 15 bits between passes for better precision
            // Instead of shift to 14 (FIXED_FRAC_BITS), shift to 7 only
            //
            dest[destOffset + 3] = $460b75b11af11c35$var$clampNegative(a >> 7);
            dest[destOffset + 2] = $460b75b11af11c35$var$clampNegative(b >> 7);
            dest[destOffset + 1] = $460b75b11af11c35$var$clampNegative(g >> 7);
            dest[destOffset] = $460b75b11af11c35$var$clampNegative(r >> 7);
            destOffset = destOffset + srcH * 4 | 0;
        }
        destOffset = (srcY + 1) * 4 | 0;
        srcOffset = (srcY + 1) * srcW * 4 | 0;
    }
}
// Supplementary method for `convolveHor()`
//
function $460b75b11af11c35$var$convolveVert(src, dest, srcW, srcH, destW, filters) {
    var r, g, b, a;
    var filterPtr, filterShift, filterSize;
    var srcPtr, srcY, destX, filterVal;
    var srcOffset = 0, destOffset = 0;
    // For each row
    for(srcY = 0; srcY < srcH; srcY++){
        filterPtr = 0;
        // Apply precomputed filters to each destination row point
        for(destX = 0; destX < destW; destX++){
            // Get the filter that determines the current output pixel.
            filterShift = filters[filterPtr++];
            filterSize = filters[filterPtr++];
            srcPtr = srcOffset + filterShift * 4 | 0;
            r = g = b = a = 0;
            // Apply the filter to the row to get the destination pixel r, g, b, a
            for(; filterSize > 0; filterSize--){
                filterVal = filters[filterPtr++];
                // Use reverse order to workaround deopts in old v8 (node v.10)
                // Big thanks to @mraleph (Vyacheslav Egorov) for the tip.
                a = a + filterVal * src[srcPtr + 3] | 0;
                b = b + filterVal * src[srcPtr + 2] | 0;
                g = g + filterVal * src[srcPtr + 1] | 0;
                r = r + filterVal * src[srcPtr] | 0;
                srcPtr = srcPtr + 4 | 0;
            }
            // Sync with premultiplied version for exact result match
            r >>= 7;
            g >>= 7;
            b >>= 7;
            a >>= 7;
            // Bring this value back in range + round result.
            //
            dest[destOffset + 3] = $460b75b11af11c35$var$clampTo8(a + 8192 >> 14);
            dest[destOffset + 2] = $460b75b11af11c35$var$clampTo8(b + 8192 >> 14);
            dest[destOffset + 1] = $460b75b11af11c35$var$clampTo8(g + 8192 >> 14);
            dest[destOffset] = $460b75b11af11c35$var$clampTo8(r + 8192 >> 14);
            destOffset = destOffset + srcH * 4 | 0;
        }
        destOffset = (srcY + 1) * 4 | 0;
        srcOffset = (srcY + 1) * srcW * 4 | 0;
    }
}
// Premultiply & convolve image data in horizontal direction. Can be used for:
//
// - Any bitmap data, extracted with `.getImageData()` method (with
//   non-premultiplied alpha)
//
// For images without alpha channel this method is slower than `convolveHor()`
//
function $460b75b11af11c35$var$convolveHorWithPre(src, dest, srcW, srcH, destW, filters) {
    var r, g, b, a, alpha;
    var filterPtr, filterShift, filterSize;
    var srcPtr, srcY, destX, filterVal;
    var srcOffset = 0, destOffset = 0;
    // For each row
    for(srcY = 0; srcY < srcH; srcY++){
        filterPtr = 0;
        // Apply precomputed filters to each destination row point
        for(destX = 0; destX < destW; destX++){
            // Get the filter that determines the current output pixel.
            filterShift = filters[filterPtr++];
            filterSize = filters[filterPtr++];
            srcPtr = srcOffset + filterShift * 4 | 0;
            r = g = b = a = 0;
            // Apply the filter to the row to get the destination pixel r, g, b, a
            for(; filterSize > 0; filterSize--){
                filterVal = filters[filterPtr++];
                // Use reverse order to workaround deopts in old v8 (node v.10)
                // Big thanks to @mraleph (Vyacheslav Egorov) for the tip.
                alpha = src[srcPtr + 3];
                a = a + filterVal * alpha | 0;
                b = b + filterVal * src[srcPtr + 2] * alpha | 0;
                g = g + filterVal * src[srcPtr + 1] * alpha | 0;
                r = r + filterVal * src[srcPtr] * alpha | 0;
                srcPtr = srcPtr + 4 | 0;
            }
            // Premultiply is (* alpha / 255).
            // Postpone division for better performance
            b = b / 255 | 0;
            g = g / 255 | 0;
            r = r / 255 | 0;
            // Store 15 bits between passes for better precision
            // Instead of shift to 14 (FIXED_FRAC_BITS), shift to 7 only
            //
            dest[destOffset + 3] = $460b75b11af11c35$var$clampNegative(a >> 7);
            dest[destOffset + 2] = $460b75b11af11c35$var$clampNegative(b >> 7);
            dest[destOffset + 1] = $460b75b11af11c35$var$clampNegative(g >> 7);
            dest[destOffset] = $460b75b11af11c35$var$clampNegative(r >> 7);
            destOffset = destOffset + srcH * 4 | 0;
        }
        destOffset = (srcY + 1) * 4 | 0;
        srcOffset = (srcY + 1) * srcW * 4 | 0;
    }
}
// Supplementary method for `convolveHorWithPre()`
//
function $460b75b11af11c35$var$convolveVertWithPre(src, dest, srcW, srcH, destW, filters) {
    var r, g, b, a;
    var filterPtr, filterShift, filterSize;
    var srcPtr, srcY, destX, filterVal;
    var srcOffset = 0, destOffset = 0;
    // For each row
    for(srcY = 0; srcY < srcH; srcY++){
        filterPtr = 0;
        // Apply precomputed filters to each destination row point
        for(destX = 0; destX < destW; destX++){
            // Get the filter that determines the current output pixel.
            filterShift = filters[filterPtr++];
            filterSize = filters[filterPtr++];
            srcPtr = srcOffset + filterShift * 4 | 0;
            r = g = b = a = 0;
            // Apply the filter to the row to get the destination pixel r, g, b, a
            for(; filterSize > 0; filterSize--){
                filterVal = filters[filterPtr++];
                // Use reverse order to workaround deopts in old v8 (node v.10)
                // Big thanks to @mraleph (Vyacheslav Egorov) for the tip.
                a = a + filterVal * src[srcPtr + 3] | 0;
                b = b + filterVal * src[srcPtr + 2] | 0;
                g = g + filterVal * src[srcPtr + 1] | 0;
                r = r + filterVal * src[srcPtr] | 0;
                srcPtr = srcPtr + 4 | 0;
            }
            // Downscale to leave room for un-premultiply
            r >>= 7;
            g >>= 7;
            b >>= 7;
            a >>= 7;
            // Un-premultiply
            a = $460b75b11af11c35$var$clampTo8(a + 8192 >> 14);
            if (a > 0) {
                r = r * 255 / a | 0;
                g = g * 255 / a | 0;
                b = b * 255 / a | 0;
            }
            // Bring this value back in range + round result.
            // Shift value = FIXED_FRAC_BITS + 7
            //
            dest[destOffset + 3] = a;
            dest[destOffset + 2] = $460b75b11af11c35$var$clampTo8(b + 8192 >> 14);
            dest[destOffset + 1] = $460b75b11af11c35$var$clampTo8(g + 8192 >> 14);
            dest[destOffset] = $460b75b11af11c35$var$clampTo8(r + 8192 >> 14);
            destOffset = destOffset + srcH * 4 | 0;
        }
        destOffset = (srcY + 1) * 4 | 0;
        srcOffset = (srcY + 1) * srcW * 4 | 0;
    }
}
module.exports = {
    convolveHor: $460b75b11af11c35$var$convolveHor,
    convolveVert: $460b75b11af11c35$var$convolveVert,
    convolveHorWithPre: $460b75b11af11c35$var$convolveHorWithPre,
    convolveVertWithPre: $460b75b11af11c35$var$convolveVertWithPre
};

});


parcelRequire.register("7j3Q3", function(module, exports) {
"use strict";

var $3dcUD = parcelRequire("3dcUD");
function $551d4906d96953d9$var$hasAlpha(src, width, height) {
    let ptr = 3, len = width * height * 4 | 0;
    while(ptr < len){
        if (src[ptr] !== 255) return true;
        ptr = ptr + 4 | 0;
    }
    return false;
}
function $551d4906d96953d9$var$resetAlpha(dst, width, height) {
    let ptr = 3, len = width * height * 4 | 0;
    while(ptr < len){
        dst[ptr] = 0xFF;
        ptr = ptr + 4 | 0;
    }
}
function $551d4906d96953d9$var$asUint8Array(src) {
    return new Uint8Array(src.buffer, 0, src.byteLength);
}
let $551d4906d96953d9$var$IS_LE = true;
// should not crash everything on module load in old browsers
try {
    $551d4906d96953d9$var$IS_LE = new Uint32Array(new Uint8Array([
        1,
        0,
        0,
        0
    ]).buffer)[0] === 1;
} catch (__) {}
function $551d4906d96953d9$var$copyInt16asLE(src, target, target_offset) {
    if ($551d4906d96953d9$var$IS_LE) {
        target.set($551d4906d96953d9$var$asUint8Array(src), target_offset);
        return;
    }
    for(let ptr = target_offset, i = 0; i < src.length; i++){
        let data = src[i];
        target[ptr++] = data & 0xFF;
        target[ptr++] = data >> 8 & 0xFF;
    }
}
module.exports = function resize_wasm(options) {
    const src = options.src;
    const srcW = options.width;
    const srcH = options.height;
    const destW = options.toWidth;
    const destH = options.toHeight;
    const scaleX = options.scaleX || options.toWidth / options.width;
    const scaleY = options.scaleY || options.toHeight / options.height;
    const offsetX = options.offsetX || 0.0;
    const offsetY = options.offsetY || 0.0;
    const dest = options.dest || new Uint8Array(destW * destH * 4);
    const filter = typeof options.filter === "undefined" ? "mks2013" : options.filter;
    const filtersX = $3dcUD(filter, srcW, destW, scaleX, offsetX), filtersY = $3dcUD(filter, srcH, destH, scaleY, offsetY);
    // destination is 0 too.
    const src_offset = 0;
    const src_size = Math.max(src.byteLength, dest.byteLength);
    // buffer between convolve passes
    const tmp_offset = this.__align(src_offset + src_size);
    const tmp_size = srcH * destW * 8; // 2 bytes per channel
    const filtersX_offset = this.__align(tmp_offset + tmp_size);
    const filtersY_offset = this.__align(filtersX_offset + filtersX.byteLength);
    const alloc_bytes = filtersY_offset + filtersY.byteLength;
    const instance = this.__instance("resize", alloc_bytes);
    //
    // Fill memory block with data to process
    //
    const mem = new Uint8Array(this.__memory.buffer);
    const mem32 = new Uint32Array(this.__memory.buffer);
    // 32-bit copy is much faster in chrome
    const src32 = new Uint32Array(src.buffer);
    mem32.set(src32);
    // We should guarantee LE bytes order. Filters are not big, so
    // speed difference is not significant vs direct .set()
    $551d4906d96953d9$var$copyInt16asLE(filtersX, mem, filtersX_offset);
    $551d4906d96953d9$var$copyInt16asLE(filtersY, mem, filtersY_offset);
    // Now call webassembly method
    // emsdk does method names with '_'
    const fn = instance.exports.convolveHV || instance.exports._convolveHV;
    if ($551d4906d96953d9$var$hasAlpha(src, srcW, srcH)) fn(filtersX_offset, filtersY_offset, tmp_offset, srcW, srcH, destW, destH, 1);
    else {
        fn(filtersX_offset, filtersY_offset, tmp_offset, srcW, srcH, destW, destH, 0);
        $551d4906d96953d9$var$resetAlpha(dest, destW, destH);
    }
    //
    // Copy data back to typed array
    //
    // 32-bit copy is much faster in chrome
    const dest32 = new Uint32Array(dest.buffer);
    dest32.set(new Uint32Array(this.__memory.buffer, 0, destH * destW));
    return dest;
};

});

parcelRequire.register("6ANEd", function(module, exports) {
// This is autogenerated file from math.wasm, don't edit.
//
"use strict";
/* eslint-disable max-len */ module.exports = "AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL";

});



var $60ae514bd74eb968$exports = {};

$parcel$export($60ae514bd74eb968$exports, "createCanvas", function () { return $60ae514bd74eb968$export$cd3d1f114b139967; }, function (v) { return $60ae514bd74eb968$export$cd3d1f114b139967 = v; });
/* globals document, ImageData */ var $60ae514bd74eb968$export$807478983c0c2e;
var $60ae514bd74eb968$export$cd3d1f114b139967;
var $60ae514bd74eb968$export$ad40c38a6f41c9cf;
var $60ae514bd74eb968$export$fe58198efe02b173;
var $26c1e63acc1514f9$exports = {};
"use strict";
/**
 * Font RegExp helpers.
 */ const $26c1e63acc1514f9$var$weights = "bold|bolder|lighter|[1-9]00";
const $26c1e63acc1514f9$var$styles = "italic|oblique";
const $26c1e63acc1514f9$var$variants = "small-caps";
const $26c1e63acc1514f9$var$stretches = "ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded";
const $26c1e63acc1514f9$var$units = "px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q";
const $26c1e63acc1514f9$var$string = "'([^']+)'|\"([^\"]+)\"|[\\w\\s-]+";
// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const $26c1e63acc1514f9$var$weightRe = new RegExp(`(${$26c1e63acc1514f9$var$weights}) +`, "i");
const $26c1e63acc1514f9$var$styleRe = new RegExp(`(${$26c1e63acc1514f9$var$styles}) +`, "i");
const $26c1e63acc1514f9$var$variantRe = new RegExp(`(${$26c1e63acc1514f9$var$variants}) +`, "i");
const $26c1e63acc1514f9$var$stretchRe = new RegExp(`(${$26c1e63acc1514f9$var$stretches}) +`, "i");
const $26c1e63acc1514f9$var$sizeFamilyRe = new RegExp(`([\\d\\.]+)(${$26c1e63acc1514f9$var$units}) *((?:${$26c1e63acc1514f9$var$string})( *, *(?:${$26c1e63acc1514f9$var$string}))*)`);
/**
 * Cache font parsing.
 */ const $26c1e63acc1514f9$var$cache = {};
const $26c1e63acc1514f9$var$defaultHeight = 16 // pt, common browser default
;
/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */ $26c1e63acc1514f9$exports = (str)=>{
    // Cached
    if ($26c1e63acc1514f9$var$cache[str]) return $26c1e63acc1514f9$var$cache[str];
    // Try for required properties first.
    const sizeFamily = $26c1e63acc1514f9$var$sizeFamilyRe.exec(str);
    if (!sizeFamily) return; // invalid
    // Default values and required properties
    const font = {
        weight: "normal",
        style: "normal",
        stretch: "normal",
        variant: "normal",
        size: parseFloat(sizeFamily[1]),
        unit: sizeFamily[2],
        family: sizeFamily[3].replace(/["']/g, "").replace(/ *, */g, ",")
    };
    // Optional, unordered properties.
    let weight, style, variant, stretch;
    // Stop search at `sizeFamily.index`
    const substr = str.substring(0, sizeFamily.index);
    if (weight = $26c1e63acc1514f9$var$weightRe.exec(substr)) font.weight = weight[1];
    if (style = $26c1e63acc1514f9$var$styleRe.exec(substr)) font.style = style[1];
    if (variant = $26c1e63acc1514f9$var$variantRe.exec(substr)) font.variant = variant[1];
    if (stretch = $26c1e63acc1514f9$var$stretchRe.exec(substr)) font.stretch = stretch[1];
    // Convert to device units. (`font.unit` is the original unit)
    // TODO: ch, ex
    switch(font.unit){
        case "pt":
            font.size /= 0.75;
            break;
        case "pc":
            font.size *= 16;
            break;
        case "in":
            font.size *= 96;
            break;
        case "cm":
            font.size *= 96.0 / 2.54;
            break;
        case "mm":
            font.size *= 96.0 / 25.4;
            break;
        case "%":
            break;
        case "em":
        case "rem":
            font.size *= $26c1e63acc1514f9$var$defaultHeight / 0.75;
            break;
        case "q":
            font.size *= 96 / 25.4 / 4;
            break;
    }
    return $26c1e63acc1514f9$var$cache[str] = font;
};


$60ae514bd74eb968$export$807478983c0c2e = $26c1e63acc1514f9$exports;
$60ae514bd74eb968$export$cd3d1f114b139967 = function(width, height) {
    return Object.assign(document.createElement("canvas"), {
        width: width,
        height: height
    });
};
$60ae514bd74eb968$export$ad40c38a6f41c9cf = function(array, width, height) {
    // Browser implementation of ImageData looks at the number of arguments passed
    switch(arguments.length){
        case 0:
            return new ImageData();
        case 1:
            return new ImageData(array);
        case 2:
            return new ImageData(array, width);
        default:
            return new ImageData(array, width, height);
    }
};
$60ae514bd74eb968$export$fe58198efe02b173 = function(src, options) {
    return new Promise(function(resolve, reject) {
        const image = Object.assign(document.createElement("img"), options);
        function cleanup() {
            image.onload = null;
            image.onerror = null;
        }
        image.onload = function() {
            cleanup();
            resolve(image);
        };
        image.onerror = function() {
            cleanup();
            reject(new Error('Failed to load the image "' + src + '"'));
        };
        image.src = src;
    });
};


var $ed498a97b604fad5$exports = {};
"use strict";

var $fQtfM = parcelRequire("fQtfM");


var $19T8x = parcelRequire("19T8x");
var $94c4dfcdb6943aaf$exports = {};
"use strict";
const $94c4dfcdb6943aaf$var$GC_INTERVAL = 100;
function $94c4dfcdb6943aaf$var$Pool(create, idle) {
    this.create = create;
    this.available = [];
    this.acquired = {};
    this.lastId = 1;
    this.timeoutId = 0;
    this.idle = idle || 2000;
}
$94c4dfcdb6943aaf$var$Pool.prototype.acquire = function() {
    let resource;
    if (this.available.length !== 0) resource = this.available.pop();
    else {
        resource = this.create();
        resource.id = this.lastId++;
        resource.release = ()=>this.release(resource);
    }
    this.acquired[resource.id] = resource;
    return resource;
};
$94c4dfcdb6943aaf$var$Pool.prototype.release = function(resource) {
    delete this.acquired[resource.id];
    resource.lastUsed = Date.now();
    this.available.push(resource);
    if (this.timeoutId === 0) this.timeoutId = setTimeout(()=>this.gc(), $94c4dfcdb6943aaf$var$GC_INTERVAL);
};
$94c4dfcdb6943aaf$var$Pool.prototype.gc = function() {
    const now = Date.now();
    this.available = this.available.filter((resource)=>{
        if (now - resource.lastUsed > this.idle) {
            resource.destroy();
            return false;
        }
        return true;
    });
    if (this.available.length !== 0) this.timeoutId = setTimeout(()=>this.gc(), $94c4dfcdb6943aaf$var$GC_INTERVAL);
    else this.timeoutId = 0;
};
$94c4dfcdb6943aaf$exports = $94c4dfcdb6943aaf$var$Pool;


var $6bdc296e5fb8780b$export$4b05d74c82e4c4d2;
var $6bdc296e5fb8780b$export$fb85bc5d6d9ef19b;
var $6bdc296e5fb8780b$export$4c394cd787f4a4b7;
var $6bdc296e5fb8780b$export$28da6b3f303613d5;
var $6bdc296e5fb8780b$export$adfbffb03f386655;
var $6bdc296e5fb8780b$export$7f9fc0f6196598f6;
var $6bdc296e5fb8780b$export$6c0e957e50473ced;
// Check if canvas.getContext('2d').getImageData can be used,
// FireFox randomizes the output of that function in `privacy.resistFingerprinting` mode
var $6bdc296e5fb8780b$export$db38455243ada99e;
// Check if createImageBitmap(img, sx, sy, sw, sh) signature works correctly
// with JPEG images oriented with Exif;
// https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
// TODO: remove after it's fixed in chrome for at least 2 releases
var $6bdc296e5fb8780b$export$aff86d9eea48781e;
"use strict";
function $6bdc296e5fb8780b$var$objClass(obj) {
    return Object.prototype.toString.call(obj);
}
$6bdc296e5fb8780b$export$4b05d74c82e4c4d2 = function isCanvas(element) {
    let cname = $6bdc296e5fb8780b$var$objClass(element);
    return cname === "[object HTMLCanvasElement]" /* browser */  || cname === "[object OffscreenCanvas]" || cname === "[object Canvas]" /* node-canvas */ ;
};
$6bdc296e5fb8780b$export$fb85bc5d6d9ef19b = function isImage(element) {
    return $6bdc296e5fb8780b$var$objClass(element) === "[object HTMLImageElement]";
};
$6bdc296e5fb8780b$export$4c394cd787f4a4b7 = function isImageBitmap(element) {
    return $6bdc296e5fb8780b$var$objClass(element) === "[object ImageBitmap]";
};
$6bdc296e5fb8780b$export$28da6b3f303613d5 = function limiter(concurrency) {
    let active = 0, queue = [];
    function roll() {
        if (active < concurrency && queue.length) {
            active++;
            queue.shift()();
        }
    }
    return function limit(fn) {
        return new Promise((resolve, reject)=>{
            queue.push(()=>{
                fn().then((result)=>{
                    resolve(result);
                    active--;
                    roll();
                }, (err)=>{
                    reject(err);
                    active--;
                    roll();
                });
            });
            roll();
        });
    };
};
$6bdc296e5fb8780b$export$adfbffb03f386655 = function cib_quality_name(num) {
    switch(num){
        case 0:
            return "pixelated";
        case 1:
            return "low";
        case 2:
            return "medium";
    }
    return "high";
};
$6bdc296e5fb8780b$export$7f9fc0f6196598f6 = function cib_support(createCanvas) {
    return Promise.resolve().then(()=>{
        if (typeof createImageBitmap === "undefined") return false;
        let c = createCanvas(100, 100);
        return createImageBitmap(c, 0, 0, 100, 100, {
            resizeWidth: 10,
            resizeHeight: 10,
            resizeQuality: "high"
        }).then((bitmap)=>{
            let status = bitmap.width === 10;
            // Branch below is filtered on upper level. We do not call resize
            // detection for basic ImageBitmap.
            //
            // https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
            // old Crome 51 has ImageBitmap without .close(). Then this code
            // will throw and return 'false' as expected.
            //
            bitmap.close();
            c = null;
            return status;
        });
    }).catch(()=>false);
};
$6bdc296e5fb8780b$export$6c0e957e50473ced = function worker_offscreen_canvas_support() {
    return new Promise((resolve, reject)=>{
        if (typeof OffscreenCanvas === "undefined") {
            // if OffscreenCanvas is present, we assume browser supports Worker and built-in Promise as well
            resolve(false);
            return;
        }
        function workerPayload(self) {
            if (typeof createImageBitmap === "undefined") {
                self.postMessage(false);
                return;
            }
            Promise.resolve().then(()=>{
                let canvas = new OffscreenCanvas(10, 10);
                // test that 2d context can be used in worker
                let ctx = canvas.getContext("2d");
                ctx.rect(0, 0, 1, 1);
                // test that cib can be used to return image bitmap from worker
                return createImageBitmap(canvas, 0, 0, 1, 1);
            }).then(()=>self.postMessage(true), ()=>self.postMessage(false));
        }
        let code = btoa(`(${workerPayload.toString()})(self);`);
        let w = new Worker(`data:text/javascript;base64,${code}`);
        w.onmessage = (ev)=>resolve(ev.data);
        w.onerror = reject;
    }).then((result)=>result, ()=>false);
};
$6bdc296e5fb8780b$export$db38455243ada99e = function can_use_canvas(createCanvas) {
    let usable = false;
    try {
        let canvas = createCanvas(2, 1);
        let ctx = canvas.getContext("2d");
        let d = ctx.createImageData(2, 1);
        d.data[0] = 12;
        d.data[1] = 23;
        d.data[2] = 34;
        d.data[3] = 255;
        d.data[4] = 45;
        d.data[5] = 56;
        d.data[6] = 67;
        d.data[7] = 255;
        ctx.putImageData(d, 0, 0);
        d = null;
        d = ctx.getImageData(0, 0, 2, 1);
        if (d.data[0] === 12 && d.data[1] === 23 && d.data[2] === 34 && d.data[3] === 255 && d.data[4] === 45 && d.data[5] === 56 && d.data[6] === 67 && d.data[7] === 255) usable = true;
    } catch (err) {}
    return usable;
};
$6bdc296e5fb8780b$export$aff86d9eea48781e = function cib_can_use_region() {
    return new Promise((resolve)=>{
        // `Image` check required for use in `ServiceWorker`
        if (typeof Image === "undefined" || typeof createImageBitmap === "undefined") {
            resolve(false);
            return;
        }
        let image = new Image();
        image.src = "data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z";
        image.onload = ()=>{
            createImageBitmap(image, 0, 0, image.width, image.height).then((bitmap)=>{
                if (bitmap.width === image.width && bitmap.height === image.height) resolve(true);
                else resolve(false);
            }, ()=>resolve(false));
        };
        image.onerror = ()=>resolve(false);
    });
};


var $543b1585e1d06a1b$exports = {};
// Web Worker wrapper for image resize function
"use strict";

$543b1585e1d06a1b$exports = function() {
    const MathLib = (parcelRequire("19T8x"));
    let mathLib;
    /* eslint-disable no-undef */ onmessage = function(ev) {
        let tileOpts = ev.data.opts;
        let returnBitmap = false;
        if (!tileOpts.src && tileOpts.srcBitmap) {
            let canvas = new OffscreenCanvas(tileOpts.width, tileOpts.height);
            let ctx = canvas.getContext("2d");
            ctx.drawImage(tileOpts.srcBitmap, 0, 0);
            tileOpts.src = ctx.getImageData(0, 0, tileOpts.width, tileOpts.height).data;
            canvas.width = canvas.height = 0;
            canvas = null;
            tileOpts.srcBitmap.close();
            tileOpts.srcBitmap = null;
        // Temporary force out data to typed array, because Chrome have artefacts
        // https://github.com/nodeca/pica/issues/223
        // returnBitmap = true;
        }
        if (!mathLib) mathLib = new MathLib(ev.data.features);
        // Use multimath's sync auto-init. Avoid Promise use in old browsers,
        // because polyfills are not propagated to webworker.
        let data = mathLib.resizeAndUnsharp(tileOpts);
        if (returnBitmap) {
            let toImageData = new ImageData(new Uint8ClampedArray(data), tileOpts.toWidth, tileOpts.toHeight);
            let canvas = new OffscreenCanvas(tileOpts.toWidth, tileOpts.toHeight);
            let ctx = canvas.getContext("2d");
            ctx.putImageData(toImageData, 0, 0);
            createImageBitmap(canvas).then((bitmap)=>{
                postMessage({
                    bitmap: bitmap
                }, [
                    bitmap
                ]);
            });
        } else postMessage({
            data: data
        }, [
            data.buffer
        ]);
    };
};


var $3e156945344d4dd4$exports = {};
// Add intermediate resizing steps when scaling down by a very large factor.
//
// For example, when resizing 10000x10000 down to 10x10, it'll resize it to
// 300x300 first.
//
// It's needed because tiler has issues when the entire tile is scaled down
// to a few pixels (1024px source tile with border size 3 should result in
// at least 3+3+2 = 8px target tile, so max scale factor is 128 here).
//
// Also, adding intermediate steps can speed up processing if we use lower
// quality algorithms for first stages.
//
"use strict";
// min size = 0 results in infinite loop,
// min size = 1 can consume large amount of memory
const $3e156945344d4dd4$var$MIN_INNER_TILE_SIZE = 2;
$3e156945344d4dd4$exports = function createStages(fromWidth, fromHeight, toWidth, toHeight, srcTileSize, destTileBorder) {
    let scaleX = toWidth / fromWidth;
    let scaleY = toHeight / fromHeight;
    // derived from createRegions equation:
    // innerTileWidth = pixelFloor(srcTileSize * scaleX) - 2 * destTileBorder;
    let minScale = (2 * destTileBorder + $3e156945344d4dd4$var$MIN_INNER_TILE_SIZE + 1) / srcTileSize;
    // refuse to scale image multiple times by less than twice each time,
    // it could only happen because of invalid options
    if (minScale > 0.5) return [
        [
            toWidth,
            toHeight
        ]
    ];
    let stageCount = Math.ceil(Math.log(Math.min(scaleX, scaleY)) / Math.log(minScale));
    // no additional resizes are necessary,
    // stageCount can be zero or be negative when enlarging the image
    if (stageCount <= 1) return [
        [
            toWidth,
            toHeight
        ]
    ];
    let result = [];
    for(let i = 0; i < stageCount; i++){
        let width = Math.round(Math.pow(Math.pow(fromWidth, stageCount - i - 1) * Math.pow(toWidth, i + 1), 1 / stageCount));
        let height = Math.round(Math.pow(Math.pow(fromHeight, stageCount - i - 1) * Math.pow(toHeight, i + 1), 1 / stageCount));
        result.push([
            width,
            height
        ]);
    }
    return result;
};


var $9fdb8dda61998012$exports = {};
// Split original image into multiple 1024x1024 chunks to reduce memory usage
// (images have to be unpacked into typed arrays for resizing) and allow
// parallel processing of multiple tiles at a time.
//
"use strict";
/*
 * pixelFloor and pixelCeil are modified versions of Math.floor and Math.ceil
 * functions which take into account floating point arithmetic errors.
 * Those errors can cause undesired increments/decrements of sizes and offsets:
 * Math.ceil(36 / (36 / 500)) = 501
 * pixelCeil(36 / (36 / 500)) = 500
 */ var $9fdb8dda61998012$var$PIXEL_EPSILON = 1e-5;
function $9fdb8dda61998012$var$pixelFloor(x) {
    var nearest = Math.round(x);
    if (Math.abs(x - nearest) < $9fdb8dda61998012$var$PIXEL_EPSILON) return nearest;
    return Math.floor(x);
}
function $9fdb8dda61998012$var$pixelCeil(x) {
    var nearest = Math.round(x);
    if (Math.abs(x - nearest) < $9fdb8dda61998012$var$PIXEL_EPSILON) return nearest;
    return Math.ceil(x);
}
$9fdb8dda61998012$exports = function createRegions(options) {
    var scaleX = options.toWidth / options.width;
    var scaleY = options.toHeight / options.height;
    var innerTileWidth = $9fdb8dda61998012$var$pixelFloor(options.srcTileSize * scaleX) - 2 * options.destTileBorder;
    var innerTileHeight = $9fdb8dda61998012$var$pixelFloor(options.srcTileSize * scaleY) - 2 * options.destTileBorder;
    // prevent infinite loop, this should never happen
    if (innerTileWidth < 1 || innerTileHeight < 1) throw new Error("Internal error in pica: target tile width/height is too small.");
    var x, y;
    var innerX, innerY, toTileWidth, toTileHeight;
    var tiles = [];
    var tile;
    // we go top-to-down instead of left-to-right to make image displayed from top to
    // doesn in the browser
    for(innerY = 0; innerY < options.toHeight; innerY += innerTileHeight)for(innerX = 0; innerX < options.toWidth; innerX += innerTileWidth){
        x = innerX - options.destTileBorder;
        if (x < 0) x = 0;
        toTileWidth = innerX + innerTileWidth + options.destTileBorder - x;
        if (x + toTileWidth >= options.toWidth) toTileWidth = options.toWidth - x;
        y = innerY - options.destTileBorder;
        if (y < 0) y = 0;
        toTileHeight = innerY + innerTileHeight + options.destTileBorder - y;
        if (y + toTileHeight >= options.toHeight) toTileHeight = options.toHeight - y;
        tile = {
            toX: x,
            toY: y,
            toWidth: toTileWidth,
            toHeight: toTileHeight,
            toInnerX: innerX,
            toInnerY: innerY,
            toInnerWidth: innerTileWidth,
            toInnerHeight: innerTileHeight,
            offsetX: x / scaleX - $9fdb8dda61998012$var$pixelFloor(x / scaleX),
            offsetY: y / scaleY - $9fdb8dda61998012$var$pixelFloor(y / scaleY),
            scaleX: scaleX,
            scaleY: scaleY,
            x: $9fdb8dda61998012$var$pixelFloor(x / scaleX),
            y: $9fdb8dda61998012$var$pixelFloor(y / scaleY),
            width: $9fdb8dda61998012$var$pixelCeil(toTileWidth / scaleX),
            height: $9fdb8dda61998012$var$pixelCeil(toTileHeight / scaleY)
        };
        tiles.push(tile);
    }
    return tiles;
};



var $5zZT4 = parcelRequire("5zZT4");
// Deduplicate pools & limiters with the same configs
// when user creates multiple pica instances.
const $ed498a97b604fad5$var$singletones = {};
let $ed498a97b604fad5$var$NEED_SAFARI_FIX = false;
try {
    if (typeof navigator !== "undefined" && navigator.userAgent) $ed498a97b604fad5$var$NEED_SAFARI_FIX = navigator.userAgent.indexOf("Safari") >= 0;
} catch (e) {}
let $ed498a97b604fad5$var$concurrency = 1;
if (typeof navigator !== "undefined") $ed498a97b604fad5$var$concurrency = Math.min(navigator.hardwareConcurrency || 1, 4);
const $ed498a97b604fad5$var$DEFAULT_PICA_OPTS = {
    tile: 1024,
    concurrency: $ed498a97b604fad5$var$concurrency,
    features: [
        "js",
        "wasm",
        "ww"
    ],
    idle: 2000,
    createCanvas: function(width, height) {
        let tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = width;
        tmpCanvas.height = height;
        return tmpCanvas;
    }
};
const $ed498a97b604fad5$var$DEFAULT_RESIZE_OPTS = {
    filter: "mks2013",
    unsharpAmount: 0,
    unsharpRadius: 0.0,
    unsharpThreshold: 0
};
let $ed498a97b604fad5$var$CAN_NEW_IMAGE_DATA = false;
let $ed498a97b604fad5$var$CAN_CREATE_IMAGE_BITMAP = false;
let $ed498a97b604fad5$var$CAN_USE_CANVAS_GET_IMAGE_DATA = false;
let $ed498a97b604fad5$var$CAN_USE_OFFSCREEN_CANVAS = false;
let $ed498a97b604fad5$var$CAN_USE_CIB_REGION_FOR_IMAGE = false;
function $ed498a97b604fad5$var$workerFabric() {
    return {
        value: (parcelRequire("2DSRQ"))($543b1585e1d06a1b$exports),
        destroy: function() {
            this.value.terminate();
            if (typeof window !== "undefined") {
                let url = window.URL || window.webkitURL || window.mozURL || window.msURL;
                if (url && url.revokeObjectURL && this.value.objectURL) url.revokeObjectURL(this.value.objectURL);
            }
        }
    };
}
////////////////////////////////////////////////////////////////////////////////
// API methods
function $ed498a97b604fad5$var$Pica(options) {
    if (!(this instanceof $ed498a97b604fad5$var$Pica)) return new $ed498a97b604fad5$var$Pica(options);
    this.options = $fQtfM({}, $ed498a97b604fad5$var$DEFAULT_PICA_OPTS, options || {});
    let limiter_key = `lk_${this.options.concurrency}`;
    // Share limiters to avoid multiple parallel workers when user creates
    // multiple pica instances.
    this.__limit = $ed498a97b604fad5$var$singletones[limiter_key] || $6bdc296e5fb8780b$export$28da6b3f303613d5(this.options.concurrency);
    if (!$ed498a97b604fad5$var$singletones[limiter_key]) $ed498a97b604fad5$var$singletones[limiter_key] = this.__limit;
    // List of supported features, according to options & browser/node.js
    this.features = {
        js: false,
        wasm: false,
        cib: false,
        ww: false // webworkers
    };
    this.__workersPool = null;
    // Store requested features for webworkers
    this.__requested_features = [];
    this.__mathlib = null;
}

$ed498a97b604fad5$var$Pica.prototype.init = function() {
    if (this.__initPromise) return this.__initPromise;
    // Test if we can create ImageData without canvas and memory copy
    if (typeof ImageData !== "undefined" && typeof Uint8ClampedArray !== "undefined") try {
        /* eslint-disable no-new */ new ImageData(new Uint8ClampedArray(400), 10, 10);
        $ed498a97b604fad5$var$CAN_NEW_IMAGE_DATA = true;
    } catch (__) {}
    // ImageBitmap can be effective in 2 places:
    //
    // 1. Threaded jpeg unpack (basic)
    // 2. Built-in resize (blocked due problem in chrome, see issue #89)
    //
    // For basic use we also need ImageBitmap wo support .close() method,
    // see https://developer.mozilla.org/ru/docs/Web/API/ImageBitmap
    if (typeof ImageBitmap !== "undefined") {
        if (ImageBitmap.prototype && ImageBitmap.prototype.close) $ed498a97b604fad5$var$CAN_CREATE_IMAGE_BITMAP = true;
        else this.debug("ImageBitmap does not support .close(), disabled");
    }
    let features = this.options.features.slice();
    if (features.indexOf("all") >= 0) features = [
        "cib",
        "wasm",
        "js",
        "ww"
    ];
    this.__requested_features = features;
    this.__mathlib = new $19T8x(features);
    // Check WebWorker support if requested
    if (features.indexOf("ww") >= 0) {
        if (typeof window !== "undefined" && "Worker" in window) // IE <= 11 don't allow to create webworkers from string. We should check it.
        // https://connect.microsoft.com/IE/feedback/details/801810/web-workers-from-blob-urls-in-ie-10-and-11
        try {
            let wkr = (parcelRequire("2DSRQ"))(function() {});
            wkr.terminate();
            this.features.ww = true;
            // pool uniqueness depends on pool config + webworker config
            let wpool_key = `wp_${JSON.stringify(this.options)}`;
            if ($ed498a97b604fad5$var$singletones[wpool_key]) this.__workersPool = $ed498a97b604fad5$var$singletones[wpool_key];
            else {
                this.__workersPool = new $94c4dfcdb6943aaf$exports($ed498a97b604fad5$var$workerFabric, this.options.idle);
                $ed498a97b604fad5$var$singletones[wpool_key] = this.__workersPool;
            }
        } catch (__) {}
    }
    let initMath = this.__mathlib.init().then((mathlib)=>{
        // Copy detected features
        $fQtfM(this.features, mathlib.features);
    });
    let checkCibResize;
    if (!$ed498a97b604fad5$var$CAN_CREATE_IMAGE_BITMAP) checkCibResize = Promise.resolve(false);
    else checkCibResize = $6bdc296e5fb8780b$export$7f9fc0f6196598f6(this.options.createCanvas).then((status)=>{
        if (this.features.cib && features.indexOf("cib") < 0) {
            this.debug("createImageBitmap() resize supported, but disabled by config");
            return;
        }
        if (features.indexOf("cib") >= 0) this.features.cib = status;
    });
    $ed498a97b604fad5$var$CAN_USE_CANVAS_GET_IMAGE_DATA = $6bdc296e5fb8780b$export$db38455243ada99e(this.options.createCanvas);
    let checkOffscreenCanvas;
    if ($ed498a97b604fad5$var$CAN_CREATE_IMAGE_BITMAP && $ed498a97b604fad5$var$CAN_NEW_IMAGE_DATA && features.indexOf("ww") !== -1) checkOffscreenCanvas = $6bdc296e5fb8780b$export$6c0e957e50473ced();
    else checkOffscreenCanvas = Promise.resolve(false);
    checkOffscreenCanvas = checkOffscreenCanvas.then((result)=>{
        $ed498a97b604fad5$var$CAN_USE_OFFSCREEN_CANVAS = result;
    });
    // we use createImageBitmap to crop image data and pass it to workers,
    // so need to check whether function works correctly;
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
    let checkCibRegion = $6bdc296e5fb8780b$export$aff86d9eea48781e().then((result)=>{
        $ed498a97b604fad5$var$CAN_USE_CIB_REGION_FOR_IMAGE = result;
    });
    // Init math lib. That's async because can load some
    this.__initPromise = Promise.all([
        initMath,
        checkCibResize,
        checkOffscreenCanvas,
        checkCibRegion
    ]).then(()=>this);
    return this.__initPromise;
};
// Call resizer in webworker or locally, depending on config
$ed498a97b604fad5$var$Pica.prototype.__invokeResize = function(tileOpts, opts) {
    // Share cache between calls:
    //
    // - wasm instance
    // - wasm memory object
    //
    opts.__mathCache = opts.__mathCache || {};
    return Promise.resolve().then(()=>{
        if (!this.features.ww) // not possible to have ImageBitmap here if user disabled WW
        return {
            data: this.__mathlib.resizeAndUnsharp(tileOpts, opts.__mathCache)
        };
        return new Promise((resolve, reject)=>{
            let w = this.__workersPool.acquire();
            if (opts.cancelToken) opts.cancelToken.catch((err)=>reject(err));
            w.value.onmessage = (ev)=>{
                w.release();
                if (ev.data.err) reject(ev.data.err);
                else resolve(ev.data);
            };
            let transfer = [];
            if (tileOpts.src) transfer.push(tileOpts.src.buffer);
            if (tileOpts.srcBitmap) transfer.push(tileOpts.srcBitmap);
            w.value.postMessage({
                opts: tileOpts,
                features: this.__requested_features,
                preload: {
                    wasm_nodule: this.__mathlib.__
                }
            }, transfer);
        });
    });
};
// this function can return promise if createImageBitmap is used
$ed498a97b604fad5$var$Pica.prototype.__extractTileData = function(tile, from, opts, stageEnv, extractTo) {
    if (this.features.ww && $ed498a97b604fad5$var$CAN_USE_OFFSCREEN_CANVAS && // createImageBitmap doesn't work for images (Image, ImageBitmap) with Exif orientation in Chrome,
    // can use canvas because canvas doesn't have orientation;
    // see https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
    ($6bdc296e5fb8780b$export$4b05d74c82e4c4d2(from) || $ed498a97b604fad5$var$CAN_USE_CIB_REGION_FOR_IMAGE)) {
        this.debug("Create tile for OffscreenCanvas");
        return createImageBitmap(stageEnv.srcImageBitmap || from, tile.x, tile.y, tile.width, tile.height).then((bitmap)=>{
            extractTo.srcBitmap = bitmap;
            return extractTo;
        });
    }
    // Extract tile RGBA buffer, depending on input type
    if ($6bdc296e5fb8780b$export$4b05d74c82e4c4d2(from)) {
        if (!stageEnv.srcCtx) stageEnv.srcCtx = from.getContext("2d");
        // If input is Canvas - extract region data directly
        this.debug("Get tile pixel data");
        extractTo.src = stageEnv.srcCtx.getImageData(tile.x, tile.y, tile.width, tile.height).data;
        return extractTo;
    }
    // If input is Image or decoded to ImageBitmap,
    // draw region to temporary canvas and extract data from it
    //
    // Note! Attempt to reuse this canvas causes significant slowdown in chrome
    //
    this.debug("Draw tile imageBitmap/image to temporary canvas");
    let tmpCanvas = this.options.createCanvas(tile.width, tile.height);
    let tmpCtx = tmpCanvas.getContext("2d");
    tmpCtx.globalCompositeOperation = "copy";
    tmpCtx.drawImage(stageEnv.srcImageBitmap || from, tile.x, tile.y, tile.width, tile.height, 0, 0, tile.width, tile.height);
    this.debug("Get tile pixel data");
    extractTo.src = tmpCtx.getImageData(0, 0, tile.width, tile.height).data;
    // Safari 12 workaround
    // https://github.com/nodeca/pica/issues/199
    tmpCanvas.width = tmpCanvas.height = 0;
    return extractTo;
};
$ed498a97b604fad5$var$Pica.prototype.__landTileData = function(tile, result, stageEnv) {
    let toImageData;
    this.debug("Convert raw rgba tile result to ImageData");
    if (result.bitmap) {
        stageEnv.toCtx.drawImage(result.bitmap, tile.toX, tile.toY);
        return null;
    }
    if ($ed498a97b604fad5$var$CAN_NEW_IMAGE_DATA) // this branch is for modern browsers
    // If `new ImageData()` & Uint8ClampedArray suported
    toImageData = new ImageData(new Uint8ClampedArray(result.data), tile.toWidth, tile.toHeight);
    else {
        // fallback for `node-canvas` and old browsers
        // (IE11 has ImageData but does not support `new ImageData()`)
        toImageData = stageEnv.toCtx.createImageData(tile.toWidth, tile.toHeight);
        if (toImageData.data.set) toImageData.data.set(result.data);
        else // IE9 don't have `.set()`
        for(let i = toImageData.data.length - 1; i >= 0; i--)toImageData.data[i] = result.data[i];
    }
    this.debug("Draw tile");
    if ($ed498a97b604fad5$var$NEED_SAFARI_FIX) // Safari draws thin white stripes between tiles without this fix
    stageEnv.toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth + 1e-5, tile.toInnerHeight + 1e-5);
    else stageEnv.toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth, tile.toInnerHeight);
    return null;
};
$ed498a97b604fad5$var$Pica.prototype.__tileAndResize = function(from, to, opts) {
    let stageEnv = {
        srcCtx: null,
        srcImageBitmap: null,
        isImageBitmapReused: false,
        toCtx: null
    };
    const processTile = (tile)=>this.__limit(()=>{
            if (opts.canceled) return opts.cancelToken;
            let tileOpts = {
                width: tile.width,
                height: tile.height,
                toWidth: tile.toWidth,
                toHeight: tile.toHeight,
                scaleX: tile.scaleX,
                scaleY: tile.scaleY,
                offsetX: tile.offsetX,
                offsetY: tile.offsetY,
                filter: opts.filter,
                unsharpAmount: opts.unsharpAmount,
                unsharpRadius: opts.unsharpRadius,
                unsharpThreshold: opts.unsharpThreshold
            };
            this.debug("Invoke resize math");
            return Promise.resolve(tileOpts).then((tileOpts)=>this.__extractTileData(tile, from, opts, stageEnv, tileOpts)).then((tileOpts)=>{
                this.debug("Invoke resize math");
                return this.__invokeResize(tileOpts, opts);
            }).then((result)=>{
                if (opts.canceled) return opts.cancelToken;
                stageEnv.srcImageData = null;
                return this.__landTileData(tile, result, stageEnv);
            });
        });
    // Need to normalize data source first. It can be canvas or image.
    // If image - try to decode in background if possible
    return Promise.resolve().then(()=>{
        stageEnv.toCtx = to.getContext("2d");
        if ($6bdc296e5fb8780b$export$4b05d74c82e4c4d2(from)) return null;
        if ($6bdc296e5fb8780b$export$4c394cd787f4a4b7(from)) {
            stageEnv.srcImageBitmap = from;
            stageEnv.isImageBitmapReused = true;
            return null;
        }
        if ($6bdc296e5fb8780b$export$fb85bc5d6d9ef19b(from)) {
            // try do decode image in background for faster next operations;
            // if we're using offscreen canvas, cib is called per tile, so not needed here
            if (!$ed498a97b604fad5$var$CAN_CREATE_IMAGE_BITMAP) return null;
            this.debug("Decode image via createImageBitmap");
            return createImageBitmap(from).then((imageBitmap)=>{
                stageEnv.srcImageBitmap = imageBitmap;
            })// Suppress error to use fallback, if method fails
            // https://github.com/nodeca/pica/issues/190
            /* eslint-disable no-unused-vars */ .catch((e)=>null);
        }
        throw new Error('Pica: ".from" should be Image, Canvas or ImageBitmap');
    }).then(()=>{
        if (opts.canceled) return opts.cancelToken;
        this.debug("Calculate tiles");
        //
        // Here we are with "normalized" source,
        // follow to tiling
        //
        let regions = $9fdb8dda61998012$exports({
            width: opts.width,
            height: opts.height,
            srcTileSize: this.options.tile,
            toWidth: opts.toWidth,
            toHeight: opts.toHeight,
            destTileBorder: opts.__destTileBorder
        });
        let jobs = regions.map((tile)=>processTile(tile));
        function cleanup(stageEnv) {
            if (stageEnv.srcImageBitmap) {
                if (!stageEnv.isImageBitmapReused) stageEnv.srcImageBitmap.close();
                stageEnv.srcImageBitmap = null;
            }
        }
        this.debug("Process tiles");
        return Promise.all(jobs).then(()=>{
            this.debug("Finished!");
            cleanup(stageEnv);
            return to;
        }, (err)=>{
            cleanup(stageEnv);
            throw err;
        });
    });
};
$ed498a97b604fad5$var$Pica.prototype.__processStages = function(stages, from, to, opts) {
    if (opts.canceled) return opts.cancelToken;
    let [toWidth, toHeight] = stages.shift();
    let isLastStage = stages.length === 0;
    // Optimization for legacy filters -
    // only use user-defined quality for the last stage,
    // use simpler (Hamming) filter for the first stages where
    // scale factor is large enough (more than 2-3)
    //
    // For advanced filters (mks2013 and custom) - skip optimization,
    // because need to apply sharpening every time
    let filter;
    if (isLastStage || $5zZT4.q2f.indexOf(opts.filter) < 0) filter = opts.filter;
    else if (opts.filter === "box") filter = "box";
    else filter = "hamming";
    opts = $fQtfM({}, opts, {
        toWidth: toWidth,
        toHeight: toHeight,
        filter: filter
    });
    let tmpCanvas;
    if (!isLastStage) // create temporary canvas
    tmpCanvas = this.options.createCanvas(toWidth, toHeight);
    return this.__tileAndResize(from, isLastStage ? to : tmpCanvas, opts).then(()=>{
        if (isLastStage) return to;
        opts.width = toWidth;
        opts.height = toHeight;
        return this.__processStages(stages, tmpCanvas, to, opts);
    }).then((res)=>{
        if (tmpCanvas) // Safari 12 workaround
        // https://github.com/nodeca/pica/issues/199
        tmpCanvas.width = tmpCanvas.height = 0;
        return res;
    });
};
$ed498a97b604fad5$var$Pica.prototype.__resizeViaCreateImageBitmap = function(from, to, opts) {
    let toCtx = to.getContext("2d");
    this.debug("Resize via createImageBitmap()");
    return createImageBitmap(from, {
        resizeWidth: opts.toWidth,
        resizeHeight: opts.toHeight,
        resizeQuality: $6bdc296e5fb8780b$export$adfbffb03f386655($5zZT4.f2q[opts.filter])
    }).then((imageBitmap)=>{
        if (opts.canceled) return opts.cancelToken;
        // if no unsharp - draw directly to output canvas
        if (!opts.unsharpAmount) {
            toCtx.drawImage(imageBitmap, 0, 0);
            imageBitmap.close();
            toCtx = null;
            this.debug("Finished!");
            return to;
        }
        this.debug("Unsharp result");
        let tmpCanvas = this.options.createCanvas(opts.toWidth, opts.toHeight);
        let tmpCtx = tmpCanvas.getContext("2d");
        tmpCtx.drawImage(imageBitmap, 0, 0);
        imageBitmap.close();
        let iData = tmpCtx.getImageData(0, 0, opts.toWidth, opts.toHeight);
        this.__mathlib.unsharp_mask(iData.data, opts.toWidth, opts.toHeight, opts.unsharpAmount, opts.unsharpRadius, opts.unsharpThreshold);
        toCtx.putImageData(iData, 0, 0);
        // Safari 12 workaround
        // https://github.com/nodeca/pica/issues/199
        tmpCanvas.width = tmpCanvas.height = 0;
        iData = tmpCtx = tmpCanvas = toCtx = null;
        this.debug("Finished!");
        return to;
    });
};
$ed498a97b604fad5$var$Pica.prototype.resize = function(from, to, options) {
    this.debug("Start resize...");
    let opts = $fQtfM({}, $ed498a97b604fad5$var$DEFAULT_RESIZE_OPTS);
    if (!isNaN(options)) opts = $fQtfM(opts, {
        quality: options
    });
    else if (options) opts = $fQtfM(opts, options);
    opts.toWidth = to.width;
    opts.toHeight = to.height;
    opts.width = from.naturalWidth || from.width;
    opts.height = from.naturalHeight || from.height;
    // Legacy `.quality` option
    if (Object.prototype.hasOwnProperty.call(opts, "quality")) {
        if (opts.quality < 0 || opts.quality > 3) throw new Error(`Pica: .quality should be [0..3], got ${opts.quality}`);
        opts.filter = $5zZT4.q2f[opts.quality];
    }
    // Prevent stepper from infinite loop
    if (to.width === 0 || to.height === 0) return Promise.reject(new Error(`Invalid output size: ${to.width}x${to.height}`));
    if (opts.unsharpRadius > 2) opts.unsharpRadius = 2;
    opts.canceled = false;
    if (opts.cancelToken) // Wrap cancelToken to avoid successive resolve & set flag
    opts.cancelToken = opts.cancelToken.then((data)=>{
        opts.canceled = true;
        throw data;
    }, (err)=>{
        opts.canceled = true;
        throw err;
    });
    let DEST_TILE_BORDER = 3; // Max possible filter window size
    opts.__destTileBorder = Math.ceil(Math.max(DEST_TILE_BORDER, 2.5 * opts.unsharpRadius | 0));
    return this.init().then(()=>{
        if (opts.canceled) return opts.cancelToken;
        // if createImageBitmap supports resize, just do it and return
        if (this.features.cib) {
            if ($5zZT4.q2f.indexOf(opts.filter) >= 0) return this.__resizeViaCreateImageBitmap(from, to, opts);
            this.debug("cib is enabled, but not supports provided filter, fallback to manual math");
        }
        if (!$ed498a97b604fad5$var$CAN_USE_CANVAS_GET_IMAGE_DATA) {
            let err = new Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");
            err.code = "ERR_GET_IMAGE_DATA";
            throw err;
        }
        //
        // No easy way, let's resize manually via arrays
        //
        let stages = $3e156945344d4dd4$exports(opts.width, opts.height, opts.toWidth, opts.toHeight, this.options.tile, opts.__destTileBorder);
        return this.__processStages(stages, from, to, opts);
    });
};
// RGBA buffer resize
//
$ed498a97b604fad5$var$Pica.prototype.resizeBuffer = function(options) {
    const opts = $fQtfM({}, $ed498a97b604fad5$var$DEFAULT_RESIZE_OPTS, options);
    // Legacy `.quality` option
    if (Object.prototype.hasOwnProperty.call(opts, "quality")) {
        if (opts.quality < 0 || opts.quality > 3) throw new Error(`Pica: .quality should be [0..3], got ${opts.quality}`);
        opts.filter = $5zZT4.q2f[opts.quality];
    }
    return this.init().then(()=>this.__mathlib.resizeAndUnsharp(opts));
};
$ed498a97b604fad5$var$Pica.prototype.toBlob = function(canvas, mimeType, quality) {
    mimeType = mimeType || "image/png";
    return new Promise((resolve)=>{
        if (canvas.toBlob) {
            canvas.toBlob((blob)=>resolve(blob), mimeType, quality);
            return;
        }
        if (canvas.convertToBlob) {
            resolve(canvas.convertToBlob({
                type: mimeType,
                quality: quality
            }));
            return;
        }
        // Fallback for old browsers
        const asString = atob(canvas.toDataURL(mimeType, quality).split(",")[1]);
        const len = asString.length;
        const asBuffer = new Uint8Array(len);
        for(let i = 0; i < len; i++)asBuffer[i] = asString.charCodeAt(i);
        resolve(new Blob([
            asBuffer
        ], {
            type: mimeType
        }));
    });
};
$ed498a97b604fad5$var$Pica.prototype.debug = function() {};
$ed498a97b604fad5$exports = $ed498a97b604fad5$var$Pica;


/**
 * @typedef {{x: number, y: number}} Tuple
 */ class $d63ce871ef98b138$var$CanvasUtil {
    /**
     * @param image {Image|HTMLImageElement}
     * @param width {number}
     * @param height {number}
     * @param options {{
     *     sx: {number},
     *     sy: {number},
     *     sw: {number},
     *     sh: {number},
     * }}
     * @return {Uint8ClampedArray}
     */ async resizeImageAndGetData(image, width, height, options = {}) {
        let canvas = await this.resizeImage(image, width, height, options);
        const ctx = canvas.getContext("2d");
        return ctx.getImageData(0, 0, width, height).data;
    }
    async resizeImage(image, width, height, options) {
        const { sx: sx , sy: sy , sw: sw , sh: sh  } = options;
        if (typeof window !== "undefined") image.setAttribute("crossOrigin", "Anonymous");
        let fromCanvas = this.getImageCanvas(image, sx, sy, sw, sh);
        let toCanvas;
        let pica;
        if (typeof window === "undefined") {
            // This is not a browser, use the canvas package
            toCanvas = (0, $60ae514bd74eb968$export$cd3d1f114b139967)(width, height);
            toCanvas.width = width;
            toCanvas.height = height;
            // Trick pica into thinking that this is a normal HTML cavas
            fromCanvas[Symbol.toStringTag] = "HTMLCanvasElement";
            pica = new (0, (/*@__PURE__*/$parcel$interopDefault($ed498a97b604fad5$exports)))({
                tile: 1024,
                concurrency: 1,
                features: [
                    "js"
                ],
                idle: 2000,
                createCanvas: $60ae514bd74eb968$export$cd3d1f114b139967
            });
        } else {
            function browserCreateCanvas(width, height) {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                return canvas;
            }
            pica = new (0, (/*@__PURE__*/$parcel$interopDefault($ed498a97b604fad5$exports)))({
                tile: 1024,
                concurrency: 1,
                features: [
                    "js",
                    "wasm"
                ],
                idle: 2000,
                browserCreateCanvas: browserCreateCanvas
            });
            toCanvas = browserCreateCanvas(width, height);
        }
        await pica.resize(fromCanvas, toCanvas);
        return toCanvas;
    }
    getImageCanvas(image, sx, sy, sw, sh) {
        if (Object.prototype.toString.call(image) === "[object HTMLCanvasElement]" && sx === undefined) return image;
        const canvas = typeof window === "undefined" ? (0, $60ae514bd74eb968$export$cd3d1f114b139967)(sw || image.width, sh || image.height) : document.createElement("canvas");
        canvas.width = image.naturalWidth || sw;
        canvas.height = image.naturalHeight || sh;
        const ctx = canvas.getContext("2d");
        if (sx !== undefined) {
            const sCtx = image.getContext("2d");
            const imageData = sCtx.getImageData(sx, sy, sw, sh);
            canvas[Symbol.toStringTag] = "HTMLCanvasElement";
            ctx.putImageData(imageData, 0, 0);
        } else ctx.drawImage(image, 0, 0);
        return canvas;
    }
}
const $d63ce871ef98b138$export$b800e0a7c023911d = new $d63ce871ef98b138$var$CanvasUtil();
class $d63ce871ef98b138$var$GrayScaleConverter {
    /**
     *
     * RGBA -> L (ITU-R 601-2 luma transform)
     *
     * @param imgData {Uint8ClampedArray}
     */ convert(imgData) {
        const arr = new Uint8ClampedArray(imgData.length / 4);
        for(let i = 0; i < imgData.length; i += 4)arr[i >> 2] = Math.round(imgData[i] * 299 / 1000 + imgData[i + 1] * 587 / 1000 + imgData[i + 2] * 114 / 1000);
        return arr;
    }
}
const $d63ce871ef98b138$export$a0eca36e8a395edb = new $d63ce871ef98b138$var$GrayScaleConverter();


class $697e84c2185d0db8$export$8d4a4db4f3b072e1 {
    binArray;
    /**
     * @param binArray {Uint8ClampedArray}
     */ constructor(binArray){
        this.binArray = binArray;
    }
    static fromBase64(s) {
        const buf = atob(s);
        const arr = new Uint8ClampedArray(buf.length * 8);
        for(let i = 0; i < buf.length; i++){
            const c = buf.charCodeAt(i);
            arr[i * 8] = c & 0x01;
            arr[i * 8 + 1] = (c & 0x02) >> 1;
            arr[i * 8 + 2] = (c & 0x04) >> 2;
            arr[i * 8 + 3] = (c & 0x08) >> 3;
            arr[i * 8 + 4] = (c & 0x10) >> 4;
            arr[i * 8 + 5] = (c & 0x20) >> 5;
            arr[i * 8 + 6] = (c & 0x40) >> 6;
            arr[i * 8 + 7] = (c & 0x80) >> 7;
        }
        return new $697e84c2185d0db8$export$8d4a4db4f3b072e1(arr);
    }
    static fromHexStringReversed(s) {
        if (s.length % 2 !== 0) throw Error("hex string length must be a multiple of 2");
        const arr = new Uint8ClampedArray(s.length * 4);
        for(let i = 0; i < s.length; i += 2){
            const c = Number.parseInt(s.slice(i, i + 2), 16);
            if (Number.isNaN(c)) throw Error("Invalid hex string");
            arr[i * 4] = (c & 0x80) >> 7;
            arr[i * 4 + 1] = (c & 0x40) >> 6;
            arr[i * 4 + 2] = (c & 0x20) >> 5;
            arr[i * 4 + 3] = (c & 0x10) >> 4;
            arr[i * 4 + 4] = (c & 0x08) >> 3;
            arr[i * 4 + 5] = (c & 0x04) >> 2;
            arr[i * 4 + 6] = (c & 0x02) >> 1;
            arr[i * 4 + 7] = c & 0x01;
        }
        return new $697e84c2185d0db8$export$8d4a4db4f3b072e1(arr);
    }
    static fromHexString(s) {
        if (s.length % 2 !== 0) throw Error("hex string length must be a multiple of 2");
        const arr = new Uint8ClampedArray(s.length * 4);
        for(let i = 0; i < s.length; i += 2){
            const c = Number.parseInt(s.slice(i, i + 2), 16);
            if (Number.isNaN(c)) throw Error("Invalid hex string");
            arr[i * 4] = c & 0x01;
            arr[i * 4 + 1] = (c & 0x02) >> 1;
            arr[i * 4 + 2] = (c & 0x04) >> 2;
            arr[i * 4 + 3] = (c & 0x08) >> 3;
            arr[i * 4 + 4] = (c & 0x10) >> 4;
            arr[i * 4 + 5] = (c & 0x20) >> 5;
            arr[i * 4 + 6] = (c & 0x40) >> 6;
            arr[i * 4 + 7] = (c & 0x80) >> 7;
        }
        return new $697e84c2185d0db8$export$8d4a4db4f3b072e1(arr);
    }
    toHexStringReversed() {
        let str = "";
        for(let i = 0; i < this.binArray.length; i += 8){
            const c = this.binArray[i] << 7 | this.binArray[i + 1] << 6 | this.binArray[i + 2] << 5 | this.binArray[i + 3] << 4 | this.binArray[i + 4] << 3 | this.binArray[i + 5] << 2 | this.binArray[i + 6] << 1 | this.binArray[i + 7];
            str += c.toString(16).padStart(2, "0");
        }
        return str;
    }
    toHexString() {
        let str = "";
        for(let i = 0; i < this.binArray.length; i += 8){
            const c = this.binArray[i] | this.binArray[i + 1] << 1 | this.binArray[i + 2] << 2 | this.binArray[i + 3] << 3 | this.binArray[i + 4] << 4 | this.binArray[i + 5] << 5 | this.binArray[i + 6] << 6 | this.binArray[i + 7] << 7;
            str += c.toString(16).padStart(2, "0");
        }
        return str;
    }
    toBase64() {
        let buf = [];
        for(let i = 0; i < this.binArray.length; i += 8)buf.push(this.binArray[i] | this.binArray[i + 1] << 1 | this.binArray[i + 2] << 2 | this.binArray[i + 3] << 3 | this.binArray[i + 4] << 4 | this.binArray[i + 5] << 5 | this.binArray[i + 6] << 6 | this.binArray[i + 7] << 7);
        return btoa(String.fromCharCode(...new Uint8Array(buf)));
    }
    /**
     * @param hash {ImageHash}
     * @returns number
     */ hammingDistance(hash) {
        if (hash.binArray.length !== this.binArray.length) throw new Error("Cannot compare two ImageHash instances of different sizes");
        let distance = 0;
        for(let i = 0; i < this.binArray.length; i++)if (this.binArray[i] !== hash.binArray[i]) distance += 1;
        return distance;
    }
}
class $697e84c2185d0db8$export$88a288ed7909ebd3 {
    constructor(hashes){
        this.segmentHashes = hashes;
    }
    toJSON() {
        return this.segmentHashes.map((h)=>h.toHexString());
    }
    static fromJSON(json) {
        return new $697e84c2185d0db8$export$88a288ed7909ebd3(json.map((s)=>$697e84c2185d0db8$export$8d4a4db4f3b072e1.fromHexString(s)));
    }
    /**
     * @param hash {ImageMultiHash}
     * @param hammingCutoff {number}
     * @return {sum: number, num: number}
     */ hashDiff(hash, hammingCutoff) {
        let sum = 0;
        let num = 0;
        for(let i = 0; i < hash.segmentHashes.length; i++){
            const distances = [];
            for(let j = 0; j < this.segmentHashes.length; j++)distances.push(hash.segmentHashes[i].hammingDistance(this.segmentHashes[j]));
            const minDistance = Math.min(...distances);
            if (minDistance <= hammingCutoff) {
                sum += minDistance;
                num += 1;
            }
        }
        return {
            num: num,
            sum: sum
        };
    }
}


async function $428930f2f5ca011a$export$3ff5a4f04de7e52e(image, size = 8) {
    const pixels = (0, $d63ce871ef98b138$export$a0eca36e8a395edb).convert(await (0, $d63ce871ef98b138$export$b800e0a7c023911d).resizeImageAndGetData(image, size, size));
    const hash = new Uint8ClampedArray(size * size);
    let sum = 0;
    for(let i = 0; i < pixels.length; i++)sum += pixels[i];
    const avg = sum / pixels.length;
    for(let i = 0; i < pixels.length; i++)hash[i] = pixels[i] > avg;
    return new (0, $697e84c2185d0db8$export$8d4a4db4f3b072e1)(hash);
}




async function $7951337d04d39bc5$export$a54d5a9c851b86d5(image, size = 8) {
    const pixels = (0, $d63ce871ef98b138$export$a0eca36e8a395edb).convert(await (0, $d63ce871ef98b138$export$b800e0a7c023911d).resizeImageAndGetData(image, size + 1, size));
    const hash = new Uint8ClampedArray(size * size);
    const nRows = size;
    const nCols = size + 1;
    let offset = 0;
    for(let i = 0; i < nRows; i++)for(let j = 1; j < nCols; j++)hash[offset++] = pixels[i * nCols + j] > pixels[i * nCols + j - 1];
    return new (0, $697e84c2185d0db8$export$8d4a4db4f3b072e1)(hash);
}




const $1b5a4819c0d3ca60$var$cosCache = {};
function $1b5a4819c0d3ca60$var$precomputeCos(L) {
    if (L in $1b5a4819c0d3ca60$var$cosCache) return $1b5a4819c0d3ca60$var$cosCache[L];
    const piOver2L = Math.PI / (2 * L);
    const cos = {};
    for(let u = 0; u < L; u++){
        const uTimesPiOver2L = u * piOver2L;
        for(let x = 0; x < L; x++)cos[(u << 8) + x] = Math.cos((2 * x + 1) * uTimesPiOver2L);
    }
    $1b5a4819c0d3ca60$var$cosCache[L] = cos;
    return cos;
}
/**
 * 2D DCT-II
 * @param matrix Must be a square matrix
 * @return {Array}
 */ function $1b5a4819c0d3ca60$var$dctTransform(matrix) {
    const L = Math.round(Math.sqrt(matrix.length));
    const cos = $1b5a4819c0d3ca60$var$precomputeCos(L);
    const dct = new Array(L * L);
    let _u, _v, sum;
    for(let u = 0; u < L; u++)for(let v = 0; v < L; v++){
        sum = 0;
        _u = u << 8;
        _v = v << 8;
        for(let x = 0; x < L; x++)for(let y = 0; y < L; y++)sum += matrix[x * L + y] * cos[_u + x] * cos[_v + y];
        dct[u * L + v] = sum;
    }
    return dct;
}
function $1b5a4819c0d3ca60$var$median(values) {
    values.sort((a, b)=>a - b);
    return values[Math.floor(values.length / 2)];
}
async function $1b5a4819c0d3ca60$export$1b9f82d63d7325c(image, size = 8, highFrequencyFactor = 4) {
    const imageSize = size * highFrequencyFactor;
    const pixels = (0, $d63ce871ef98b138$export$a0eca36e8a395edb).convert(await (0, $d63ce871ef98b138$export$b800e0a7c023911d).resizeImageAndGetData(image, imageSize, imageSize));
    const dctOut = $1b5a4819c0d3ca60$var$dctTransform(pixels);
    const dctLowFreq = new Float64Array(size * size);
    const sorted = new Float64Array(size * size);
    let ptrLow = 0;
    let ptr = 0;
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            dctLowFreq[ptrLow] = dctOut[ptr];
            sorted[ptrLow] = dctOut[ptr];
            ptrLow += 1;
            ptr += 1;
        }
        ptr += imageSize - size;
    }
    let sum = 0;
    for(let i = 0; i < dctLowFreq.length; i++)sum += dctLowFreq[i];
    const med = $1b5a4819c0d3ca60$var$median(sorted);
    const hash = new Uint8ClampedArray(size * size);
    for(let i = 0; i < hash.length; ++i)hash[i] = dctLowFreq[i] > med;
    return new (0, $697e84c2185d0db8$export$8d4a4db4f3b072e1)(hash);
}





const $5d99fb4c94813a28$var$HaarWavelet = [
    1 / Math.SQRT2,
    1 / Math.SQRT2
];
function $5d99fb4c94813a28$var$waveletFromScalingNumbers(scalingNumbers) {
    const waveletNumbers = scalingNumbers.slice().reverse().map((value, index)=>index % 2 === 0 ? value : -value);
    return {
        dec: {
            low: scalingNumbers.slice(),
            high: waveletNumbers.slice()
        },
        rec: {
            low: scalingNumbers.slice(),
            high: waveletNumbers.slice()
        }
    };
}
const $5d99fb4c94813a28$var$HaarBasis = $5d99fb4c94813a28$var$waveletFromScalingNumbers($5d99fb4c94813a28$var$HaarWavelet);
function $5d99fb4c94813a28$var$getBasis(wavelet) {
    if (wavelet === "haar") return $5d99fb4c94813a28$var$HaarBasis;
    throw new Error("Invalid wavelet");
}
function $5d99fb4c94813a28$var$dot(a, b) {
    /* Calculate dot product. */ return a.reduce((dot, value, index)=>dot + value * b[index], 0);
}
function $5d99fb4c94813a28$var$add(a, b) {
    /* Calculate element-wise sum. */ return a.map((value, index)=>value + b[index]);
}
function $5d99fb4c94813a28$var$mulScalar(scalar, array) {
    return array.map((value)=>scalar * value);
}
function $5d99fb4c94813a28$var$dwt(data, wavelet) {
    const waveletBasis = $5d99fb4c94813a28$var$getBasis(wavelet);
    const filters = waveletBasis.dec;
    const filterLength = filters.low.length;
    let approx = [];
    let detail = [];
    /* Calculate coefficients. */ for(let offset = 0; offset + filterLength <= data.length; offset += 2){
        const values = data.slice(offset, offset + filterLength);
        approx.push($5d99fb4c94813a28$var$dot(values, filters.low));
        detail.push($5d99fb4c94813a28$var$dot(values, filters.high));
    }
    return [
        approx,
        detail
    ];
}
function $5d99fb4c94813a28$var$idwt(approx, detail, waveletBasis) {
    const filters = waveletBasis.rec;
    const filterLength = filters.low.length;
    /* Initialize transform. */ const coeffLength = approx.length;
    let pad = new Array(filterLength + (coeffLength - 1) * 2);
    pad.fill(0);
    /* Perform inverse Discrete Wavelet Transform. */ for(let i = 0; i < coeffLength; i++){
        const offset = 2 * i;
        /* Calculate values. */ let values = pad.slice(offset, offset + filterLength);
        values = $5d99fb4c94813a28$var$add(values, $5d99fb4c94813a28$var$mulScalar(approx[i], filters.low));
        values = $5d99fb4c94813a28$var$add(values, $5d99fb4c94813a28$var$mulScalar(detail[i], filters.high));
        /* Update values. */ pad = pad.slice(0, offset).concat(values).concat(pad.slice(offset + values.length));
    }
    /* Remove padding. */ return pad.slice(filterLength - 2, pad.length - (filterLength - 2));
}
function $5d99fb4c94813a28$var$wavedec(data, wavelet, level) {
    /*  Initialize transform. */ let coeffs = [];
    let approx = data.slice();
    /* Transform. */ for(let i = 0; i < level; i++){
        /* Perform single level transform. */ const approxDetail = $5d99fb4c94813a28$var$dwt(approx, wavelet);
        approx = approxDetail[0];
        /* Prepend detail coefficients. */ coeffs.unshift(approxDetail[1].slice());
    }
    /* Prepend last approximation. */ coeffs.unshift(approx.slice());
    return coeffs;
}
function $5d99fb4c94813a28$var$waverec(coeffs, wavelet) {
    wavelet = $5d99fb4c94813a28$var$getBasis(wavelet);
    let approx = coeffs[0];
    for(let i = 1; i < coeffs.length; i++){
        const detail = coeffs[i];
        if (approx.length === detail.length + 1) approx = approx.slice(0, approx.length - 1);
        approx = $5d99fb4c94813a28$var$idwt(approx, detail, wavelet);
    }
    return approx.slice();
}
function $5d99fb4c94813a28$var$median(values) {
    values.sort((a, b)=>a - b);
    return values[Math.floor(values.length / 2)];
}
function $5d99fb4c94813a28$var$wavedec2(data, wavelet, level) {
    const L = Math.round(Math.sqrt(data.length));
    const rows = new Array(L);
    for(let y = 0; y < L; y++){
        const row = new Array(L);
        for(let x = 0; x < L; x++)row[x] = data[y * L + x];
        rows[y] = row;
    }
    const cols = new Array(L);
    for(let i = 0; i < L; i++)cols[i] = new Array(L);
    // Rows
    for(let y = 0; y < L; y++){
        const coeffs = $5d99fb4c94813a28$var$wavedec(rows[y], "haar", level).flat();
        for(let x = 0; x < L; x++)cols[x][y] = coeffs[x];
    }
    const result = new Array(L * L);
    // Cols
    for(let x = 0; x < L; x++){
        const coeffs = $5d99fb4c94813a28$var$wavedec(cols[x], "haar", level).flat();
        for(let y = 0; y < L; y++)result[y * L + x] = coeffs[y];
    }
    return result;
}
function $5d99fb4c94813a28$var$unflatten(data, level) {
    const result = [];
    const sizes = [];
    let n = data.length;
    for(let i = 0; i < level; i++){
        n /= 2;
        sizes.unshift(n);
    }
    sizes.unshift(n);
    let cur = 0;
    for(let i = 0; i < sizes.length; i++){
        result.push(data.slice(cur, cur + sizes[i]));
        cur += sizes[i];
    }
    return result;
}
function $5d99fb4c94813a28$var$waverec2(data, wavelet, level) {
    const L = Math.round(Math.sqrt(data.length));
    const cols = new Array(L);
    for(let x = 0; x < L; x++){
        const col = new Array(L);
        for(let y = 0; y < L; y++)col[y] = data[y * L + x];
        cols[x] = col;
    }
    const rows = new Array(L);
    for(let i = 0; i < L; i++)rows[i] = new Array(L);
    // Cols
    for(let x = 0; x < L; x++){
        const rec = $5d99fb4c94813a28$var$waverec($5d99fb4c94813a28$var$unflatten(cols[x], level), "haar");
        for(let y = 0; y < L; y++)rows[y][x] = rec[y];
    }
    const result = new Array(L * L);
    // Rows
    for(let y = 0; y < L; y++){
        const rec = $5d99fb4c94813a28$var$waverec($5d99fb4c94813a28$var$unflatten(rows[y], level), "haar");
        for(let x = 0; x < L; x++)result[y * L + x] = rec[x];
    }
    return result;
}
async function $5d99fb4c94813a28$export$75b483db6f260202(image, size = 8, removeMaxHaarLL = true) {
    const imageNaturalScale = 2 ** Math.floor(Math.log2(Math.min(image.naturalWidth, image.naturalHeight)));
    const imageSize = Math.max(imageNaturalScale, size);
    const llMaxLevel = Math.floor(Math.log2(imageSize));
    const level = Math.floor(Math.log2(size));
    const dwtLevel = llMaxLevel - level;
    const pixels = (0, $d63ce871ef98b138$export$a0eca36e8a395edb).convert(await (0, $d63ce871ef98b138$export$b800e0a7c023911d).resizeImageAndGetData(image, imageSize, imageSize));
    let data = new Array(pixels.length);
    for(let i = 0; i < pixels.length; i++)data[i] = pixels[i] / 255;
    if (removeMaxHaarLL) {
        const coeffs = $5d99fb4c94813a28$var$wavedec2(data, "haar", llMaxLevel);
        coeffs[0] = 0;
        data = $5d99fb4c94813a28$var$waverec2(coeffs, "haar", llMaxLevel);
    }
    const result = $5d99fb4c94813a28$var$wavedec2(data, "haar", dwtLevel);
    const ll = new Float64Array(size * size);
    const sorted = new Float64Array(size * size);
    let ptr = 0;
    let ptrLow = 0;
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            ll[ptrLow] = result[ptr];
            sorted[ptrLow] = result[ptr];
            ptr += 1;
            ptrLow += 1;
        }
        ptr += imageSize - size;
    }
    const hash = new Uint8ClampedArray(size * size);
    const med = $5d99fb4c94813a28$var$median(sorted);
    for(let i = 0; i < hash.length; i++)hash[i] = ll[i] > med;
    return new (0, $697e84c2185d0db8$export$8d4a4db4f3b072e1)(hash);
}




const $9d9ba2e8c9d3f75c$var$mulTable = [
    512,
    512,
    456,
    512,
    328,
    456,
    335,
    512,
    405,
    328,
    271,
    456
];
const $9d9ba2e8c9d3f75c$var$shgTable = [
    9,
    11,
    12,
    13,
    13,
    14,
    14,
    15,
    15,
    15,
    15,
    16
];
class $9d9ba2e8c9d3f75c$var$BlurStack {
    r = 0;
    next = null;
}
function $9d9ba2e8c9d3f75c$export$3763232abdebfe34(pixels, width, height, radius) {
    const div = 2 * radius + 1;
    const widthMinus1 = width - 1;
    const heightMinus1 = height - 1;
    const radiusPlus1 = radius + 1;
    const sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    const stackStart = new $9d9ba2e8c9d3f75c$var$BlurStack();
    let stack = stackStart;
    let stackEnd;
    for(let i = 1; i < div; i++){
        stack = stack.next = new $9d9ba2e8c9d3f75c$var$BlurStack();
        if (i === radiusPlus1) stackEnd = stack;
    }
    stack.next = stackStart;
    let stackIn = null;
    let stackOut = null;
    const mulSum = $9d9ba2e8c9d3f75c$var$mulTable[radius];
    const shgSum = $9d9ba2e8c9d3f75c$var$shgTable[radius];
    let p;
    let rbs;
    let yw = 0;
    let yi = 0;
    for(let y = 0; y < height; y++){
        let pr = pixels[yi], rOutSum = radiusPlus1 * pr, rSum = sumFactor * pr;
        stack = stackStart;
        for(let _i5 = 0; _i5 < radiusPlus1; _i5++){
            stack.r = pr;
            stack = stack.next;
        }
        let rInSum = 0;
        for(let _i6 = 1; _i6 < radiusPlus1; _i6++){
            rSum += (stack.r = pr = pixels[yi + (widthMinus1 < _i6 ? widthMinus1 : _i6)]) * (rbs = radiusPlus1 - _i6);
            rInSum += pr;
            stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for(let x = 0; x < width; x++){
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
    for(let _x2 = 0; _x2 < width; _x2++){
        yi = _x2;
        let _pr2 = pixels[yi], _rOutSum2 = radiusPlus1 * _pr2, _rSum2 = sumFactor * _pr2, stack = stackStart;
        for(let _i7 = 0; _i7 < radiusPlus1; _i7++){
            stack.r = _pr2;
            stack = stack.next;
        }
        let _rInSum2 = 0;
        for(let _i8 = 1, yp = width; _i8 <= radius; _i8++){
            yi = yp + _x2;
            _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
            _rInSum2 += _pr2;
            stack = stack.next;
            if (_i8 < heightMinus1) yp += width;
        }
        yi = _x2;
        stackIn = stackStart;
        stackOut = stackEnd;
        for(let _y2 = 0; _y2 < height; _y2++){
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






function $1e7ab61aa659f59a$var$debugSaveImage(pixels, filename, width, height) {
    const rgba = new Uint8ClampedArray(width * height * 4);
    let cur = 0;
    for(let y = 0; y < height; y++)for(let x = 0; x < width; x++){
        const val = pixels[y * height + x];
        rgba[cur++] = val;
        rgba[cur++] = val;
        rgba[cur++] = val;
        rgba[cur++] = 255;
    }
    const canvas = (0, $60ae514bd74eb968$export$cd3d1f114b139967)(width, height);
    const ctx = canvas.getContext("2d");
    const imgData = new (0, $60ae514bd74eb968$exports.ImageData)(rgba, width, height);
    ctx.putImageData(imgData, 0, 0);
    const out = $4eXMr$createWriteStream(filename);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
}
function $1e7ab61aa659f59a$var$findRegion(thresholdPixels, alreadySegmented, size, hill) {
    const region = [];
    const newPixels = [];
    // Find the first pixel available
    for(let i = 0; i < thresholdPixels.length; i++)if (thresholdPixels[i] === hill && alreadySegmented[i] === 0) {
        region.push(i);
        newPixels.push(i);
        alreadySegmented[i] = 1;
        break;
    }
    let top, bottom, left, right, newPixel;
    while(newPixels.length > 0){
        newPixel = newPixels.pop();
        top = newPixel - size;
        if (top > 0 && thresholdPixels[top] === hill && alreadySegmented[top] === 0) {
            region.push(top);
            newPixels.push(top);
            alreadySegmented[top] = 1;
        }
        bottom = newPixel + size;
        if (bottom < thresholdPixels.length && thresholdPixels[bottom] === hill && alreadySegmented[bottom] === 0) {
            region.push(bottom);
            newPixels.push(bottom);
            alreadySegmented[bottom] = 1;
        }
        left = newPixel - 1;
        if (newPixel % size !== 0 && thresholdPixels[left] === hill && alreadySegmented[left] === 0) {
            region.push(left);
            newPixels.push(left);
            alreadySegmented[left] = 1;
        }
        right = newPixel + 1;
        if (right % size !== 0 && thresholdPixels[right] === hill && alreadySegmented[right] === 0) {
            region.push(right);
            newPixels.push(right);
            alreadySegmented[right] = 1;
        }
    }
    return region;
}
function $1e7ab61aa659f59a$var$findAllSegments(pixels, segImgSize, segThreshold, minSegSize) {
    let hillCount = 0;
    const thresholdPixels = new Uint8ClampedArray(pixels.length);
    for(let i = 0; i < pixels.length; i++){
        thresholdPixels[i] = pixels[i] > segThreshold;
        hillCount += pixels[i] > segThreshold;
    }
    const valleyCount = pixels.length - hillCount;
    const segments = [];
    const alreadySegmented = new Uint8ClampedArray(pixels.length);
    // Find all the "hill" regions
    let segmentedCount = 0;
    while(segmentedCount < hillCount){
        const segment = $1e7ab61aa659f59a$var$findRegion(thresholdPixels, alreadySegmented, segImgSize, 1);
        if (segment.length > minSegSize) segments.push(segment);
        segmentedCount += segment.length;
    }
    // Find all the "valley" regions
    segmentedCount = 0;
    while(segmentedCount < valleyCount){
        const segment = $1e7ab61aa659f59a$var$findRegion(thresholdPixels, alreadySegmented, segImgSize, 0);
        if (segment.length > minSegSize) segments.push(segment);
        segmentedCount += segment.length;
    }
    return segments;
}
async function $1e7ab61aa659f59a$export$ac55b039577b3576(image, hashFunc, limitSegments, segmentThreshold = 128, minSegmentSize = 500, segmentationImageSize = 300) {
    if (hashFunc === undefined) hashFunc = (0, $7951337d04d39bc5$export$a54d5a9c851b86d5);
    const imageWidth = image.naturalWidth || image.width;
    const imageHeight = image.naturalHeight || image.height;
    segmentationImageSize = Math.min(imageWidth, imageHeight, segmentationImageSize);
    const imageCanvas = (0, $d63ce871ef98b138$export$b800e0a7c023911d).getImageCanvas(image);
    const pixels = (0, $d63ce871ef98b138$export$a0eca36e8a395edb).convert(await (0, $d63ce871ef98b138$export$b800e0a7c023911d).resizeImageAndGetData(imageCanvas, segmentationImageSize, segmentationImageSize));
    (0, $9d9ba2e8c9d3f75c$export$3763232abdebfe34)(pixels, segmentationImageSize, segmentationImageSize, 4);
    const segments = $1e7ab61aa659f59a$var$findAllSegments(pixels, segmentationImageSize, segmentThreshold, minSegmentSize);
    if (limitSegments) segments.sort((a, b)=>b.length - a.length).splice(limitSegments);
    const scaleW = imageWidth / segmentationImageSize;
    const scaleH = imageHeight / segmentationImageSize;
    const hashPromises = [];
    for(let i = 0; i < segments.length; i++){
        const x = segments[i].map((num)=>num % segmentationImageSize);
        const y = segments[i].map((num)=>num / segmentationImageSize);
        const sx = Math.min(...x);
        const sy = Math.min(...y);
        const sw = Math.max(...x) + 1 - sx;
        const sh = Math.max(...y) + 1 - sy;
        const cropCanvas = (0, $d63ce871ef98b138$export$b800e0a7c023911d).getImageCanvas((0, $d63ce871ef98b138$export$b800e0a7c023911d).getImageCanvas(image), sx * scaleW, sy * scaleH, sw * scaleW, sh * scaleH);
        hashPromises.push(hashFunc(cropCanvas));
    }
    const hashes = await Promise.all(hashPromises);
    return new (0, $697e84c2185d0db8$export$88a288ed7909ebd3)(hashes);
}


if (typeof window !== "undefined") {
    window.ahash = (0, $428930f2f5ca011a$export$3ff5a4f04de7e52e);
    window.dhash = (0, $7951337d04d39bc5$export$a54d5a9c851b86d5);
    window.phash = (0, $1b5a4819c0d3ca60$export$1b9f82d63d7325c);
    window.whash = (0, $5d99fb4c94813a28$export$75b483db6f260202);
    window.cropResistantHash = (0, $1e7ab61aa659f59a$export$ac55b039577b3576);
    window.ImageHash = (0, $697e84c2185d0db8$export$8d4a4db4f3b072e1);
}


export {$428930f2f5ca011a$export$3ff5a4f04de7e52e as ahash, $7951337d04d39bc5$export$a54d5a9c851b86d5 as dhash, $1b5a4819c0d3ca60$export$1b9f82d63d7325c as phash, $5d99fb4c94813a28$export$75b483db6f260202 as whash, $1e7ab61aa659f59a$export$ac55b039577b3576 as cropResistantHash, $697e84c2185d0db8$export$8d4a4db4f3b072e1 as ImageHash};
//# sourceMappingURL=imagehash-web.js.map
