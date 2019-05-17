# LogonLabs JavaScript
---
The official LogonLabs JavaScript client library.
## Download
---
    https://cdn.logonlabs.com/dist/logonlabs.min.js
## Logon Labs API
---
For the full Developer Documentation please visit: https://logonlabs.com/docs/api
---
### Instantiating a new client
Create a new instance of `LogonClient`.  
Your `APP_ID` can be found in [App Settings](https://logonlabs.com/app/#/app-settings).
The `LOGONLABS_API_ENDPOINT` should be set to `https://api.logonlabs.com`.
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
The StartLogin function in the JS library begins the Logon Labs managed SSO process.  Configuration is required at https://logonlabs.com/app/#app-settings.  Once the `callback Url` has been configured for your application you can consume the payload sent to your page.
```javascript
LogonClient.startLogin({
    identity_provider: LogonClient.identityProviders.GOOGLE
});
```
---
### JavaScript Only Workflow
The following workflow is required if you're using JavaScript UI components.
#### Buttons
This features allow to add in the identity providers' buttons dynamically depends on your app settings.
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
If an email address is passed to the method it will further filter any providers available/disabled for the domain of the address.
```javascript
LogonClient.getProviders('email_address', (res)=> {
    var identity_providers = res.identity_providers;
    for(var i = 0; i < identity_providers.length; i++) {
        //each individual providers available for this email address
    }
});
```
#### Decrypt
The JavaScript SDK has built in methods for decrypting strings using the AES encryption standard.  Pass in the encrypted value to decrypt. 
```javascript
var decrypt_data = LogonClient.decrypt(encrypted_data);
```