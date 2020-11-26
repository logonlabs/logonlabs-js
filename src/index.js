/**
 * Logon Labs Javascript API client
 */

const clientdefault = require('./client.js');
const client = clientdefault.default;

const logon = new (function () {
    let me = this;
    me.configure = client.configure;
    me.startLogin = client.api.startLogin;
    me.getProviders = client.api.getProviders;
    me.ping = client.api.ping;
    me.api = client.api;
    me.providers = client.providers;
    me.providersButtons = client.providers_buttons;
    me.ui = client.ui;
    client.initialize();
})();

(function (w) {
    w['LogonClient'] = logon;
    if (w['logonAsync']) {
        w['logonAsync']();
    }
})(window);

module.exports = logon;
module.exports.logon = logon;
