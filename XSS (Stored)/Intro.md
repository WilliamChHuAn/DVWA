# XSS (Stored)

## About (View Help)

> "Cross-Site Scripting (XSS)" attacks are a type of injection problem, in which malicious scripts are injected into the otherwise benign and trusted web sites. XSS attacks occur when an ***attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user***. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application using input from a user in the output, ***without validating or encoding it***.
- *XSS* 一樣是種注入攻擊，攻擊者透過網站服務注入惡意的 *JavaScript* 語句
- 通常是因為沒有對使用者輸入進行驗證或編碼
> An attacker can use XSS to send a malicious script to an unsuspecting user. The end user's browser has no way to know that the script should not be trusted, and will execute the JavaScript. Because it thinks the script came from a trusted source, the malicious script can ***access any cookies, session tokens, or other sensitive information*** retained by your browser and used with that site. These scripts can even rewrite the content of the HTML page.
- 受害者的瀏覽器會將惡意的 *JavaScript* 語句執行，就可以存取像是 *Cookie* 等敏感資訊
> The XSS is stored in the database. The XSS is permanent, until the database is reset or the payload is manually deleted.
- *Stored* 型 *XSS* 會將惡意語句儲存進資料庫等，因此是可以永久性觸發 (除非資料庫重置或惡意語句被人為刪除等)
- 就不需要搭配社交工程等手法來欺騙受害者，可以直接將惡意語句寫進網站服務中
	- 但是漏洞利用還是可以搭配社交工程，例如重導向到自架的釣魚網站

## Objective (View Help)

> Redirect everyone to a web page of your choosing.

## Reference

- [Cross-site scripting - PortSwigger](https://portswigger.net/web-security/cross-site-scripting)
- [Cross-site scripting (XSS) cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)

## Tool

- [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload)