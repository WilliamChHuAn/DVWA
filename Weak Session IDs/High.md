# Weak Session IDs - High

## View Source

```PHP
 <?php

$html = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (!isset ($_SESSION['last_session_id_high'])) {
        $_SESSION['last_session_id_high'] = 0;
    }
    $_SESSION['last_session_id_high']++;
    $cookie_value = md5($_SESSION['last_session_id_high']);
    setcookie("dvwaSession", $cookie_value, time()+3600, "/vulnerabilities/weak_id/", $_SERVER['HTTP_HOST'], false, false);
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

## Code Review

- *last_session_id_high* 一樣是從 *1* 開始每次加一，但多做 *md5* 和增加有效期限等

## Answer

- 使用 *Burp Suite* 的 *Sequencer* 分析亂度，結果是 *excellent*
- 但是可以透過 [*CMD5*](https://www.cmd5.com/) 或是 [CrackStation](https://crackstation.net/) 來還原
- 就可以發現一樣是每次加一，很好預測其他使用者的 *dvwaSession*