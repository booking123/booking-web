<?php
namespace Razor\Frontend\Controllers;

use Phalcon\Mvc\View;

class TermsConditionsController extends FrontendBaseController{

	public function indexAction() {
		$json = $this->request->get('jsonp', 'string', '');
		$this->view->disable();

		$data = array('text' => '');

		header('Content-Type:application/x+javascript');
		echo $json.'('.json_encode( $data ).');';
	}

    public function htmlAction(){
	    $this->view->disableLevel(View::LEVEL_MAIN_LAYOUT);
    }
}