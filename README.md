# LogonLabs JavaScript

The official LogonLabs JavaScript client library.
## Download

    https://cdn.logonlabs.com/dist/logonlabs.min.js
## LogonLabs API


- Prior to coding, some configuration is required at https://app.logonlabs.com/app/#/app-settings.

- For the full Developer Documentation please visit: https://app.logonlabs.com/docs/api/

---
### Instantiating a new client

- Your `APP_ID` can be found in [App Settings](https://app.logonlabs.com/app/#/app-settings)
- The `LOGONLABS_API_ENDPOINT` should be set to `https://api.logonlabs.com`

Create a new instance of `LogonClient`.  

```javascript
window.logonAsync = function() {
    LogonClient.configure({
        app_id: '{APP_ID}',
        api_path: '{LOGONLABS_API_ENDPOINT}'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = 'https://cdn.logonlabs.com/dist/logonlabs.min.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'logon-js'));
```
---
### SSO Login QuickStart
The StartLogin function in the JS library begins the LogonLabs managed SSO process.
```javascript
LogonClient.startLogin({
    identity_provider: LogonClient.identityProviders.GOOGLE
});
```
---
### JavaScript Only Workflow
The following workflow is required if you're using JavaScript UI components.
#### Buttons
This feature allows you to add the identity providers' buttons dynamically as defined in your app-settings.
```html
<div id="logonlabs"></div>
```
```javascript
LogonClient.ui.button('logonlabs');
```
Style in icon format
```javascript
LogonClient.ui.button('logonlabs', {
    theme: 'icon'
});
```
---
### Helper Methods
#### GetProviders
This method is used to retrieve a list of all providers enabled for the application.
If an email address is passed to the method, it will return the list of providers available for that email domain.
```javascript
LogonClient.getProviders('email_address', (res)=> {
    var identity_providers = res.identity_providers;
    for(var i = 0; i < identity_providers.length; i++) {
        //each individual providers available for this email address
    }
});
```
#### Decrypt
The JavaScript SDK has built in methods for decrypting strings using AES encryption.  Pass in the encrypted value to decrypt. 
```javascript
var decrypt_data = LogonClient.decrypt(encrypted_data);
```
