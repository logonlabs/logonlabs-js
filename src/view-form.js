const ID = 'logonlabs-forms';
const EMAIL_ID = 'logonlabs-email';
const LOGIN_ID = 'logonlabs-login';
const BUTTON_ID = 'logonlabs-buttons';
const BUTTON_HOLDER_ID = 'logonlabs-buttons-holder';
const REGISTER_ID = 'logonlabs-register';
const REGISTER_HOLDER_ID = 'logonlabs-register-holder';
const FORGOT_ID = 'logonlabs-forgot';
const RESET_ID = 'logonlabs-reset';
const RESET_TITLE_ID = 'logonlabs-reset-title';
const CONFIRM_TITLE_ID = 'logonlabs-confirm-title';
const RESET_FORM_ID = 'logonlabs-reset-form';
const CONFIRM_FORM_ID = 'logonlabs-confirm-form';
const CONFIRM_ID = 'logonlabs-confirm';
const ALERT_ID = 'logonlabs-alert';
const FORGOT_FORM_ID = 'logonlabs-forgot-form';
const FORGOT_BUTTON_ID = 'logonlabs-forgot-buttons';
const SWITCH_HOLDER_ID = 'logonlabs-switch-login';
const PASSWORD_VALIDATION_ID = 'logonlabs-password-validation';
const EXPIRE_ID = 'logonlabs-expire';
const EXPIRE_FORM_ID = 'logonlabs-expire-form';
const EXPIRE_BUTTON_ID = 'logonlabs-expire-buttons';
const INCOGNITO_ID = 'logonlabs-incognito';
const INCOGNITO_TITLE_ID = 'logonlabs-incognito-title';
const INCOGNITO_HOLDER_ID = 'logonlabs-incognito-holder';
const INCOGNITO_LOGIN_ID = 'logonlabs-incognito-login';
const INCOGNITO_REGISTER_ID = 'logonlabs-incognito-register';

const DISCOVERY_ID = 'logonlabs-discovery';

const MODULE_EMAIL_DISCOVERY = 'logonlabs-module-email-discovery';
const MODULE_HEADER = 'logonlabs-module-header-discovery';
const MODULE_SPACER = 'logonlabs-module-spacer';
const MODULE_PASSWORD = 'logonlabs-module-password';
const MODULE_FORM_INPUT = 'logonlabs-module-form-input';


import lang from './locale.js';
import hover from './utils/hover.js';
import val from './utils/validator.js';
import loader from './utils/loader.js';

let Locale = {};
let RESET_REQUIRED = false;
let APP_NAME = false;
let OPTS = {};

import './view-form.scss';

const FORM = {
    BACK: 'form-back',
    EMAIL: 'form-email',
    DISABLED_EMAIL: 'form-disabled-email',
    FORGOT: 'form-forgot',
    FORGOT_RESET: 'form-forgot-reset',
    PASSWORD: 'form-password',
    RE_PASSWORD: 'form-re-password',
    RESET_PASSWORD: 'form-reset-password',
    PASSWORD_CONTENT: 'form-password-content',
    TITLE: 'form-title',
    TITLE_ERROR: 'form-title-error',
    CONFIRM_EMAIL: 'form-confirm-email',
    SUBTITLE: 'form-subtitle',
    SUBTITLE_ERROR: 'form-subtitle-error',
    BUTTON_HOLDER: 'form-button-holder',
    NEXT: 'form-next',
    NEXT_HOLDER: 'form-next-holder',
    MESSAGE: 'form-message',
    OPTIONS: 'form-options',
    FIRST_NAME: 'form-first-name',
    LAST_NAME: 'form-last-name',
    REGISTER: 'form-register',
    LOGIN: 'form-login',
    LOGIN_HOLDER: 'form-login-holder',
    TOKEN: 'form-token',
    TOKEN_PIN: 'form-token-pin',
    CANCEL: 'form-cancel',
    ALERT_CONFIRM: 'form-alert-confirm',
    ALERT_CONFIRM_2: 'form-alert-confirm-2',
    SWITCH_LOGIN: 'form-switch-login',
    PASSWORD_TOGGLE: 'form-password-toggle',
    NEW_USER: 'form-new-user',
    SUB_MESSAGE: 'form-sub-message',
    HINT: 'form-hint',
    HINT_TITLE: 'form-hint-title',
    PIN: 'form-pin',
    ERROR_MESSAGE: 'form-error-message',
    INCOGNITO_NEXT: 'form-incognito-next',
    NEXT_ICON: 'form-next-icon',
};

const PASSWORD_STORAGE = {
    MINIMUM: 'logonlabs-sdk-password-length',
    LOWER: 'logonlabs-sdk-password-lowercase',
    UPPER: 'logonlabs-sdk-password-uppercase',
    SYMBOL: 'logonlabs-sdk-password-symbol',
    NUMBER: 'logonlabs-sdk-password-number',
};

const CACHE_STORAGE = {
    EMAIL: 'logonlabs-sdk-email-address',
    FIRST_NAME: 'logonlabs-sdk-first-name',
    INVITE_REQUIRED: 'logonlabs-sdk-invite-required'
};

const PASSWORD_VALIDATION = {
    MINIMUM: 'MINIMUM',
    LOWER: 'LOWER',
    UPPER: 'UPPER',
    SYMBOL: 'SYMBOL',
    NUMBER: 'NUMBER',
    NO_EMAIL: 'NO_EMAIL',
    MATCH: 'MATCH',
};

const PASSWORD_LIST = [
    PASSWORD_VALIDATION.MINIMUM,
    PASSWORD_VALIDATION.LOWER,
    PASSWORD_VALIDATION.UPPER,
    PASSWORD_VALIDATION.SYMBOL,
    PASSWORD_VALIDATION.NUMBER,
];
const PASSWORD_HINT = {
    NO_OLD_PASSWORD: 'NO_OLD_PASSWORD',
};

const USER_STATE = {
    NEW: 'new',
    INVITED: 'invited',
    REGISTERED: 'registered',
    PENDING: 'pending',
    PASSWORD_EXPIRED: 'password_expired',
};

import api from './api.js';
import constants from './constants';
import view from './view.js';

import viewButton from './view-button.js';

let loading = false;

const providers = constants.providers;
const providers_hash = constants.providers_hash;
const providers_buttons = constants.providers_buttons;
const providers_list = constants.providers_list;

import {
    DEV_LOCAL, DEV_NO_LOCAL, DEV_HV_LOCAL, DEV_NOT_HV_LOCAL, DEV_LOCAL_SUGGESTION, DEV_NON_SUGGESTION, DEV_SUGGESTION, DEV_EMPTY_PROVIDER, DEV_ONE_PROVIDER, DEV_USER_STATUS, DEV_NEED_INVITE, DEV_NO_INVITE, DEV_RESET_REQUEST, DEV_NEED_DISCOVERY, DEV_NO_DISCOVERY
} from './dev.json';

const applyDev = function (res) {

    if (res) {
        if (DEV_LOCAL_SUGGESTION) {
            res.suggested_identity_provider = 'local';
        }
        if (DEV_NON_SUGGESTION) {
            res.suggested_identity_provider = false;
        }
        if (DEV_SUGGESTION) {
            res.suggested_identity_provider = DEV_SUGGESTION;
        }
        if (DEV_ONE_PROVIDER) {
            res.social_identity_providers = [res.social_identity_providers[0]];
            res.enterprise_identity_providers = [];
        }
        if (DEV_EMPTY_PROVIDER) {
            res.social_identity_providers = [];
            res.enterprise_identity_providers = [];
        }
        if (DEV_LOCAL) {
            res.user_passwords.enabled = true;
        }
        if (DEV_NO_LOCAL) {
            res.user_passwords.enabled = false;
        }
        if (DEV_HV_LOCAL) {
            if (res.user_details) {
                res.user_details.has_local = true;
            }
        }
        if (DEV_NOT_HV_LOCAL) {
            if (res.user_details) {
                res.user_details.has_local = false;
            }
        }
        if (DEV_USER_STATUS) {
            if (res.user_details) {
                res.user_details.state = DEV_USER_STATUS;
            }
        }
        if (DEV_NEED_INVITE) {
            res.invite_required = true;
        }
        if (DEV_NO_INVITE) {
            res.invite_required = false;
        }
        if (DEV_NEED_DISCOVERY) {
            res.discovery_required = true;
        }
        if (DEV_NO_DISCOVERY) {
            res.discovery_required = false;
        }

        if (DEV_RESET_REQUEST) {
            if (res.user_details) {
                res.user_details.reset_required = DEV_RESET_REQUEST;
            }
        }
    }
    return res;
};

const findChild = function (container, child) {
    let c = false;
    for (let i = 0; container.children && i < container.children.length; i++) {
        if (container.children[i].classList.contains(child)) {
            c = container.children[i];
        }
    }
    return c;
};

const removeChild = function (container, child) {
    let c = findChild(container, child);
    if (c) {
        container.removeChild(c);
    }
};

const cleanChild = function (holder) {
    if (holder) {
        while (holder.firstChild) {
            holder.removeChild(holder.lastChild);
        }
    }
};

const insertAfter = function (newNode, referenceNode) {
    if (referenceNode.nextSibling) {
        referenceNode.parentNode.insertBefore(
            newNode,
            referenceNode.nextSibling
        );
    } else {
        referenceNode.parentNode.appendChild(newNode);
    }
};

const assignErrorMessage = function (alert, params) {
    let message = lang.replace(params, alert.MESSAGE);
    return message;
};

