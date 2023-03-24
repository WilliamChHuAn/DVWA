# SQL Injection - Impossible

## View Source

```PHP
<?php

if( isset( $_GET[ 'Submit' ] ) ) {
    // Check Anti-CSRF token
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // Get input
    $id = $_GET[ 'id' ];

    // Was a number entered?
    if(is_numeric( $id )) {
        // Check the database
        $data = $db->prepare( 'SELECT first_name, last_name FROM users WHERE user_id = (:id) LIMIT 1;' );
        $data->bindParam( ':id', $id, PDO::PARAM_INT );
        $data->execute();
        $row = $data->fetch();

        // Make sure only 1 result is returned
        if( $data->rowCount() == 1 ) {
            // Get values
            $first = $row[ 'first_name' ];
            $last  = $row[ 'last_name' ];

            // Feedback for end user
            echo "<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>";
        }
    }
}

// Generate Anti-CSRF token
generateSessionToken();

?>
```

## Code Review

- 新增 *CSRF token*
- 白名單檢查使用者輸入
- 使用參數化查詢代替動態產生的 *SQL* 語句
	- 也能夠提高效率
	- 延伸閱讀：[PHP 騙你，PDO prepare 並沒有準備好](https://medium.com/wetprogrammer/php-騙你-pdo-prepare-並沒有準備好-600e15cd4cfe)