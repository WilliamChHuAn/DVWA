# XSS (Stored) - Impossible

## View Source

```PHP
<?php

if( isset( $_POST[ 'btnSign' ] ) ) {
    // Check Anti-CSRF token
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // Get input
    $message = trim( $_POST[ 'mtxMessage' ] );
    $name    = trim( $_POST[ 'txtName' ] );

    // Sanitize message input
    $message = stripslashes( $message );
    $message = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $message ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
    $message = htmlspecialchars( $message );

    // Sanitize name input
    $name = stripslashes( $name );
    $name = ((isset($GLOBALS["___mysqli_ston"]) && is_object($GLOBALS["___mysqli_ston"])) ? mysqli_real_escape_string($GLOBALS["___mysqli_ston"],  $name ) : ((trigger_error("[MySQLConverterToo] Fix the mysql_escape_string() call! This code does not work.", E_USER_ERROR)) ? "" : ""));
    $name = htmlspecialchars( $name );

    // Update database
    $data = $db->prepare( 'INSERT INTO guestbook ( comment, name ) VALUES ( :message, :name );' );
    $data->bindParam( ':message', $message, PDO::PARAM_STR );
    $data->bindParam( ':name', $name, PDO::PARAM_STR );
    $data->execute();
}

// Generate Anti-CSRF token
generateSessionToken();

?>
```

### 資料庫查詢

1. `docker exec -it dvwa /bin/bash`
2. `vim /var/www/html/dvwa/includes/dvwaPage.inc.php`
- https://github.com/digininja/DVWA/blob/master/dvwa/includes/dvwaPage.inc.php#L552-L573

```PHP
function dvwaGuestbook() {
    $query  = "SELECT name, comment FROM guestbook";
    $result = mysqli_query($GLOBALS["___mysqli_ston"],  $query );

    $guestbook = '';

    while( $row = mysqli_fetch_row( $result ) ) {
        if( dvwaSecurityLevelGet() == 'impossible' ) {
            $name    = htmlspecialchars( $row[0] );
            $comment = htmlspecialchars( $row[1] );
        }
        else {
            $name    = $row[0];
            $comment = $row[1];
        }

        $guestbook .= "<div id=\"guestbook_comments\">Name: {$name}<br />" . "Message: {$comment}<br /></div>\n";
    }
    return $guestbook;
}
```

## Code Review

- 增加 *CSRF token*
- 將 *Name* 和 *Message* 都套用 `htmlspecialchars()`
- 使用參數化查詢增加效率以及防禦 *SQLi*
- 查詢時也增加 `htmlspecialchars()`，因此就算前面的 *Payload* 沒清掉也不會觸發漏洞