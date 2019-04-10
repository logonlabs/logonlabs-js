import API from './api.js';
import Util from './utils.js';

const css = require('./view.css').toString();

import view from './view.js';

const KEY_STORAGE = 'logon-storage-key';

const providers = {
    GOOGLE: 'google',
    MICROSOFT: 'microsoft',
    FACEBOOK: 'facebook',
    LINKEDIN: 'linkedin',
    OKTA: 'okta'
};

const GOOGLE = {
    type: providers.GOOGLE,
    name: 'Google'
};
const MICROSOFT = {
    type: providers.MICROSOFT,
    name: 'Microsoft'
};
const FACEBOOK = {
    type: providers.FACEBOOK,
    name: 'facebook'
};
const LINKEDIN = {
    type: providers.LINKEDIN,
    name: 'LinkedIn'
};
const OKTA = {
    type: providers.OKTA,
    name: 'Okta'
};

var provider_list = [MICROSOFT, GOOGLE, FACEBOOK, LINKEDIN, OKTA];
var provider_hash = {
    'microsoft': MICROSOFT,
    'google': GOOGLE,
    'facebook': FACEBOOK,
    'linkedin': LINKEDIN,
    'okta': OKTA
}
var css_loaded = false;

var initialize = function() {
};

var options = {
    app_id: false,
    api_path: false,
    encryption: false
};

var configure = function(opt) {
    if (typeof opt.app_id != 'undefined') {
        options.app_id = opt.app_id;
    }

    if (typeof opt.api_path != 'undefined') {
        options.api_path = opt.api_path;
    }

    if (typeof opt.encryption != 'undefined') {
        options.encryption = opt.encryption;
    }

    api.configure({
        app_id: options.app_id,
        api_path: options.api_path,
        encryption: options.encryption
    });
    console.log('saving app_id : ' + options.app_id);

};

var loadCSS = function() {
    css_loaded = true;
    var cssStyle = document.createElement("style");
    var node = document.createTextNode(css);
    cssStyle.appendChild(node);
    document.getElementsByTagName("head")[0].appendChild(cssStyle)
}

var api = new function() {
    this.configure = function(opt) {
        API.configure({
            app_id: opt.app_id,
            auto_redirect: opt.auto_redirect,
            api_path: opt.api_path
        });
        // this.ping(function(res){
        //     console.log(res);
        // });
    };
    this.startLogin = function(opt, callback) {
        var redirect = true;
        var data = {
            identity_provider: opt.identity_provider,
        };
        if (opt.email_address) {
            data['email_address'] = opt.email_address;
        }
        if (opt.client_data) {
            data['client_data'] = opt.client_data;
        }

        if (options.encryption) {
            data['client_encryption_key'] = util.keygen();
        }

        if (opt.redirect === false) {
            redirect = opt.redirect;
        }

        if (typeof data['client_data'] == 'object') {
            data['client_data'] = JSON.stringify(data['client_data']);
        }

        API.startLogin(data, function(response){
            if (response && response.token) {
                if (callback) {
                    callback(API.redirectLogin(response.token, redirect));
                } else {
                    API.redirectLogin(response.token, redirect);
                }
            } else {
                callback(response);
            }
        });
    };

    this.getProviders = function(email_address, callback) {
        var data = {};
        if (email_address) {
            data['email_address'] = email_address;
        }
        API.getProviders(data, callback);
    }

    this.ping = function(callback) {
        API.ping(callback);
    };
};

var ui = new function() {
    this.button = function(id) {
        if (!css_loaded) {
            loadCSS();
        }
        api.getProviders(false, function(res) {
            console.log('getProviders');
            console.log(res);
            var list = [];
            if (res && res.identity_providers) {
                for(var i = 0; i < res.identity_providers.length; i++) {
                    list.push(provider_hash[res.identity_providers[i].type]);
                }
            } else {
                list = provider_list;
            }
            view.addButtons(id, list);
        });
    };
};

var util = new function() {
    this.encrypt = function(message) {
        var key = localStorage.getItem(KEY_STORAGE);
        if (!key) {
            key = util.keygen();
        }
        return Util.encrypt(message, key);
    };
    this.decrypt = function(message) {
        var key = localStorage.getItem(KEY_STORAGE);
        localStorage.removeItem(KEY_STORAGE);
        if (!key) {
            return false;
        }
        var result = Util.decrypt(message, key);
        // var final_result = result;
        // try {
        //     final_result = JSON.parse(final_result);
        // } catch (e) {
        //     final_result = result;
        // }
        //
        return result;
    };
    this.keygen = function() {
        var key = Util.keygen();
        localStorage.setItem(KEY_STORAGE, key);
        return key;
    };
}

var key = Util;


export default {
    configure,
    initialize,
    api,
    ui,
    util,
    key,
    providers
}