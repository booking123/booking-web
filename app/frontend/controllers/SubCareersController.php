<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/21/14
 * Time: 12:06 PM
 */
namespace Razor\Frontend\Controllers;

use User;

#TODO: need create component
require_once __DIR__ . '/../../library/PHPMailer/PHPMailerAutoload.php';

use Phalcon\Validation\Validator\PresenceOf,
	Phalcon\Validation\Validator\Email;

class SubCareersController extends NewFrontendController
{
	public function indexAction() {
		$this->assets
			->addCss('css/frontend/sub-career.css')
			->addJs('scripts/frontend/sub-career.js');
	}


	public function doneAction() {
		$this->assets
			->addCss('css/frontend/sub-career.css');
	}
	public function web_devAction() {
		$this->assets
			->addCss('css/frontend/careers-info.css')
			->addJs('scripts/frontend/sub-career.js');
	}
	public function soft_managerAction() {
		$this->assets
			->addCss('css/frontend/careers-info.css')
			->addJs('scripts/frontend/sub-career.js');
	}


	public function applyformAction() {
		$this->assets
			->addCss('css/frontend/sub-career.css')
			->addJs('scripts/frontend/sub-career.js');



		$id = $this->request->get('id');
		$this->view->setVar("id",$id);


	}
	public function getdataAction() {

//		$this->view->disable();
		$response = new \Phalcon\Http\Response();

		$messages = array();

		$id = $this->request->getPost('id');

		$subject_job = array(1 => 'JAVA Web Application Developer', 2 => 'Software Project Manager');

		$validation = new \Phalcon\Validation();
		$validation->add('FName', new PresenceOf(array(
			'message' => 'The FName is required'
		)));

		$validation->add('LName', new PresenceOf(array(
			'message' => 'The LName is required'
		)));

		$validation->add('Phone', new PresenceOf(array(
			'message' => 'The Phone is required'
		)));

		$validation->add('Email', new Email(array(
			'message' => 'The e-mail is not valid'
		)));




//
//		$validation->add('LinkedInProfile', new PresenceOf(array(
//			'message' => 'The LinkedInProfile is required'
//		)));
//
//		$validation->add('Website', new PresenceOf(array(
//			'message' => 'The Website is required'
//		)));

		$validation->add('AboutJob', new PresenceOf(array(
			'message' => 'The AboutJob is required'
		)));



		$FName = $this->request->getPost('FName');
		$LName = $this->request->getPost('LName');
		$Email = $this->request->getPost('Email');
		$Phone = $this->request->getPost('Phone');

		$LinkedInProfile = $this->request->getPost('LinkedInProfile');
		$Website = $this->request->getPost('Website');
		$AboutJob = $this->request->getPost('AboutJob');


//		if ($this->request->hasFiles() == true) {
//
//			// Print the real file names and sizes
//			foreach ($this->request->getUploadedFiles() as $file) {
//
//				//Print file details
//				echo $file->getName(), " ", $file->getSize(), "\n";
//				$uploadfile = $file;
//
//
//			}
//		}


//		if ($this->request->hasFiles() == true) {
//			// Print the real file names and sizes
//			foreach ($this->request->getUploadedFiles() as $file) {
//
//				$uploadfile = $file;
//				var_dump($uploadfile); die();
//			}
//
//
//		}





		$valid_messages = $validation->validate($this->request->getPost());
		if (count($valid_messages)) {
			foreach ($valid_messages as $message) {
				$messages[] = (string)$message;
			}
		}else {

			$body = "<p><b>First Name:</b> $FName</p>
					 <p><b>Last Name:</b> $LName</p>
					 <p><b>Email:</b> $Email</p>
					 <p><b>Telephone:</b> $Phone</p>
					 <p><b>Website:</b> $Website</p>
					 <p><b>AboutJob:</b> $AboutJob</p>";

			if ($LinkedInProfile) {
				$body .= " <p><b>LinkedInProfile:</b> $LinkedInProfile</p>";
			}

			if ($Website) {
				$body .= " <p><b>Website:</b> $Website</p>";
			}



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
			$mail->addAddress('careers@mybookingpal.com');
			$mail->isHTML(true);
			$mail->Subject = 'Apply for job: ' . $subject_job[$id];
			$mail->Body = $body;
			if (isset($_FILES['cv-file']) &&
				$_FILES['cv-file']['error'] == UPLOAD_ERR_OK) {
				$mail->AddAttachment($_FILES['cv-file']['tmp_name'],
					$_FILES['cv-file']['name']);
			}
			if (isset($_FILES['letter-file']) &&
				$_FILES['letter-file']['error'] == UPLOAD_ERR_OK) {
				$mail->AddAttachment($_FILES['letter-file']['tmp_name'],
					$_FILES['letter-file']['name']);
			}
			$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
			if (!$mail->send()) {
				$messages = 'Message has not been sent';
			} else {
				return $this->response->redirect('sub-careers/done');
			}
		}



//		die(json_encode(array('error' => !!count($messages), 'message' => count($messages) ? $messages : 'Message was sent')));
	}


}

