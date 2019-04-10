import { request, postRedirect, redirect } from './request.js';

var API_PATH = 'https://api.logonlabs.com/';
var APP_ID;

var configure = function(data) {
    if (typeof data.api_path != 'undefined' && data.api_path) {
        API_PATH = data.api_path.replace(/\/?$/, '/');
    }
    if (typeof data.app_id != 'undefined') {
        APP_ID = data.app_id;
    }
};

var startLogin = function(data, callback) {
    var url = API_PATH + 'start';
    var request_data = {
        app_id: APP_ID,
        identity_provider: data.identity_provider
    };
    if (data.email_address) {
        request_data['email_address'] = data.email_address;
    }
    if (data.client_data) {
        request_data['client_data'] = data.client_data;
    }
    if (data.client_encryption_key) {
        request_data['client_encryption_key'] = data.client_encryption_key;
    }
    request(url, request_data, 'POST', callback);
};

var redirectLogin = function(token, auto_redirect) {
    var url = API_PATH + 'redirect';
    var request_data = {
        token: token
    };
    url = redirect(url, request_data, auto_redirect);
    return url;
};


var getProviders = function(data, callback) {
    var url = API_PATH + 'providers';
    var request_data = {
        app_id: APP_ID
    };
    if (data.email_address) {
        request_data['email_address'] = data.email_address;
    }
    request(url, request_data, 'GET', callback);
};

var ping = function(callback) {
    var url = API_PATH + 'ping';
    var request_data = {
        app_id: APP_ID
    };
    request(url, request_data, 'GET', callback);
}

export default {
    configure,
    getProviders,
    startLogin,
    redirectLogin,
    ping
};