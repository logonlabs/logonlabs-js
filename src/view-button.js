const ID = 'logonlabs-buttons';
const HOLDER_ID = 'logonlabs-buttons-ui';
const CONTAINER_ID = 'logonlabs-buttons-containers';
import './view-button.scss';
import VIEW from './view.js';
import viewAlert from './view-alert';
import api from './api.js';

import lang from './locale.js';
let Locale = {};

const showAlert = viewAlert.showAlert;

const init = function (options) {
    loadOptions(options);
};

const loadOptions = function (options) {
    loadLanguage(options);
};

const loadLanguage = function (options) {
    if (options.language) {
        let locale = lang.getLocale(options.language, options.locale);
        if (locale) {
            Locale = locale;
        }
    }
};

const addButtons = function (id, providers, options) {
    let { container, error } = getButtonLists(providers, options);
    let holder2 = VIEW.addView(CONTAINER_ID);
    holder2.appendChild(container);
    let holder = VIEW.addView(HOLDER_ID);
    holder.appendChild(holder2);
    VIEW.initView(id, options, holder, error);
};

const getButtonLists = function (providers, options) {
    // loadClientData(options);
    let buttonTheme = options.buttonTheme ? options.buttonTheme : false;
    const pass = options.pass ? options.pass : false;
    const token = options.token ? options.token : false;
    const register = options.register ? options.register : false;
    const suggested = options.suggested ? options.suggested : false;
    const email_address = options.email_address ? options.email_address : false;
    const collapsible = options.collapsible ? options.collapsible : false;
    const container = VIEW.addView(ID);
    let error = false;
    if (buttonTheme == 'icon' || buttonTheme == 'square-icons' || buttonTheme == 'round-icons') {
        container.classList.add('icon');
        if (buttonTheme == 'round-icons') {
            container.classList.add('round');
        }
        buttonTheme = 'icon';
    }

    if (providers) {
        if (providers.length) {
            for (let i = 0; i < providers.length; i++) {
                let first = i == 0 && providers.length > 1;
                if (providers[i].type != 'local') {
                    container.appendChild(
                        buttons(
                            providers[i],
                            {
                                buttonTheme,
                                pass,
                                register,
                                token,
                                email_address,
                            },
                            first
                        )
                    );
                }
            }
        } else {
            //container.appendChild(messages('Need to enable at least 1 identity providers.'));
            // container.className += 'error';
            error = 'Need to enable at least 1 identity provider.';
        }
    } else {
        // container.appendChild(messages('Need to add ' + window.location.origin + ' to CORS whitelist.'));
        // container.className += 'error';
        error = 'Need to add ' + window.location.origin + ' to CORS whitelist.';
    }

    if (
        suggested != 'local' &&
        providers.length > 1 &&
        buttonTheme != 'icon' &&
        collapsible
    ) {
        container.classList.add('collapsed');
        container.prepend(getMoreButton(triggerMore));
    }

    return { container, error };
};

const buttons = function (
    provider,
    { buttonTheme, pass, register, token, email_address },
    first
) {
    var div = document.createElement('div');
    if (provider.identity_provider_id) {
        if (buttonTheme == 'icon') {
            div.innerHTML = VIEW.svgIcons_e(provider);
        } else {
            div.innerHTML = VIEW.svgButtons_e(provider, register);
        }
    } else {
        if (buttonTheme == 'icon') {
            div.innerHTML = VIEW.svgIcons(provider.type);
        } else {
            div.innerHTML = VIEW.svgButtons(provider.type, provider, register);
        }
    }
    var name = document.createAttribute('name');
    name.value = provider.type;
    div.setAttributeNode(name);
    if (provider.identity_provider_id) {
        div.classList.add('enterprise');
        var idp_id = document.createAttribute('identity_provider_id');
        idp_id.value = provider.identity_provider_id;
        div.setAttributeNode(idp_id);
    }

    if (first && buttonTheme != 'icon') {
        div.classList.add('first');
    }

    if (token) {
        div.token = token;
    }

    if (email_address) {
        div.email_address = email_address;
    }

    if (!pass) {
        if (!register) {
            div.onclick = trigger;
        } else {
            div.onclick = triggerRegister;
        }
    }
    // var node = document.createTextNode(provider.name);
    // div.appendChild(node);
    return div;
};
const getMoreButton = function (cb) {
    let div = VIEW.addBlock('div', 'more-block');
    let more = VIEW.addBlock('div', 'more');
    let svg =
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve">\n' +
        '<path d="M9.16,14.88l-5.7-9.11C3.05,5.1,3.52,4.24,4.31,4.24H15.7c0.79,0,1.26,0.86,0.85,1.53l-5.7,9.11C10.46,15.51,9.55,15.51,9.16,14.88z"/>\n' +
        '</svg>';
    more.insertAdjacentHTML('beforeend', svg);
    div.appendChild(more);
    if (cb) {
        more.onclick = cb;
    }
    return div;
};

const triggerMore = function (e) {
    // console.log('triggerMore');
    const more = e.currentTarget;
    let classList = more.parentElement.parentElement.classList;
    if (classList.contains('collapsed')) {
        classList.remove('collapsed');
    } else {
        classList.add('collapsed');
    }
    e.stopImmediatePropagation();
};

const triggerIdentityProvider = function (func, data, button) {
    let top = button.parentElement.parentElement.parentElement;
    if (func) {
        func(data, function (res) {
            if (res && res.token) {
                api.redirectLogin(res.token, true);
            } else if (res && res.error) {
                let alert = Object.assign(
                    {
                        MESSAGE: res.error.message,
                    },
                    Locale.ERROR.API_ERROR
                );
                showAlert(top, alert);
            }
        });
    }
};

const trigger = function (e) {
    // console.log('trigger');
    let name = e.currentTarget.getAttribute('name');
    let identity_provider_id = e.currentTarget.getAttribute(
        'identity_provider_id'
    );
    let email_address = e.currentTarget.email_address;
    let data = {};
    if (email_address) {
        data['email_address'] = email_address;
    }
    data = VIEW.applyData(e.currentTarget, data);
    if (identity_provider_id) {
        data['identity_provider_id'] = identity_provider_id;
        triggerIdentityProvider(api.login, data, e.currentTarget);
    } else if (name) {
        data['identity_provider'] = name;
        triggerIdentityProvider(api.login, data, e.currentTarget);
    }
};

const triggerRegister = function (e) {
    //update for register
    // console.log('triggerRegister');
    let name = e.currentTarget.getAttribute('name');
    let token = e.currentTarget.token;
    let email_address = e.currentTarget.email_address;
    let identity_provider_id = e.currentTarget.getAttribute(
        'identity_provider_id'
    );
    let data = {};
    if (email_address) {
        data['email_address'] = email_address;
    }
    data = VIEW.applyData(e.currentTarget, data);

    if (identity_provider_id) {
        data['identity_provider_id'] = identity_provider_id;
        triggerIdentityProvider(api.register, data, e.currentTarget);
    } else if (name) {
        data['identity_provider'] = name;
        triggerIdentityProvider(api.register, data, e.currentTarget);
    }
};

export default {
    addButtons,
    getButtonLists,
    getMoreButton,
    buttons,
    init,
};
