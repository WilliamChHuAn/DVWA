# CSRF - High

## View Source

```PHP
<?php

if( isset( $_GET[ 'Change' ] ) ) {
    // Check Anti-CSRF token
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // Get input
    $pass_new  = $_GET[ 'password_new' ];
    $pass_conf = $_GET[ 'password_conf' ];

    // Do the passwords match?
    if( $pass_new == $pass_conf ) {
        // They do!
        $pass_new = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $pass_new ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
        $pass_new = md5( $pass_new );

        // Update the database
        $insert = "UPDATE `users` SET password = '$pass_new' WHERE user = '" . dvwaCurrentUser() . "';";
        $result = mysqli_query($GLOBALS["___mysqli_ston"],  $insert ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

        // Feedback for the user
        echo "<pre>Password Changed.</pre>";
    }
    else {
        // Issue with passwords matching
        echo "<pre>Passwords did not match.</pre>";
    }

    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}

// Generate Anti-CSRF token
generateSessionToken();

?> 
```

- [`isset()`](https://www.php.net/manual/zh/function.isset.php)
    - 檢查變數是否已設置
    - I.e., *Change* 按鈕按下去

### `checkToken()` & `generateSessionToken()`

- `docker exec -it dvwa /bin/bash`
    - 進入 docker
- `vim /var/www/html/dvwa/includes/dvwaPage.inc.php`
    - https://github.com/digininja/DVWA/blob/master/dvwa/includes/dvwaPage.inc.php#L605-L624

### View Page Source

```HTML
<form action="#" method="GET">
    New password:<br />
    <input type="password" AUTOCOMPLETE="off" name="password_new"><br />
    Confirm new password:<br />
    <input type="password" AUTOCOMPLETE="off" name="password_conf"><br />
    <br />
    <input type="submit" value="Change" name="Change">
    <input type='hidden' name='user_token' value='e599a43fc4dbc36b495e10affe3af151' />
</form>
```

## Code Review

1. 當使用者瀏覽 *CSRF* 頁面時，會發送包含 *PHPSESSID* 和 *security=high* 的 *Cookie*
    - 沒有帶 *Cookie* 的話會被轉到 *login.php*
2. *Server* 端接收到 *request* 後，會產生新的 *token* 放在頁面一起 *response* 回來
3. 當使用者看到輸入框的畫面就已經有 *token* 了 (如 View Page Source)
4. 輸入密碼並按下 *Change* 送出的 *request* 就會包含 *password* 和 *token*
    - E.g., `http://127.0.0.1/vulnerabilities/csrf/?password_new=123&password_conf=123&Change=Change&user_token=e599a43fc4dbc36b495e10affe3af151#`

## Answer

- 因為像 *Low* 和 *Medium level* 構造的惡意連結已是上方最後的步驟
- 代表使用者受騙觸發所送出的 *request* 並不知道 *token* 是什麼
- 需要搭配其他類型的漏洞來達成
    - *In order by bypass this protection method, another vulnerability will be required.*

### Example

#### File Upload

1. 為求方便，將 *DVWA Security* 調至 *low* 並到 *File Upload* 頁面
    - 可以保持在 *high*，那就是要繞過限制而已 (詳見 *File Upload - High.md*)
2. 將 *Sample code* 中的 *CSRF High Level Demo.html* 上傳
3. 切回 *high* 後瀏覽上傳的檔案位置
    - E.g., `http://127.0.0.1/hackable/uploads/CSRF High Level Demo.html`

#### XSS (Stored)

1. 惡意的 *JavaScript* 語句在 *Sample code* 中的 *CSRF High Level Demo.js* (類似 *File Upload*)
2. 將其放到 [Beeceptor](https://beeceptor.com/) 的 *Mocking Rules* 的 *Response body*
    - 需先註冊 / 登入
3. *Response headers* 寫入 `"Content-Type": "text/html"`
4. 參考 [Cross-site scripting (XSS) cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet) 構造或使用 *CSRF High Level Demo.ans* 中的惡意語句
5. 注入 *XSS (Stored)* 的 *name* 輸入框
6. 其他使用者瀏覽至 *XSS (Stored)* 便會觸發

##### Note

- *XSS* 惡意語句是注入到 *name* 輸入框
- 前端有限制輸入長度，*F12* 改一下就好
- 後端有用正規表達式 `/<(.*)s(.*)c(.*)r(.*)i(.*)p(.*)t/i`
- 資料庫中 *dvwa.guestbook* 的 *name*限制長度 *varchar(100)*
    1. `docker exec -it dvwa /bin/bash`
    2. `mysql`
    3. `DESCRIBE dvwa.guestbook;`
- I.e., 構造惡意語句時要注意不能包含 *script* 且長度不超過 *100*