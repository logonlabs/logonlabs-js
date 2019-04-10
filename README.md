The official LogonLabs Javascript Client library.

## Documentation

For the full Developer Documentation please visit: https://logonlabs.com/docs/api/

## Usage

### Client Side Workflow

Use the snippet below to initiate the SSO login process for you user. This will start the Login process by starting a redirect session and redirect to the LogonLabs to broker the SSO request with the desired identity provider.

```javascript
window.logonAsync = function() {
    LogonClient.configure({
        app_id: 'YOUR_APP_ID'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://cdn.logonlabs.com/dist/logonlabs.min.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'logon-js'));
```