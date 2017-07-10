<?php

if (empty($_POST['phone'])) exit(json_encode(array('res' => 'danger', 'msg' => 'Укажите номер телефона')));

$body =
    ($_POST['phone'] ? "\nТелефон: {$_POST['phone']}" : null) .

include 'classes/mailer/PHPMailerAutoload.php';
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->setFrom('info@sts.ru', 'SpecTransService');
$mail->addAddress('kritua2@gmail.com');
$mail->addAddress('pleergavno@yandex.ru');
$mail->addAddress('kritua@mail.ru');
//$mail->addAddress('sale@pro-sts.ru');
$mail->Subject = 'Заявка на перевозку';
$mail->Body = $body;

if ($mail->send()) {
    exit(json_encode(array('res' => 'success', 'msg' => 'Запрос успешно отправлен')));
}

?>


