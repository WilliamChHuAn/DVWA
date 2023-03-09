# File Inclusion

## About (View Help)

> Some web applications allow the user to specify input that is used ***directly into file streams or allows the user to upload files to the server.*** At a later time ***the web application accesses the user supplied input in the web applications context.*** By doing this, the web application is allowing the potential for malicious file execution.
- 透過使用者輸入來引用檔案等
> If the file chosen to be included is local on the target machine, it is called ***"Local File Inclusion (LFI)***. But files may also be included on other machines, which then the attack is a ***"Remote File Inclusion (RFI).***
> When RFI is not an option. using another vulnerability with LFI (such as file upload and directory traversal) can often achieve the same effect.
- 根據引入檔案對於目標來說是本地 *LFI* 或遠端 *RFI* 分成兩種
> Note, the term "file inclusion" is not the same as "arbitrary file access" or "file disclosure".

## Objective (View Help)

> Read all five famous quotes from ['../hackable/flags/fi.php'](127.0.0.1/hackable/flags/fi.php) using only the file inclusion.

## Reference

- [php-reverse-shell](https://github.com/pentestmonkey/php-reverse-shell/blob/master/php-reverse-shell.php)
- [DVWA: Remote File Inclusion RFI Vulnerability](https://hacking.tamalweb.com/dvwa-remote-file-inclusion-rfi-vulnerability)
- [File Inclusion Vulnerability: (LFI & RFI) Full Guide](https://techsphinx.com/hacking/file-inclusion-vulnerability-full-guide/#difficulty-low)

## Tool

- [Burp Suite Community Edition](https://portswigger.net/burp/communitydownload)

## Note

> 需要將 `allow_url_include` 設定成 `On`，否則會跳警告，可參考 [*README.md*](https://github.com/WilliamChHuAn/DVWA-Writeup#install--settings)