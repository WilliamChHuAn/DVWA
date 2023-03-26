# File Upload

## About (View Help)

> Uploaded files represent a significant risk to web applications. The first step in many attacks is to get some code to the system to be attacked. Then the attacker only needs to find a way to get the code executed. Using a file upload ***helps the attacker accomplish the first step.***
- 透過 *File Upload* 漏洞來上傳惡意程式
> The consequences of unrestricted file upload can vary, including complete system takeover, an overloaded file system, forwarding attacks to backend systems, and simple defacement. It depends on ***what the application does with the uploaded file, including where it is stored.***
- 漏洞成因例如針對上傳的檔案處理不當等，根據處理方式或檔案儲存的位置有很多類型

## Objective (View Help)

> Execute any PHP function of your choosing on the target system (such as phpinfo()	or system()) thanks to this file upload vulnerability.

## Reference

- [File upload vulnerabilities - PortSwigger](https://portswigger.net/web-security/file-upload)
- [*PHP* 的檔案上傳機制](https://ithelp.ithome.com.tw/articles/10247638)
	> 值得一提的是，PHP 上傳的時候有一個機制。會先把上傳的檔案放到 temp 這個資料夾中，等 PHP 執行結束後會被刪除。因此，如果需要保留檔案，就需要使用到 `move_uploaded_file()` 這個方法。

## Tool

- [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload)

## Note

> 在更換 *Level* 的時候可以把先前上傳的檔案清掉，以免造成操作上誤會
1. `docker exec -it dvwa /bin/bash`
2. `cd /var/www/html/hackable/uploads/`
3. `rm *.php`