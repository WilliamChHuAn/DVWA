# Command Injection - High

## View Source

```PHP
<?php

if( isset( $_POST[ 'Submit' ]  ) ) {
    // Get input
    $target = trim($_REQUEST[ 'ip' ]);

    // Set blacklist
    $substitutions = array(
        '&'  => '',
        ';'  => '',
        '| ' => '',
        '-'  => '',
        '$'  => '',
        '('  => '',
        ')'  => '',
        '`'  => '',
        '||' => '',
    );

    // Remove any of the charactars in the array (blacklist).
    $target = str_replace( array_keys( $substitutions ), $substitutions, $target );

    // Determine OS and execute the ping command.
    if( stristr( php_uname( 's' ), 'Windows NT' ) ) {
        // Windows
        $cmd = shell_exec( 'ping  ' . $target );
    }
    else {
        // *nix
        $cmd = shell_exec( 'ping  -c 4 ' . $target );
    }

    // Feedback for the end user
    echo "<pre>{$cmd}</pre>";
}

?> 
```

## Code Review

> In the high level, the developer goes back to the drawing board and puts in even more pattern to match. But even this isn't enough.
> The developer has either made a slight typo with the filters and believes a certain PHP command will save them from this mistake.

- 挺微妙的......根據 View Help 的說法是開發者黑名單有打錯，但因為他相信 *PHP* 的 `trim()` 會改正它
- 但顯然......否，打字正確很重要 (筆記)

## Answer

- 黑名單的 `| ` 有一個空白，所以不要空白就不會被濾掉
- 或是因為 `str_replace()` 替換順序是左到右，所以會先刪掉 `| ` 才會刪掉 `||`
    - `|| hostname` 經過 `str_replace()` 後等同 `|hostname`

### Example

```
127.0.0.1 |pwd
|| hostname
```