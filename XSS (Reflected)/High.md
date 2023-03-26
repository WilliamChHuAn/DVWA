# XSS (Reflected) - High

## View Source

```PHP
<?php

header ("X-XSS-Protection: 0");

// Is there any input?
if( array_key_exists( "name", $_GET ) && $_GET[ 'name' ] != NULL ) {
    // Get input
    $name = preg_replace( '/<(.*)s(.*)c(.*)r(.*)i(.*)p(.*)t/i', '', $_GET[ 'name' ] );

    // Feedback for end user
    echo "<pre>Hello ${name}</pre>";
}

?>
```

- [`preg_replace($a, $b, $c)`](https://www.php.net/manual/zh/function.preg-replace.php)
    - 將 *c* 內符合 *a* 的換成 *b*
    - [*Pattern Modifiers*](https://www.php.net/manual/zh/reference.pcre.pattern.modifiers.php)
        - `i`: 大小寫不敏感
    - `.` Match any character (except newline)
    - `*` Match 0 or more times

## Code Review

- 有 `<script` 這個順序的輸入就替換成空字串

## Answer

- 可參考 [XSS cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)
- 透過 `img` *tag* 來觸發並執行惡意的 *JavaScript* 語句
    - *Medium Level* 也可以

### Example

```
<img src onerror=alert(1)>
```