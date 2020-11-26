import API from './api.js';
import viewButton from './view-button';
import viewForm from './view-form';
import viewPopup from './view-popup';
import constants from './constants';

const providers = constants.providers;
const providers_hash = constants.providers_hash;
const providers_buttons = constants.providers_buttons;

const initialize = function () {
    loadFonts();
};

const loadFonts = function () {
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (!fjs) {
            fjs = d.getElementsByTagName('head')[0];
        } else {
            fjs = fjs.parentNode;
        }
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.rel = 'stylesheet';
        js.href = 'https://cdn.logonlabs.com/dist/fonts/fonts.css';
        fjs.append(js);
    })(document, 'link', 'logon-fonts');
};

let options = {
    app_id: false,
    app_secret: false,
    api_path: false,
    language: 'en',
    locale: false,
    app_name: false,
    destination_url: false,
    callback_url: false,
    client_data: false,
    force_reauthentication: false,
    buttonTheme: 'round-icons', //'square-icons', 'round-icons', 'tile'
    expandedEmailAddress: true,
};

const configure = function (opt) {
    if (typeof opt.app_name != 'undefined') {
        options.app_name = opt.app_name;
    }
    if (typeof opt.language != 'undefined') {
        options.language = opt.language;
    }

    if (typeof opt.locale != 'undefined') {
        options.locale = opt.locale;
    }

    if (typeof opt.app_id != 'undefined') {
        options.app_id = opt.app_id;
    }

    if (typeof opt.app_secret != 'undefined') {
        options.app_secret = opt.app_secret;
    }

    if (typeof opt.api_path != 'undefined') {
        options.api_path = opt.api_path;
    }

    if (typeof opt.destination_url != 'undefined') {
        options.destination_url = opt.destination_url;
    }

    if (typeof opt.callback_url != 'undefined') {
        options.callback_url = opt.callback_url;
    }

    if (typeof opt.client_data != 'undefined') {
        options.client_data = opt.client_data;
    }

    if (typeof opt.force_reauthentication != 'undefined') {
        options.force_reauthentication = opt.force_reauthentication;
    }

    if (typeof opt.options != 'undefined') {
        if (typeof opt.options.buttonTheme != 'undefined') {
            options.buttonTheme = opt.options.buttonTheme;
        }
        if (typeof opt.options.expandedEmailAddress != 'undefined') {
            options.expandedEmailAddress = opt.options.expandedEmailAddress;
        }

        if (typeof opt.options.continueTop != 'undefined') {
            options.continueTop = opt.options.continueTop;
        }
        if (typeof opt.options.continueLeft != 'undefined') {
            options.continueLeft = opt.options.continueLeft;
        }
        if (typeof opt.options.continueRight != 'undefined') {
            options.continueRight = opt.options.continueRight;
        }
        if (typeof opt.options.continueBottom != 'undefined') {
            options.continueBottom = opt.options.continueBottom;
        }
    }

    api.configure({
        app_id: options.app_id,
        app_secret: options.app_secret,
        api_path: options.api_path,
        destination_url: options.destination_url,
        callback_url: options.callback_url,
        force_reauthentication: options.force_reauthentication,
        client_data: options.client_data
    });
};

const api = new (function () {
    this.configure = function (opt) {
        API.configure({
            app_id: opt.app_id,
            app_secret: opt.app_secret,
            api_path: opt.api_path,
            auto_redirect: opt.auto_redirect,
            destination_url: opt.destination_url,
            callback_url: opt.callback_url,
            force_reauthentication: opt.force_reauthentication,
            client_data: opt.client_data
        });
    };

    this.startLogin = function (opt, callback) {
        let redirect = true;
        if (opt.redirect === false) {
            redirect = opt.redirect;
        }

        API.startLogin(opt, function (response) {
            if (response && response.token) {
                if (callback) {
                    callback(API.redirectLogin(response.token, redirect));
                } else {
                    API.redirectLogin(response.token, redirect);
                }
            } else {
                if (callback) {
                    callback(response);
                }
            }
        });
    };

    this.redirect = API.redirectLogin;
    this.getProviders = API.getProviders;
    this.ping = API.ping;
})();

const applyOptions = function(opt, key) {
    if (typeof opt[key] == 'undefined' && options[key]) {
        opt[key] = options[key];
    }
};


