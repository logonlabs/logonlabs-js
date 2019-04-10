const ID = 'logonlabs-ui';

var addButtons = function(id, providers) {
    var element = document.getElementById(id);
    var container = document.createElement('div');
    container.id = ID
    for(let i = 0; i < providers.length; i++) {
        container.appendChild(buttons(providers[i]));
    }
    element.appendChild(container);
};

var buttons = function(provider) {
    var div = document.createElement('button');
    var name = document.createAttribute('name');
    name.value = provider.type;
    div.setAttributeNode(name);
    div.onclick = trigger;
    var node = document.createTextNode(provider.name);
    div.appendChild(node);
    return div;
};

var trigger = function(e) {
    var name = e.currentTarget.getAttribute("name");
    if (name) {
        var callback = function(url) {
          console.log(url);
        };
        LogonClient.startLogin({
            identity_provider: name
        }, callback);
    }
};

export default {
    addButtons
};