const insertError = function (target, text) {
    cleanError(target);
    if (!target.classList.contains('error')) {
        target.classList.add('error');
    }
    let msg = getErrorMessage(text);
    if (
        target.classList.contains(FORM.PASSWORD) ||
        target.classList.contains(FORM.RE_PASSWORD)
    ) {
        target = target.nextSibling;
    }

    insertAfter(msg, target);
};

const cleanError = function (target) {
    if (target) {
        if (target.nextSibling) {
            if (target.nextSibling.classList.contains(FORM.ERROR_MESSAGE)) {
                target.parentNode.removeChild(target.nextSibling);
            } else if (target.nextSibling.nextSibling) {
                if (
                    target.nextSibling.nextSibling.classList.contains(
                        FORM.ERROR_MESSAGE
                    )
                ) {
                    target.parentNode.removeChild(target.nextSibling.nextSibling);
                }
            }
        }
        target.classList.remove('error');
    }
};

const showAlert = function (top, alert, params, callbacks) {
    let title = lang.replace(params, alert.TITLE);
    let message = lang.replace(params, alert.MESSAGE);
    let confirm = lang.replace(params, alert.CONFIRM);
    let confirm2 = false;
    if (alert.CONFIRM_2) {
        confirm2 = lang.replace(params, alert.CONFIRM_2);
    }
    let ui = top.parentElement;
    ui.classList.add('alert');

    const container = view.addView(ALERT_ID);
    container.appendChild(getTitle(title));
    container.appendChild(getParagraph(message));
    if (callbacks) {
        container.appendChild(
            getButton(confirm, FORM.ALERT_CONFIRM, callbacks)
        );
        if (confirm2) {
            container.appendChild(
                getButton(confirm2, FORM.ALERT_CONFIRM_2, callbacks)
            );
        }
    } else {
        container.appendChild(
            getButton(confirm, FORM.ALERT_CONFIRM, triggerAlertConfirm)
        );
    }
    ui.appendChild(container);
};
//----------------------------------------------------------------------------------------

const init = function (options) {
    loadOptions(options);
    loadApp(options);
};

const loadOptions = function (options) {
    loadLanguage(options);
    //loadClientData(options);
    if (typeof options.buttonTheme != 'undefined') {
        OPTS.buttonTheme = options['buttonTheme'];
    }
    if (typeof options.expandedEmailAddress != 'undefined') {
        OPTS.expandEmailAddress = options['expandedEmailAddress'];
    }
    // console.log(OPTS);
};

const saveInviteRequired = function (invite_required) {
    if (localStorage) {
        localStorage.setItem(CACHE_STORAGE.INVITE_REQUIRED, invite_required);
    }
};

const getInviteRequired = function () {
    let invite_required;
    if (localStorage) {
        invite_required = localStorage.getItem(CACHE_STORAGE.INVITE_REQUIRED);
        if (invite_required == 'false') {
            invite_required = false;
        }
    }
    return invite_required;
};

const getLocalEmail = function (email) {
    let email_address = email;
    if (localStorage && !email) {
        try {
            email_address = localStorage.getItem(CACHE_STORAGE.EMAIL);
        } catch (exceptions) {
            email_address = false;
        }
    }
    return email_address;
};

const saveLocalEmail = function (email) {
    if (localStorage && email) {
        localStorage.setItem(CACHE_STORAGE.EMAIL, email);
    }
};

const removeLocalEmail = function () {
    if (localStorage) {
        localStorage.removeItem(CACHE_STORAGE.EMAIL);
    }
};

const loadApp = function (options) {
    if (options.app_name) {
        APP_NAME = options.app_name;
    }
};


const loadLanguage = function (options) {
    if (options.language) {
        let locale = lang.getLocale(options.language, options.locale);
        if (locale) {
            Locale = locale;
        }
    }
};
//----------------------------------------------------------------------------------------

const checkProviders = function (cb) {
    //loader.start(container, true);
    api.getProviders(false, function (res) {
        // loader.remove();
        if (res) {
            res = applyDev(res);
            saveInviteRequired(res.invite_required);
            loadPasswordRegulation(res);
            console.log('logonlabs-ui > api.checkProviders:', res);
            cb(res);
        }
    });
};

const getProviders = function(email, cb) {
    //loader.start(container, true);
    api.getProviders(email, function (res) {
        // loader.remove();
        if (res) {
            res = applyDev(res);
            saveInviteRequired(res.invite_required);
            loadPasswordRegulation(res);
            cb(res);
        }
    });
};

//----------------------------------------------------------------------------------------

const addUI = function(options) {
    const buttonTheme = options.buttonTheme ? options.buttonTheme : false;
    const email_address = options.email_address ? options.email_address : false;
    const token = options.token ? options.token : false;
    const popup = options.popup ? options.popup : false;


    const container = view.addView(ID);
    container.buttonTheme = buttonTheme;
    container.popup = popup;
    //options here.

    return container;
};

const addDiscoveryForm = function(id, res, options) {
    const email_address = options.email_address ? options.email_address : false;

    let container = addUI(options);
    let form = discoveryForm(res, email_address, options);
    container.appendChild(form);

    view.initView(id, options, container);
    if (email_address) {
        loader.start(container, true);
        enterDiscovery(email_address, form).then(() => {
            loader.remove();
        });
    }
};

const discoveryForm = function(res, email_address) {
    let invite_required = res.invite_required;
    let discovery_required = res.discovery_required;

    let form;
    if (!invite_required && !discovery_required && hasProviders(res)) {
        form = incognitoForm(res, email_address);
    } else {
        form = emailForm(email_address);
    }
    return form
};

const enterDiscovery = function(email_address, holder, email_input) {
    return  new Promise((resolve, reject) => {
        let ready = function () {
            loader.remove();
            resolve();
        };
        loading = true;
        getProviders(email_address, function (res) {
            loading = false;

            console.log('logonlabs-ui > api.getProviders enterDiscovery:', res);

            let top = holder.parentElement;

            if (!res || res.error) {
                if (res.error) {
                    switch(res.error.code) {
                        case 'reset_required':
                            applyPasswordExpired(holder, email_address);
                            break;
                        default:
                            let message = res.error.message;
                            if (Locale.RES_MAPPING[res.error.code]) {
                                message = Locale.RES_MAPPING[res.error.code];
                            }
                            if (email_input) {
                                insertError(email_input, message);
                            } else {
                                showAlert(holder, Object.assign({
                                    MESSAGE: message
                                }, Locale.ERROR.INLINE));
                            }
                            break;
                    }
                } else {
                    showAlert(holder, Locale.ERROR.NO_PROVIDERS);
                }
                ready();
                return;
            }

            if (
              res.invite_required &&
              res.user_details &&
              res.user_details.state == USER_STATE.NEW
            ) {
                ready();
                showAlert(holder, Locale.ERROR.ACCOUNT_NOT_FOUND);
                return;
            }

            if (res &&
                res.user_details &&
                res.user_details.reset_required) {
                RESET_REQUIRED = email_address;
            }


            if (email_address) {
                saveLocalEmail(email_address);
            } else {
                removeLocalEmail();
            }

            loadPasswordRegulation(res);
            loadFirstName(res);

            ready();

            if (res.user_details.state == USER_STATE.PENDING) {
                switchConfirmation(top);
            } else if (res.user_details.state == USER_STATE.INVITED ||
                res.user_details.state == USER_STATE.NEW) {
                goRegistration(holder, res);
            } else if (res &&
                res.user_details &&
                res.user_details.reset_required &&
                res.suggested_identity_provider == 'local'){
                applyPasswordExpired(holder, email_address);
            } else {
                goLogin(holder, res);
            }
            return;
        });
    });
    // let email = getLocalEmail();
    // if (res.user_details.state == USER_STATE.PENDING) {
    //     switchConfirmation(top);
    // } else if (res.user_details.reset_required) {
    //     applyPasswordExpired(top, email);
    // } else if (res.user_details.has_local) {
    //     switchLoginIncognito(res, holder);
    // } else {
    //     switchRegisterIncognito(res, holder);
    // }

};

//----------------------------------------------------------------------------------------

const addRegister = function (id, options) {
    //should only dealing with register with password/token
    loadOptions(options);
    let email_address = getLocalEmail(options.email_address);
    let token = options.token ? options.token : false;

    loading = true;
    checkProviders((res) => {
        loading = false;

        let container = addUI(options);
        view.initView(id, options, container);
        goLocalRegistration(container, token);
    });
};

const addForm = function (id, options) {

    loadOptions(options);
    checkProviders((res) => {
        options.email_address = getLocalEmail(options.email_address);
        addDiscoveryForm(id, res, options)
    });
};

const addReset = function (id, options) {
    loadOptions(options);
    let email_address = getLocalEmail(options.email_address);
    let token = options.token ? options.token : false;

    let container = addUI(options);
    loading = true;
    getProviders(email_address, function (res) {
        loading = false;
        loadFirstName(res);
        let reset_form = resetForm(email_address, token);
        updateTitle(findChild(reset_form, MODULE_HEADER));
        container.appendChild(reset_form);
        view.initView(id, options, container);
    });
};

const addConfirm = function (id, options) {
    loadOptions(options);
    let email_address = getLocalEmail(options.email_address);
    let token = options.token ? options.token : false;

    let container = addUI(options);
    let form = confirmForm(email_address, token);
    container.appendChild(form);

    view.initView(id, options, container);

    if (token) {
        continueConfirmUser(form);
    }
};

