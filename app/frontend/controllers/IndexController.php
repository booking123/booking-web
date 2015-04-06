<?php

namespace Razor\Frontend\Controllers;


#TODO: need create component
require_once __DIR__ . '/../../library/PHPMailer/PHPMailerAutoload.php';

use \Phalcon\Validation\Validator,
	\Phalcon\Validation\Message;

use Phalcon\Validation\Validator\PresenceOf,
	Phalcon\Validation\Validator\Email;


class IndexController extends FrontendBaseController
{


	protected function _getTranslation($lang)
	{

		$translate_path = $this->config->application->translations;

		if (file_exists($translate_path."/".$lang.".php")) {
			require $translate_path."/".$lang.".php";
		} else {
			// fallback to some default
			require $translate_path."/en.php";
		}

		$params  = array('content' => $language);

		return $translator = new \Phalcon\Translate\Adapter\NativeArray($params);

	}



	public function indexAction()

	{


		$this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
		$this->view->setLayout('index');
		$lang = $this->request->get('lang');



		$translator = $this->_getTranslation($lang);

		$this->view->setVar("t", $translator);

	}



	public function sendrequestAction()
	{
		$messages = array();

		$this->view->disable();

		$validation = new \Phalcon\Validation();
		$validation->add('company', new PresenceOf(array(
			'message' => 'The company is required'
		)));

		$validation->add('name', new PresenceOf(array(
			'message' => 'The name is required'
		)));

		$validation->add('email', new PresenceOf(array(
			'message' => 'The e-mail is required'
		)));

		$validation->add('email', new Email(array(
			'message' => 'The e-mail is not valid'
		)));

		$validation->add('phone', new PresenceOf(array(
			'message' => 'The phone is required'
		)));

		$validation->add('country', new PresenceOf(array(
			'message' => 'The country is required'
		)));

		$validation->add('type', new PresenceOf(array(
			'message' => 'The type is required'
		)));


		$company = $this->request->getPost('company');
		$name = $this->request->getPost('name');
		$email = $this->request->getPost('email');
		$phone = $this->request->getPost('phone');
		$country = $this->request->getPost('country');
		$vacation = $this->request->getPost('vacation');
		$number = $this->request->getPost('properties');
		$message = $this->request->getPost('message');

		$type = $this->request->getPost('type');
		if (in_array($type, array('Property Manager', 'Property Owner'))) {

			$validation->add('vacation', new PresenceOf(array(
				'message' => 'The vacation is required'
			)));

			$validation->add('properties', new PresenceOf(array(
				'message' => 'The properties is required'
			)));
		}



		$valid_messages = $validation->validate($this->request->getPost());
		if (count($valid_messages)) {
			foreach ($valid_messages as $message) {
				$messages[] = (string)$message;
			}
		} else {

			$body = "<p><b>Company:</b> $company</p>
<p><b>Name:</b> $name</p>
<p><b>Email:</b> $email</p>
<p><b>Telephone:</b> $phone</p>
<p><b>Country:</b> $country</p>
<p><b>Type of Partner:</b> $type</p>";

			if ($vacation) {
				$body .= "<p><b>Vacation Rental Software currently using:</b> $vacation</p>";
			}

			if ($number) {
				$body .= "<p><b>Number of Properties:</b> $number</p>";
			}

			$body .= "<p><b>Message:</b> <br />$message</p>";

			$mail = new \PHPMailer;
			$mail->isSMTP();
			$mail->Host = $this->config->mail->host;
			$mail->SMTPAuth = true;
			$mail->Username = $this->config->mail->user;
			$mail->Password = $this->config->mail->password;
			$mail->SMTPSecure = $this->config->mail->secure;
			$mail->Port = $this->config->mail->port;
			$mail->From = 'noreply@mybookingpal.com';
			$mail->FromName = ' MyBookingPal';
			$mail->addAddress('pavel.boiko@gmail.com');
			$mail->addAddress('alex@mybookingpal.com');
//			$mail->addAddress('kostjantin@gmail.com');
			$mail->isHTML(true);
			$mail->Subject = 'Request Info from ' . $name;
			$mail->Body = $body;
			$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
			if (!$mail->send()) {
				$messages = 'Message has not been sent';
			}
		}



		die(json_encode(array('error' => !!count($messages), 'message' => count($messages) ? $messages : 'Message was sent')));

	}
}

?>