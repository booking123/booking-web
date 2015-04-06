<?php
namespace Razor\Api\Controllers;

class ControllerBase extends \Phalcon\Mvc\Controller
{

	public function viewJson($data = array(), $error = false, $message = '')
	{
		$this->view->disable();

		echo json_encode(array(
			'error' => $error,
			'message' => $message,
			'data' => $data
		));

		return true;
	}
} 