const loadPasswordRegulation = function (res) {
    if (res && res.user_passwords) {
        if (localStorage) {
            if (res.user_passwords.minimum_password_length) {
                localStorage.setItem(
                    PASSWORD_STORAGE.MINIMUM,
                    res.user_passwords.minimum_password_length
                );
            }
            if (res.user_passwords.minimum_password_lowercase_characters) {
                localStorage.setItem(
                    PASSWORD_STORAGE.LOWER,
                    res.user_passwords.minimum_password_lowercase_characters
                );
            }
            if (res.user_passwords.minimum_password_uppercase_characters) {
                localStorage.setItem(
                    PASSWORD_STORAGE.UPPER,
                    res.user_passwords.minimum_password_uppercase_characters
                );
            }
            if (res.user_passwords.minimum_password_numeric_characters) {
                localStorage.setItem(
                    PASSWORD_STORAGE.NUMBER,
                    res.user_passwords.minimum_password_numeric_characters
                );
            }
            if (res.user_passwords.minimum_password_symbol_characters) {
                localStorage.setItem(
                    PASSWORD_STORAGE.SYMBOL,
                    res.user_passwords.minimum_password_symbol_characters
                );
            }
        }
    }
};

const loadFirstName = function (res) {
    if (res && res.user_details && res.user_details.first_name) {
        if (localStorage) {
            localStorage.setItem(
                CACHE_STORAGE.FIRST_NAME,
                res.user_details.first_name
            );
        }
    } else {
        if (localStorage) {
            localStorage.removeItem(CACHE_STORAGE.FIRST_NAME);
        }
    }
};

const switchConfirmation = function (holder) {
    const email_address = getLocalEmail();
    // let top = holder.parentElement;
    cleanChild(holder);
    let form = confirmForm(email_address);
    holder.appendChild(form);
};

const hasProviders = function(res) {
    let count = 0;
    count += res.social_identity_providers.length;
    count += res.enterprise_identity_providers.length;
    return count > 0;
}

const switchLogin = function (holder) {
    checkProviders((res) => {
        let invite_required = res.invite_required;
        let discovery_required = res.discovery_required;
        const email_address = getLocalEmail();
        let top = holder.parentElement;

        cleanChild(top);
        if (!invite_required && !discovery_required && hasProviders(res)) {
            let form = incognitoForm(res, email_address);
            top.appendChild(form);
            if (email_address) {
                continueEmailLookup(findChild(form, INCOGNITO_HOLDER_ID));
            }
        } else {
            let form = emailForm(email_address);
            top.appendChild(form);
            if (email_address) {
                continueEmailLookup(form);
            }
        }
    });
};

const insertSwitchLogin = function (top, skip) {

    removeChild(top, SWITCH_HOLDER_ID);
    removeChild(top, MODULE_SPACER);
    let holder = view.addView(SWITCH_HOLDER_ID);
    if (!skip) {
        if (getInviteRequired()) {
            console.log(getInviteRequired());
            let new_user = getNewUser();
            hover.addHoverEffect(new_user, Locale.HOVER.NEW_USER);
            holder.appendChild(new_user);
        }
    } else {
        holder.appendChild(getForgot(triggerForgot));
    }
    holder.appendChild(getSwitchLogin(triggerSwitchLogin));
    top.appendChild(holder);
    insertSpacerModule(top);
};

const getText = function (text, cls) {
    cls = cls ? cls : '';
    let b = view.addBlock('span', cls);
    b.innerHTML = text;
    return b;
};

const getTitle = function (text) {
    let b = view.addBlock('h1', FORM.TITLE);
    b.innerHTML = text;
    return b;
};

const getErrorTitle = function (text) {
    let b = view.addBlock('h1', FORM.TITLE_ERROR);
    b.innerHTML = text;
    return b;
};

const getSubtitle = function (text) {
    let b = view.addBlock('div', FORM.SUBTITLE);
    b.innerHTML = text;
    return b;
};

const getErrorSubtitle = function (text) {
    let b = view.addBlock('h1', FORM.SUBTITLE_ERROR);
    b.innerHTML = text;
    return b;
};

const getErrorMessage = function (text) {
    let b = view.addBlock('div', FORM.ERROR_MESSAGE);
    b.innerHTML = text;
    return b;
};

const getSubMessage = function (text) {
    let b = view.addBlock('div', FORM.SUB_MESSAGE);
    b.innerHTML = text;
    return b;
};

const getHint = function (text, details) {
    let b = view.addBlock('div', FORM.HINT);
    if (details) {
        b.validation = details;
    }
    b.innerHTML = text;
    return b;
};

const getParagraph = function (text) {
    let b = view.addBlock('div', FORM.MESSAGE);
    b.innerHTML = text;
    return b;
};

const getFirstName = function () {
    let container = view.addView(MODULE_FORM_INPUT);
    container.classList.add(FORM.FIRST_NAME);
    let b = view.addBlock('input', FORM.FIRST_NAME);
    b.placeholder = Locale.PLACEHOLDER.FIRST_NAME;
    b.addEventListener('keyup', triggerFirstNameKeyup);
    b.addEventListener('blur', triggerFirstNameBlur);
    container.appendChild(b);
    return container;
};

const getLastName = function () {
    let container = view.addView(MODULE_FORM_INPUT);
    container.classList.add(FORM.LAST_NAME);
    let b = view.addBlock('input', FORM.LAST_NAME);
    b.placeholder = Locale.PLACEHOLDER.LAST_NAME;
    b.addEventListener('keyup', triggerLastNameKeyup);
    b.addEventListener('blur', triggerLastNameBlur);
    container.appendChild(b);
    return container;
};

const removeSubtitleFromModule = function(module) {
    removeChild(module, FORM.SUBTITLE);
};

const convertModuleEmailDiscoveryDisabled = function(module) {
    module.classList.add(FORM.DISABLED_EMAIL);
    let email_input = findChild(module, FORM.EMAIL);

    convertEmailToDisabled(email_input);
};

const convertEmailToDisabled = function (email_input, skip, cls) {
    //email_input.disabled = true;
    email_input.blur();
    email_input.addEventListener('focus', function (e) {
        this.blur();
    });
    if (!skip) {
        // hover.addHoverEffect(
        //     email_input,
        //     lang.replace({ app_name: APP_NAME }, Locale.HOVER.EMAIL_MATCH)
        // );
    }
    if (cls) {
        email_input.classList.add(cls);
    } else {
        email_input.classList.add(FORM.DISABLED_EMAIL);
    }

    email_input.classList.remove('font11');
    email_input.classList.remove('font12');
    email_input.classList.remove('font13');
    email_input.classList.remove('font14');
    email_input.classList.remove('font15');
    email_input.classList.remove('font16');

    let value = email_input.value;
    email_input.email = value;
    if (value.length > 42) {
        email_input.classList.add('font11');
        if (value.length > 46) {
            email_input.value = value.slice(0, 21) + '………' + value.slice(-21);
        }
    } else if (value.length > 39) {
        email_input.classList.add('font12');
    } else if (value.length > 36) {
        email_input.classList.add('font13');
    } else if (value.length > 33) {
        email_input.classList.add('font14');
    } else if (value.length > 30) {
        email_input.classList.add('font15');
    } else {
        email_input.classList.add('font16');
    }
};

const getEmail = function (email, lock, keyup, keydown) {
    let b = view.addBlock('input', FORM.EMAIL);
    b.type = 'email';
    b.placeholder = Locale.PLACEHOLDER.EMAIL_ADDRESS;

    if (email) {
        b.value = email;
    }

    if (lock) {
        convertEmailToDisabled(b);
    }

    if (keyup) {
        b.addEventListener('keyup', keyup);
    }
    if (keydown) {
        b.addEventListener('keydown', keydown);
    }

    b.addEventListener('focus', function() {
        this.classList.add('focus');
    });
    b.addEventListener('blur', function() {
        this.classList.remove('focus');
    });
    return b;
};

const getPin = function (cls, pin) {
    let b = view.addBlock('input', FORM.PIN);
    b.type = 'text';
    b.setAttribute('maxlength', 1);

    if (pin) {
        b.value = pin;
    }

    if (cls) {
        b.classList.add(cls);
    }

    b.addEventListener('keyup', triggerPin);
    b.addEventListener('paste', pastePin);
    return b;
};

const getPinTokenSet = function (length, pin, cb) {
    let b = view.addBlock('div', FORM.TOKEN_PIN);

    if (pin) {
        pin = pin + '';
    }
    for (let i = 0; i < length; i++) {
        let cls = FORM.PIN + '-' + i;
        let p = pin ? pin[i] : false;
        let a = getPin(cls, p);
        b.appendChild(a);
    }

    if (cb) {
        b.callback = cb;
    }
    return b;
};

const getToken = function (token, cb) {
    let b = view.addBlock('input', FORM.TOKEN);
    b.type = 'text';
    if (token) {
        b.value = token;
        b.type = 'hidden';
    } else {
        b.placeholder = Locale.PLACEHOLDER.PIN;
    }
    if (cb) {
        b.addEventListener('keyup', cb);
    }
    return b;
};

const getPassword = function (cb, placeholder) {
    let b = view.addBlock('input', FORM.PASSWORD);
    b.type = 'password';
    if (placeholder) {
        b.placeholder = placeholder;
    }
    if (cb) {
        b.addEventListener('keyup', cb);
    }
    return b;
};

