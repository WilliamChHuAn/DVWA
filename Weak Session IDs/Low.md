# Weak Session IDs - Low

## View Source

```PHP
<?php

$html = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (!isset ($_SESSION['last_session_id'])) {
        $_SESSION['last_session_id'] = 0;
    }
    $_SESSION['last_session_id']++;
    $cookie_value = $_SESSION['last_session_id'];
    setcookie("dvwaSession", $cookie_value);
}
?> 
```

- [`setcookie($a, $b)`](https://www.php.net/manual/zh/function.setcookie.php)
	- *a*: *Cookie* 名稱
	- *b*: *Cookie* 存放的值

## Code Review

- 設置 *last_session_id* 從 *1* 開始每次加一

## Answer

- 可以使用 *Burp Suite* 的 *Sequencer* 來分析亂度，結果顯示 *extremely poor*
- 每次都加一，所以可以很容易預測其他使用者的 *dvwaSession*
	- E.g., 假如現實中我的 *Session ID = 87*，就可以推測 *Session ID = 86* 有其他使用者，以此類推