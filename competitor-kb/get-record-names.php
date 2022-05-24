<?php
$recorddir = __DIR__ . DIRECTORY_SEPARATOR . 'records';
$files = array();
$path =  __DIR__ . DIRECTORY_SEPARATOR . 'records';;
$rdi = new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::KEY_AS_PATHNAME);
foreach (new RecursiveIteratorIterator($rdi, RecursiveIteratorIterator::SELF_FIRST) as $file => $info) {
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    if($ext == 'json') $files[] = $file;
}
echo json_encode($files);
?>