# File Inclusion - Impossible

## View Source

```PHP
 <?php

// The page we wish to display
$file = $_GET[ 'page' ];

// Only allow include.php or file{1..3}.php
if( $file != "include.php" && $file != "file1.php" && $file != "file2.php" && $file != "file3.php" ) {
    // This isn't the page we want!
    echo "ERROR: File not found!";
    exit;
}

?>
```

## Code Review

- 改用白名單，寫死總共只有四個檔案可以引入

### Note

> *file4.php* 看不到了 OwO