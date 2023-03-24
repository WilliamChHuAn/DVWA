# SQL Injection

## About (View Help)

> A SQL injection attack consists of ***insertion or "injection" of a SQL query via the input data from the client to the application***. A successful SQL injection exploit can read sensitive data from the database, modify database data (insert/update/delete), execute administration operations on the database (such as shutdown the DBMS), recover the content of a given file present on the DBMS file system (load_file) and in some cases issue commands to the operating system.
- 將 *SQL* 語句當作使用者輸入注入到網站服務中
> SQL injection attacks are a type of injection attack, in which SQL commands are injected into data-plane input in order to ***effect the execution of predefined SQL commands***.
- 通常成因是網站後端採動態生成 SQL 語句，E.g., 串接使用者輸入
> This attack may also be called "SQLi".

## Objective (View Help)

> There are 5 users in the database, with id's from 1 to 5. Your mission... to steal their passwords via SQLi.

## Reference

- [*SQL injection cheat sheet*](https://portswigger.net/web-security/sql-injection/cheat-sheet)

## Tool

- [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload)