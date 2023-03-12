# File Upload - High

## View Source

```PHP
<?php

if( isset( $_POST[ 'Upload' ] ) ) {
    // Where are we going to be writing to?
    $target_path  = DVWA_WEB_PAGE_TO_ROOT . "hackable/uploads/";
    $target_path .= basename( $_FILES[ 'uploaded' ][ 'name' ] );

    // File information
    $uploaded_name = $_FILES[ 'uploaded' ][ 'name' ];
    $uploaded_ext  = substr( $uploaded_name, strrpos( $uploaded_name, '.' ) + 1);
    $uploaded_size = $_FILES[ 'uploaded' ][ 'size' ];
    $uploaded_tmp  = $_FILES[ 'uploaded' ][ 'tmp_name' ];

    // Is it an image?
    if( ( strtolower( $uploaded_ext ) == "jpg" || strtolower( $uploaded_ext ) == "jpeg" || strtolower( $uploaded_ext ) == "png" ) &&
        ( $uploaded_size < 100000 ) &&
        getimagesize( $uploaded_tmp ) ) {

        // Can we move the file to the upload folder?
        if( !move_uploaded_file( $uploaded_tmp, $target_path ) ) {
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

- [`strrpos($a, $b)`](https://www.php.net/manual/zh/function.strrpos.php)
	- 回傳 *b* 在 *a* 最後出現的位置
- [`substr($a, $b)`](https://www.php.net/manual/zh/function.substr.php)
	- 回傳 *a* 字串第 *b* 位以後的字串
- [`strtolower()`](https://www.php.net/manual/zh/function.strtolower.php)
	- 回傳所有 ASCII 轉成小寫後的字串
- [`getimagesize()`](https://www.php.net/manual/zh/function.getimagesize.php)
	- 回傳圖片的寬高等資訊
		- 透過 *file header* 取得 *file signature* 等資訊

## Code Review

- 先切割出上傳檔案的副檔名
	- E.g., `CHA.png` → `png`
- 檢查副檔名是否為 `jpg`, `jpeg` 或 `png`
- 限制檔案大小

## Answer

- 用 `$uploaded_size` 來限制檔案大小，`getimagesize()` 來檢查檔案類型
- 但 [`getimagesize()`](https://www.php.net/manual/zh/function.getimagesize.php) 有提到不要使用此函數來判斷檔案是否為圖片
	> 此函数要求 filename 是有效的图像文件。如果提供的是非图像，可能会错误的识别为图像且函数会成功返回，但数组可能包含无意义的值。 不要使用 getimagesize() 识别指定的文件是否是有效的图像。请使用专业解决方案，比如 Fileinfo 扩展。
- 可以上傳夾帶惡意程式的真實圖片

### Example

1. 參考 *Sample Code* 中的 *CHA.png* 和 *FileUploadDemo.php*
2. `cat FileUploadDemo.php >> CHA.png`
	- 可用 [*010 Editor: Pro Text Editor*](https://www.sweetscape.com/010editor/) 等工具觀察結果，會發現圖片後面夾帶了 *PHP* 程式碼
	- *Sample Code* 中的 *CHA_enc.png* 為合併後的結果
3. 上傳後網頁存取 `http://127.0.0.1/hackable/uploads/CHA_enc.png` 會看到正常圖片
4. 透過 *File Inclusion* 來觸發漏洞利用
	- 網頁存取 `http://127.0.0.1/vulnerabilities/fi/?page=file:///var/www/html/hackable/uploads/CHA_enc.png&cmd=pwd`
	- 噴出來的亂碼是圖片 (所以圖片不要太大張 owo)，後面才是 *pwd* 的結果

### Note

- 注意圖片不要超過 *100000 bytes*