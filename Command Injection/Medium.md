# Command Injection - Medium

## View Source

```PHP
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Get input
    $target = $_REQUEST[ 'ip' ];

    // Set blacklist
    $substitutions = array(
        '&&' => '',
        ';'  => '',
    );

    // Remove any of the charactars in the array (blacklist).
    $target = str_replace( array_keys( $substitutions ), $substitutions, $target );

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

- [`array_keys($a)`](https://www.php.net/manual/zh/function.array-keys.php)
    - 回傳 *a* 的 *key*
- [`str_replace($a, $b, $c)`](https://www.php.net/manual/zh/function.str-replace.php)
    - 將 *c* 內全部的 *a* 換成 *b* 後回傳

## Code Review

- 多了黑名單驗證，把使用者輸入的 `&&` 和 `;` 刪掉

## Answer

- [3.2.3 Pipelines](https://www.gnu.org/software/bash/manual/html_node/Pipelines.html)
- [3.2.4 Lists of Commands](https://www.gnu.org/software/bash/manual/html_node/Lists.html)
- `&`
    - *the shell executes the command asynchronously in a subshell. This is known as executing the command in the background, and these are referred to as asynchronous commands. The shell does not wait for the command to finish, and the return status is 0 (true).*
    - 在背景執行指令
    - `127.0.0.1 & pwd`
- `|`
    - *The output of each command in the pipeline is connected via a pipe to the input of the next command. That is, each command reads the previous command’s output.*
    - 把前一個指令的輸出當作後一個指令的輸入
    - `127.0.0.1 | ls`
        - 因為 *ping* 指令的輸出被當作 `ls` 的輸入了，所以只會看到 ls 的結果
- `||`
    - `command1 || command2`
        - *command2 is executed if, and only if, command1 returns a non-zero exit status.*
        - 前一個指令失敗才會執行後一個指令
    - `127.0.0.1 -h || whoami`
        - `-h` 就是 `ping -h`
        - 因為故意失敗，所以不像 `&&` 會需要等個幾秒鐘

### Example

```
127.0.0.1 & whoami
& pwd
127.0.0.1 | ls
| hostname
127.0.0.1 -h || whoami
|| pwd
```