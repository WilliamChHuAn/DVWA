# SQL Injection (Blind)

## About (View Help)

> When an attacker executes SQL injection attacks, sometimes the server responds with error messages from the database server complaining that the SQL query's syntax is incorrect. Blind SQL injection is identical to normal SQL Injection except that when an attacker attempts to exploit an application, rather then getting a useful error message, they ***get a generic page specified by the developer instead***. This makes exploiting a potential SQL Injection attack more difficult but not impossible. An attacker can still steal data by ***asking a series of True and False questions*** through SQL statements, and monitoring how the web application response (valid entry retunred or 404 header set).
- 相較於一般的 *SQLi* 可以透過錯誤訊息來獲取詳細資訊，*Blind SQL Injection* 可能只有開發者替換掉的通用訊息
- 加深了攻擊難度，但並非不可達成 *SQLi*，攻擊者仍然可以透過一連串的 *True / False* 問答來判斷注入成功與否及獲取資料
> ***"time based"*** injection method is often used when there is no visible feedback in how the page different in its response (hence its a blind attack). This means the attacker will wait to see how long the page takes to response back. If it takes longer than normal, their query was successful.
- 當網頁沒有任何訊息回饋，可以嘗試 *Time based* 類型
- 透過網站服務的回應時間長短來判斷注入成功與否

## Objective (View Help)

> Find the version of the SQL database software through a blind SQL attack.

## Reference

- [*Blind SQL injection*](https://portswigger.net/web-security/sql-injection/blind)
- [*sqlmap®*](https://sqlmap.org/)
- [*sqlmap*](https://github.com/sqlmapproject/sqlmap)

## Note

- 因為基本上和 *SQL Injection* 沒有區別，所以較不詳細解釋程式碼