const loadOptions = function (opt) {
    if (!opt) {
        opt = {};
    }

    if (options.language) {
        opt['language'] = options.language;
    }

    if (options.locale) {
        opt['locale'] = options.locale;
    }

    if (options.app_name) {
        opt['app_name'] = options.app_name;
    }

    applyOptions(opt, 'destination_url');
    applyOptions(opt, 'callback_url');
    applyOptions(opt, 'client_data');
    applyOptions(opt, 'force_reauthentication');
    applyOptions(opt, 'buttonTheme');
    applyOptions(opt, 'expandedEmailAddress');
    applyOptions(opt, 'continueTop');
    applyOptions(opt, 'continueLeft');
    applyOptions(opt, 'continueRight');
    applyOptions(opt, 'continueBottom');

    return opt;
};

const initUI = function (options) {
    options = loadOptions(options);
    viewPopup.init(options);
    viewButton.init(options);
    viewForm.init(options);
};

const ui = new (function () {
    (this.confirmEmail = function (id, options) {
        if (typeof id != 'string') {
            options = id;
            id = false;
        }
        initUI(options);
        options = loadOptions(options);
        if (options['email_address']) {
            if (localStorage) {
                localStorage.setItem(
                    'logonlabs-sdk-email-address',
                    options['email_address']
                );
            }
        }

        if (id) {
            viewForm.addConfirm(id, options);
        } else {
            viewPopup.addConfirm(options);
        }
    }),
        (this.resetPassword = function (id, options) {
            if (typeof id != 'string') {
                options = id;
                id = false;
            }
            //options required token
            initUI(options);
            options = loadOptions(options);

            if (options['email_address']) {
                if (localStorage) {
                    localStorage.setItem(
                        'logonlabs-sdk-email-address',
                        options['email_address']
                    );
                }
            }

            if (id) {
                viewForm.addReset(id, options);
            } else {
                viewPopup.addReset(options);
            }
        }),
        (this.form = function (id, options) {
            if (typeof id != 'string') {
                options = id;
                id = false;
            }
            initUI(options);
            options = loadOptions(options);

            if (id) {
                viewForm.addForm(id, options);
            } else {
                viewPopup.addForm(options);
            }
        }),
        (this.register = function (id, options) {
            if (typeof id != 'string') {
                options = id;
                id = false;
            }
            initUI(options);
            options = loadOptions(options);

            if (options['email_address']) {
                if (localStorage) {
                    localStorage.setItem(
                        'logonlabs-sdk-email-address',
                        options['email_address']
                    );
                }
            }

            if (id) {
                viewForm.addRegister(id, options);
            } else {
                viewPopup.addRegister(options);
            }
        }),
        (this.button = function (id, options) {
            initUI(options);
            options = loadOptions(options);

            let email_address = false;
            if (options['email_address']) {
                email_address = options['email_address'];
            }

            let social_identity_providers = [];
            if (
                options['social_identity_providers'] &&
                Array.isArray(options['social_identity_providers'])
            ) {
                social_identity_providers =
                    options['social_identity_providers'];
            }

            let enterprise_identity_providers = [];
            if (
                options['enterprise_identity_providers'] &&
                Array.isArray(options['enterprise_identity_providers'])
            ) {
                enterprise_identity_providers =
                    options['enterprise_identity_providers'];
            }

            let identity_providers = social_identity_providers.concat(
                enterprise_identity_providers
            );

            if (identity_providers.length === 0) {
                api.getProviders(email_address, function (res) {
                    let list = [];
                    if (res && res.social_identity_providers) {
                        for (
                            let i = 0;
                            i < res.social_identity_providers.length;
                            i++
                        ) {
                            if (
                                providers_hash[
                                    res.social_identity_providers[i].type
                                ]
                            ) {
                                list.push(
                                    providers_hash[
                                        res.social_identity_providers[i].type
                                    ]
                                );
                            }
                        }
                    }
                    if (res && res.enterprise_identity_providers) {
                        for (
                            let i = 0;
                            i < res.enterprise_identity_providers.length;
                            i++
                        ) {
                            if (
                                providers_hash[
                                    res.enterprise_identity_providers[i].type
                                ]
                            ) {
                                list.push(res.enterprise_identity_providers[i]);
                            }
                        }
                    }

                    // identityProviderListParsing('social_identity_providers');
                    // identityProviderListParsing('enterprise_identity_providers');

                    if (list.length === 0) {
                        list = false;
                    }

                    viewButton.addButtons(id, list, options);
                });
            } else {
                let list = [];

                // console.log(identity_providers);

                for (let i = 0; i < identity_providers.length; i++) {
                    if (providers_hash[identity_providers[i].type]) {
                        if (identity_providers[i].identity_provider_id) {
                            list.push(identity_providers[i]);
                        } else {
                            list.push(
                                providers_hash[identity_providers[i].type]
                            );
                        }
                    }
                }

                // console.log(list);

                viewButton.addButtons(id, list, options);
            }
        });
})();

export default {
    configure,
    initialize,
    api,
    ui,
    providers,
    providers_buttons,
};
