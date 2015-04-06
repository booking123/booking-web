<?php
namespace Razor\Api\Controllers;

class UploadFilesController extends ControllerBase{

	public function pmAction(){
		$this->view->disable();
		$file_types = array('application/pdf');

		$pmID = $this->request->get('id', 'int', 0);
		$type = $this->request->get('type');

		switch ($type) {
			case 'terms' : $folder = 'terms';
		}

		if (!$pmID || empty($folder)) {
			return $this->viewJson(array(), true, "Error. Don`t have any settings.");
		}

		if (!$this->request->hasFiles('file')) {
			return $this->viewJson(array(), true, "Error. Don`t have any file.");
		}

		foreach ($this->request->getUploadedFiles() as $file) {

			if (!in_array($file->getType(), $file_types)) {
				return $this->viewJson(array(), true, 'Error. File format isn`t PDF');
			}

			if ($file->getSize() > 8 * 1048576) {
				return $this->viewJson(array(), true, 'Error. File size more than 8M');
			}

			$file_patch = $this->config->application->pmFilesFolder . $folder . '/' . $pmID . '/';
			if (!file_exists($file_patch)) {
				mkdir($file_patch);
			}

			$file_name = file_exists($file_patch . $file->getName()) ? time() . '_' . $file->getName() : $file->getName();
			if ($file->moveTo($file_patch . $file_name) ) {
				return $this->viewJson(array('url' => $this->config->application->baseUri . 'files/' . $folder . '/' . $pmID . '/' . $file_name), false, "");
			}
		}

		return $this->viewJson(array(), true, 'Error save data.');
	}

}