# XSS (Reflected)

## About (View Help)

> "Cross-Site Scripting (XSS)" attacks are a type of injection problem, in which malicious scripts are injected into the otherwise benign and trusted web sites. XSS attacks occur when an ***attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user***. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application using input from a user in the output, ***without validating or encoding it***.
- *XSS* 一樣是種注入攻擊，攻擊者透過網站服務注入惡意的 *JavaScript* 語句
- 通常是因為沒有對使用者輸入進行驗證或編碼
> An attacker can use XSS to send a malicious script to an unsuspecting user. The end user's browser has no way to know that the script should not be trusted, and will execute the JavaScript. Because it thinks the script came from a trusted source, the malicious script can ***access any cookies, session tokens, or other sensitive information*** retained by your browser and used with that site. These scripts can even rewrite the content of the HTML page.
- 受害者的瀏覽器會將惡意的 *JavaScript* 語句執行，就可以存取像是 *Cookie* 等敏感資訊
> Because its a reflected XSS, the malicious code is not stored in the remote web application, so requires some social engineering (such as a link via email/chat).
- 因為 *Reflected XSS* 型的漏洞，惡意的語句不會被儲存在網站服務中，所以需要搭配社交工程等的手法

## Objective (View Help)

> One way or another, steal the cookie of a logged in user.

## Reference

- [Cross-site scripting - PortSwigger](https://portswigger.net/web-security/cross-site-scripting)
- [Cross-site scripting (XSS) cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)

## Tool

- [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload)