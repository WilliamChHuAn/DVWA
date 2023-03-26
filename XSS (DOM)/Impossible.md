# XSS (DOM) - Impossible

## View Source

```PHP
<?php

# Don't need to do anything, protction handled on the client side

?> 
```

### View Page Source

```HTML
<form name="XSS" method="GET">
    <select name="default">
        <script>
            if (document.location.href.indexOf("default=") >= 0) {
                var lang = document.location.href.substring(document.location.href.indexOf("default=")+8);
                document.write("<option value='" + lang + "'>" + (lang) + "</option>");
                document.write("<option value='' disabled='disabled'>----</option>");
            }
                
            document.write("<option value='English'>English</option>");
            document.write("<option value='French'>French</option>");
            document.write("<option value='Spanish'>Spanish</option>");
            document.write("<option value='German'>German</option>");
        </script>
    </select>
    <input type="submit" value="Select" />
</form>
```

### View `index.php`

1. `docker exec -it dvwa /bin/bash`
2. `vim /var/www/html/vulnerabilities/xss_d/index.php`
- https://github.com/digininja/DVWA/blob/master/vulnerabilities/xss_d/index.php#L34-L66

```PHP
# For the impossible level, don't decode the querystring
$decodeURI = "decodeURI";
if ($vulnerabilityFile == 'impossible.php') {
    $decodeURI = "";
}
```

```HTML
...
document.write("<option value='" + lang + "'>" + $decodeURI(lang) + "</option>");
...
```

- 透過 `$decodeURI` 變數來控制是否要有 `decodeURI()`
    - 這也是為什麼 `(lang)` 會有 `()` 框起來

## Code Review

- 更改的方式非常簡單，將前端的 `decodeURI()` 拔掉就好
    - 原本的結果 `<option value="%3Cscript%3Ealert(1)%3C/script%3E"><script>alert(1)</script></option>`
    - 現在的結果 `<option value="%3Cscript%3Ealert(1)%3C/script%3E">%3Cscript%3Ealert(1)%3C/script%3E</option>`