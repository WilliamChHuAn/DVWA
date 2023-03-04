# Cross Site Request Forgery (CSRF)

## About (View Help)

> CSRF is an attack that forces an end user to execute unwanted actions on a web application in which they are ***currently authenticated***. With a little help of social engineering (such as sending a link via email/chat), an attacker may force the users of a web application to execute actions of the attacker's choosing.
- 透過社交工程等方式，偽造使用者身分 (e.g., cookies) 來做非預期的行為
> A successful CSRF exploit can compromise end user data and operation in case of normal user. If the targeted end user is the administrator account, this can compromise the entire web application.
> This attack may also be called "XSRF", similar to "Cross Site scripting (XSS)", and they are often used together.

## Objective (View Help)

> Your task is to make the current user change their own password, without them knowing about their actions, using a CSRF attack.

## Reference

- [Cross Site Request Forgery (CSRF) - Examples](https://owasp.org/www-community/attacks/csrf)
- [Testing for Cross Site Request Forgery](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing/05-Testing_for_Cross_Site_Request_Forgery)

## Tool

- [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload)