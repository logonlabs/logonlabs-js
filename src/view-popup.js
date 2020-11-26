import view from './view';

const POPUP_ID = 'logonlabs-popup';
const POPUP_HOLDER_ID = 'logonlabs-popup-holder';
const POPUP_HEADER_ID = 'logonlabs-popup-header';
const POPUP_WRAPPER_ID = 'logonlabs-popup-wrapper';

import lang from './locale.js';
import './view-popup.scss';
import viewForm from './view-form.js';

let Locale = {};
let APP_NAME = false;
let currentHolder = false;

const FORM = {
    TITLE: 'popup-title',
    CLOSE: 'popup-close',
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

const loadOptions = function (options) {
    loadLanguage(options);
};

const init = function (options) {
    loadOptions(options);
    loadApp(options);
};

const addForm = function (options) {
    let view = createView(options);
    options.popup = true;

    viewForm.addForm(view, options);
};

const addRegister = function (options) {
    let view = createView(options);
    options.popup = true;

    viewForm.addRegister(view, options);
};

const addReset = function (options) {
    let view = createView(options);
    options.popup = true;

    viewForm.addReset(view, options);
};

const addConfirm = function (options) {
    let view = createView(options);
    options.popup = true;

    viewForm.addConfirm(view, options);
};

const addView = function (id) {
    let container = false;
    if (id) {
        container = document.createElement('div');
        container.classList.add(id);
    }
    return container;
};

const createView = function (options) {
    if (!currentHolder) {
        let popup = addView(POPUP_ID);

        if (options.continueTop || options.continueLeft || options.continueBottom || options.continueRight) {
            if (options.continueTop) {
                popup.style.top = options.continueTop + 'px';
            }
            if (options.continueBottom) {
                popup.style.bottom = options.continueBottom + 'px';
            }
            if (options.continueLeft) {
                popup.style.left = options.continueLeft + 'px';
            }
            if (options.continueRight) {
                popup.style.right = options.continueRight + 'px';
            }
        } else {
            popup.style.top = '30px';
            popup.style.right = '30px';
        }


        let header = addView(POPUP_HEADER_ID);
        let holder = addView(POPUP_HOLDER_ID);
        let wrapper = addView(POPUP_WRAPPER_ID);
        popup.appendChild(wrapper);
        wrapper.appendChild(header);
        wrapper.appendChild(holder);

        header.appendChild(getTitle());
        header.appendChild(getCloseIcon());
        document.body.append(popup);
        currentHolder = holder;
    } else {
        cleanChild(currentHolder);
        currentHolder.parentElement.parentElement.classList.remove('hide');
    }
    return currentHolder;
};

const getTitle = function () {
    let text = Locale.POPUP.HEADER_1;
    if (APP_NAME) {
        text = lang.replace({ APP_NAME }, Locale.POPUP.HEADER_2);
    }
    let b = view.addBlock('h1', FORM.TITLE);
    b.innerHTML = text;
    return b;
};

const getCloseIcon = function () {
    let b = view.addBlock('button', FORM.CLOSE);
    b.innerHTML = getCloseIconSvg();
    b.onclick = triggerClosePopup;
    return b;
};

const getCloseIconSvg = function () {
    return `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
<g>
<path class="st0" d="M27.26,15.54l-4.36,4.46l4.36,4.46c0.8,0.82,0.8,2.15,0,2.97c-0.8,0.82-2.1,0.82-2.9,0L20,22.97l-4.36,4.46
c-0.8,0.82-2.1,0.82-2.9,0c-0.8-0.82-0.8-2.15,0-2.97l0,0L17.1,20l-4.36-4.46c-0.8-0.82-0.8-2.15,0-2.97c0.8-0.82,2.1-0.82,2.9,0
L20,17.03l4.36-4.46c0.8-0.82,2.1-0.82,2.9,0C28.06,13.39,28.06,14.72,27.26,15.54L27.26,15.54z"/>
</g>
</svg>`;
};

const cleanChild = function (holder) {
    if (holder) {
        while (holder.firstChild) {
            holder.removeChild(holder.lastChild);
        }
    }
};

const findParents = function (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
};

const triggerClosePopup = function (e) {
    let button = e.target;
    if (!button.classList.contains(FORM.CLOSE)) {
        button = findParents(button, FORM.CLOSE);
    }
    if (button) {
        let header = button.parentElement;
        let wrapper = header.parentElement;
        let popup = wrapper.parentElement;
        popup.classList.add('hide');
    }
};

export default {
    addForm,
    addRegister,
    addReset,
    addConfirm,
    init,
};
