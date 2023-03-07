# Weak Session IDs

## About (View Help)

> Knowledge of a session ID is often the only thing required to access a site as a specific user after they have logged in, if that session ID is able to be ***calculated or easily guessed***, then an attacker will have an easy way to gain access to user accounts without having to brute force passwords or find other vulnerabilities such as Cross-Site Scripting.
- *Session ID* 常被用來辨別使用者身分、登入狀態等
- 所以如果 *Session ID* 是可被計算、容易猜測、可預測等，攻擊者就可以輕鬆存取使用者帳號

## Objective (View Help)

> This module uses four different ways to set the dvwaSession cookie value, the objective of each level is to work out how the ID is generated and then infer the IDs of other system users.
- 分析 *dvwaSession* 怎麼被生成和推斷其他使用者的 *ID*

### Note

- 因為 *dvwaSession* 只是用來在 *Weak Session IDs* 分類示範用而已
- *Server* 端沒有其他任何應用 (e.g., 分辨使用者身分)，所以無法用來 *Exploit*

## Reference

- [md5在线解密破解,md5解密加密](https://www.cmd5.com/)
- [CrackStation - Online Password Hash Cracking](https://crackstation.net/)
- [淺談 Session 與 Cookie：一起來讀 RFC](https://github.com/aszx87410/blog/issues/45)