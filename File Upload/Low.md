# File Upload - Low

## View Source

```PHP
<?php

if( isset( $_POST[ 'Upload' ] ) ) {
    // Where are we going to be writing to?
    $target_path  = DVWA_WEB_PAGE_TO_ROOT . "hackable/uploads/";
    $target_path .= basename( $_FILES[ 'uploaded' ][ 'name' ] );

    // Can we move the file to the upload folder?
    if( !move_uploaded_file( $_FILES[ 'uploaded' ][ 'tmp_name' ], $target_path ) ) {
        // No
        echo '<pre>Your image was not uploaded.</pre>';
    }
    else {
        // Yes!
        echo "<pre>{$target_path} succesfully uploaded!</pre>";
    }
}

?>
```

- [`$_FILES`](https://www.php.net/manual/zh/reserved.variables.files.php)
    - [*POST method uploads*](https://www.php.net/manual/zh/features.file-upload.post-method.php)
- [`basename()`](https://www.php.net/manual/zh/function.basename.php)
    - 回傳路徑裡的檔案名
    - E.g., `/etc/passwd` → `passwd`
- [`move_uploaded_file($a, $b)`](https://www.php.net/manual/zh/function.move-uploaded-file.php)
    - 檢查檔案是否為通過 *PHP* 的 *HTTP POST* 機制所上傳的
        - 是，則將 *a* 移到 *b*
            - 根據移動成功失敗回傳 *true / false*
        - 否，則回傳 *false*

## Code Review

- 將上傳檔案移動至 `hackable/uploads/` 並回傳路徑
    - 回傳 `../../hackable/uploads/CHA.png`
    - 檔案位址 `http://127.0.0.1/hackable/uploads/CHA.png`

## Answer

- 頁面寫 *Choose an image to upload:* 但並沒檢查上傳的檔案類型
- 因此可以上傳惡意程式、釣魚網頁來達成 *RCE* 等

### Example

- 可參考 *Sample Code* 中的 *FileUploadDemo.php*
    1. 上傳 *FileUploadDemo.php*
    2. 網頁存取 `127.0.0.1/vulnerabilities/upload/../../hackable/uploads/FileUploadDemo.php?cmd=pwd`