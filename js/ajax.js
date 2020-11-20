let getJSON = function(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      let status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};


let postRequest = function(url, params, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.response, 0);
        } else if(xhr.readyState === 4 && xhr.status !== 200) {
            callback(xhr, 1);
        }
    };
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let arr = [];
    for(let key in params) {
        arr.push(key+'='+encodeURIComponent(params[key]));
    }
    xhr.send(arr.join('&'));
}

let getRequest = function(url, params, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.response, 0);
        } else if(xhr.readyState === 4 && xhr.status !== 200) {
            callback(xhr, 1);
        }
    };

    let arr = [];
    for(let key in params) {
        arr.push(key+'='+encodeURIComponent(params[key]));
    }
    if(arr.length > 0) {
      url += '?' + arr.join('&');
    }

    // console.log(url);
    
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

/**
 * Encode data from an object and returns
 * @param {Object} params The parameters to parse
 * @returns {string}
 */
const encodeData = function(params) {
    let result = '?'
    let arr = []

    const keys = Object.keys(params)
    keys.forEach(function(key) {
        arr.push(key += '=' + encodeURIComponent(params[key]))
    })

    result += arr.join('&')

    return result
}