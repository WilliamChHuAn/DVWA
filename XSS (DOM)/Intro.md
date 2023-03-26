# XSS (DOM)

## About (View Help)

> "Cross-Site Scripting (XSS)" attacks are a type of injection problem, in which malicious scripts are injected into the otherwise benign and trusted web sites. XSS attacks occur when an ***attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user***. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application using input from a user in the output, ***without validating or encoding it***.
- *XSS* 一樣是種注入攻擊，攻擊者透過網站服務注入惡意的 *JavaScript* 語句
- 通常是因為沒有對使用者輸入進行驗證或編碼
> An attacker can use XSS to send a malicious script to an unsuspecting user. The end user's browser has no way to know that the script should not be trusted, and will execute the JavaScript. Because it thinks the script came from a trusted source, the malicious script can ***access any cookies, session tokens, or other sensitive information*** retained by your browser and used with that site. These scripts can even rewrite the content of the HTML page.
- 受害者的瀏覽器會將惡意的 *JavaScript* 語句執行，就可以存取像是 *Cookie* 等敏感資訊
> DOM Based XSS is a special case of reflected where the JavaScript is hidden in the URL and pulled out by JavaScript in the page ***while it is rendering rather than being embedded in the page*** when it is served. This can make it stealthier than other attacks and WAFs or other protections which are reading the page body do not see any malicious content.
- *DOM* 型是 *reflected* 的一種特例，透過操作 *DOM* 時才將惡意語句載入，而非一開始網站服務的回應就直接夾帶進網頁內容中

## Objective (View Help)

> Run your own JavaScript in another user's browser, use this to steal the cookie of a logged in user.

## Reference

- [Cross-site scripting - PortSwigger](https://portswigger.net/web-security/cross-site-scripting)
- [Cross-site scripting (XSS) cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)
- [Which sinks can lead to DOM-XSS vulnerabilities?](https://portswigger.net/web-security/cross-site-scripting/dom-based#which-sinks-can-lead-to-dom-xss-vulnerabilities)

## Tool

- [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload)