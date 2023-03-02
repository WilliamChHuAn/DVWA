# DVWA Writeup

> Damn Vulnerable Web Application (DVWA) Writeup & Code Review

## Install & Settings

- https://github.com/digininja/DVWA
- https://hub.docker.com/r/vulnerables/web-dvwa

1. `sudo apt update -y`
2. `sudo apt install -y docker.io`
3. `sudo usermod -aG docker $USER`
4. After adding user to group, you may have to *logout* and *login* to make the changes take effect
5. `docker run -it -d -p 80:80 --name dvwa vulnerables/web-dvwa`
6. `docker ps -a` obtain the container ID
7. `docker exec -it <container_id> /bin/bash`
8. `apt update && apt install vim -y`
9. `vim /etc/php/7.0/apache2/php.ini`
10. `allow_url_include = Off` → `allow_url_include = On`
11. `service apache2 restart`
12. Open browser and access `127.0.0.1`
    - `admin:password`
13. Click `Create / Reset Database`

## Command Injection

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible

## Cross Site Request Forgery (CSRF)

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible

## File Inclusion

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible

## File Upload

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible

## SQL Injection

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible

## SQL Injection (Blind)

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible

## Weak Session IDs

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible

## Cross-Site Scripting

## XSS (DOM)

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible

## XSS (Reflected)

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible

## XSS (Stored)

- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Impossible
