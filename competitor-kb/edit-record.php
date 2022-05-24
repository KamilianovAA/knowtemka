<?php
include 'upload-files.php';
header('Content-Type: text/plain; charset=utf-8');
$record = $_POST["directory"];
$docscount = $_POST["docs-count"];
$imgDel = $_POST["img-del"];
$docDel = $_POST["doc-del"];

$dir = __DIR__ . DIRECTORY_SEPARATOR . 'records' . DIRECTORY_SEPARATOR 
. $record . DIRECTORY_SEPARATOR . 'images';
$arr = explode(",", $imgDel);
$del = count($arr);
for( $i=0 ; $i < $del; $i++ ) {
    $arr[$i] = urldecode($arr[$i]);
    $path = end(explode('/', $arr[$i]));
    unlink($dir . DIRECTORY_SEPARATOR . $path);
    unlink($arr[$i]);
}

$dir = __DIR__ . DIRECTORY_SEPARATOR . 'records' . DIRECTORY_SEPARATOR 
. $record . DIRECTORY_SEPARATOR . 'documents';
$arr = explode(",", $docDel);
$del = count($arr);
for( $i=0 ; $i < $del ; $i++ ) {
    $arr[$i] = urldecode($arr[$i]);
    $path = end(explode('/', $arr[$i]));
    unlink($dir . DIRECTORY_SEPARATOR . $path);
    unlink($arr[$i]);
}

$uploaddir = __DIR__ . DIRECTORY_SEPARATOR . 'records' . DIRECTORY_SEPARATOR 
. $record . DIRECTORY_SEPARATOR . 'documents';
//$files = array_filter($_FILES['upload']['name']); //something like that to be used before processing files.
// Count # of uploaded files in array
$total = count($_FILES);
// Loop through each file
for( $i=0 ; $i < $docscount ; $i++ ) {
    uploadFile($uploaddir, sprintf('doc%d', $i));
}

$uploaddir = __DIR__ . DIRECTORY_SEPARATOR . 'records' . DIRECTORY_SEPARATOR 
. $record . DIRECTORY_SEPARATOR . 'images';

for( $i=0 ; $i < $total - $docscount ; $i++ ) {
    uploadFile($uploaddir, sprintf('img%d', $i));
}
?>