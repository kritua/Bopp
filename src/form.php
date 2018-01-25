<?php

session_start();

if ((time() - $_SESSION['send']) < 1) exit(json_encode(array('res' => 'info', 'msg' => 'Вы уже отправили заявку. Наши менеджеры свяжутся с вами')));
if (empty($_POST['phone'] || $_POST['phone-1'] || $_POST['phone-2'] || $_POST['phone-3'])) exit(json_encode(array('res' => 'error', 'msg' => 'Укажите номер телефона')));


$ip = $_SERVER['REMOTE_ADDR'];
include 'classes/SxGeo.php';
$SxGeo = new SxGeo('classes/SxGeoCity.dat');
$info = $SxGeo->getCityFull($ip);
$city = $info['city']['name_ru'];
$country = $info['country']['name_ru'];

$body =
    ($_POST['name'] ? "\nИмя: {$_POST['name']}" : null) .
    ($_POST['phone'] ? "\nТелефон: {$_POST['phone']}" : null) .
    ($_POST['phone1'] ? "\nТелефон: {$_POST['phone1']}" : null) .
    ($_POST['phone2'] ? "\nТелефон: {$_POST['phone2']}" : null) .
    ($_POST['phone3'] ? "\nТелефон: {$_POST['phone3']}" : null) .
    "\nМестонахождение: {$city} ({$ip})";

include 'classes/mailer/PHPMailerAutoload.php';
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->setFrom('zayavka@zaimzalog.msk.ru', 'Банковский Советник');
$mail->addAddress('bankovskysovetnik@gmail.com');
$mail->addAddress('kritua2@gmail.com');
$mail->Subject = 'Заявка с сайта Банковский Советник';
$mail->Body = $body;

if ($mail->send()) {
    $_SESSION['send'] = time();
    exit(json_encode(array('res' => 'success', 'msg' => 'Запрос успешно отправлен')));
}

?>


