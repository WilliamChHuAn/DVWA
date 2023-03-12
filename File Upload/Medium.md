# File Upload - Medium

## View Source

```PHP
<?php

if( isset( $_POST[ 'Upload' ] ) ) {
    // Where are we going to be writing to?
    $target_path  = DVWA_WEB_PAGE_TO_ROOT . "hackable/uploads/";
    $target_path .= basename( $_FILES[ 'uploaded' ][ 'name' ] );

    // File information
    $uploaded_name = $_FILES[ 'uploaded' ][ 'name' ];
    $uploaded_type = $_FILES[ 'uploaded' ][ 'type' ];
    $uploaded_size = $_FILES[ 'uploaded' ][ 'size' ];

    // Is it an image?
    if( ( $uploaded_type == "image/jpeg" || $uploaded_type == "image/png" ) &&
        ( $uploaded_size < 100000 ) ) {

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
    else {
        // Invalid file
        echo '<pre>Your image was not uploaded. We can only accept JPEG or PNG images.</pre>';
    }
}

?>
```

- [`$_FILES[][ 'type' ]`](https://www.php.net/manual/zh/features.file-upload.post-method.php)
	- 檔案的 [*MIME type*](https://zh.wikipedia.org/zh-tw/多用途互聯網郵件擴展#內容類型)
		- E.g., `image/png`, `image/jpeg`, [*A MIME type for .php files*](https://cweiske.de/tagebuch/php-mimetype.htm)

## Code Review

- 相較 *Low level* 多了檢查上傳檔案的 *MIME type* 是否為 `image/png` 或 `image/jpeg`，且限制檔案大小

## Answer

- 因為後端檢查的 *MIME type* 是可以被修改的，所以可以被繞過

### Example

1. 同樣使用 *Sample Code* 中的 *FileUploadDemo.php*
2. 透過 *Burp Suite* 的 *Proxy* 來攔截 *Request* 封包
3. 將 *Content-Type* 由 `application/x-php` 修改成 `image/png` 或 `image/jpeg`
4. 網頁存取 `http://127.0.0.1/hackable/uploads/FileUploadDemo.php?cmd=pwd`

### Note

- 注意檔案不要超過 *100000 bytes*