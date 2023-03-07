# Weak Session IDs - Impossible

## View Source

```PHP
<?php

$html = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $cookie_value = sha1(mt_rand() . time() . "Impossible");
    setcookie("dvwaSession", $cookie_value, time()+3600, "/vulnerabilities/weak_id/", $_SERVER['HTTP_HOST'], true, true);
}
?> 
```

- [`setcookie($a, $b, $c, $d, $e, $f, $g)`](https://www.php.net/manual/zh/function.setcookie.php)
    - *a*: *Cookie* 名稱
    - *b*: *Cookie* 存放的值
    - *c*: *Cookie* 過期時間 (*Unix timestamp*)
    - *d*: *Cookie* 有效的路徑
    - *e*: *Cookie* 有效的域名
    - *f*: 是否限制 *Cookie* 只可透過 *HTTPS* 傳送
    - *g*: 是否限制 *Cookie* 只可透過 *HTTP protocol* 傳送
        - I.e., 可不可透過 *JavaScript*
- [`mt_rand()`](https://www.php.net/manual/zh/function.mt-rand.php)
    - 產生亂數
- [`time()`](https://www.php.net/manual/zh/function.time.php)
    - 回傳 *Unix timestamp*
    - [Epoch & Unix Timestamp Conversion Tools](https://www.epochconverter.com/)

## Code Review

- 使用亂數 + 時間 + *Impossible* 來生成隨機字串，再透過 *sha1* 雜湊，並設置 *Secure* 和 *HttpOnly* 等