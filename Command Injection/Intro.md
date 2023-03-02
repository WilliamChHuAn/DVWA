# Command Injection

## About (View Help)

> The purpose of the command injection attack is to ***inject and execute commands*** specified by the attacker in the vulnerable application. In situation like this, the application, which executes unwanted system commands, is like a pseudo system shell, and the attacker may use it as any authorized system user. However, commands are executed with the same privileges and environment as the web service has.
- 透過 Command Injection 類型的漏洞來執行 OS Commands
- 網頁應用使用了危險的 API，例如 `shell_exec()` 等
> Command injection attacks are possible in most cases because of ***lack of correct input data validation***, which can be manipulated by the attacker (forms, cookies, HTTP headers etc.).
- 對於使用者輸入沒有檢查或驗證不足
> The syntax and commands may differ between the Operating Systems (OS), such as Linux and Windows, depending on their desired actions.
> This attack may also be called "Remote Command Execution (RCE)".

## Objective (View Help)

> Remotely, find out the user of the web service on the OS, as well as the machines hostname via RCE.

## Reference

- [Testing for Command Injection](https://wiki.owasp.org/index.php/Testing_for_Command_Injection_(OTG-INPVAL-013))
- [OS command injection - PortSwigger](https://portswigger.net/web-security/os-command-injection)