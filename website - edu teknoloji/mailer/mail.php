<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$isim   = isset($_POST['name']) ? test_input($_POST['name']) : '';
$eposta = isset($_POST['email']) ? test_input($_POST['email']) : '';
$ileti  = isset($_POST['message']) ? test_input($_POST['message']) : '';

//echo "<!DOCTYPE html><head><meta charset='utf-8'></head><body>";
//echo "<b>İsim:</b> $isim<br><b>E-Posta:</b> $eposta<br><b>İleti:</b> $ileti";
//echo "</body></html>";

require 'PHPMailerAutoload.php';
$mail = new PHPMailer;
$mail->isSMTP();                                      // Set mailer to use SMTP
//$mail->SMTPDebug = 2;                                 // Enable verbose debug output
//$mail->Debugoutput = 'html';
$mail->Host = 'bh-67.webhostbox.net';                 // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'info@eduteknoloji.com.tr';         // SMTP username
$mail->Password = 'uuThcL510.,';                      // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to

$mail->setFrom('info@eduteknoloji.com.tr', 'Edu Teknoloji');
$mail->addAddress('info@eduteknoloji.com.tr', 'Edu Teknoloji');     // Add a recipient
//$mail->addAddress('ellen@example.com');                           // Name is optional
$mail->addReplyTo('info@eduteknoloji.com.tr', 'Edu Teknoloji');
$mail->isHTML(true);                                                // Set email format to HTML

$mail->Subject = 'Siteden Gelen Mesaj';
$mail->Body    = "<b>İsim:</b> $isim<br><b>E-Posta:</b> $eposta<br><b>İleti:</b> $ileti";
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>