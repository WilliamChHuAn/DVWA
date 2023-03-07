# Weak Session IDs - Medium

## View Source

```PHP
 <?php

$html = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $cookie_value = time();
    setcookie("dvwaSession", $cookie_value);
}
?>
```

- [`setcookie($a, $b, $c)`](https://www.php.net/manual/zh/function.setcookie.php)
    - *a*: *Cookie* 名稱
    - *b*: *Cookie* 存放的值
- [`time()`](https://www.php.net/manual/zh/function.time.php)
    - 回傳 *Unix timestamp*
    - [Epoch & Unix Timestamp Conversion Tools](https://www.epochconverter.com/)

## Code Review

- 比起 *Low level* 的加一，改成使用時間戳

## Answer

- 可以使用 *Burp Suite* 的 *Sequencer* 來分析亂度，結果顯示 *extremely poor*
- 一樣很容易預測其他使用者的 *dvwaSession*