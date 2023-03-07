# Command Injection - Low

## View Source

```PHP
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Get input
    $target = $_REQUEST[ 'ip' ];

    // Determine OS and execute the ping command.
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // Feedback for the end user
    echo "<pre>{$cmd}</pre>";
}

?>
```

- [`isset()`](https://www.php.net/manual/zh/function.isset.php)
    - 檢查變數是否已設置
    - I.e., *Submit* 按鈕按下去
- [`php_uname()`](https://www.php.net/manual/zh/function.php-uname.php)
    - 's': Operating system name. e.g., *Windows NT XN1 5.1 build 2600*
    - 回傳系統相關訊息
- [`stristr($a, $b)`](https://www.php.net/manual/zh/function.stristr.php)
    - 回傳 *b* 在 *a* 第一次出現到結尾的字串
- [`shell_exec()`](https://www.php.net/manual/zh/function.shell-exec.php)
    - 透過 *shell* 執行並將輸出用字串回傳

## Code Review

- 當使用者按下 *Submit* 按鈕送出後，*$target* 為使用者輸入
- 根據環境為 *Windows* 或 *\*nix* 來決定要執行的指令
- 沒有對使用者輸入進行任何檢查或驗證

## Answer

- [3.2.4 Lists of Commands](https://www.gnu.org/software/bash/manual/html_node/Lists.html)
- `;`
    - *Commands separated by a ‘;’ are executed sequentially; the shell waits for each command to terminate in turn.*
    - 不論前面的指令有沒有成功都會執行後面的
    - `127.0.0.1; whoami`
        - 最後執行的指令為 `ping 127.0.0.1; whoami`
        - 因為 *ping* 還是有執行，所以會需要等個幾秒鐘
- `&&`
    - `command1 && command2`
        - ***command2*** *is executed if, and only if, command1 returns an exit status of zero (success).*
        - 前一個指令成功才會執行後一個指令
    - `127.0.0.1 && ls`
        - 同理，也需要等個幾秒鐘

### Example

```
127.0.0.1; whoami
; hostname
127.0.0.1 && pwd
```