# Command Injection - Impossible

## View Source

```PHP
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Check Anti-CSRF token
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // Get input
    $target = $_REQUEST[ 'ip' ];
    $target = stripslashes( $target );

    // Split the IP into 4 octects
    $octet = explode( ".", $target );

    // Check IF each octet is an integer
    if( ( is_numeric( $octet[0] ) ) && ( is_numeric( $octet[1] ) ) && ( is_numeric( $octet[2] ) ) && ( is_numeric( $octet[3] ) ) && ( sizeof( $octet ) == 4 ) ) {
        // If all 4 octets are int's put the IP back together.
        $target = $octet[0] . '.' . $octet[1] . '.' . $octet[2] . '.' . $octet[3];

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
    else {
        // Ops. Let the user name theres a mistake
        echo '<pre>ERROR: You have entered an invalid IP.</pre>';
    }
}

// Generate Anti-CSRF token
generateSessionToken();

?> 
```

- `checkToken()`
    - 寫在 `/var/www/html/dvwa/includes/dvwaPage.inc.php` 裡面
        ```PHP
        // Token functions --
        function checkToken( $user_token, $session_token, $returnURL ) {  # Validate the given (CSRF) token
            global $_DVWA;

            if (in_array("disable_authentication", $_DVWA) && $_DVWA['disable_authentication']) {
                return true;
            }

            if( $user_token !== $session_token || !isset( $session_token ) ) {
                dvwaMessagePush( 'CSRF token is incorrect' );
                dvwaRedirect( $returnURL );
            }
        }
        ```

## Code Review

- 使用 *Anti-CSRF token* 來防止 *Cross-site request forgery (CSRF)* 漏洞
- 白名單驗證使用者輸入
    - 去除反斜線 + 輸入為四段數字且用 `.` 分割