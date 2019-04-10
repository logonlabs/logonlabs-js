var getPostData = function(params) {
    var fd = new FormData();
    for(var key in params) {
        fd.append(key, params[key]);
    }
    return fd;
};

var getGetData = function(data, url) {
    var datalist = [];
    if (data) {
        for( var key in data) {
            datalist.push(key + "=" + data[key]);
        }
    }
    var querystring = datalist.join('&');
    if (url.indexOf('?') > -1) {
        querystring = '&' + querystring;
    } else {
        querystring = '?' + querystring;
    }
    return url + querystring;
};

export function request(url, params, method, callback) {
    var fd = false;
    method = method ? method : 'POST';
    switch(method) {
        case 'POST':
        case 'PUT':
            fd = getPostData(params);
            break;
        case 'GET':
            url = getGetData(params, url);
            break;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function (e) {
        if (callback) {
            if (e && e.target && e.target.responseText) {
                try {
                    callback(JSON.parse(e.target.responseText));
                } catch (exc) {
                    let error = {
                        "code": "parsingError",
                        "message": exc.message
                    }
                    callback(error);
                }
            } else {
                let response = e.target;
                response.error = {
                    "code": response.status
                }
                callback(response);
            }
        }
    };
    xhr.onerror = function (e) {
        if (callback) {
            if (e && e.target && e.target.responseText) {
                try {
                    callback(JSON.parse(e.target.responseText));
                } catch (exc) {
                    let error = {
                        "code": "parsingError",
                        "message": exc.message
                    }
                    callback(error);
                }
            } else {
                let response = e.target;
                response.error = {
                    "code": response.status
                }
                callback(response);
            }
        }
    };
    xhr.send(fd);
    // console.log(url);
    // console.log(method);
};

export function postRedirect(url, data) {
    var method = "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", url);

    for(var key in data) {
        if(data.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", data[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

export function redirect(url, data, redirect) {
    var datalist = [];
    if (data) {
        for( var key in data) {
            datalist.push(key + "=" + data[key]);
        }
    }
    var querystring = datalist.join('&');
    if (url.indexOf('?') > -1) {
        querystring = '&' + querystring;
    } else {
        querystring = '?' + querystring;
    }
    url = url + querystring;
    if (redirect) {
        document.location.assign(url);
    }
    return url;
};