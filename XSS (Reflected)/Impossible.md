# XSS (Reflected) - Impossible

## View Source

```PHP
<?php

// Is there any input?
if( array_key_exists( "name", $_GET ) && $_GET[ 'name' ] != NULL ) {
    // Check Anti-CSRF token
    checkToken( $_REQUEST[ 'user_token' ], $_SESSION[ 'session_token' ], 'index.php' );

    // Get input
    $name = htmlspecialchars( $_GET[ 'name' ] );

    // Feedback for end user
    echo "<pre>Hello ${name}</pre>";
}

// Generate Anti-CSRF token
generateSessionToken();

?>
```

- [`htmlspecialchars`](https://www.php.net/manual/zh/function.htmlspecialchars.php)
    - 將特殊字元轉換成 *HTML Entity*

## Code Review

- 加上 *CSRF token* 和轉譯特殊字元

### 結果

```HTML
<div class="vulnerable_code_area">
    <form name="XSS" action="#" method="GET">
        <p>
            What's your name?
            <input type="text" name="name">
            <input type="submit" value="Submit">
        </p>
        <input type='hidden' name='user_token' value='ba8411cb6e052eb95fabb626a0e019f5' />
    </form>
    <pre>Hello &lt;img src onerror=alert(1)&gt;</pre>
</div>
```