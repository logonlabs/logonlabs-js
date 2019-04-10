/**
 * Logon Labs Javascript API client
 */

import client from './client.js';

(function(w){
    w['LogonClient'] = new function(){
        let me = this;
        me.configure = client.configure;
        me.startLogin = client.api.startLogin;
        me.getProviders = client.api.getProviders;
        me.ping = client.api.ping;
        //me.api = client.api;
        //me.util = client.util;
        me.decrypt = client.util.decrypt;
        //me.key = client.key;
        me.identityProviders = client.providers;

        me.ui = client.ui;
        client.initialize();
    };
    if (w['logonAsync']) {
        w['logonAsync']();
    }
})(window);

