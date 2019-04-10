var CryptoJS = require("crypto-js");
var keySize = 256;
var ivSize = 128;
var saltSize = 256;
var iterations = 1000;

var Password = {

    _pattern : /[a-zA-Z0-9_\-\+\.]/,


    _getRandomByte : function()
    {
        if(window.crypto && window.crypto.getRandomValues)
        {
            var result = new Uint8Array(1);
            window.crypto.getRandomValues(result);
            return result[0];
        }
        else if(window.msCrypto && window.msCrypto.getRandomValues)
        {
            var result = new Uint8Array(1);
            window.msCrypto.getRandomValues(result);
            return result[0];
        }
        else
        {
            return Math.floor(Math.random() * 256);
        }
    },

    _length: function()
    {
        return Math.floor(Math.random() * 32) + 32;
    },

    generate : function(length)
    {
        return Array.apply(null, {'length': length ? length : this._length()})
            .map(function()
            {
                var result;
                while(true)
                {
                    result = String.fromCharCode(this._getRandomByte());
                    if(this._pattern.test(result))
                    {
                        return result;
                    }
                }
            }, this)
            .join('');
    }

};

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}

function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}

export function encrypt(message, pass) {
    var salt = CryptoJS.lib.WordArray.random(saltSize / 8);

    var key = CryptoJS.PBKDF2(pass, salt, {keySize: keySize / 32, iterations: iterations});
    var iv = CryptoJS.lib.WordArray.random(ivSize / 8);

    var encrypted = CryptoJS.AES.encrypt(message, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });

    var encryptedHex = base64ToHex(encrypted.toString());

    var base64result = hexToBase64(salt + iv + encryptedHex);

    return base64result;
};

export function decrypt(message, pass) {
    var hexResult = base64ToHex(message)

    var salt = CryptoJS.enc.Hex.parse(hexResult.substr(0, 64));
    var iv = CryptoJS.enc.Hex.parse(hexResult.substr(64, 32));
    var encrypted = hexToBase64(hexResult.substring(96));

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    })

    return decrypted.toString(CryptoJS.enc.Utf8);
};

export function keygen() {
    return Password.generate();
};

export default {
    encrypt,
    decrypt,
    keygen
};