const getReveal = function () {
    let b = view.addBlock('i', FORM.PASSWORD_TOGGLE);
    b.innerHTML = `
<svg class="visible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="cls-1" d="M16,22.9H15c-7.7-.3-13.2-5.9-13.4-6.2a.9.9,0,0,1,0-1.3C1.9,15.1,8,9.2,16,9.2s13.8,6,14.1,6.2a1,1,0,0,1,0,1.3c-.3.2-5.5,5.3-12.6,6A3.9,3.9,0,0,1,16,22.9Zm0-11.8a4.9,4.9,0,0,0-.9,9.8h2.2A5.1,5.1,0,0,0,21,16.1,5,5,0,0,0,16,11.1ZM3.7,16a20,20,0,0,0,6.7,4,6.7,6.7,0,0,1-1.2-3.9,7,7,0,0,1,1.2-4A25,25,0,0,0,3.7,16Zm18-3.8a6.7,6.7,0,0,1,.1,7.5A22.6,22.6,0,0,0,28,16,23.3,23.3,0,0,0,21.7,12.2Z"/></svg>
<svg class="sight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="cls-1" d="M16,22.9H15c-7.7-.3-13.2-5.9-13.4-6.2a.9.9,0,0,1,0-1.3C1.9,15.1,8,9.2,16,9.2s13.8,6,14.1,6.2a1,1,0,0,1,0,1.3c-.3.2-5.5,5.3-12.6,6A3.9,3.9,0,0,1,16,22.9Zm0-11.8a4.9,4.9,0,0,0-.9,9.8h2.2A5.1,5.1,0,0,0,21,16.1,5,5,0,0,0,16,11.1ZM3.7,16a20,20,0,0,0,6.7,4,6.7,6.7,0,0,1-1.2-3.9,7,7,0,0,1,1.2-4A25,25,0,0,0,3.7,16Zm18-3.8a6.7,6.7,0,0,1,.1,7.5A22.6,22.6,0,0,0,28,16,23.3,23.3,0,0,0,21.7,12.2Z"/><path class="cls-1" d="M9,26l-.6-.2a1.1,1.1,0,0,1-.2-1.4L21.6,6.8A1,1,0,0,1,23,6.7a.9.9,0,0,1,.2,1.4L9.8,25.6A1.2,1.2,0,0,1,9,26Z"/></svg>
`;
    b.onclick = togglePasswordOnSight;
    return b;
};

const getPasswordModule = function(cb, placeholder) {
    let container = view.addView(MODULE_PASSWORD);
    container.appendChild(
      getPassword(cb, placeholder)
    );
    container.appendChild(getReveal());
    return container;
};

const getSpacerModule = function() {
    let module = view.addView(MODULE_SPACER);
    return module;
};

const insertSpacerModule = function(top) {
    top.appendChild(getSpacerModule());
};


const getHeaderModule = function(title, content) {
    let module = view.addView(MODULE_HEADER);
    if (title) {
        module.appendChild(getTitle(title));
    }
    if (content) {
        module.appendChild(getSubtitle(content));
    }
    return module;
};

const getDiscoveryNextModule = function(email_address, callback) {
    let module = view.addView(MODULE_EMAIL_DISCOVERY);
    let email = getEmail(email_address, false, function(e){
        const input = e.srcElement;
        const holder = input.parentElement;
        if (e.code != 'Tab' && e.code != 'Enter') {
            cleanError(holder);
        }
        if (e.code != 'Enter') {
            return;
        }
        if (callback) {
            callback(holder);
        }
    });
    let svgicon = getNextSvg(callback);
    module.append(email);
    module.append(svgicon);
    return module;
};

