import { request, redirect } from './request.js';

let API_PATH = 'https://api.logonlabs.com/';
let APP_ID;
let APP_SECRET;
let DESTINATION_URL;
let CALLBACK_URL;
let CLIENT_DATA;
let FORCE_REAUTHENTICATION;

const OptionData = function(data) {
    let request_data = {};

    if (data.client_data) {
        request_data['client_data'] = data.client_data;
    } else if (CLIENT_DATA) {
        request_data['client_data'] = CLIENT_DATA;
    }

    if (typeof request_data['client_data'] == 'object') {
        request_data['client_data'] = JSON.stringify(
            request_data['client_data']
        );
    }

    if (data.callback_url) {
        request_data['callback_url'] = data.callback_url;
    } else if (CALLBACK_URL) {
        request_data['callback_ur'] = CALLBACK_URL;
    }

    if (data.destination_url) {
        request_data['destination_url'] = data.destination_url;
    } else if (DESTINATION_URL) {
        request_data['destination_url'] = DESTINATION_URL;
    }
    return request_data;
};

const ProcessData = function (data) {
    let request_data = OptionData(data);
    request_data['app_id'] = APP_ID;

    if (data.email_address) {
        request_data['email_address'] = data.email_address;
    }

    if (data.tags) {
        request_data['tags'] = data.tags;
    }

    return request_data;
};

const PasswordData = function (data) {
    let request_data = ProcessData(data);

    if (data.password) {
        request_data['password'] = data.password;
    }

    return request_data;
};

const ProviderData = function (data) {
    let request_data = ProcessData(data);

    if (data.identity_provider) {
        request_data['identity_provider'] = data.identity_provider;
    }

    if (data.identity_provider_id) {
        request_data['identity_provider_id'] = data.identity_provider_id;
    }

    if (data.force_reauthentication) {
        request_data['force_reauthentication'] = data.force_reauthentication;
    } else if (FORCE_REAUTHENTICATION) {
        request_data['force_reauthentication'] = FORCE_REAUTHENTICATION;
    }

    return request_data;
};

const configure = function (data) {
    if (typeof data.api_path != 'undefined' && data.api_path) {
        API_PATH = data.api_path.replace(/\/?$/, '/');

        // console.log('API_PATH = ' + API_PATH);
    }

    if (typeof data.app_id != 'undefined' && data.app_id) {
        APP_ID = data.app_id;

        // console.log('APP_ID = ' + APP_ID);
    }

    if (typeof data.app_secret != 'undefined' && data.app_secret) {
        APP_SECRET = data.app_secret;
    }

    if (typeof data.destination_url != 'undefined' && data.destination_url) {
        DESTINATION_URL = data.destination_url;
    }
    if (typeof data.callback_url != 'undefined' && data.callback_url) {
        CALLBACK_URL = data.callback_url;
    }
    if (typeof data.force_reauthentication != 'undefined' && data.force_reauthentication) {
        FORCE_REAUTHENTICATION = data.force_reauthentication;
    }

    if (typeof data.client_data != 'undefined' && data.client_data) {
        CLIENT_DATA = data.client_data;
    }

};

const startLogin = function (data, callback) {
    let url = API_PATH + 'start';

    let request_data = ProviderData(data);

    request(url, request_data, 'POST', callback);
};

const redirectLogin = function (token, auto_redirect) {
    let url = API_PATH + 'redirect';

    let request_data = {
        token: token,
    };

    return redirect(url, request_data, auto_redirect);
};

const validateLogin = function (token, callback) {
    let url = API_PATH + 'validate';

    let request_data = {
        app_id: APP_ID,
        app_secret: APP_SECRET,
        token: token,
    };

    request(url, request_data, 'POST', callback);
};

const refreshToken = function (identity_provider_id, token, callback) {
    let url = API_PATH + 'refresh';

    let request_data = {
        app_id: APP_ID,
        identity_provider_id: identity_provider_id,
        token: token,
    };

    request(url, request_data, 'POST', callback);
};

const revokeToken = function (identity_provider_id, token, callback) {
    let url = API_PATH + 'revoke';

    let request_data = {
        app_id: APP_ID,
        identity_provider_id: identity_provider_id,
        token: token,
    };

    request(url, request_data, 'POST', callback);
};

const getProviders = function (email_address, callback) {
    let url = API_PATH + 'providers';

    let request_data = {
        app_id: APP_ID,
    };

    if (email_address) {
        request_data['email_address'] = encodeURIComponent(email_address);
    }

    request(url, request_data, 'GET', callback);
};

const ping = function (callback) {
    let url = API_PATH + 'ping';

    let request_data = {
        app_id: APP_ID,
    };

    request(url, request_data, 'GET', callback);
};

const login = function (data, callback) {
    let url = API_PATH + 'login';

    let request_data = ProviderData(data);

    request(url, request_data, 'POST', callback);
};

const loginWithPassword = function (data, callback) {
    let url = API_PATH + 'login_local';

    let request_data = PasswordData(data);


    request(url, request_data, 'POST', callback);
};

const register = function (data, callback) {
    let url = API_PATH + 'register';

    let request_data = ProviderData(data);

    request(url, request_data, 'POST', callback);
};

const registerWithPassword = function (data, callback) {
    let url = API_PATH + 'register_local';

    let request_data = PasswordData(data);

    if (data.first_name) {
        request_data['first_name'] = data.first_name;
    }

    if (data.last_name) {
        request_data['last_name'] = data.last_name;
    }

    if (data.pin) {
        request_data['pin'] = data.pin;
    }

    request(url, request_data, 'POST', callback);
};

const resetPassword = function (email_address, callback) {
    let url = API_PATH + 'reset_password';

    let request_data = {
        app_id: APP_ID,
    };

    if (email_address) {
        request_data['email_address'] = email_address;
    }

    request(url, request_data, 'POST', callback);
};

const confirmResetPassword = function (email_address, pin, password, callback) {
    let url = API_PATH + 'confirm_password';

    let request_data = {
        app_id: APP_ID,
    };

    if (email_address) {
        request_data['email_address'] = email_address;
    }
    if (pin) {
        request_data['pin'] = pin;
    }
    if (password) {
        request_data['password'] = password;
    }

    request(url, request_data, 'POST', callback);
};

const confirmUser = function (data, callback) {
    let url = API_PATH + 'confirm_user';

    let request_data = ProcessData(data);

    if (data.email_address) {
        request_data['email_address'] = encodeURIComponent(data.email_address);
    }
    if (data.pin) {
        request_data['pin'] = data.pin;
    }

    request(url, request_data, 'GET', callback);
};

const resendConfirmationEmail = function (email_address, callback) {
    let url = API_PATH + 'resend_confirmation';

    let request_data = {
        app_id: APP_ID,
    };

    if (email_address) {
        request_data['email_address'] = email_address;
    }

    request(url, request_data, 'POST', callback);
};

export default {
    configure,
    getProviders,
    startLogin,
    redirectLogin,
    validateLogin,
    refreshToken,
    revokeToken,
    ping,
    login,
    loginWithPassword,
    register,
    registerWithPassword,
    resetPassword,
    confirmResetPassword,
    confirmUser,
    resendConfirmationEmail,
};
