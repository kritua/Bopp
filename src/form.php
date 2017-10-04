<?php

session_start();

if ((time() - $_SESSION['send']) < 600) exit(json_encode(array('res' => 'info', 'msg' => 'Вы уже отправили заявку. Наши менеджеры свяжутся с вами')));
if (empty($_POST['phone'])) exit(json_encode(array('res' => 'danger', 'msg' => 'Укажите номер телефона')));


$ip = $_SERVER['REMOTE_ADDR'];
include 'classes/SxGeo.php';
$SxGeo = new SxGeo('classes/SxGeoCity.dat');
$info = $SxGeo->getCityFull($ip);
$city = $info['city']['name_ru'];
$country = $info['country']['name_ru'];

$body =
    ($_POST['name'] ? "\nИмя: {$_POST['name']}" : null) .
    ($_POST['phone'] ? "\nТелефон: {$_POST['phone']}" : null) .
    ($_POST['mail'] ? "\nПочта: {$_POST['mail']}" : null) .
    ($_POST['from'] ? "\nОткуда: {$_POST['from']}" : null) .
    ($_POST['to'] ? "\nКуда: {$_POST['to']}" : null) .
    ($_POST['message'] ? "\nВопрос: {$_POST['message']}" : null) .
    ($_POST['utm_source'] ? "\nutm_source: {$_POST['utm_source']}" : null) .
    ($_POST['utm_medium'] ? "\nutm_medium: {$_POST['utm_medium']}" : null) .
    ($_POST['utm_term'] ? "\nutm_term: {$_POST['utm_term']}" : null) .
    ($_POST['utm_campaign'] ? "\nutm_campaign: {$_POST['utm_campaign']}" : null) .
    ($_POST['source'] ? "\nsource: {$_POST['source']}" : null) .
    "\nМестонахождение: {$city} ({$ip})";

include 'classes/mailer/PHPMailerAutoload.php';
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->setFrom('', 'AsMoscow Volvo Service', $_POST['source']);
$mail->addAddress('kritua2@gmail.com');
$mail->Subject = 'Заявка с сайта ' . $_POST['source'];
$mail->Body = $body;

if ($mail->send()) {
    $_SESSION['send'] = time();
    exit(json_encode(array('res' => 'success', 'msg' => 'Запрос успешно отправлен')));
} else {
    exit(json_encode(array('res' => 'danger', 'msg' => 'Сообщение не отправлено: ' . $mail->ErrorInfo)));
}

?>


