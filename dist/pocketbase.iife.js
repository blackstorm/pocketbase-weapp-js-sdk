var PocketBase = (function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * ClientResponseError is a custom Error class that is intended to wrap
     * and normalize any error thrown by `Client.send()`.
     */
    var ClientResponseError = /** @class */ (function (_super) {
        __extends(ClientResponseError, _super);
        function ClientResponseError(errData) {
            var _this = this;
            var _a, _b, _c, _d;
            _this = _super.call(this, "ClientResponseError") || this;
            _this.url = '';
            _this.status = 0;
            _this.response = {};
            _this.isAbort = false;
            _this.originalError = null;
            // Set the prototype explicitly.
            // https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(_this, ClientResponseError.prototype);
            if (!(errData instanceof ClientResponseError)) {
                _this.originalError = errData;
            }
            if (errData !== null && typeof errData === 'object') {
                _this.url = typeof errData.url === 'string' ? errData.url : '';
                _this.status = typeof errData.status === 'number' ? errData.status : 0;
                _this.response = errData.data !== null && typeof errData.data === 'object' ? errData.data : {};
                _this.isAbort = !!errData.isAbort;
            }
            if (typeof DOMException !== 'undefined' && errData instanceof DOMException) {
                _this.isAbort = true;
            }
            _this.name = "ClientResponseError " + _this.status;
            _this.message = (_a = _this.response) === null || _a === void 0 ? void 0 : _a.message;
            if (!_this.message) {
                if (_this.isAbort) {
                    _this.message = 'The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation.';
                }
                else if ((_d = (_c = (_b = _this.originalError) === null || _b === void 0 ? void 0 : _b.cause) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.includes("ECONNREFUSED ::1")) {
                    _this.message = 'Failed to connect to the PocketBase server. Try changing the SDK URL from localhost to 127.0.0.1 (https://github.com/pocketbase/js-sdk/issues/21).';
                }
                else {
                    _this.message = 'Something went wrong while processing your request.';
                }
            }
            return _this;
        }
        Object.defineProperty(ClientResponseError.prototype, "data", {
            /**
             * Alias for `this.response` to preserve the backward compatibility.
             */
            get: function () {
                return this.response;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Make a POJO's copy of the current error class instance.
         * @see https://github.com/vuex-orm/vuex-orm/issues/255
         */
        ClientResponseError.prototype.toJSON = function () {
            return __assign({}, this);
        };
        return ClientResponseError;
    }(Error));

    /**
     * -------------------------------------------------------------------
     * Simple cookie parse and serialize utilities mostly based on the
     * node module https://github.com/jshttp/cookie.
     * -------------------------------------------------------------------
     */
    /**
     * RegExp to match field-content in RFC 7230 sec 3.2
     *
     * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
     * field-vchar   = VCHAR / obs-text
     * obs-text      = %x80-FF
     */
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    /**
    * Parses the given cookie header string into an object
    * The object has the various cookies as keys(names) => values
    */
    function cookieParse(str, options) {
        var result = {};
        if (typeof str !== 'string') {
            return result;
        }
        var opt = Object.assign({}, options || {});
        var decode = opt.decode || defaultDecode;
        var index = 0;
        while (index < str.length) {
            var eqIdx = str.indexOf('=', index);
            // no more cookie pairs
            if (eqIdx === -1) {
                break;
            }
            var endIdx = str.indexOf(';', index);
            if (endIdx === -1) {
                endIdx = str.length;
            }
            else if (endIdx < eqIdx) {
                // backtrack on prior semicolon
                index = str.lastIndexOf(';', eqIdx - 1) + 1;
                continue;
            }
            var key = str.slice(index, eqIdx).trim();
            // only assign once
            if (undefined === result[key]) {
                var val = str.slice(eqIdx + 1, endIdx).trim();
                // quoted values
                if (val.charCodeAt(0) === 0x22) {
                    val = val.slice(1, -1);
                }
                try {
                    result[key] = decode(val);
                }
                catch (_) {
                    result[key] = val; // no decoding
                }
            }
            index = endIdx + 1;
        }
        return result;
    }
    /**
     * Serialize data into a cookie header.
     *
     * Serialize the a name value pair into a cookie string suitable for
     * http headers. An optional options object specified cookie parameters.
     *
     * ```js
     * cookieSerialize('foo', 'bar', { httpOnly: true }) // "foo=bar; httpOnly"
     * ```
     */
    function cookieSerialize(name, val, options) {
        var opt = Object.assign({}, options || {});
        var encode = opt.encode || defaultEncode;
        if (!fieldContentRegExp.test(name)) {
            throw new TypeError('argument name is invalid');
        }
        var value = encode(val);
        if (value && !fieldContentRegExp.test(value)) {
            throw new TypeError('argument val is invalid');
        }
        var result = name + '=' + value;
        if (opt.maxAge != null) {
            var maxAge = opt.maxAge - 0;
            if (isNaN(maxAge) || !isFinite(maxAge)) {
                throw new TypeError('option maxAge is invalid');
            }
            result += '; Max-Age=' + Math.floor(maxAge);
        }
        if (opt.domain) {
            if (!fieldContentRegExp.test(opt.domain)) {
                throw new TypeError('option domain is invalid');
            }
            result += '; Domain=' + opt.domain;
        }
        if (opt.path) {
            if (!fieldContentRegExp.test(opt.path)) {
                throw new TypeError('option path is invalid');
            }
            result += '; Path=' + opt.path;
        }
        if (opt.expires) {
            if (!isDate(opt.expires) || isNaN(opt.expires.valueOf())) {
                throw new TypeError('option expires is invalid');
            }
            result += '; Expires=' + opt.expires.toUTCString();
        }
        if (opt.httpOnly) {
            result += '; HttpOnly';
        }
        if (opt.secure) {
            result += '; Secure';
        }
        if (opt.priority) {
            var priority = typeof opt.priority === 'string' ? opt.priority.toLowerCase() : opt.priority;
            switch (priority) {
                case 'low':
                    result += '; Priority=Low';
                    break;
                case 'medium':
                    result += '; Priority=Medium';
                    break;
                case 'high':
                    result += '; Priority=High';
                    break;
                default:
                    throw new TypeError('option priority is invalid');
            }
        }
        if (opt.sameSite) {
            var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
            switch (sameSite) {
                case true:
                    result += '; SameSite=Strict';
                    break;
                case 'lax':
                    result += '; SameSite=Lax';
                    break;
                case 'strict':
                    result += '; SameSite=Strict';
                    break;
                case 'none':
                    result += '; SameSite=None';
                    break;
                default:
                    throw new TypeError('option sameSite is invalid');
            }
        }
        return result;
    }
    /**
     * Default URL-decode string value function.
     * Optimized to skip native call when no `%`.
     */
    function defaultDecode(val) {
        return val.indexOf('%') !== -1
            ? decodeURIComponent(val)
            : val;
    }
    /**
     * Default URL-encode value function.
     */
    function defaultEncode(val) {
        return encodeURIComponent(val);
    }
    /**
     * Determines if value is a Date.
     */
    function isDate(val) {
        return (Object.prototype.toString.call(val) === '[object Date]' ||
            val instanceof Date);
    }

    var atobPolyfill;
    if (typeof atob === 'function') {
        atobPolyfill = atob;
    }
    else {
        /**
         * The code was extracted from:
         * https://github.com/davidchambers/Base64.js
         */
        atobPolyfill = function (input) {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var str = String(input).replace(/=+$/, "");
            if (str.length % 4 == 1) {
                throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
            }
            for (
            // initialize result and counters
            var bc = 0, bs, buffer, idx = 0, output = ""; 
            // get next character
            (buffer = str.charAt(idx++)); 
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
                ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                    bc++ % 4) ?
                (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)))) :
                0) {
                // try to find character in table (0-63, not found => -1)
                buffer = chars.indexOf(buffer);
            }
            return output;
        };
    }
    /**
     * Returns JWT token's payload data.
     */
    function getTokenPayload(token) {
        if (token) {
            try {
                var encodedPayload = decodeURIComponent(atobPolyfill(token.split('.')[1]).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(encodedPayload) || {};
            }
            catch (e) {
            }
        }
        return {};
    }
    /**
     * Checks whether a JWT token is expired or not.
     * Tokens without `exp` payload key are considered valid.
     * Tokens with empty payload (eg. invalid token strings) are considered expired.
     *
     * @param token The token to check.
     * @param [expirationThreshold] Time in seconds that will be subtracted from the token `exp` property.
     */
    function isTokenExpired(token, expirationThreshold) {
        if (expirationThreshold === void 0) { expirationThreshold = 0; }
        var payload = getTokenPayload(token);
        if (Object.keys(payload).length > 0 &&
            (!payload.exp || (payload.exp - expirationThreshold) > (Date.now() / 1000))) {
            return false;
        }
        return true;
    }

    var BaseModel = /** @class */ (function () {
        function BaseModel(data) {
            if (data === void 0) { data = {}; }
            this.$load(data || {});
        }
        /**
         * Alias of this.$load(data).
         */
        BaseModel.prototype.load = function (data) {
            return this.$load(data);
        };
        /**
         * Loads `data` into the current model.
         */
        BaseModel.prototype.$load = function (data) {
            for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                this[key] = value;
            }
            // normalize known fields
            this.id = typeof data.id !== 'undefined' ? data.id : '';
            this.created = typeof data.created !== 'undefined' ? data.created : '';
            this.updated = typeof data.updated !== 'undefined' ? data.updated : '';
        };
        Object.defineProperty(BaseModel.prototype, "$isNew", {
            /**
             * Returns whether the current loaded data represent a stored db record.
             */
            get: function () {
                return !this.id;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Alias of this.clone().
         */
        BaseModel.prototype.clone = function () {
            return this.$clone();
        };
        /**
         * Creates a deep clone of the current model.
         */
        BaseModel.prototype.$clone = function () {
            var clone = typeof structuredClone === 'function' ?
                structuredClone(this) : JSON.parse(JSON.stringify(this));
            return new this.constructor(clone);
        };
        /**
         * Alias of this.$export().
         */
        BaseModel.prototype.export = function () {
            return this.$export();
        };
        /**
         * Exports all model properties as a new plain object.
         */
        BaseModel.prototype.$export = function () {
            return typeof structuredClone === 'function' ?
                structuredClone(this) : Object.assign({}, this);
        };
        return BaseModel;
    }());

    var Record = /** @class */ (function (_super) {
        __extends(Record, _super);
        function Record() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        Record.prototype.$load = function (data) {
            _super.prototype.$load.call(this, data);
            // normalize common fields
            this.collectionId = typeof data.collectionId === 'string' ? data.collectionId : '';
            this.collectionName = typeof data.collectionName === 'string' ? data.collectionName : '';
            // normalize expand items
            this._loadExpand(data.expand);
        };
        /**
         * Loads the provided expand items and recursively normalizes each
         * item to a `Record|Array<Record>`.
         */
        Record.prototype._loadExpand = function (expand) {
            expand = expand || {};
            this.expand = {};
            for (var key in expand) {
                if (Array.isArray(expand[key])) {
                    this.expand[key] = expand[key].map(function (data) { return new Record(data || {}); });
                }
                else {
                    this.expand[key] = new Record(expand[key] || {});
                }
            }
        };
        return Record;
    }(BaseModel));

    var Admin = /** @class */ (function (_super) {
        __extends(Admin, _super);
        function Admin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        Admin.prototype.$load = function (data) {
            _super.prototype.$load.call(this, data);
            this.avatar = typeof data.avatar === 'number' ? data.avatar : 0;
            this.email = typeof data.email === 'string' ? data.email : '';
        };
        return Admin;
    }(BaseModel));

    var defaultCookieKey = 'pb_auth';
    /**
     * Base AuthStore class that is intended to be extended by all other
     * PocketBase AuthStore implementations.
     */
    var BaseAuthStore = /** @class */ (function () {
        function BaseAuthStore() {
            this.baseToken = '';
            this.baseModel = null;
            this._onChangeCallbacks = [];
        }
        Object.defineProperty(BaseAuthStore.prototype, "token", {
            /**
             * Retrieves the stored token (if any).
             */
            get: function () {
                return this.baseToken;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseAuthStore.prototype, "model", {
            /**
             * Retrieves the stored model data (if any).
             */
            get: function () {
                return this.baseModel;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseAuthStore.prototype, "isValid", {
            /**
             * Loosely checks if the store has valid token (aka. existing and unexpired exp claim).
             */
            get: function () {
                return !isTokenExpired(this.token);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Saves the provided new token and model data in the auth store.
         */
        BaseAuthStore.prototype.save = function (token, model) {
            this.baseToken = token || '';
            // normalize the model instance
            if (model !== null && typeof model === 'object') {
                this.baseModel = typeof model.collectionId !== 'undefined' ?
                    new Record(model) : new Admin(model);
            }
            else {
                this.baseModel = null;
            }
            this.triggerChange();
        };
        /**
         * Removes the stored token and model data form the auth store.
         */
        BaseAuthStore.prototype.clear = function () {
            this.baseToken = '';
            this.baseModel = null;
            this.triggerChange();
        };
        /**
         * Parses the provided cookie string and updates the store state
         * with the cookie's token and model data.
         *
         * NB! This function doesn't validate the token or its data.
         * Usually this isn't a concern if you are interacting only with the
         * PocketBase API because it has the proper server-side security checks in place,
         * but if you are using the store `isValid` state for permission controls
         * in a node server (eg. SSR), then it is recommended to call `authRefresh()`
         * after loading the cookie to ensure an up-to-date token and model state.
         * For example:
         *
         * ```js
         * pb.authStore.loadFromCookie("cookie string...");
         *
         * try {
         *     // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
         *     pb.authStore.isValid && await pb.collection('users').authRefresh();
         * } catch (_) {
         *     // clear the auth store on failed refresh
         *     pb.authStore.clear();
         * }
         * ```
         */
        BaseAuthStore.prototype.loadFromCookie = function (cookie, key) {
            if (key === void 0) { key = defaultCookieKey; }
            var rawData = cookieParse(cookie || '')[key] || '';
            var data = {};
            try {
                data = JSON.parse(rawData);
                // normalize
                if (typeof data === null || typeof data !== 'object' || Array.isArray(data)) {
                    data = {};
                }
            }
            catch (_) { }
            this.save(data.token || '', data.model || null);
        };
        /**
         * Exports the current store state as cookie string.
         *
         * By default the following optional attributes are added:
         * - Secure
         * - HttpOnly
         * - SameSite=Strict
         * - Path=/
         * - Expires={the token expiration date}
         *
         * NB! If the generated cookie exceeds 4096 bytes, this method will
         * strip the model data to the bare minimum to try to fit within the
         * recommended size in https://www.rfc-editor.org/rfc/rfc6265#section-6.1.
         */
        BaseAuthStore.prototype.exportToCookie = function (options, key) {
            var _a, _b, _c;
            if (key === void 0) { key = defaultCookieKey; }
            var defaultOptions = {
                secure: true,
                sameSite: true,
                httpOnly: true,
                path: "/",
            };
            // extract the token expiration date
            var payload = getTokenPayload(this.token);
            if (payload === null || payload === void 0 ? void 0 : payload.exp) {
                defaultOptions.expires = new Date(payload.exp * 1000);
            }
            else {
                defaultOptions.expires = new Date('1970-01-01');
            }
            // merge with the user defined options
            options = Object.assign({}, defaultOptions, options);
            var rawData = {
                token: this.token,
                model: ((_a = this.model) === null || _a === void 0 ? void 0 : _a.export()) || null,
            };
            var result = cookieSerialize(key, JSON.stringify(rawData), options);
            var resultLength = typeof Blob !== 'undefined' ?
                (new Blob([result])).size : result.length;
            // strip down the model data to the bare minimum
            if (rawData.model && resultLength > 4096) {
                rawData.model = { id: (_b = rawData === null || rawData === void 0 ? void 0 : rawData.model) === null || _b === void 0 ? void 0 : _b.id, email: (_c = rawData === null || rawData === void 0 ? void 0 : rawData.model) === null || _c === void 0 ? void 0 : _c.email };
                if (this.model instanceof Record) {
                    rawData.model.username = this.model.username;
                    rawData.model.verified = this.model.verified;
                    rawData.model.collectionId = this.model.collectionId;
                }
                result = cookieSerialize(key, JSON.stringify(rawData), options);
            }
            return result;
        };
        /**
         * Register a callback function that will be called on store change.
         *
         * You can set the `fireImmediately` argument to true in order to invoke
         * the provided callback right after registration.
         *
         * Returns a removal function that you could call to "unsubscribe" from the changes.
         */
        BaseAuthStore.prototype.onChange = function (callback, fireImmediately) {
            var _this = this;
            if (fireImmediately === void 0) { fireImmediately = false; }
            this._onChangeCallbacks.push(callback);
            if (fireImmediately) {
                callback(this.token, this.model);
            }
            return function () {
                for (var i = _this._onChangeCallbacks.length - 1; i >= 0; i--) {
                    if (_this._onChangeCallbacks[i] == callback) {
                        delete _this._onChangeCallbacks[i]; // removes the function reference
                        _this._onChangeCallbacks.splice(i, 1); // reindex the array
                        return;
                    }
                }
            };
        };
        BaseAuthStore.prototype.triggerChange = function () {
            for (var _i = 0, _a = this._onChangeCallbacks; _i < _a.length; _i++) {
                var callback = _a[_i];
                callback && callback(this.token, this.model);
            }
        };
        return BaseAuthStore;
    }());

    /**
     * The default token store for browsers with auto fallback
     * to runtime/memory if local storage is undefined (eg. in node env).
     */
    var LocalAuthStore = /** @class */ (function (_super) {
        __extends(LocalAuthStore, _super);
        function LocalAuthStore(storageKey) {
            if (storageKey === void 0) { storageKey = "pocketbase_auth"; }
            var _this = _super.call(this) || this;
            _this.storageFallback = {};
            _this.storageKey = storageKey;
            return _this;
        }
        Object.defineProperty(LocalAuthStore.prototype, "token", {
            /**
             * @inheritdoc
             */
            get: function () {
                var data = this._storageGet(this.storageKey) || {};
                return data.token || '';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LocalAuthStore.prototype, "model", {
            /**
             * @inheritdoc
             */
            get: function () {
                var _a;
                var data = this._storageGet(this.storageKey) || {};
                if (data === null ||
                    typeof data !== 'object' ||
                    data.model === null ||
                    typeof data.model !== 'object') {
                    return null;
                }
                // admins don't have `collectionId` prop
                if (typeof ((_a = data.model) === null || _a === void 0 ? void 0 : _a.collectionId) === 'undefined') {
                    return new Admin(data.model);
                }
                return new Record(data.model);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @inheritdoc
         */
        LocalAuthStore.prototype.save = function (token, model) {
            this._storageSet(this.storageKey, {
                'token': token,
                'model': model,
            });
            _super.prototype.save.call(this, token, model);
        };
        /**
         * @inheritdoc
         */
        LocalAuthStore.prototype.clear = function () {
            this._storageRemove(this.storageKey);
            _super.prototype.clear.call(this);
        };
        // ---------------------------------------------------------------
        // Internal helpers:
        // ---------------------------------------------------------------
        /**
         * Retrieves `key` from the browser's local storage
         * (or runtime/memory if local storage is undefined).
         */
        LocalAuthStore.prototype._storageGet = function (key) {
            if (wx) {
                var rawValue = wx.getStorageSync(key) || '';
                try {
                    return JSON.parse(rawValue);
                }
                catch (e) { // not a json
                    return rawValue;
                }
            }
            // fallback
            return this.storageFallback[key];
        };
        /**
         * Stores a new data in the browser's local storage
         * (or runtime/memory if local storage is undefined).
         */
        LocalAuthStore.prototype._storageSet = function (key, value) {
            if (wx) {
                // store in local storage
                var normalizedVal = value;
                if (typeof value !== 'string') {
                    normalizedVal = JSON.stringify(value);
                }
                wx.setStorageSync(key, normalizedVal);
            }
            else {
                // store in fallback
                this.storageFallback[key] = value;
            }
        };
        /**
         * Removes `key` from the browser's local storage and the runtime/memory.
         */
        LocalAuthStore.prototype._storageRemove = function (key) {
            // delete from local storage
            if (wx) {
                wx.removeStorageSync(key);
            }
            // delete from fallback
            delete this.storageFallback[key];
        };
        return LocalAuthStore;
    }(BaseAuthStore));

    /**
     * BaseService class that should be inherited from all API services.
     */
    var BaseService = /** @class */ (function () {
        function BaseService(client) {
            this.client = client;
        }
        return BaseService;
    }());

    var SettingsService = /** @class */ (function (_super) {
        __extends(SettingsService, _super);
        function SettingsService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Fetch all available app settings.
         */
        SettingsService.prototype.getAll = function (queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send('/api/settings', {
                'method': 'GET',
                'params': queryParams,
            }).then(function (responseData) { return responseData || {}; });
        };
        /**
         * Bulk updates app settings.
         */
        SettingsService.prototype.update = function (bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send('/api/settings', {
                'method': 'PATCH',
                'params': queryParams,
                'body': bodyParams,
            }).then(function (responseData) { return responseData || {}; });
        };
        /**
         * Performs a S3 filesystem connection test.
         *
         * The currently supported `filesystem` are "storage" and "backups".
         */
        SettingsService.prototype.testS3 = function (filesystem, queryParams) {
            if (filesystem === void 0) { filesystem = "storage"; }
            if (queryParams === void 0) { queryParams = {}; }
            var bodyParams = {
                'filesystem': filesystem,
            };
            return this.client.send('/api/settings/test/s3', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Sends a test email.
         *
         * The possible `emailTemplate` values are:
         * - verification
         * - password-reset
         * - email-change
         */
        SettingsService.prototype.testEmail = function (toEmail, emailTemplate, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            var bodyParams = {
                'email': toEmail,
                'template': emailTemplate,
            };
            return this.client.send('/api/settings/test/email', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Generates a new Apple OAuth2 client secret.
         */
        SettingsService.prototype.generateAppleClientSecret = function (clientId, teamId, keyId, privateKey, duration, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                clientId: clientId,
                teamId: teamId,
                keyId: keyId,
                privateKey: privateKey,
                duration: duration,
            }, bodyParams);
            return this.client.send('/api/settings/apple/generate-client-secret', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            });
        };
        return SettingsService;
    }(BaseService));

    var ListResult = /** @class */ (function () {
        function ListResult(page, perPage, totalItems, totalPages, items) {
            this.page = page > 0 ? page : 1;
            this.perPage = perPage >= 0 ? perPage : 0;
            this.totalItems = totalItems >= 0 ? totalItems : 0;
            this.totalPages = totalPages >= 0 ? totalPages : 0;
            this.items = items || [];
        }
        return ListResult;
    }());

    // @todo since there is no longer need of SubCrudService consider merging with CrudService in v0.9+
    var BaseCrudService = /** @class */ (function (_super) {
        __extends(BaseCrudService, _super);
        function BaseCrudService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns a promise with all list items batch fetched at once.
         */
        BaseCrudService.prototype._getFullList = function (basePath, batchSize, queryParams) {
            var _this = this;
            if (batchSize === void 0) { batchSize = 200; }
            if (queryParams === void 0) { queryParams = {}; }
            var result = [];
            var request = function (page) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._getList(basePath, page, batchSize || 200, queryParams).then(function (list) {
                            var castedList = list;
                            var items = castedList.items;
                            var totalItems = castedList.totalItems;
                            result = result.concat(items);
                            if (items.length && totalItems > result.length) {
                                return request(page + 1);
                            }
                            return result;
                        })];
                });
            }); };
            return request(1);
        };
        /**
         * Returns paginated items list.
         */
        BaseCrudService.prototype._getList = function (basePath, page, perPage, queryParams) {
            var _this = this;
            if (page === void 0) { page = 1; }
            if (perPage === void 0) { perPage = 30; }
            if (queryParams === void 0) { queryParams = {}; }
            queryParams = Object.assign({
                'page': page,
                'perPage': perPage,
            }, queryParams);
            return this.client.send(basePath, {
                'method': 'GET',
                'params': queryParams,
            }).then(function (responseData) {
                var items = [];
                if (responseData === null || responseData === void 0 ? void 0 : responseData.items) {
                    responseData.items = responseData.items || [];
                    for (var _i = 0, _a = responseData.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        items.push(_this.decode(item));
                    }
                }
                return new ListResult((responseData === null || responseData === void 0 ? void 0 : responseData.page) || 1, (responseData === null || responseData === void 0 ? void 0 : responseData.perPage) || 0, (responseData === null || responseData === void 0 ? void 0 : responseData.totalItems) || 0, (responseData === null || responseData === void 0 ? void 0 : responseData.totalPages) || 0, items);
            });
        };
        /**
         * Returns single item by its id.
         */
        BaseCrudService.prototype._getOne = function (basePath, id, queryParams) {
            var _this = this;
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send(basePath + '/' + encodeURIComponent(id), {
                'method': 'GET',
                'params': queryParams
            }).then(function (responseData) { return _this.decode(responseData); });
        };
        /**
         * Returns the first found item by a list filter.
         *
         * Internally it calls `_getList(basePath, 1, 1, { filter })` and returns its
         * first item.
         *
         * For consistency with `_getOne`, this method will throw a 404
         * ClientResponseError if no item was found.
         */
        BaseCrudService.prototype._getFirstListItem = function (basePath, filter, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            queryParams = Object.assign({
                'filter': filter,
                '$cancelKey': 'one_by_filter_' + basePath + "_" + filter,
            }, queryParams);
            return this._getList(basePath, 1, 1, queryParams)
                .then(function (result) {
                var _a;
                if (!((_a = result === null || result === void 0 ? void 0 : result.items) === null || _a === void 0 ? void 0 : _a.length)) {
                    throw new ClientResponseError({
                        status: 404,
                        data: {
                            code: 404,
                            message: "The requested resource wasn't found.",
                            data: {},
                        },
                    });
                }
                return result.items[0];
            });
        };
        /**
         * Creates a new item.
         */
        BaseCrudService.prototype._create = function (basePath, bodyParams, queryParams) {
            var _this = this;
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send(basePath, {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function (responseData) { return _this.decode(responseData); });
        };
        /**
         * Updates an existing item by its id.
         */
        BaseCrudService.prototype._update = function (basePath, id, bodyParams, queryParams) {
            var _this = this;
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send(basePath + '/' + encodeURIComponent(id), {
                'method': 'PATCH',
                'params': queryParams,
                'body': bodyParams,
            }).then(function (responseData) { return _this.decode(responseData); });
        };
        /**
         * Deletes an existing item by its id.
         */
        BaseCrudService.prototype._delete = function (basePath, id, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send(basePath + '/' + encodeURIComponent(id), {
                'method': 'DELETE',
                'params': queryParams,
            }).then(function () { return true; });
        };
        return BaseCrudService;
    }(BaseService));

    var CrudService = /** @class */ (function (_super) {
        __extends(CrudService, _super);
        function CrudService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CrudService.prototype.getFullList = function (batchOrqueryParams, queryParams) {
            if (typeof batchOrqueryParams == "number") {
                return this._getFullList(this.baseCrudPath, batchOrqueryParams, queryParams);
            }
            var params = Object.assign({}, batchOrqueryParams, queryParams);
            return this._getFullList(this.baseCrudPath, params.batch || 200, params);
        };
        /**
         * Returns paginated items list.
         *
         * You can use the generic T to supply a wrapper type of the crud model.
         */
        CrudService.prototype.getList = function (page, perPage, queryParams) {
            if (page === void 0) { page = 1; }
            if (perPage === void 0) { perPage = 30; }
            if (queryParams === void 0) { queryParams = {}; }
            return this._getList(this.baseCrudPath, page, perPage, queryParams);
        };
        /**
         * Returns the first found item by the specified filter.
         *
         * Internally it calls `getList(1, 1, { filter })` and returns the
         * first found item.
         *
         * You can use the generic T to supply a wrapper type of the crud model.
         *
         * For consistency with `getOne`, this method will throw a 404
         * ClientResponseError if no item was found.
         */
        CrudService.prototype.getFirstListItem = function (filter, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this._getFirstListItem(this.baseCrudPath, filter, queryParams);
        };
        /**
         * Returns single item by its id.
         *
         * You can use the generic T to supply a wrapper type of the crud model.
         */
        CrudService.prototype.getOne = function (id, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this._getOne(this.baseCrudPath, id, queryParams);
        };
        /**
         * Creates a new item.
         *
         * You can use the generic T to supply a wrapper type of the crud model.
         */
        CrudService.prototype.create = function (bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return this._create(this.baseCrudPath, bodyParams, queryParams);
        };
        /**
         * Updates an existing item by its id.
         *
         * You can use the generic T to supply a wrapper type of the crud model.
         */
        CrudService.prototype.update = function (id, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return this._update(this.baseCrudPath, id, bodyParams, queryParams);
        };
        /**
         * Deletes an existing item by its id.
         */
        CrudService.prototype.delete = function (id, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this._delete(this.baseCrudPath, id, queryParams);
        };
        return CrudService;
    }(BaseCrudService));

    var AdminService = /** @class */ (function (_super) {
        __extends(AdminService, _super);
        function AdminService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        AdminService.prototype.decode = function (data) {
            return new Admin(data);
        };
        Object.defineProperty(AdminService.prototype, "baseCrudPath", {
            /**
             * @inheritdoc
             */
            get: function () {
                return '/api/admins';
            },
            enumerable: false,
            configurable: true
        });
        // ---------------------------------------------------------------
        // Post update/delete AuthStore sync
        // ---------------------------------------------------------------
        /**
         * @inheritdoc
         *
         * If the current `client.authStore.model` matches with the updated id, then
         * on success the `client.authStore.model` will be updated with the result.
         */
        AdminService.prototype.update = function (id, bodyParams, queryParams) {
            var _this = this;
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return _super.prototype.update.call(this, id, bodyParams, queryParams).then(function (item) {
                var _a, _b;
                // update the store state if the updated item id matches with the stored model
                if (_this.client.authStore.model &&
                    typeof ((_a = _this.client.authStore.model) === null || _a === void 0 ? void 0 : _a.collectionId) === 'undefined' && // is not record auth
                    ((_b = _this.client.authStore.model) === null || _b === void 0 ? void 0 : _b.id) === (item === null || item === void 0 ? void 0 : item.id)) {
                    _this.client.authStore.save(_this.client.authStore.token, item);
                }
                return item;
            });
        };
        /**
         * @inheritdoc
         *
         * If the current `client.authStore.model` matches with the deleted id,
         * then on success the `client.authStore` will be cleared.
         */
        AdminService.prototype.delete = function (id, queryParams) {
            var _this = this;
            if (queryParams === void 0) { queryParams = {}; }
            return _super.prototype.delete.call(this, id, queryParams).then(function (success) {
                var _a, _b;
                // clear the store state if the deleted item id matches with the stored model
                if (success &&
                    _this.client.authStore.model &&
                    typeof ((_a = _this.client.authStore.model) === null || _a === void 0 ? void 0 : _a.collectionId) === 'undefined' && // is not record auth
                    ((_b = _this.client.authStore.model) === null || _b === void 0 ? void 0 : _b.id) === id) {
                    _this.client.authStore.clear();
                }
                return success;
            });
        };
        // ---------------------------------------------------------------
        // Auth handlers
        // ---------------------------------------------------------------
        /**
         * Prepare successful authorize response.
         */
        AdminService.prototype.authResponse = function (responseData) {
            var admin = this.decode((responseData === null || responseData === void 0 ? void 0 : responseData.admin) || {});
            if ((responseData === null || responseData === void 0 ? void 0 : responseData.token) && (responseData === null || responseData === void 0 ? void 0 : responseData.admin)) {
                this.client.authStore.save(responseData.token, admin);
            }
            return Object.assign({}, responseData, {
                // normalize common fields
                'token': (responseData === null || responseData === void 0 ? void 0 : responseData.token) || '',
                'admin': admin,
            });
        };
        /**
         * Authenticate an admin account with its email and password
         * and returns a new admin token and data.
         *
         * On success this method automatically updates the client's AuthStore data.
         */
        AdminService.prototype.authWithPassword = function (email, password, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'identity': email,
                'password': password,
            }, bodyParams);
            return this.client.send(this.baseCrudPath + '/auth-with-password', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(this.authResponse.bind(this));
        };
        /**
         * Refreshes the current admin authenticated instance and
         * returns a new token and admin data.
         *
         * On success this method automatically updates the client's AuthStore data.
         */
        AdminService.prototype.authRefresh = function (bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send(this.baseCrudPath + '/auth-refresh', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(this.authResponse.bind(this));
        };
        /**
         * Sends admin password reset request.
         */
        AdminService.prototype.requestPasswordReset = function (email, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'email': email,
            }, bodyParams);
            return this.client.send(this.baseCrudPath + '/request-password-reset', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Confirms admin password reset request.
         */
        AdminService.prototype.confirmPasswordReset = function (passwordResetToken, password, passwordConfirm, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'token': passwordResetToken,
                'password': password,
                'passwordConfirm': passwordConfirm,
            }, bodyParams);
            return this.client.send(this.baseCrudPath + '/confirm-password-reset', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        return AdminService;
    }(CrudService));

    var ExternalAuth = /** @class */ (function (_super) {
        __extends(ExternalAuth, _super);
        function ExternalAuth() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        ExternalAuth.prototype.$load = function (data) {
            _super.prototype.$load.call(this, data);
            this.recordId = typeof data.recordId === 'string' ? data.recordId : '';
            this.collectionId = typeof data.collectionId === 'string' ? data.collectionId : '';
            this.provider = typeof data.provider === 'string' ? data.provider : '';
            this.providerId = typeof data.providerId === 'string' ? data.providerId : '';
        };
        return ExternalAuth;
    }(BaseModel));

    var RecordService = /** @class */ (function (_super) {
        __extends(RecordService, _super);
        function RecordService(client, collectionIdOrName) {
            var _this = _super.call(this, client) || this;
            _this.collectionIdOrName = collectionIdOrName;
            return _this;
        }
        /**
         * @inheritdoc
         */
        RecordService.prototype.decode = function (data) {
            return new Record(data);
        };
        Object.defineProperty(RecordService.prototype, "baseCrudPath", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.baseCollectionPath + '/records';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RecordService.prototype, "baseCollectionPath", {
            /**
             * Returns the current collection service base path.
             */
            get: function () {
                return '/api/collections/' + encodeURIComponent(this.collectionIdOrName);
            },
            enumerable: false,
            configurable: true
        });
        // ---------------------------------------------------------------
        // Realtime handlers
        // ---------------------------------------------------------------
        /**
         * @deprecated Use subscribe(recordId, callback) instead.
         *
         * Subscribe to the realtime changes of a single record in the collection.
         */
        RecordService.prototype.subscribeOne = function (recordId, callback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.warn("PocketBase: subscribeOne(recordId, callback) is deprecated. Please replace it with subscribe(recordId, callback).");
                    return [2 /*return*/, this.client.realtime.subscribe(this.collectionIdOrName + "/" + recordId, callback)];
                });
            });
        };
        RecordService.prototype.subscribe = function (topicOrCallback, callback) {
            return __awaiter(this, void 0, void 0, function () {
                var topic;
                return __generator(this, function (_a) {
                    if (typeof topicOrCallback === 'function') {
                        console.warn("PocketBase: subscribe(callback) is deprecated. Please replace it with subscribe('*', callback).");
                        return [2 /*return*/, this.client.realtime.subscribe(this.collectionIdOrName, topicOrCallback)];
                    }
                    if (!callback) {
                        throw new Error("Missing subscription callback.");
                    }
                    if (topicOrCallback === "") {
                        throw new Error("Missing topic.");
                    }
                    topic = this.collectionIdOrName;
                    if (topicOrCallback !== "*") {
                        topic += ('/' + topicOrCallback);
                    }
                    return [2 /*return*/, this.client.realtime.subscribe(topic, callback)];
                });
            });
        };
        /**
         * Unsubscribe from all subscriptions of the specified topic
         * ("*" or record id).
         *
         * If `topic` is not set, then this method will unsubscribe from
         * all subscriptions associated to the current collection.
         */
        RecordService.prototype.unsubscribe = function (topic) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // unsubscribe wildcard topic
                    if (topic === "*") {
                        return [2 /*return*/, this.client.realtime.unsubscribe(this.collectionIdOrName)];
                    }
                    // unsubscribe recordId topic
                    if (topic) {
                        return [2 /*return*/, this.client.realtime.unsubscribe(this.collectionIdOrName + "/" + topic)];
                    }
                    // unsubscribe from everything related to the collection
                    return [2 /*return*/, this.client.realtime.unsubscribeByPrefix(this.collectionIdOrName)];
                });
            });
        };
        /**
         * @inheritdoc
         */
        RecordService.prototype.getFullList = function (batchOrQueryParams, queryParams) {
            if (typeof batchOrQueryParams == "number") {
                return _super.prototype.getFullList.call(this, batchOrQueryParams, queryParams);
            }
            var params = Object.assign({}, batchOrQueryParams, queryParams);
            return _super.prototype.getFullList.call(this, params);
        };
        /**
         * @inheritdoc
         */
        RecordService.prototype.getList = function (page, perPage, queryParams) {
            if (page === void 0) { page = 1; }
            if (perPage === void 0) { perPage = 30; }
            if (queryParams === void 0) { queryParams = {}; }
            return _super.prototype.getList.call(this, page, perPage, queryParams);
        };
        /**
         * @inheritdoc
         */
        RecordService.prototype.getFirstListItem = function (filter, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return _super.prototype.getFirstListItem.call(this, filter, queryParams);
        };
        /**
         * @inheritdoc
         */
        RecordService.prototype.getOne = function (id, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return _super.prototype.getOne.call(this, id, queryParams);
        };
        /**
         * @inheritdoc
         */
        RecordService.prototype.create = function (bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return _super.prototype.create.call(this, bodyParams, queryParams);
        };
        /**
         * @inheritdoc
         *
         * If the current `client.authStore.model` matches with the updated id, then
         * on success the `client.authStore.model` will be updated with the result.
         */
        RecordService.prototype.update = function (id, bodyParams, queryParams) {
            var _this = this;
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return _super.prototype.update.call(this, id, bodyParams, queryParams).then(function (item) {
                var _a, _b, _c;
                if (
                // is record auth
                ((_a = _this.client.authStore.model) === null || _a === void 0 ? void 0 : _a.id) === (item === null || item === void 0 ? void 0 : item.id) &&
                    (((_b = _this.client.authStore.model) === null || _b === void 0 ? void 0 : _b.collectionId) === _this.collectionIdOrName ||
                        ((_c = _this.client.authStore.model) === null || _c === void 0 ? void 0 : _c.collectionName) === _this.collectionIdOrName)) {
                    _this.client.authStore.save(_this.client.authStore.token, item);
                }
                return item;
            });
        };
        /**
         * @inheritdoc
         *
         * If the current `client.authStore.model` matches with the deleted id,
         * then on success the `client.authStore` will be cleared.
         */
        RecordService.prototype.delete = function (id, queryParams) {
            var _this = this;
            if (queryParams === void 0) { queryParams = {}; }
            return _super.prototype.delete.call(this, id, queryParams).then(function (success) {
                var _a, _b, _c;
                if (success &&
                    // is record auth
                    ((_a = _this.client.authStore.model) === null || _a === void 0 ? void 0 : _a.id) === id &&
                    (((_b = _this.client.authStore.model) === null || _b === void 0 ? void 0 : _b.collectionId) === _this.collectionIdOrName ||
                        ((_c = _this.client.authStore.model) === null || _c === void 0 ? void 0 : _c.collectionName) === _this.collectionIdOrName)) {
                    _this.client.authStore.clear();
                }
                return success;
            });
        };
        // ---------------------------------------------------------------
        // Auth handlers
        // ---------------------------------------------------------------
        /**
         * Prepare successful collection authorization response.
         */
        RecordService.prototype.authResponse = function (responseData) {
            var record = this.decode((responseData === null || responseData === void 0 ? void 0 : responseData.record) || {});
            this.client.authStore.save(responseData === null || responseData === void 0 ? void 0 : responseData.token, record);
            return Object.assign({}, responseData, {
                // normalize common fields
                'token': (responseData === null || responseData === void 0 ? void 0 : responseData.token) || '',
                'record': record,
            });
        };
        /**
         * Returns all available collection auth methods.
         */
        RecordService.prototype.listAuthMethods = function (queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send(this.baseCollectionPath + '/auth-methods', {
                'method': 'GET',
                'params': queryParams,
            }).then(function (responseData) {
                return Object.assign({}, responseData, {
                    // normalize common fields
                    'usernamePassword': !!(responseData === null || responseData === void 0 ? void 0 : responseData.usernamePassword),
                    'emailPassword': !!(responseData === null || responseData === void 0 ? void 0 : responseData.emailPassword),
                    'authProviders': Array.isArray(responseData === null || responseData === void 0 ? void 0 : responseData.authProviders) ? responseData === null || responseData === void 0 ? void 0 : responseData.authProviders : [],
                });
            });
        };
        /**
         * Authenticate a single auth collection record via its username/email and password.
         *
         * On success, this method also automatically updates
         * the client's AuthStore data and returns:
         * - the authentication token
         * - the authenticated record model
         */
        RecordService.prototype.authWithPassword = function (usernameOrEmail, password, bodyParams, queryParams) {
            var _this = this;
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'identity': usernameOrEmail,
                'password': password,
            }, bodyParams);
            return this.client.send(this.baseCollectionPath + '/auth-with-password', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function (data) { return _this.authResponse(data); });
        };
        /**
         * Authenticate a single auth collection record with OAuth2 code.
         *
         * If you don't have an OAuth2 code you may also want to check `authWithOAuth2` method.
         *
         * On success, this method also automatically updates
         * the client's AuthStore data and returns:
         * - the authentication token
         * - the authenticated record model
         * - the OAuth2 account data (eg. name, email, avatar, etc.)
         */
        RecordService.prototype.authWithOAuth2Code = function (provider, code, codeVerifier, redirectUrl, createData, bodyParams, queryParams) {
            var _this = this;
            if (createData === void 0) { createData = {}; }
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'provider': provider,
                'code': code,
                'codeVerifier': codeVerifier,
                'redirectUrl': redirectUrl,
                'createData': createData,
            }, bodyParams);
            return this.client.send(this.baseCollectionPath + '/auth-with-oauth2', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function (data) { return _this.authResponse(data); });
        };
        RecordService.prototype.authWithOAuth2 = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var config, authMethods, provider, redirectUrl;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // fallback to legacy format
                            if (args.length > 1 || typeof (args === null || args === void 0 ? void 0 : args[0]) === 'string') {
                                console.warn("PocketBase: This form of authWithOAuth2() is deprecated and may get removed in the future. Please replace with authWithOAuth2Code() OR use the authWithOAuth2() realtime form as shown in https://pocketbase.io/docs/authentication/#oauth2-integration.");
                                return [2 /*return*/, this.authWithOAuth2Code((args === null || args === void 0 ? void 0 : args[0]) || '', (args === null || args === void 0 ? void 0 : args[1]) || '', (args === null || args === void 0 ? void 0 : args[2]) || '', (args === null || args === void 0 ? void 0 : args[3]) || '', (args === null || args === void 0 ? void 0 : args[4]) || {}, (args === null || args === void 0 ? void 0 : args[5]) || {}, (args === null || args === void 0 ? void 0 : args[6]) || {})];
                            }
                            config = (args === null || args === void 0 ? void 0 : args[0]) || {};
                            return [4 /*yield*/, this.listAuthMethods()];
                        case 1:
                            authMethods = _a.sent();
                            provider = authMethods.authProviders.find(function (p) { return p.name === config.provider; });
                            if (!provider) {
                                throw new ClientResponseError(new Error("Missing or invalid provider \"".concat(config.provider, "\".")));
                            }
                            redirectUrl = this.client.buildUrl('/api/oauth2-redirect');
                            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                    var unsubscribe_1, url, err_1;
                                    var _this = this;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 3, , 4]);
                                                return [4 /*yield*/, this.client.realtime.subscribe('@oauth2', function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                        var oldState, authData, err_2;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    oldState = this.client.realtime.clientId;
                                                                    _a.label = 1;
                                                                case 1:
                                                                    _a.trys.push([1, 3, , 4]);
                                                                    unsubscribe_1();
                                                                    if (!e.state || oldState !== e.state) {
                                                                        throw new Error("State parameters don't match.");
                                                                    }
                                                                    return [4 /*yield*/, this.authWithOAuth2Code(provider.name, e.code, provider.codeVerifier, redirectUrl, config.createData, config.body, config.query)];
                                                                case 2:
                                                                    authData = _a.sent();
                                                                    resolve(authData);
                                                                    return [3 /*break*/, 4];
                                                                case 3:
                                                                    err_2 = _a.sent();
                                                                    reject(new ClientResponseError(err_2));
                                                                    return [3 /*break*/, 4];
                                                                case 4: return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })];
                                            case 1:
                                                unsubscribe_1 = _b.sent();
                                                url = new URL(provider.authUrl + redirectUrl);
                                                url.searchParams.set("state", this.client.realtime.clientId);
                                                if ((_a = config.scopes) === null || _a === void 0 ? void 0 : _a.length) {
                                                    url.searchParams.set("scope", config.scopes.join(" "));
                                                }
                                                return [4 /*yield*/, (config.urlCallback ? config.urlCallback(url.toString()) : this._defaultUrlCallback(url.toString()))];
                                            case 2:
                                                _b.sent();
                                                return [3 /*break*/, 4];
                                            case 3:
                                                err_1 = _b.sent();
                                                reject(new ClientResponseError(err_1));
                                                return [3 /*break*/, 4];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        /**
         * Refreshes the current authenticated record instance and
         * returns a new token and record data.
         *
         * On success this method also automatically updates the client's AuthStore.
         */
        RecordService.prototype.authRefresh = function (bodyParams, queryParams) {
            var _this = this;
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send(this.baseCollectionPath + '/auth-refresh', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function (data) { return _this.authResponse(data); });
        };
        /**
         * Sends auth record password reset request.
         */
        RecordService.prototype.requestPasswordReset = function (email, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'email': email,
            }, bodyParams);
            return this.client.send(this.baseCollectionPath + '/request-password-reset', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Confirms auth record password reset request.
         */
        RecordService.prototype.confirmPasswordReset = function (passwordResetToken, password, passwordConfirm, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'token': passwordResetToken,
                'password': password,
                'passwordConfirm': passwordConfirm,
            }, bodyParams);
            return this.client.send(this.baseCollectionPath + '/confirm-password-reset', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Sends auth record verification email request.
         */
        RecordService.prototype.requestVerification = function (email, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'email': email,
            }, bodyParams);
            return this.client.send(this.baseCollectionPath + '/request-verification', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Confirms auth record email verification request.
         */
        RecordService.prototype.confirmVerification = function (verificationToken, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'token': verificationToken,
            }, bodyParams);
            return this.client.send(this.baseCollectionPath + '/confirm-verification', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Sends an email change request to the authenticated record model.
         */
        RecordService.prototype.requestEmailChange = function (newEmail, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'newEmail': newEmail,
            }, bodyParams);
            return this.client.send(this.baseCollectionPath + '/request-email-change', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Confirms auth record's new email address.
         */
        RecordService.prototype.confirmEmailChange = function (emailChangeToken, password, bodyParams, queryParams) {
            if (bodyParams === void 0) { bodyParams = {}; }
            if (queryParams === void 0) { queryParams = {}; }
            bodyParams = Object.assign({
                'token': emailChangeToken,
                'password': password,
            }, bodyParams);
            return this.client.send(this.baseCollectionPath + '/confirm-email-change', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Lists all linked external auth providers for the specified auth record.
         */
        RecordService.prototype.listExternalAuths = function (recordId, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send(this.baseCrudPath + '/' + encodeURIComponent(recordId) + '/external-auths', {
                'method': 'GET',
                'params': queryParams,
            }).then(function (responseData) {
                var items = [];
                if (Array.isArray(responseData)) {
                    for (var _i = 0, responseData_1 = responseData; _i < responseData_1.length; _i++) {
                        var item = responseData_1[_i];
                        items.push(new ExternalAuth(item));
                    }
                }
                return items;
            });
        };
        /**
         * Unlink a single external auth provider from the specified auth record.
         */
        RecordService.prototype.unlinkExternalAuth = function (recordId, provider, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send(this.baseCrudPath + '/' + encodeURIComponent(recordId) + '/external-auths/' + encodeURIComponent(provider), {
                'method': 'DELETE',
                'params': queryParams,
            }).then(function () { return true; });
        };
        // ---------------------------------------------------------------
        RecordService.prototype._defaultUrlCallback = function (url) {
            if (typeof window === "undefined" || !(window === null || window === void 0 ? void 0 : window.open)) {
                throw new ClientResponseError(new Error("Not in a browser context - please pass a custom urlCallback function."));
            }
            var width = 1024;
            var height = 768;
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            // normalize window size
            width = width > windowWidth ? windowWidth : width;
            height = height > windowHeight ? windowHeight : height;
            var left = (windowWidth / 2) - (width / 2);
            var top = (windowHeight / 2) - (height / 2);
            window.open(url, "oauth2-popup", 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',resizable,menubar=no');
        };
        return RecordService;
    }(CrudService));

    var SchemaField = /** @class */ (function () {
        function SchemaField(data) {
            if (data === void 0) { data = {}; }
            this.id = typeof data.id !== 'undefined' ? data.id : '';
            this.name = typeof data.name !== 'undefined' ? data.name : '';
            this.type = typeof data.type !== 'undefined' ? data.type : 'text';
            this.system = !!data.system;
            this.required = !!data.required;
            this.options = typeof data.options === 'object' && data.options !== null ? data.options : {};
        }
        return SchemaField;
    }());

    var Collection = /** @class */ (function (_super) {
        __extends(Collection, _super);
        function Collection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        Collection.prototype.$load = function (data) {
            _super.prototype.$load.call(this, data);
            this.system = !!data.system;
            this.name = typeof data.name === 'string' ? data.name : '';
            this.type = typeof data.type === 'string' ? data.type : 'base';
            this.options = typeof data.options !== 'undefined' && data.options !== null ? data.options : {};
            this.indexes = Array.isArray(data.indexes) ? data.indexes : [];
            // rules
            this.listRule = typeof data.listRule === 'string' ? data.listRule : null;
            this.viewRule = typeof data.viewRule === 'string' ? data.viewRule : null;
            this.createRule = typeof data.createRule === 'string' ? data.createRule : null;
            this.updateRule = typeof data.updateRule === 'string' ? data.updateRule : null;
            this.deleteRule = typeof data.deleteRule === 'string' ? data.deleteRule : null;
            // schema
            data.schema = Array.isArray(data.schema) ? data.schema : [];
            this.schema = [];
            for (var _i = 0, _a = data.schema; _i < _a.length; _i++) {
                var field = _a[_i];
                this.schema.push(new SchemaField(field));
            }
        };
        Object.defineProperty(Collection.prototype, "isBase", {
            /**
             * @deprecated Please use $isBase instead.
             */
            get: function () {
                return this.$isBase;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "$isBase", {
            /**
             * Checks if the current model is "base" collection.
             */
            get: function () {
                return this.type === 'base';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "isAuth", {
            /**
             * @deprecated Please use $isAuth instead.
             */
            get: function () {
                return this.$isAuth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "$isAuth", {
            /**
             * Checks if the current model is "auth" collection.
             */
            get: function () {
                return this.type === 'auth';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "isView", {
            /**
             * @deprecated Please use $isView instead.
             */
            get: function () {
                return this.$isView;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Collection.prototype, "$isView", {
            /**
             * Checks if the current model is "view" collection.
             */
            get: function () {
                return this.type === 'view';
            },
            enumerable: false,
            configurable: true
        });
        return Collection;
    }(BaseModel));

    var CollectionService = /** @class */ (function (_super) {
        __extends(CollectionService, _super);
        function CollectionService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        CollectionService.prototype.decode = function (data) {
            return new Collection(data);
        };
        Object.defineProperty(CollectionService.prototype, "baseCrudPath", {
            /**
             * @inheritdoc
             */
            get: function () {
                return '/api/collections';
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Imports the provided collections.
         *
         * If `deleteMissing` is `true`, all local collections and schema fields,
         * that are not present in the imported configuration, WILL BE DELETED
         * (including their related records data)!
         */
        CollectionService.prototype.import = function (collections, deleteMissing, queryParams) {
            if (deleteMissing === void 0) { deleteMissing = false; }
            if (queryParams === void 0) { queryParams = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.client.send(this.baseCrudPath + '/import', {
                            'method': 'PUT',
                            'params': queryParams,
                            'body': {
                                'collections': collections,
                                'deleteMissing': deleteMissing,
                            }
                        }).then(function () { return true; })];
                });
            });
        };
        return CollectionService;
    }(CrudService));

    var LogRequest = /** @class */ (function (_super) {
        __extends(LogRequest, _super);
        function LogRequest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        LogRequest.prototype.$load = function (data) {
            _super.prototype.$load.call(this, data);
            // fallback to the ip field for backward compatibility
            data.remoteIp = data.remoteIp || data.ip;
            this.url = typeof data.url === 'string' ? data.url : '';
            this.method = typeof data.method === 'string' ? data.method : 'GET';
            this.status = typeof data.status === 'number' ? data.status : 200;
            this.auth = typeof data.auth === 'string' ? data.auth : 'guest';
            this.remoteIp = typeof data.remoteIp === 'string' ? data.remoteIp : '';
            this.userIp = typeof data.userIp === 'string' ? data.userIp : '';
            this.referer = typeof data.referer === 'string' ? data.referer : '';
            this.userAgent = typeof data.userAgent === 'string' ? data.userAgent : '';
            this.meta = typeof data.meta === 'object' && data.meta !== null ? data.meta : {};
        };
        return LogRequest;
    }(BaseModel));

    var LogService = /** @class */ (function (_super) {
        __extends(LogService, _super);
        function LogService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns paginated logged requests list.
         */
        LogService.prototype.getRequestsList = function (page, perPage, queryParams) {
            if (page === void 0) { page = 1; }
            if (perPage === void 0) { perPage = 30; }
            if (queryParams === void 0) { queryParams = {}; }
            queryParams = Object.assign({
                'page': page,
                'perPage': perPage,
            }, queryParams);
            return this.client.send('/api/logs/requests', {
                'method': 'GET',
                'params': queryParams,
            }).then(function (responseData) {
                var items = [];
                if (responseData === null || responseData === void 0 ? void 0 : responseData.items) {
                    responseData.items = (responseData === null || responseData === void 0 ? void 0 : responseData.items) || [];
                    for (var _i = 0, _a = responseData.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        items.push(new LogRequest(item));
                    }
                }
                return new ListResult((responseData === null || responseData === void 0 ? void 0 : responseData.page) || 1, (responseData === null || responseData === void 0 ? void 0 : responseData.perPage) || 0, (responseData === null || responseData === void 0 ? void 0 : responseData.totalItems) || 0, (responseData === null || responseData === void 0 ? void 0 : responseData.totalPages) || 0, items);
            });
        };
        /**
         * Returns a single logged request by its id.
         */
        LogService.prototype.getRequest = function (id, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send('/api/logs/requests/' + encodeURIComponent(id), {
                'method': 'GET',
                'params': queryParams
            }).then(function (responseData) { return new LogRequest(responseData); });
        };
        /**
         * Returns request logs statistics.
         */
        LogService.prototype.getRequestsStats = function (queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send('/api/logs/requests/stats', {
                'method': 'GET',
                'params': queryParams
            }).then(function (responseData) { return responseData; });
        };
        return LogService;
    }(BaseService));

    var RealtimeService = /** @class */ (function (_super) {
        __extends(RealtimeService, _super);
        function RealtimeService() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.clientId = "";
            _this.eventSource = null;
            _this.subscriptions = {};
            _this.lastSentTopics = [];
            _this.maxConnectTimeout = 15000;
            _this.reconnectAttempts = 0;
            _this.maxReconnectAttempts = Infinity;
            _this.predefinedReconnectIntervals = [
                200, 300, 500, 1000, 1200, 1500, 2000,
            ];
            _this.pendingConnects = [];
            return _this;
        }
        Object.defineProperty(RealtimeService.prototype, "isConnected", {
            /**
             * Returns whether the realtime connection has been established.
             */
            get: function () {
                return !!this.eventSource && !!this.clientId && !this.pendingConnects.length;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Register the subscription listener.
         *
         * You can subscribe multiple times to the same topic.
         *
         * If the SSE connection is not started yet,
         * this method will also initialize it.
         */
        RealtimeService.prototype.subscribe = function (topic, callback) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var listener;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!topic) {
                                throw new Error('topic must be set.');
                            }
                            listener = function (e) {
                                var msgEvent = e;
                                var data;
                                try {
                                    data = JSON.parse(msgEvent === null || msgEvent === void 0 ? void 0 : msgEvent.data);
                                }
                                catch (_a) { }
                                callback(data || {});
                            };
                            // store the listener
                            if (!this.subscriptions[topic]) {
                                this.subscriptions[topic] = [];
                            }
                            this.subscriptions[topic].push(listener);
                            if (!!this.isConnected) return [3 /*break*/, 2];
                            // initialize sse connection
                            return [4 /*yield*/, this.connect()];
                        case 1:
                            // initialize sse connection
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 2:
                            if (!(this.subscriptions[topic].length === 1)) return [3 /*break*/, 4];
                            // send the updated subscriptions (if it is the first for the topic)
                            return [4 /*yield*/, this.submitSubscriptions()];
                        case 3:
                            // send the updated subscriptions (if it is the first for the topic)
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            // only register the listener
                            (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.addEventListener(topic, listener);
                            _b.label = 5;
                        case 5: return [2 /*return*/, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, this.unsubscribeByTopicAndListener(topic, listener)];
                                });
                            }); }];
                    }
                });
            });
        };
        /**
         * Unsubscribe from all subscription listeners with the specified topic.
         *
         * If `topic` is not provided, then this method will unsubscribe
         * from all active subscriptions.
         *
         * This method is no-op if there are no active subscriptions.
         *
         * The related sse connection will be autoclosed if after the
         * unsubscribe operation there are no active subscriptions left.
         */
        RealtimeService.prototype.unsubscribe = function (topic) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var _i, _b, listener;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!this.hasSubscriptionListeners(topic)) {
                                return [2 /*return*/]; // already unsubscribed
                            }
                            if (!topic) {
                                // remove all subscriptions
                                this.subscriptions = {};
                            }
                            else {
                                // remove all topic listeners
                                for (_i = 0, _b = this.subscriptions[topic]; _i < _b.length; _i++) {
                                    listener = _b[_i];
                                    (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.removeEventListener(topic, listener);
                                }
                                delete this.subscriptions[topic];
                            }
                            if (!!this.hasSubscriptionListeners()) return [3 /*break*/, 1];
                            // no other active subscriptions -> close the sse connection
                            this.disconnect();
                            return [3 /*break*/, 3];
                        case 1:
                            if (!!this.hasSubscriptionListeners(topic)) return [3 /*break*/, 3];
                            // submit subscriptions change if there are no other active subscriptions related to the topic
                            return [4 /*yield*/, this.submitSubscriptions()];
                        case 2:
                            // submit subscriptions change if there are no other active subscriptions related to the topic
                            _c.sent();
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Unsubscribe from all subscription listeners starting with the specified topic prefix.
         *
         * This method is no-op if there are no active subscriptions with the specified topic prefix.
         *
         * The related sse connection will be autoclosed if after the
         * unsubscribe operation there are no active subscriptions left.
         */
        RealtimeService.prototype.unsubscribeByPrefix = function (topicPrefix) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var hasAtleastOneTopic, topic, _i, _b, listener;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            hasAtleastOneTopic = false;
                            for (topic in this.subscriptions) {
                                if (!topic.startsWith(topicPrefix)) {
                                    continue;
                                }
                                hasAtleastOneTopic = true;
                                for (_i = 0, _b = this.subscriptions[topic]; _i < _b.length; _i++) {
                                    listener = _b[_i];
                                    (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.removeEventListener(topic, listener);
                                }
                                delete this.subscriptions[topic];
                            }
                            if (!hasAtleastOneTopic) {
                                return [2 /*return*/]; // nothing to unsubscribe from
                            }
                            if (!this.hasSubscriptionListeners()) return [3 /*break*/, 2];
                            // submit the deleted subscriptions
                            return [4 /*yield*/, this.submitSubscriptions()];
                        case 1:
                            // submit the deleted subscriptions
                            _c.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            // no other active subscriptions -> close the sse connection
                            this.disconnect();
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Unsubscribe from all subscriptions matching the specified topic and listener function.
         *
         * This method is no-op if there are no active subscription with
         * the specified topic and listener.
         *
         * The related sse connection will be autoclosed if after the
         * unsubscribe operation there are no active subscriptions left.
         */
        RealtimeService.prototype.unsubscribeByTopicAndListener = function (topic, listener) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var exist, i;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!Array.isArray(this.subscriptions[topic]) || !this.subscriptions[topic].length) {
                                return [2 /*return*/]; // already unsubscribed
                            }
                            exist = false;
                            for (i = this.subscriptions[topic].length - 1; i >= 0; i--) {
                                if (this.subscriptions[topic][i] !== listener) {
                                    continue;
                                }
                                exist = true; // has at least one matching listener
                                delete this.subscriptions[topic][i]; // removes the function reference
                                this.subscriptions[topic].splice(i, 1); // reindex the array
                                (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.removeEventListener(topic, listener);
                            }
                            if (!exist) {
                                return [2 /*return*/];
                            }
                            // remove the topic from the subscriptions list if there are no other listeners
                            if (!this.subscriptions[topic].length) {
                                delete this.subscriptions[topic];
                            }
                            if (!!this.hasSubscriptionListeners()) return [3 /*break*/, 1];
                            // no other active subscriptions -> close the sse connection
                            this.disconnect();
                            return [3 /*break*/, 3];
                        case 1:
                            if (!!this.hasSubscriptionListeners(topic)) return [3 /*break*/, 3];
                            // submit subscriptions change if there are no other active subscriptions related to the topic
                            return [4 /*yield*/, this.submitSubscriptions()];
                        case 2:
                            // submit subscriptions change if there are no other active subscriptions related to the topic
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        RealtimeService.prototype.hasSubscriptionListeners = function (topicToCheck) {
            var _a, _b;
            this.subscriptions = this.subscriptions || {};
            // check the specified topic
            if (topicToCheck) {
                return !!((_a = this.subscriptions[topicToCheck]) === null || _a === void 0 ? void 0 : _a.length);
            }
            // check for at least one non-empty topic
            for (var topic in this.subscriptions) {
                if (!!((_b = this.subscriptions[topic]) === null || _b === void 0 ? void 0 : _b.length)) {
                    return true;
                }
            }
            return false;
        };
        RealtimeService.prototype.submitSubscriptions = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.clientId) {
                        return [2 /*return*/]; // no client/subscriber
                    }
                    // optimistic update
                    this.addAllSubscriptionListeners();
                    this.lastSentTopics = this.getNonEmptySubscriptionTopics();
                    return [2 /*return*/, this.client.send('/api/realtime', {
                            'method': 'POST',
                            'body': {
                                'clientId': this.clientId,
                                'subscriptions': this.lastSentTopics,
                            },
                            'params': {
                                '$cancelKey': "realtime_" + this.clientId,
                            },
                        }).catch(function (err) {
                            if (err === null || err === void 0 ? void 0 : err.isAbort) {
                                return; // silently ignore aborted pending requests
                            }
                            throw err;
                        })];
                });
            });
        };
        RealtimeService.prototype.getNonEmptySubscriptionTopics = function () {
            var result = [];
            for (var topic in this.subscriptions) {
                if (this.subscriptions[topic].length) {
                    result.push(topic);
                }
            }
            return result;
        };
        RealtimeService.prototype.addAllSubscriptionListeners = function () {
            if (!this.eventSource) {
                return;
            }
            this.removeAllSubscriptionListeners();
            for (var topic in this.subscriptions) {
                for (var _i = 0, _a = this.subscriptions[topic]; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    this.eventSource.addEventListener(topic, listener);
                }
            }
        };
        RealtimeService.prototype.removeAllSubscriptionListeners = function () {
            if (!this.eventSource) {
                return;
            }
            for (var topic in this.subscriptions) {
                for (var _i = 0, _a = this.subscriptions[topic]; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    this.eventSource.removeEventListener(topic, listener);
                }
            }
        };
        RealtimeService.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (this.reconnectAttempts > 0) {
                        // immediately resolve the promise to avoid indefinitely
                        // blocking the client during reconnection
                        return [2 /*return*/];
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.pendingConnects.push({ resolve: resolve, reject: reject });
                            if (_this.pendingConnects.length > 1) {
                                // all promises will be resolved once the connection is established
                                return;
                            }
                            _this.initConnect();
                        })];
                });
            });
        };
        RealtimeService.prototype.initConnect = function () {
            var _this = this;
            this.disconnect(true);
            // wait up to 15s for connect
            clearTimeout(this.connectTimeoutId);
            this.connectTimeoutId = setTimeout(function () {
                _this.connectErrorHandler(new Error("EventSource connect took too long."));
            }, this.maxConnectTimeout);
            this.eventSource = new EventSource(this.client.buildUrl('/api/realtime'));
            this.eventSource.onerror = function (_) {
                _this.connectErrorHandler(new Error("Failed to establish realtime connection."));
            };
            this.eventSource.addEventListener('PB_CONNECT', function (e) {
                var msgEvent = e;
                _this.clientId = msgEvent === null || msgEvent === void 0 ? void 0 : msgEvent.lastEventId;
                _this.submitSubscriptions()
                    .then(function () { return __awaiter(_this, void 0, void 0, function () {
                    var retries;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                retries = 3;
                                _a.label = 1;
                            case 1:
                                if (!(this.hasUnsentSubscriptions() && retries > 0)) return [3 /*break*/, 3];
                                retries--;
                                // resubscribe to ensure that the latest topics are submitted
                                //
                                // This is needed because missed topics could happen on reconnect
                                // if after the pending sent `submitSubscriptions()` call another `subscribe()`
                                // was made before the submit was able to complete.
                                return [4 /*yield*/, this.submitSubscriptions()];
                            case 2:
                                // resubscribe to ensure that the latest topics are submitted
                                //
                                // This is needed because missed topics could happen on reconnect
                                // if after the pending sent `submitSubscriptions()` call another `subscribe()`
                                // was made before the submit was able to complete.
                                _a.sent();
                                return [3 /*break*/, 1];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }).then(function () {
                    for (var _i = 0, _a = _this.pendingConnects; _i < _a.length; _i++) {
                        var p = _a[_i];
                        p.resolve();
                    }
                    // reset connect meta
                    _this.pendingConnects = [];
                    _this.reconnectAttempts = 0;
                    clearTimeout(_this.reconnectTimeoutId);
                    clearTimeout(_this.connectTimeoutId);
                }).catch(function (err) {
                    _this.clientId = "";
                    _this.connectErrorHandler(err);
                });
            });
        };
        RealtimeService.prototype.hasUnsentSubscriptions = function () {
            var latestTopics = this.getNonEmptySubscriptionTopics();
            if (latestTopics.length != this.lastSentTopics.length) {
                return true;
            }
            for (var _i = 0, latestTopics_1 = latestTopics; _i < latestTopics_1.length; _i++) {
                var t = latestTopics_1[_i];
                if (!this.lastSentTopics.includes(t)) {
                    return true;
                }
            }
            return false;
        };
        RealtimeService.prototype.connectErrorHandler = function (err) {
            var _this = this;
            clearTimeout(this.connectTimeoutId);
            clearTimeout(this.reconnectTimeoutId);
            if (
            // wasn't previously connected -> direct reject
            (!this.clientId && !this.reconnectAttempts) ||
                // was previously connected but the max reconnection limit has been reached
                this.reconnectAttempts > this.maxReconnectAttempts) {
                for (var _i = 0, _a = this.pendingConnects; _i < _a.length; _i++) {
                    var p = _a[_i];
                    p.reject(new ClientResponseError(err));
                }
                this.disconnect();
                return;
            }
            // otherwise -> reconnect in the background
            this.disconnect(true);
            var timeout = this.predefinedReconnectIntervals[this.reconnectAttempts] || this.predefinedReconnectIntervals[this.predefinedReconnectIntervals.length - 1];
            this.reconnectAttempts++;
            this.reconnectTimeoutId = setTimeout(function () {
                _this.initConnect();
            }, timeout);
        };
        RealtimeService.prototype.disconnect = function (fromReconnect) {
            var _a;
            if (fromReconnect === void 0) { fromReconnect = false; }
            clearTimeout(this.connectTimeoutId);
            clearTimeout(this.reconnectTimeoutId);
            this.removeAllSubscriptionListeners();
            (_a = this.eventSource) === null || _a === void 0 ? void 0 : _a.close();
            this.eventSource = null;
            this.clientId = "";
            if (!fromReconnect) {
                this.reconnectAttempts = 0;
                // reject any remaining connect promises
                var err = new ClientResponseError(new Error("Realtime disconnected."));
                for (var _i = 0, _b = this.pendingConnects; _i < _b.length; _i++) {
                    var p = _b[_i];
                    p.reject(err);
                }
                this.pendingConnects = [];
            }
        };
        return RealtimeService;
    }(BaseService));

    var HealthService = /** @class */ (function (_super) {
        __extends(HealthService, _super);
        function HealthService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Checks the health status of the api.
         */
        HealthService.prototype.check = function (queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send('/api/health', {
                'method': 'GET',
                'params': queryParams,
            });
        };
        return HealthService;
    }(BaseService));

    var FileService = /** @class */ (function (_super) {
        __extends(FileService, _super);
        function FileService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Builds and returns an absolute record file url for the provided filename.
         */
        FileService.prototype.getUrl = function (record, filename, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            var parts = [];
            parts.push("api");
            parts.push("files");
            parts.push(encodeURIComponent(record.collectionId || record.collectionName));
            parts.push(encodeURIComponent(record.id));
            parts.push(encodeURIComponent(filename));
            var result = this.client.buildUrl(parts.join('/'));
            if (Object.keys(queryParams).length) {
                var params = Object.entries(queryParams).map(function (_a) {
                    var key = _a[0], val = _a[1];
                    return "".concat(key, "=").concat(encodeURIComponent(val));
                }).join('&');
                result += (result.includes("?") ? "&" : "?") + params;
            }
            return result;
        };
        /**
         * Requests a new private file access token for the current auth model (admin or record).
         */
        FileService.prototype.getToken = function (queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send('/api/files/token', {
                'method': 'POST',
                'params': queryParams,
            }).then(function (data) { return (data === null || data === void 0 ? void 0 : data.token) || ''; });
        };
        return FileService;
    }(BaseService));

    var BackupService = /** @class */ (function (_super) {
        __extends(BackupService, _super);
        function BackupService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns list with all available backup files.
         */
        BackupService.prototype.getFullList = function (queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send('/api/backups', {
                'method': 'GET',
                'params': queryParams,
            });
        };
        /**
         * Initializes a new backup.
         */
        BackupService.prototype.create = function (basename, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            var bodyParams = {
                'name': basename,
            };
            return this.client.send('/api/backups', {
                'method': 'POST',
                'params': queryParams,
                'body': bodyParams,
            }).then(function () { return true; });
        };
        /**
         * Deletes a single backup file.
         */
        BackupService.prototype.delete = function (key, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send("/api/backups/".concat(encodeURIComponent(key)), {
                'method': 'DELETE',
                'params': queryParams,
            }).then(function () { return true; });
        };
        /**
         * Initializes an app data restore from an existing backup.
         */
        BackupService.prototype.restore = function (key, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.client.send("/api/backups/".concat(encodeURIComponent(key), "/restore"), {
                'method': 'POST',
                'params': queryParams,
            }).then(function () { return true; });
        };
        /**
         * Builds a download url for a single existing backup using an
         * admin file token and the backup file key.
         *
         * The file token can be generated via `pb.files.getToken()`.
         */
        BackupService.prototype.getDownloadUrl = function (token, key) {
            return this.client.buildUrl("/api/backups/".concat(encodeURIComponent(key), "?token=").concat(encodeURIComponent(token)));
        };
        return BackupService;
    }(BaseService));

    /**
     * PocketBase JS Client.
     */
    var Client = /** @class */ (function () {
        function Client(baseUrl, authStore, lang) {
            if (baseUrl === void 0) { baseUrl = '/'; }
            if (lang === void 0) { lang = 'en-US'; }
            this.cancelControllers = {};
            this.recordServices = {};
            this.enableAutoCancellation = false;
            this.baseUrl = baseUrl;
            this.lang = lang;
            this.authStore = authStore || new LocalAuthStore();
            // services
            this.admins = new AdminService(this);
            this.collections = new CollectionService(this);
            this.files = new FileService(this);
            this.logs = new LogService(this);
            this.settings = new SettingsService(this);
            this.realtime = new RealtimeService(this);
            this.health = new HealthService(this);
            this.backups = new BackupService(this);
        }
        /**
         * Returns the RecordService associated to the specified collection.
         *
         * @param  {string} idOrName
         * @return {RecordService}
         */
        Client.prototype.collection = function (idOrName) {
            if (!this.recordServices[idOrName]) {
                this.recordServices[idOrName] = new RecordService(this, idOrName);
            }
            return this.recordServices[idOrName];
        };
        /**
         * Globally enable or disable auto cancellation for pending duplicated requests.
         */
        Client.prototype.autoCancellation = function (enable) {
            this.enableAutoCancellation = !!enable;
            return this;
        };
        /**
         * Cancels single request by its cancellation key.
         */
        Client.prototype.cancelRequest = function (cancelKey) {
            if (this.cancelControllers[cancelKey]) {
                this.cancelControllers[cancelKey].abort();
                delete this.cancelControllers[cancelKey];
            }
            return this;
        };
        /**
         * Cancels all pending requests.
         */
        Client.prototype.cancelAllRequests = function () {
            for (var k in this.cancelControllers) {
                this.cancelControllers[k].abort();
            }
            this.cancelControllers = {};
            return this;
        };
        /**
         * Sends an api http request.
         */
        Client.prototype.send = function (path, reqOptions) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __awaiter(this, void 0, void 0, function () {
                var options, cancelKey, controller, url, query, result, _j, _k, _l, wxFetch;
                var _this = this;
                return __generator(this, function (_m) {
                    switch (_m.label) {
                        case 0:
                            options = Object.assign({ method: 'GET' }, reqOptions);
                            // JSON serialize the body if needed and set the correct content type
                            // (for FormData body the Content-Type header should be skipped since the boundary is autogenerated)
                            if (!this.isFormData(options.body)) {
                                if (options.body && typeof options.body !== 'string') {
                                    options.body = JSON.stringify(options.body);
                                }
                                // add the json header (if not already)
                                if (typeof ((_a = options === null || options === void 0 ? void 0 : options.headers) === null || _a === void 0 ? void 0 : _a['Content-Type']) === 'undefined') {
                                    options.headers = Object.assign({}, options.headers, {
                                        'Content-Type': 'application/json',
                                    });
                                }
                            }
                            // add Accept-Language header (if not already)
                            if (typeof ((_b = options === null || options === void 0 ? void 0 : options.headers) === null || _b === void 0 ? void 0 : _b['Accept-Language']) === 'undefined') {
                                options.headers = Object.assign({}, options.headers, {
                                    'Accept-Language': this.lang,
                                });
                            }
                            // check if Authorization header can be added
                            if (
                            // has stored token
                            ((_c = this.authStore) === null || _c === void 0 ? void 0 : _c.token) &&
                                // auth header is not explicitly set
                                (typeof ((_d = options === null || options === void 0 ? void 0 : options.headers) === null || _d === void 0 ? void 0 : _d.Authorization) === 'undefined')) {
                                options.headers = Object.assign({}, options.headers, {
                                    'Authorization': this.authStore.token,
                                });
                            }
                            // handle auto cancelation for duplicated pending request
                            if (this.enableAutoCancellation && ((_e = options.params) === null || _e === void 0 ? void 0 : _e.$autoCancel) !== false) {
                                cancelKey = ((_f = options.params) === null || _f === void 0 ? void 0 : _f.$cancelKey) || ((options.method || 'GET') + path);
                                // cancel previous pending requests
                                this.cancelRequest(cancelKey);
                                controller = new AbortController();
                                this.cancelControllers[cancelKey] = controller;
                                options.signal = controller.signal;
                            }
                            // remove the special cancellation params from the other valid query params
                            (_g = options.params) === null || _g === void 0 ? true : delete _g.$autoCancel;
                            (_h = options.params) === null || _h === void 0 ? true : delete _h.$cancelKey;
                            url = this.buildUrl(path);
                            // serialize the query parameters
                            if (typeof options.params !== 'undefined') {
                                query = this.serializeQueryParams(options.params);
                                if (query) {
                                    url += (url.includes('?') ? '&' : '?') + query;
                                }
                                delete options.params;
                            }
                            if (!this.beforeSend) return [3 /*break*/, 2];
                            _k = (_j = Object).assign;
                            _l = [{}];
                            return [4 /*yield*/, this.beforeSend(url, options)];
                        case 1:
                            result = _k.apply(_j, _l.concat([_m.sent()]));
                            if (typeof result.url !== "undefined" || typeof result.options !== "undefined") {
                                url = result.url || url;
                                options = result.options || options;
                            }
                            else if (Object.keys(result).length) {
                                // legacy behavior
                                options = result;
                                (console === null || console === void 0 ? void 0 : console.warn) && console.warn("Deprecated format of beforeSend return: please use `return { url, options }`, instead of `return options`.");
                            }
                            _m.label = 2;
                        case 2:
                            wxFetch = function (url, options) {
                                return new Promise(function (resolve, reject) {
                                    wx.request({
                                        url: url,
                                        data: options.body,
                                        method: options.method,
                                        header: options.headers,
                                        enableHttp2: true,
                                        enableQuic: true,
                                        success: resolve,
                                        fail: reject
                                    });
                                });
                            };
                            // send the request
                            return [2 /*return*/, wxFetch(url, options).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                    var data;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                data = response.data;
                                                if (!this.afterSend) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.afterSend(response, data)];
                                            case 1:
                                                data = _a.sent();
                                                _a.label = 2;
                                            case 2:
                                                if (response.statusCode >= 400) {
                                                    throw new ClientResponseError({
                                                        url: response.url,
                                                        status: response.statusCode,
                                                        data: data,
                                                    });
                                                }
                                                return [2 /*return*/, data];
                                        }
                                    });
                                }); }).catch(function (err) {
                                    throw new ClientResponseError(err);
                                })];
                    }
                });
            });
        };
        /**
         * Legacy alias of `pb.files.getUrl()`.
         */
        Client.prototype.getFileUrl = function (record, filename, queryParams) {
            if (queryParams === void 0) { queryParams = {}; }
            return this.files.getUrl(record, filename, queryParams);
        };
        /**
         * Builds a full client url by safely concatenating the provided path.
         */
        Client.prototype.buildUrl = function (path) {
            var _a;
            var url = this.baseUrl;
            // construct an absolute base url if in a browser environment
            if (typeof window !== 'undefined' &&
                !!window.location &&
                !url.startsWith('https://') &&
                !url.startsWith('http://')) {
                url = ((_a = window.location.origin) === null || _a === void 0 ? void 0 : _a.endsWith('/')) ?
                    window.location.origin.substring(0, window.location.origin.length - 1) :
                    (window.location.origin || '');
                if (!this.baseUrl.startsWith('/')) {
                    url += window.location.pathname || '/';
                    url += url.endsWith('/') ? '' : '/';
                }
                url += this.baseUrl;
            }
            // concatenate the path
            if (path) {
                url += url.endsWith('/') ? '' : '/'; // append trailing slash if missing
                url += path.startsWith('/') ? path.substring(1) : path;
            }
            return url;
        };
        /**
         * Loosely checks if the specified body is a FormData instance.
         */
        Client.prototype.isFormData = function (body) {
            return body && (
            // we are checking the constructor name because FormData
            // is not available natively in some environments and the
            // polyfill(s) may not be globally accessible
            body.constructor.name === 'FormData' ||
                // fallback to global FormData instance check
                // note: this is needed because the constructor.name could be different in case of
                //       custom global FormData implementation, eg. React Native on Android/iOS
                (typeof FormData !== "undefined" && body instanceof FormData));
        };
        /**
         * Serializes the provided query parameters into a query string.
         */
        Client.prototype.serializeQueryParams = function (params) {
            var result = [];
            for (var key in params) {
                if (params[key] === null) {
                    // skip null query params
                    continue;
                }
                var value = params[key];
                var encodedKey = encodeURIComponent(key);
                if (Array.isArray(value)) {
                    // "repeat" array params
                    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                        var v = value_1[_i];
                        result.push(encodedKey + "=" + encodeURIComponent(v));
                    }
                }
                else if (value instanceof Date) {
                    result.push(encodedKey + "=" + encodeURIComponent(value.toISOString()));
                }
                else if (typeof value !== null && typeof value === 'object') {
                    result.push(encodedKey + "=" + encodeURIComponent(JSON.stringify(value)));
                }
                else {
                    result.push(encodedKey + "=" + encodeURIComponent(value));
                }
            }
            return result.join('&');
        };
        return Client;
    }());

    return Client;

})();
