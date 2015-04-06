<?php
namespace Razor\Admin\Controllers\pm;
use \Phalcon\Mvc\Controller;

class RegistrationController extends PmBaseController{

	public function indexAction(){
		$this->view->setLayout('pm-registration');
		$this->assets
			->addCss('css/admin/pm/registration.css');

		$this->view->setVar('reg_menu', array(
			'index' => '1. Information',
			'step2' => '2. Partners',
			'step3' => '3. Payment',
			'step4' => '4. Agreement',
			'step5' => '5. Confirm',
		));

		$this->view->setVar('main_menu_active', 'account');
		$this->view->setVar('reg_menu_active', 'index');
	}

	public function step1Action() {
		$this->view->setLayout('result-html');
	}
	public function step1_2Action() {
		$this->view->setLayout('result-html');
	}
	public function step1_3Action() {
		$this->view->setLayout('result-html');
	}

	public function step2Action() {
		$this->view->setLayout('result-html');
	}
//	public function step2_1Action() {
//		$this->view->setLayout('result-html');

//	}
//	public function step2_2Action() {
//		$this->view->setLayout('result-html');
//	}

	public function step3Action() {
		$this->view->setLayout('result-html');

	}
	public function step3_1Action() {
		$this->view->setLayout('result-html');
	}

	public function step4Action() {
		$this->view->setLayout('result-html');
	}

	public function step5Action() {
		$this->view->setLayout('result-html');
	}

	public function userAction() {
		$this->view->disable();

		$query = $this->modelsManager->createBuilder()
			->columns("Party.ID, pmi.net_rate, pmi.registration_step_id")
			->from('Party')
			->join('PropertyManagerInfo', 'Party.ID = pmi.pm_id', 'pmi')
			->where('Party.ID = ' . (int) $this->view->user_id);

		echo json_encode(array(
			'error' => false,
			'message' => '',
			'item' => $query->getQuery()->execute()->getFirst()
		));
	}
	public function  channelsAction() {
		$this->view->disable();

		$from = $this->request->getQuery('from', 'int', 0);
		$to = $this->request->getQuery('to', 'int', 0);

		$query = $this->modelsManager->createBuilder()
			->columns("id,
			logo_url,
			channel_name")
			->from('ChannelPartner')
			->inWhere('ChannelPartner.channel_type', array(1,2,3));
//			->limit(10);
		if ($from) {
			$query->andWhere('ChannelPartner.commission > ' . (int)$from);
		}
		if ($to) {
			$query->andWhere('ChannelPartner.commission <= ' . (int)$to);
		}

		$result = $query->getQuery()->execute();
		$rows = array();
		foreach ($result as $row) {
			$rows[] = $row;
		}

		echo json_encode(array(
			'error' => false,
			'message' => '',
			'items' => $rows
		));
	}
}