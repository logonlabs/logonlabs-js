const getPostData = function (params) {
    let data = new FormData();

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            data.append(key, params[key]);
        }
    }

    return data;
};

const getGetData = function (url, params) {
    let querystring = '';

    if (params) {
        let data = [];

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                data.push(key + '=' + params[key]);
            }
        }

        querystring = data.join('&');

        if (url.indexOf('?') > -1) {
            querystring = '&' + querystring;
        } else {
            querystring = '?' + querystring;
        }
    }

    return url + querystring;
};

const handleResponse = (e, callback) => {
    if (callback) {
        if (e && e.target && e.target.responseText) {
            let response, error;
            try {
                response = JSON.parse(e.target.responseText);
            } catch (exc) {
                error = {
                    code: 'parsingError',
                    message: exc.message,
                };
                callback(error);
            }
            if (!error) {
                callback(response);
            }
        } else {
            let response = e.target;
            response.error = {
                code: response.status,
            };
            callback(response);
        }
    }
};

export function request(url, params, method, callback) {
    method = method ? method : 'POST';

    let data;
    switch (method) {
        case 'PUT':
        case 'PATCH':
        case 'POST':
            data = getPostData(params);
            break;
        case 'GET':
            url = getGetData(url, params);
            break;
    }

    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Accept', 'application/json');

    if (params['app_secret']) {
        xhr.setRequestHeader('x-app-secret', params['app_secret']);
    }

    xhr.onload = function (e) {
        handleResponse(e, callback);
    };
    xhr.onerror = function (e) {
        handleResponse(e, callback);
    };

    xhr.send(data);

    // console.log(url);
    // console.log(method);
}

// export function postRedirect(url, data) {
//     let method = "post"; // Set method to post by default if not specified.

//     // The rest of this code assumes you are not using a library.
//     // It can be made less wordy if you use one.
//     let form = document.createElement("form");
//     form.setAttribute("method", method);
//     form.setAttribute("action", url);

//     for(let key in data) {
//         if(data.hasOwnProperty(key)) {
//             let hiddenField = document.createElement("input");
//             hiddenField.setAttribute("type", "hidden");
//             hiddenField.setAttribute("name", key);
//             hiddenField.setAttribute("value", data[key]);

//             form.appendChild(hiddenField);
//         }
//     }

//     document.body.appendChild(form);
//     form.submit();
// }

export function redirect(url, data, redirect) {
    url = getGetData(url, data);

    if (redirect) {
        document.location.assign(url);
    }

    return url;
}