const getNextSvg = function(callback) {
    let b = view.addBlock('i', FORM.NEXT_ICON);
    b.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" ><path d="M398.826,242.084L213.278,119.006c-7.686-5.098-18.049-3-23.147,4.685c-5.099,7.685-3,18.049,4.685,23.147    l164.568,109.163L194.815,365.164c-7.686,5.098-9.784,15.461-4.685,23.147c5.099,7.686,15.461,9.784,23.147,4.685l185.548-123.08    c4.652-3.086,7.468-8.333,7.468-13.916S403.478,245.17,398.826,242.084z"/></svg>
`;
    b.onclick = function(e){
        if (loading) return;
        const button = e.currentTarget;
        const holder = button.parentElement;
        if (callback) {
            callback(holder);
        }
    };
    return b;
};

const getRePassword = function (cb, placeholder) {
    let b = view.addBlock('input', FORM.RE_PASSWORD);
    b.type = 'password';
    if (placeholder) {
        b.placeholder = placeholder;
    }
    if (cb) {
        b.addEventListener('keyup', cb);
    }
    return b;
};

const getResetPassword = function (cb) {
    let b = view.addBlock('button', FORM.RESET_PASSWORD);
    b.innerText = Locale.BUTTON.SET_PASSWORD;
    if (cb) {
        b.onclick = cb;
    }
    b.classList.add('disabled');
    return b;
};

const getButton = function (text, id, cb) {
    let b = view.addBlock('button', id);
    b.innerText = text;
    if (cb) {
        b.onclick = cb;
    }
    return b;
};

const getNewCode = function () {
    let div = getParagraph('');
    div.classList.add('new_code');
    div.appendChild(getText(Locale.NEW_CODE.CONTENT_1, 'break'));
    div.appendChild(getText(Locale.NEW_CODE.CONTENT_2, 'break'));
    div.appendChild(getText(Locale.NEW_CODE.CONTENT_OR));
    let button = getText(Locale.NEW_CODE.BUTTON, 'link');
    div.appendChild(button);
    div.appendChild(getText(Locale.NEW_CODE.CONTENT_3));

    button.onclick = triggerNewCode;
    return div;
};

const getForgot = function (cb) {
    return getButton(Locale.BUTTON.FORGOT_PASSWORD, FORM.FORGOT, cb);
};

const getForgotReset = function (cb) {
    return getButton(Locale.BUTTON.EMAIL_INSTRUCTION, FORM.FORGOT_RESET, cb);
};

const getNewUser = function (cb) {
    return getButton(Locale.BUTTON.NEW_USER, FORM.NEW_USER, cb);
};

const getSwitchLogin = function (cb) {
    return getButton(Locale.BUTTON.SWITCH_LOGIN, FORM.SWITCH_LOGIN, cb);
};

const getRegisterButton = function (cb) {
    let button = getButton(Locale.BUTTON.REGISTER, FORM.REGISTER, cb);
    button.classList.add('disabled');
    return button;
};

const getMoreModuleOptions = function (cb) {
    const button = getButton(Locale.BUTTON.OR_CONTINUE_WITH_EMAIL, FORM.OPTIONS, cb);
    return button;
};

const getMoreSignupModuleOptions = function (cb) {
    const button = getButton(Locale.BUTTON.OR_SIGN_UP_WITH_EMAIL_AND_PASSWORD, FORM.OPTIONS, cb);
    return button;
};

const confirmForm = function (email_address, token) {

    let container = view.addView(CONFIRM_ID);
    let form = view.addView(CONFIRM_FORM_ID);
    container.appendChild(getHeaderModule(Locale.CONFIRM_EMAIL.TITLE,Locale.CONFIRM_EMAIL.CONTENT));

    form.appendChild(getEmail(email_address, true));
    form.appendChild(getPinTokenSet(4, token));
    form.appendChild(
        getButton(
            Locale.BUTTON.CONFIRM,
            FORM.CONFIRM_EMAIL,
            triggerConfirmEmail
        )
    );
    container.appendChild(form);
    container.appendChild(getNewCode());
    container.appendChild(
        getButton(Locale.BUTTON.CANCEL, FORM.CANCEL, triggerConfirmCancel)
    );
    return container;
};

const resetForm = function (email_address, token) {
    let container = view.addView(RESET_ID);

    container.appendChild(getHeaderModule(Locale.RESET_PASSWORD.TITLE, Locale.RESET_PASSWORD.CONTENT));

    let email = getEmail(email_address, true);
    container.appendChild(email);
    container.appendChild(getToken(token));


    let pwd = getPasswordModule(triggerResetPasswordKeyup, Locale.PLACEHOLDER.NEW_PASSWORD);
    pwd.classList.add(FORM.PASSWORD);
    container.appendChild(pwd);
    let rpwd = getPasswordModule(triggerResetRePasswordKeyup, Locale.PLACEHOLDER.NEW_CONFIRM_PASSWORD);
    rpwd.classList.add(FORM.RE_PASSWORD);
    container.appendChild(rpwd);

    container.appendChild(passwordValidationList());
    container.appendChild(getResetPassword(triggerReset));
    container.appendChild(
        getButton(Locale.BUTTON.CANCEL, FORM.CANCEL, triggerResetCancel)
    );

    return container;
};

const passwordValidationList = function (register) {
    let container = view.addView(PASSWORD_VALIDATION_ID);
    // contains at least one character
    // contains at least one lower case (a-z)
    // contains at least one upper case (A-Z)
    // contains at least one number (0-9)
    // contains at least one symbol
    // contains at least 2 characters
    // contains at least 2 lower case (a-z)
    // contains at least 2 upper case (A-Z)
    // contains at least 2 numbers (0-9)
    // contains at least 2 symbols
    if (localStorage) {
        for (let i = 0; i < PASSWORD_LIST.length; i++) {
            let validation = PASSWORD_LIST[i];
            let num = localStorage.getItem(PASSWORD_STORAGE[validation]);
            if (num != null) {
                let hint_str = validation + '_';
                hint_str += num == 1 ? 'ONE' : 'MORE';
                let hint = Locale.PASSWORD_HINT[hint_str];
                container.appendChild(
                    getHint(
                        lang.replace({ count: num }, hint),
                        PASSWORD_VALIDATION[validation]
                    )
                );
            }
        }
    }

    container.appendChild(
        getHint(Locale.PASSWORD_HINT.MATCH, PASSWORD_VALIDATION.MATCH)
    );

    container.prepend(getParagraph(Locale.PASSWORD_HINT.HAS_VALIDATION));

    if (!register) {
        let no_recent_password = getParagraph(
            Locale.PASSWORD_HINT.NO_OLD_PASSWORD
        );
        no_recent_password.classList.add(FORM.HINT_TITLE);
        container.prepend(no_recent_password);
    }
    return container;
};

const updateTitle = function (holder) {
    let str = Locale.GREETING;
    let str2 = Locale.ERROR.INLINE.TITLE;
    if (localStorage) {
        let name = localStorage.getItem(CACHE_STORAGE.FIRST_NAME);
        if (name) {
            str += ' ' + name;
            str2 += ' ' + name;
        }
    }
    const title = findChild(holder, FORM.TITLE);
    if (title) {
        title.innerText = str;
    }
    const title_error = findChild(holder, FORM.TITLE_ERROR);
    if (title_error) {
        title_error.innerText = str2;
    }
};

const updateErrorMessage = function (holder, text) {
    const subtitle = findChild(holder, FORM.SUBTITLE_ERROR);
    if (subtitle) {
        subtitle.innerText = text;
    }
};

const emailForm = function (email_address) {
    let container = view.addView(EMAIL_ID);
    container.appendChild(getHeaderModule(Locale.LOGIN.TITLE, Locale.LOGIN.CONTENT));
    container.appendChild(getDiscoveryNextModule(email_address, continueEmailLookupModule));
    container.appendChild(getSpacerModule());

    return container;
};

const expireForm = function (email_address) {
    let container = view.addView(EXPIRE_ID);
    let container1 = view.addView(EXPIRE_FORM_ID);
    let container2 = view.addView(EXPIRE_BUTTON_ID);
    container1.appendChild(getTitle(Locale.EXPIRE_PASSWORD.TITLE));
    container1.appendChild(getSubMessage(Locale.EXPIRE_PASSWORD.CONTENT));
    container1.appendChild(
        getEmail(email_address, false, triggerExpireConfirmKeyup)
    );
    container2.appendChild(getForgotReset(triggerExpireConfirm));
    container2.appendChild(
        getButton(Locale.BUTTON.CANCEL, FORM.CANCEL, triggerExpireBack)
    );
    container.appendChild(container1);
    container.appendChild(container2);
    return container;
};

const forgotForm = function (email_address) {
    let container = view.addView(FORGOT_ID);
    let container1 = view.addView(FORGOT_FORM_ID);
    let container2 = view.addView(FORGOT_BUTTON_ID);
    container1.appendChild(getTitle(Locale.FORGOT_PASSWORD.TITLE));
    container1.appendChild(getSubMessage(Locale.FORGOT_PASSWORD.CONTENT));
    container1.appendChild(
        getEmail(email_address, false, triggerForgotConfirmKeyup)
    );
    container2.appendChild(getForgotReset(triggerForgotConfirm));
    container2.appendChild(
        getButton(Locale.BUTTON.CANCEL, FORM.CANCEL, triggerForgotBack)
    );
    container.appendChild(container1);
    container.appendChild(container2);
    return container;
};

const incognitoForm = function (res, email_address) {
    let top = view.addView(INCOGNITO_ID);
    top.appendChild(getHeaderModule(Locale.REGISTER.TITLE));
    let list = [];
    let local = false;

    if (res && res.social_identity_providers) {
        for (let i = 0; i < res.social_identity_providers.length; i++) {
            let provider = res.social_identity_providers[i];
            if (providers_hash[provider.type]) {
                list.push(providers_hash[provider.type]);
            }
        }
    }
    if (res && res.enterprise_identity_providers) {
        for (let i = 0; i < res.enterprise_identity_providers.length; i++) {
            let provider = res.enterprise_identity_providers[i];
            if (providers_hash[provider.type]) {
                list.push(provider);
            }
        }
    }

    if (res && res.user_passwords && res.user_passwords.enabled) {
        local = providers_hash[providers.LOCAL];
    }

    if (list.length === 0) {
        list = false;
    }
    let buttonTheme = OPTS.buttonTheme;

    let opt = {
        buttonTheme: buttonTheme
    };

    let button_holder = view.addView(BUTTON_HOLDER_ID);
    if (list) {
        let contin = getParagraph(Locale.BUTTON.CONTINUE_WITH);
        button_holder.prepend(contin);
        let { container, error } = viewButton.getButtonLists(list, opt);
        button_holder.append(container);
        top.appendChild(button_holder);
    }

    if (local) {
        let form_holder = incognitoEmailForm(email_address);
        top.appendChild(form_holder);
        let more = getMoreModuleOptions(function(e){
            if (loading) return;
            const button = e.currentTarget;
            triggerIncognitoMoreOptions(button, form_holder)
        });
        button_holder.appendChild(more);
        if (list) {
            let incognito_holder = findChild(top, INCOGNITO_HOLDER_ID);
            incognito_holder.classList.add('more-content');
            if (OPTS.expandEmailAddress) {
                convertMoreOptions(more);
            } else if (!email_address) {
                triggerIncognitoMoreOptions(more, form_holder);
            }
        }
    }
    return top;
};

const incognitoEmailForm = function (email_address, token) {
    let container = view.addView(INCOGNITO_HOLDER_ID);
    container.appendChild(
      getDiscoveryNextModule(email_address, continueEmailLookupModule)
    );
    return container;
};

const applyPasswordExpired = function (top, email) {
    removeChild(top, EXPIRE_ID);
    top.appendChild(expireForm(email));
    top.classList.add('expire');
};

const pastePin = function (e) {
    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData('Text');
    if (!isNaN(pastedData)) {
        let holder = e.target.parentElement;
        for (
            let i = 0;
            holder.children &&
            i < holder.children.length &&
            i < pastedData.length;
            i++
        ) {
            let t = holder.children[i];
            let v = pastedData[i];
            t.value = v;
            t.blur();
        }
        if (holder.children && holder.children.length && pastedData.length) {
            holder.children[holder.children.length - 1].focus();
            continueConfirmUser(holder.parentElement.parentElement);
        }
    }
};

const triggerPin = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const token = input.parentElement;
    if (e.code != 'Tab' && e.code != 'Enter') {
        cleanError(token);
    }
    if (input.value) {
        if (input.nextSibling) {
            input.nextSibling.focus();
        } else {
            continueConfirmUser(token.parentElement.parentElement);
        }
    } else {
        if (input.previousSibling) {
            input.previousSibling.focus();
        }
    }
};

const triggerNewCode = function (e) {
    const button = e.currentTarget;
    const holder = button.parentElement;
    continueResendConfirmationEmail(holder.parentElement);
};

const triggerListCollapse = function (e) {
    if (loading) return;
    const button = e.currentTarget.parentElement;
    const suggested_list = button.parentElement;
    const button_holder = suggested_list.parentElement;
    const container = findChild(button_holder, 'collapsible');
    if (suggested_list.classList.contains('collapsed')) {
        suggested_list.classList.remove('collapsed');
        container.classList.remove('hide');
    } else {
        suggested_list.classList.add('collapsed');
        container.classList.add('hide');
    }
};

const triggerLocalInSuggestion = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    const login_holder = holder.parentElement.parentElement;
    continueEmailAndPassword(login_holder);
};

const triggerLocalInListLogin = function(e) {
    const button = e.currentTarget;
    const holder = button.parentElement;
    const button_holder = holder.parentElement;
    if (RESET_REQUIRED) {
        applyPasswordExpired(
            button_holder.parentElement.parentElement,
            RESET_REQUIRED
        );
    } else {
        switchLocalLogin(holder);
        holder.classList.add('suggest-local');
        updateSuggestionToLocal(button_holder);
    }
}

const updateSuggestionToLocal = function (button_holder) {
    let local = Object.assign({}, providers_hash[providers.LOCAL]);
    local.text = Locale.BUTTON.SIGN_IN;
    local.cls = 'green';
    let suggest_container = findChild(button_holder, 'suggested-list');
    cleanChild(suggest_container);
    let localButton = viewButton.buttons(local, {});
    localButton.onclick = triggerLocalInSuggestion;
    suggest_container.appendChild(localButton);
    addMoreInSuggest(button_holder);
};

const addMoreInSuggest = function (button_holder) {
    let suggest_container = findChild(button_holder, 'suggested-list');
    let more = viewButton.getMoreButton(triggerListCollapse);
    suggest_container.prepend(more);
};

const continueForgotEmail = function (holder) {
    const email_input = findChild(holder, FORM.EMAIL);
    const top = holder.parentElement;
    let email = email_input.email ? email_input.email : email_input.value;
    // console.log(email_address);

    let pass = true;
    let alert = false;

    if (!val.isEmail(email)) {
        pass = false;
        alert = Locale.ERROR.VALID_EMAIL;
        insertError(email_input, alert.MESSAGE);
    }
    const callback = function () {
        loading = false;
        const top = holder.parentElement.parentElement;
        top.classList.remove('forgot');
        top.classList.remove('expire');
        removeChild(top, EXPIRE_ID);
    };

    if (pass) {
        loading = true;
        api.resetPassword(email, callback);
    }
};

const continueEmailAndPassword = function (holder) {
    const email_input = findChild(holder, FORM.EMAIL);

    const password_module = findChild(holder, MODULE_PASSWORD);
    const password_input = findChild(password_module, FORM.PASSWORD);

    let email = email_input.email ? email_input.email : email_input.value;
    let values = {
        email_address: email,
        password: password_input.value,
    };
    // console.log(values);

    let pass = true;
    let top = holder.parentElement;

    let alert;
    if (values.password.length == 0) {
        alert = Locale.ERROR.PASSWORD_EMPTY;
        insertError(password_input, alert.MESSAGE);
        pass = false;
    }

    if (!val.isEmail(values.email_address)) {
        pass = false;
        alert = Locale.ERROR.VALID_EMAIL;
        insertError(email_input, alert.MESSAGE);
    }

    if (pass) {
        let button_holder = findChild(holder, BUTTON_HOLDER_ID);
        loader.start(button_holder, false, true, false);
        loading = true;

        values = view.applyData(top, values);

        api.loginWithPassword(values, async function (res) {
            if (res && res.token) {
                await loader.success_hold();
                api.redirectLogin(res.token, true);
            } else if (res && res.error) {
                //Custom alert
                await loader.failure();
                let message = res.error.message;
                if (Locale.RES_MAPPING[res.error.code]) {
                    message = Locale.RES_MAPPING[res.error.code];
                }
                insertError(password_input, message);
            }
            loading = false;
        });
    }
};


const continueRegister = function (holder) {
    const email_input = findChild(holder, FORM.EMAIL);
    const fname_input = findChild(findChild(holder, FORM.FIRST_NAME), FORM.FIRST_NAME);
    const lname_input = findChild(findChild(holder, FORM.LAST_NAME), FORM.LAST_NAME);
    const passwd_input = findChild(findChild(holder, FORM.PASSWORD), FORM.PASSWORD);
    const repasswd_input = findChild(findChild(holder, FORM.RE_PASSWORD), FORM.PASSWORD);
    const token_input = findChild(holder, FORM.TOKEN);

    let email = email_input.email ? email_input.email : email_input.value;
    let values = {
        email_address: email,
        first_name: fname_input.value,
        last_name: lname_input.value,
        password: passwd_input.value,
    };
    let repassword = repasswd_input.value;

    if (token_input) {
        values['pin'] = token_input.value;
    }

    let pass = true;
    let top = holder.parentElement;

    let alert;
    let params = {};
    if (localStorage) {
        try {
            let password_length = localStorage.getItem(
                'logonlabs-sdk-password-length'
            );
            password_length = Number(password_length);
            if (values.password.length < password_length) {
                alert = Locale.ERROR.PASSWORD_LENGTH;
                params['count'] = password_length;
                insertAfter(passwd_input, lang.replace(params, alert.MESSAGE));
                pass = false;
            }
        } catch (e) {}
    }

    if (values.password != repassword) {
        pass = false;
        alert = Locale.ERROR.PASSWORD_NOT_MATCH;
        insertAfter(repassword_input, alert.MESSAGE);
    }

    if (!val.isEmail(values.email_address)) {
        pass = false;
        alert = Locale.ERROR.VALID_EMAIL;
        insertAfter(email_input, alert.MESSAGE);
    }

    if (pass) {
        loading = true;
        values = view.applyData(top, values);
        api.registerWithPassword(values, function (res) {
            if (res && !res.error) {
                if (res.token) {
                    api.redirectLogin(res.token, true);
                } else {
                    switchConfirmation(holder.parentElement);
                }
            } else if (res && res.error) {
                insertError(passwd_input, res.error.message);
            }

            loading = false;
        });
    }
};

const continueResendConfirmationEmail = function (top) {
    let holder = findChild(top, CONFIRM_FORM_ID);
    const email_input = findChild(holder, FORM.EMAIL);
    let email = email_input.email ? email_input.email : email_input.value;
    loader.start(holder);
    loading = true;
    api.resendConfirmationEmail(email, async function (res) {
        if (res && !res.error) {
            await loader.success();
        } else if (res && res.error) {
            await loader.failure();
        }
        loading = false;
    });
};

const continueConfirmUser = function (holder) {
    const form = findChild(holder, CONFIRM_FORM_ID)
    let top = holder.parentElement;
    const button = findChild(form, FORM.CONFIRM_EMAIL);
    const token = findChild(form, FORM.TOKEN_PIN);
    const email_input = findChild(form, FORM.EMAIL);

    let email = email_input.email ? email_input.email : email_input.value;
    let value = '';
    for (let i = 0; token.children && i < token.children.length; i++) {
        value += token.children[i].value;
    }

    const values = {
        email_address: email,
        pin: value,
    };

    let pass = true;
    let alert = false;

    if (!values.pin) {
        pass = false;
        alert = Locale.ERROR.EMPTY_TOKEN;
    }

    if (pass) {
        loader.start(form);
        loading = true;
        token.classList.add('hide');
        api.confirmUser(values, async function (res) {
            if (res && !res.error) {
                await loader.success_hold();
                if (res.token) {
                    api.redirectLogin(res.token, true);
                } else {
                    switchLogin(top);
                }
            } else if (res && res.error) {
                await loader.failure();
                token.classList.remove('hide');
                let message = res.error.message;
                if (Locale.RES_MAPPING[res.error.code]) {
                    message = Locale.RES_MAPPING[res.error.code];
                }
                insertError(token, message);
            }
            loading = false;
        });
    } else if (alert) {
        insertError(token, alert.MESSAGE);
    }
};

const continueResetPassword = function (holder) {
    const token = findChild(holder, FORM.TOKEN);
    const password = findChild(findChild(holder, FORM.PASSWORD), FORM.PASSWORD);
    const repassword = findChild(findChild(holder, FORM.RE_PASSWORD), FORM.PASSWORD);
    const email_input = findChild(holder, FORM.EMAIL);
    let email = email_input.email ? email_input.email : email_input.value;

    const values = {
        email_address: email,
        pin: token.value,
        password: password.value,
        repassword: repassword.value,
    };
    let pass = true;
    let top = holder.parentElement;

    let alert;
    let params = {};
    if (localStorage) {
        try {
            let password_length = localStorage.getItem(
                'logonlabs-sdk-password-length'
            );
            password_length = Number(password_length);
            if (values.password.length < password_length) {
                alert = Locale.ERROR.PASSWORD_LENGTH;
                params['count'] = password_length;
                insertError(password, lang.replace(params, alert.MESSAGE));
                pass = false;
            }
        } catch (e) {}
    }

    if (values.password != values.repassword) {
        pass = false;
        alert = Locale.ERROR.PASSWORD_NOT_MATCH;
        insertError(repassword, alert.MESSAGE);
    }

    if (!val.isEmail(values.email_address)) {
        pass = false;
        alert = Locale.ERROR.VALID_EMAIL;
        insertError(email_input, alert.MESSAGE);
    }

    if (pass) {
        loader.start(top);
        loading = true;
        api.confirmResetPassword(
            values.email_address,
            values.pin,
            values.password,
            async function (res) {
                // switchLogin(holder);
                if (res && !res.error) {
                    await loader.success();
                    switchLogin(holder);
                } else if (res && res.error) {
                    await loader.failure();
                    let message = res.error.message;
                    insertError(repassword, message);
                }
                loading = false;
            }
        );
        // switchLogin(holder);
    }
};

const validationPassword = function (holder, password, repassword, clean) {
    let children = holder.children;
    let pass = true;
    for (let i = 0; i < children.length; i++) {
        let c = children[i];
        if (c.validation) {
            c.classList.remove('pass');
            c.classList.remove('fail');

            let count = localStorage.getItem(PASSWORD_STORAGE[c.validation]);
            count = Number(count);
            let match;
            switch (c.validation) {
                case PASSWORD_VALIDATION.MINIMUM:
                    if (password.length < count) {
                        c.classList.remove('pass');
                        c.classList.add('fail');
                    } else {
                        c.classList.remove('fail');
                        c.classList.add('pass');
                    }
                    break;
                case PASSWORD_VALIDATION.NO_EMAIL:
                    break;
                case PASSWORD_VALIDATION.MATCH:
                    if (repassword.length == 0) {
                        c.classList.remove('fail');
                        c.classList.remove('pass');
                    } else if (password != repassword) {
                        c.classList.remove('pass');
                        c.classList.add('fail');
                    } else {
                        c.classList.remove('fail');
                        c.classList.add('pass');
                    }
                    break;
                case PASSWORD_VALIDATION.LOWER:
                    match = password.match(/[a-z]+/g);
                    if (match) {
                        match = match.join('');
                    }
                    if (match && match.length >= count) {
                        c.classList.remove('fail');
                        c.classList.add('pass');
                    } else {
                        c.classList.remove('pass');
                        c.classList.add('fail');
                    }
                    break;
                case PASSWORD_VALIDATION.UPPER:
                    match = password.match(/[A-Z]+/g);
                    if (match) {
                        match = match.join('');
                    }
                    if (match && match.length >= count) {
                        c.classList.remove('fail');
                        c.classList.add('pass');
                    } else {
                        c.classList.remove('pass');
                        c.classList.add('fail');
                    }
                    break;
                case PASSWORD_VALIDATION.SYMBOL:
                    match = password.match(/[^0-9a-zA-Z]+/g);
                    if (match) {
                        match = match.join('');
                    }
                    if (match && match.length >= count) {
                        c.classList.remove('fail');
                        c.classList.add('pass');
                    } else {
                        c.classList.remove('pass');
                        c.classList.add('fail');
                    }
                    break;
                case PASSWORD_VALIDATION.NUMBER:
                    match = password.match(/[0-9]+/g);
                    if (match) {
                        match = match.join('');
                    }
                    if (match && match.length >= count) {
                        c.classList.remove('fail');
                        c.classList.add('pass');
                    } else {
                        c.classList.remove('pass');
                        c.classList.add('fail');
                    }
                    break;
            }
            if (!c.classList.contains('pass')) {
                pass = false;
            }
        }
    }
    holder.pass = pass;
};

const postValidatePassword = function (holder) {
    let validation_list = findChild(holder, PASSWORD_VALIDATION_ID);
    let children = validation_list.children;
    let pass = true;

    for (let i = 0; i < children.length; i++) {
        let c = children[i];
        if (c.validation) {
            if (!c.classList.contains('pass')) {
                pass = false;
            }
        }
    }
    return pass;
};

const togglePasswordOnSight = function (e) {
    const button = e.currentTarget;
    const password = button.previousElementSibling;
    if (password) {
        const type =
            password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        if (type == 'password') {
            button.classList.remove('sight');
        } else {
            button.classList.add('sight');
        }
    }
};

const triggerConfirmEmail = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    continueConfirmUser(holder.parentElement);
};

const triggerConfirmCancel = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    removeLocalEmail();
    switchLogin(holder);
};

const triggerReset = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    if (!button.classList.contains('disabled')) {
        continueResetPassword(holder);
    }
};
const triggerResetCancel = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    switchLogin(holder);
};

const triggerResetRePasswordKeyup = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const holder = input.parentElement.parentElement;
    if (e.code != 'Tab' && e.code != 'Enter') {
        cleanError(input);
        validateResetPassword(holder);
    }
    validateResetPasswordForm(holder);
    if (e.code != 'Enter') {
        return;
    }
    continueResetPassword(holder);
};

const triggerResetPasswordKeyup = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const holder = input.parentElement.parentElement;
    if (e.code != 'Tab' && e.code != 'Enter') {
        cleanError(input);
        validateResetPassword(holder);
    }
    validateResetPasswordForm(holder);
    if (e.code != 'Enter') {
        return;
    }
    const module = findChild(holder, FORM.RE_PASSWORD);
    const next = findChild(module, FORM.PASSWORD);
    if (next) {
        next.focus();
    }
};

const validateResetPassword = function (holder) {
    const password = findChild(findChild(holder, FORM.PASSWORD), FORM.PASSWORD);
    const repassword = findChild(findChild(holder, FORM.RE_PASSWORD), FORM.PASSWORD);

    const validation_holder = findChild(holder, PASSWORD_VALIDATION_ID);

    validationPassword(validation_holder, password.value, repassword.value);
};

const validateResetPasswordForm = function (holder) {
    let pass = postValidatePassword(holder);

    let button = findChild(holder, FORM.RESET_PASSWORD);
    if (pass) {
        button.classList.remove('disabled');
    } else {
        if (!button.classList.contains('diabled')) {
            button.classList.add('disabled');
        }
    }
};

const triggerForgot = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    const top = holder.parentElement;
    top.parentElement.classList.add('forgot');
};

const triggerExpireBack = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    const top = holder.parentElement.parentElement;
    top.classList.remove('expire');
    removeChild(top, EXPIRE_ID);
};

const triggerForgotBack = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    const top = holder.parentElement.parentElement;
    top.classList.remove('forgot');
};

const triggerExpireConfirm = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement.parentElement;
    const form_holder = findChild(holder, EXPIRE_FORM_ID);
    continueForgotEmail(form_holder, true);
};

const triggerForgotConfirm = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement.parentElement;
    const form_holder = findChild(holder, FORGOT_FORM_ID);
    continueForgotEmail(form_holder);
};

const triggerExpireConfirmKeyup = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const holder = input.parentElement;
    cleanError(input);
    if (e.code != 'Enter') {
        return;
    }
    continueForgotEmail(holder, true);
};

const triggerForgotConfirmKeyup = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const holder = input.parentElement;
    cleanError(input);
    if (e.code != 'Enter') {
        return;
    }
    continueForgotEmail(holder);
};

const triggerRegisterPasswordKeyup = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const holder = input.parentElement.parentElement;
    if (e.code != 'Tab' && e.code != 'Enter') {
        cleanError(input);
        validateRegisterPassword(holder);
    }
    validateRegisterForm(holder);
    if (e.code != 'Enter') {
        return;
    }
    const module = findChild(holder, FORM.RE_PASSWORD);
    const next = findChild(module, FORM.PASSWORD);
    if (next) {
        next.focus();
    }
};

const triggerRegisterCompleteKeyup = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const holder = input.parentElement.parentElement;
    if (e.code != 'Tab' && e.code != 'Enter') {
        cleanError(input);
        validateRegisterPassword(holder);
    }
    validateRegisterForm(holder);
    if (e.code != 'Enter') {
        return;
    }
    continueRegister(holder);
};

const validateRegisterPassword = function (holder) {
    const password = findChild(findChild(holder, FORM.PASSWORD), FORM.PASSWORD);
    const repassword = findChild(findChild(holder, FORM.RE_PASSWORD), FORM.PASSWORD);

    const validation_holder = findChild(holder, PASSWORD_VALIDATION_ID);

    validationPassword(validation_holder, password.value, repassword.value);
};

const validateRegisterForm = function (holder) {
    let pass = postValidatePassword(holder);

    const fname_input = findChild(findChild(holder, FORM.FIRST_NAME), FORM.FIRST_NAME);
    const lname_input = findChild(findChild(holder, FORM.LAST_NAME), FORM.LAST_NAME);

    if (fname_input.value.length == 0) {
        pass = false;
    }

    if (lname_input.value.length == 0) {
        pass = false;
    }

    let button = findChild(holder, FORM.REGISTER);
    if (pass) {
        button.classList.remove('disabled');
    } else {
        if (!button.classList.contains('diabled')) {
            button.classList.add('disabled');
        }
    }
};

const triggerRegisterComplete = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    if (!button.classList.contains('disabled')) {
        continueRegister(holder);
    }
};

const triggerFirstNameKeyup = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const holder = input.parentElement.parentElement;
    if (e.code != 'Tab' && e.code != 'Enter') {
        cleanError(input);
    }
    validateRegisterForm(holder);
    if (e.code != 'Enter') {
        return;
    }
    const next = findChild(holder, FORM.LAST_NAME);
    if (next) {
        next.focus();
    }
};

const triggerLastNameKeyup = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const holder = input.parentElement.parentElement;
    if (e.code != 'Tab' && e.code != 'Enter') {
        cleanError(input);
    }
    validateRegisterForm(holder);
    if (e.code != 'Enter') {
        return;
    }
    const module = findChild(holder, FORM.PASSWORD);
    const next = findChild(module, FORM.PASSWORD);
    if (next) {
        next.focus();
    }
};

const triggerFirstNameBlur = function (e) {
    const input = e.srcElement;
    const holder = input.parentElement;
    if (input.value.length == 0) {
        insertError(input, Locale.ERROR.EMPTY_FIRST_NAME.MESSAGE);
    }
};
const triggerLastNameBlur = function (e) {
    const input = e.srcElement;
    const holder = input.parentElement;
    if (input.value.length == 0) {
        insertError(input, Locale.ERROR.EMPTY_LAST_NAME.MESSAGE);
    }
};

const triggerAlertConfirm = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    const top = holder.parentElement;
    top.removeChild(holder);
    top.classList.remove('alert');
};

const triggerSwitchLogin = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    removeLocalEmail();
    switchLogin(holder.parentElement);
};

const triggerPasswordKeyup = function (e) {
    if (loading) return;
    const input = e.srcElement;
    const holder = input.parentElement.parentElement;
    cleanError(input);
    if (e.code != 'Enter') {
        return;
    }
    continueEmailAndPassword(holder);
};

const continueEmailLookupModule = function(module) {
    const holder = module.parentElement;
    continueEmailLookup(holder);
}

const continueEmailLookup = function (holder) {
    // console.log(holder);
    const module = findChild(holder, MODULE_EMAIL_DISCOVERY);
    const email_input = findChild(module, FORM.EMAIL);
    let email = email_input.email ? email_input.email : email_input.value;

    let pass = true;
    let top = holder.parentElement;

    if (!val.isEmail(email)) {
        pass = false;
        alert = Locale.ERROR.VALID_EMAIL;
        insertError(email_input, alert.MESSAGE);
    }

    if (pass) {
        loader.start(holder, false, true, false);
        loading = true;
        enterDiscovery(email, top.classList.contains(ID) ? holder : holder.parentElement, email_input);
    }
};

const triggerIncognitoMoreOptions = function (button, holder) {
    let svg;
    if (holder.classList.contains('less-content')) {
        holder.classList.remove('less-content');
    } else {
        holder.classList.add('less-content');
    }
};

const convertMoreOptions = function(button) {
    button.onclick = function(){};
    button.classList.add('continue-email-address');
    button.innerText = Locale.BUTTON.CONTINUE_WITH_EMAIL;
};

const goRegistration = function(holder, response) {
    // console.log('goRegistration');
    let email_address = getLocalEmail();
    let top = holder.parentElement;
    let register_container = view.addView(REGISTER_ID);
    let header = getHeaderModule(Locale.REGISTER.TITLE, Locale.REGISTER.CONTENT);
    register_container.appendChild(header);
    register_container.appendChild(getEmail(email_address, true));

    let {list,
        suggested_list,
        suggested,
        local} = processProviders(response, true);

    let opt = {
        buttonTheme: OPTS.buttonTheme,
        suggested: suggested,
        email_address: email_address,
        register: true
    };

    if (list || local) {
        cleanChild(top);
        top.appendChild(register_container);
    }

    if (list) {
        let button_holder = view.addView(BUTTON_HOLDER_ID);
        if (list.length == 1 && !suggested) {
            suggested = list[0].type;
            suggested_list = [list[0]];
        }
        if (suggested && suggested != 'local') {
            let button_holder2 = view.addView(BUTTON_HOLDER_ID);
            button_holder2.classList.add('register-suggested');
            let opt2 = Object.assign({}, opt);
            opt2.buttonTheme = false;
            let {container, error} = viewButton.getButtonLists(
                suggested_list,
                opt2
            );
            button_holder2.append(container);
            register_container.append(button_holder2);
            if (list.length > 1) {
                button_holder.append(getParagraph(Locale.BUTTON.USE_DIFFERENT_IDP));
            }
        } else {
            button_holder.append(getParagraph(Locale.BUTTON.SELECT_IDP_SIGN_UP));
        }
        let buttons= viewButton.getButtonLists(list, opt);
        const container_main = buttons.container;
        if (list.length > 1) {
            button_holder.append(container_main);
        } else if (!suggested) {
            button_holder.append(container_main);
        }
        register_container.appendChild(button_holder);

        if (local) {
            let more = getMoreSignupModuleOptions(function(e){
                goLocalRegistration(top);
            });
            button_holder.appendChild(more);
        }

        insertSwitchLogin(register_container);
    } else if (local) {
        goLocalRegistration(top);
    }
};

const goLocalRegistration = function(top, token) {
    let email_address = getLocalEmail();
    // let top = holder.parentElement;

    let register_container = view.addView(REGISTER_HOLDER_ID);

    let header = getHeaderModule(Locale.REGISTER.TITLE, Locale.REGISTER.CONTENT_2);
    register_container.appendChild(header);
    register_container.appendChild(getEmail(email_address, true));
    if (token) {
        register_container.appendChild(getToken(token));
    }
    register_container.appendChild(getFirstName());
    register_container.appendChild(getLastName());

    let pwd = getPasswordModule(triggerRegisterPasswordKeyup, Locale.PLACEHOLDER.PASSWORD);
    pwd.classList.add(FORM.PASSWORD);
    register_container.appendChild(pwd);
    let rpwd = getPasswordModule(triggerRegisterCompleteKeyup, Locale.PLACEHOLDER.CONFIRM_PASSWORD);
    rpwd.classList.add(FORM.RE_PASSWORD);
    register_container.appendChild(rpwd);

    register_container.appendChild(passwordValidationList(true));
    register_container.appendChild(getRegisterButton(triggerRegisterComplete));
    insertSwitchLogin(register_container);

    cleanChild(top);
    top.appendChild(register_container);

};
const alertLocalRegisterConfirmationComplete = function(e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    const top = holder.parentElement;
    top.classList.remove('alert');
    if (button.classList.contains('form-alert-confirm')) {
        top.removeChild(holder);
        goLocalRegistration(top.parentElement);
    } else {
        top.removeChild(holder);
    }
};

const alertLocalRegisterConfirmation = function (e) {
    if (loading) return;
    const button = e.currentTarget;
    const holder = button.parentElement;
    let provider = '';
    if (providers_hash[button.suggested]) {
        provider = providers_hash[button.suggested].name;
    }
    showAlert(
      holder.parentElement,
      Locale.ERROR.NON_LOCAL_LOGIN,
      {
          provider: provider,
      },
      alertLocalRegisterConfirmationComplete
    );
};

const goLogin = function(holder, response) {
    let email_address = getLocalEmail();
    let top = holder.parentElement;

    let login_container = view.addView(LOGIN_ID);
    let header = getHeaderModule(Locale.LOGIN.TITLE);
    updateTitle(header);
    login_container.appendChild(header);
    login_container.appendChild(getEmail(email_address, true));


    let {list,
        suggested_list,
        suggested,
        local} = processProviders(response);

    if (list || local) {
        cleanChild(top);
        top.appendChild(login_container);
    }

    if (local) {
        login_container.appendChild(
          getPasswordModule(triggerPasswordKeyup, Locale.PLACEHOLDER.PASSWD)
        );
        let forgotform = forgotForm(email_address);
        top.appendChild(forgotform);
    }

    if (suggested == 'local' || (!list && local)) {
        login_container.classList.add('local-login');
        const next = findChild(login_container, FORM.PASSWORD);
        if (next) {
            next.focus();
        }
    }

    let opt = {
        buttonTheme: false,
        suggested: suggested,
        email_address: email_address,
    };

    if (list) {
        let button_holder = view.addView(BUTTON_HOLDER_ID);
        button_holder.classList.add('login-provider');
        let buttons = viewButton.getButtonLists(
          suggested_list,
          opt
        );
        buttons.container.classList.add('suggested-list');
        buttons.container.classList.add('collapsed');
        button_holder.append(buttons.container);

        buttons = viewButton.getButtonLists(list, opt);
        let container_main = buttons.container;
        container_main.classList.add('collapsible');
        container_main.classList.add('hide');
        if (suggested) {
            container_main.classList.add(suggested);
        }

        if (list.length > 1 || (list.length == 1 && local)) {

            addMoreInSuggest(button_holder);
            let continue_with = getParagraph(Locale.BUTTON.CONTINUE_WITH);
            continue_with.classList.add('no-local');
            login_container.appendChild(continue_with);
        }
        button_holder.append(container_main);
        login_container.appendChild(button_holder);
        if (local) {
            let localButton;
            if (suggested == 'local') {
                switchLocalLogin(container_main);
                container_main.classList.add('suggest-local');
                updateSuggestionToLocal(button_holder);
            } else {
                insertSwitchLogin(login_container);
            }

            localButton = viewButton.buttons(local, opt);
            container_main.appendChild(localButton);
            if (response.user_details && !response.user_details.has_local) {
                localButton.suggested = suggested;
                localButton.onclick = alertLocalRegisterConfirmation;
            } else {
                localButton.onclick = triggerLocalInListLogin;
            }
        } else {
            insertSwitchLogin(login_container);
        }
    } else {
        if (local) {
            let button_holder = view.addView(BUTTON_HOLDER_ID);
            let {
                container,
                error,
            } = viewButton.getButtonLists([], opt);
            container.classList.add('suggested-list');
            container.classList.add('collapsed');
            container.classList.add('local-only');
            button_holder.append(container);

            login_container.appendChild(button_holder);
            updateSuggestionToLocal(button_holder);
            insertSwitchLogin(login_container, true);
        } else {
            let alert = Locale.ERROR.NO_PROVIDER;
            showAlert(top, alert, false, triggerAlertConfirm);
        }
    }
};

const switchLocalLogin = function (holder) {
    if (loading) return;
    const top = holder.parentElement.parentElement;
    for (let i = 0; i < providers_list.length; i++) {
        holder.classList.remove(providers_list[i]);
    }
    holder.classList.add('local');
    let button_holder = holder.parentElement;
    let message = findChild(button_holder, FORM.MESSAGE);
    if (message) {
        message.classList.add('hide');
    }
    let collapsible = findChild(button_holder, 'collapsible');
    if (collapsible) {
        collapsible.classList.add('hide');
    }
    let suggested = findChild(button_holder, 'suggested-list');
    if (suggested) {
        suggested.classList.add('collapsed');
    }

    const next = findChild(holder, FORM.PASSWORD);
    if (next) {
        next.focus();
    }
    insertSwitchLogin(top, true);
    top.classList.add('local-login');
};

const processProviders = function(res, register) {
    let list = [];
    let suggested_list = [];
    let suggested = false;
    let local = false;

    if (res && res.suggested_identity_provider) {
        if (providers_hash[res.suggested_identity_provider]) {
            suggested_list.push(
              providers_hash[res.suggested_identity_provider]
            );
        }
        suggested = res.suggested_identity_provider;
    }

    if (res && res.social_identity_providers) {
        for (let i = 0; i < res.social_identity_providers.length; i++) {
            let provider = res.social_identity_providers[i];
            if (providers_hash[provider.type]) {
                list.push(providers_hash[provider.type]);
            }
        }
    }
    if (res && res.enterprise_identity_providers) {
        for (
          let i = 0;
          i < res.enterprise_identity_providers.length;
          i++
        ) {
            let provider = res.enterprise_identity_providers[i];
            if (providers_hash[provider.type]) {
                list.push(provider);
            }
        }
    }

    if (res && !suggested && list.length && !register) {
        suggested = list[0].type;
        if (providers_hash[suggested]) {
            suggested_list.push(providers_hash[suggested]);
        }
    }

    if (res && res.user_passwords && res.user_passwords.enabled) {
        local = providers_hash[providers.LOCAL];
    }

    if (list.length === 0) {
        list = false;
    }

    return {
        list,
        suggested_list,
        suggested,
        local
    }
};


export default {
    addForm,
    addRegister,
    addReset,
    addConfirm,
    showAlert,
    init,
};
