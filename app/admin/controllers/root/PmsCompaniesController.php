<?php

namespace Razor\Admin\Controllers\root;

class PmsCompaniesController extends RootBaseController
{
	public function indexAction()
	{
		$filter = new \Phalcon\Session\Bag('PMS_COMPANIES_FILTER');

		$page = $this->request->getQuery('page', 'int', 1);
		$sort_val = $this->request->getQuery('sort', 'string', null);

		$thead_names = array(
			array('ID','pID'),
			array('OrganizationID','pOrganizationID'),
			array('PartyID','pPartyID'),
			array('Party Name','pPartyName'),
			array('State','pState'),
			array('Supports Credit Card','pSupportsCreditCard'),
			array('Send Confirmation Emails','pSendConfirmationEmails')
		);

		$query = $this->modelsManager->createBuilder()
			->columns("ID as pID,
			OrganizationID as pOrganizationID,
			PartyID as pPartyID,
			PartyName as pPartyName,
			State as pState,
			SupportsCreditCard as pSupportsCreditCard,
			SendConfirmationEmails as pSendConfirmationEmails")
			->from('Partner');


		$sorting = $this->getOrderValue($filter, $thead_names, $sort_val);
		if ($sorting) {
			$query->orderBy($sorting);
		}

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => 20,
			"page" => $page
		));

		$this->view->setVar('thead', $thead_names);

		$this->view->setVar('active_sort', array(
			'name' => $filter->sort_name ? $filter->sort_name : '',
			'desc' => $filter->sort_desc ? $filter->sort_desc : false
		));

		$this->_result['data']['rows'] = $paginator->getPaginate();
	}

	public function suspendAction()
	{

	}
}