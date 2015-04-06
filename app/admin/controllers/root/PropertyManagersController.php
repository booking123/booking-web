<?php

namespace Razor\Admin\Controllers\root;

class PropertyManagersController extends RootBaseController
{
	private $pm_rows = array(
		array('ID','pID'),
		array('Company','pCompany'),
		array('Address','pAddress'),
		array('Country','pCountry'),
		array('Phone','pPhone'),
		array('Name','pName'),
		array('PMS Provider','Provider'),
		array('PMS ID', 'pmsID'),
		array('Date Created','CreatedDate'),
		array('Funds Holder', 'pmFundsHolder'),
		array('State','pState')
	);

	public function indexAction()
	{
		$this->assets
			->addCss('css/admin/root/channel-partners.css')
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/root/report.js')
			->addJs('scripts/admin/root/property-managers.js');

		$this->view->setVar('thead', $this->pm_rows);
	}

	public function listAction() {
		$this->view->disable();

		$sorting = array(
			'name' => $this->pm_rows[0][1],
			'order' => 'desc'
		);

		// Request
		$page = $this->request->getQuery("page", 'int', 0);

		$sort_val = $this->request->getQuery("sort");
		$sort_order = $this->request->getQuery("sort_order");
		if ($sort_val && $this->isSortName($this->pm_rows, $sort_val)) {
			$sorting['name'] = $sort_val;

			if ($sort_order) {
				$sorting['order'] = $sort_order;
			}
		}

		$name = $this->request->getQuery('Name');
		$company = $this->request->getQuery('Company');
		$provider = $this->request->getQuery('Provider');

		$query = $this->modelsManager->createBuilder()
			->columns("Party.ID as pID,
				Party.Name as pCompany,
				Party.PostalAddress as pAddress,
				Party.Country as pCountry,
				Party.DayPhone as pPhone,
				Party.ExtraName as pName,
				Party.State as pState,
				pms.Name as Provider,
				Party.AltPartyID as pmsID,
				pmi.funds_holder as pmFundsHolder,
				DATE_FORMAT(pmi.created_date, '%m/%d/%Y') as CreatedDate,
				pmi.id as pmiID")
			->from('Party')
			->leftJoin('PropertyManagerInfo', 'Party.ID = pmi.pm_id', 'pmi')
			->leftJoin('Party', 'pmi.pms_id = pms.ID', 'pms')
			->where("Party.UserType = 'PropertyManager'");

		if ($name) {
			$query->andWhere('Party.ExtraName LIKE :pName:', array('pName' => '%' . $name . '%'));
		}

		if ($company) {
			$query->andWhere('Party.Name LIKE :pCompany:', array('pCompany' => '%' . $company . '%'));
		}

		if ($provider) {
			$query->andWhere('pms.Name LIKE :pProvider:', array('pProvider' => '%' . $provider . '%'));
		}

		$query->orderBy($sorting['name'] . " " . $sorting['order']);


		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => 20,
			"page" => $page
		));

		$page = $paginator->getPaginate();

		$rows = array();
		foreach ($page->items as $row) {
			$row->pCompany = utf8_encode($row->pCompany);
			$row->pAddress = utf8_encode($row->pAddress);
			$row->pName = utf8_encode($row->pName);
			$row->Provider = utf8_encode($row->Provider);
			$row->pmFundsHolder = \StaticText::get_funds_holder($row->pmFundsHolder);
			$rows[] = $row;
		}

		$result = array(
			'error' => false,
			'message' => false,
			'data' => array(
				'items' => $rows,
				'first' => $page->first,
				'before' => $page->before,
				'next' => $page->next,
				'last' => $page->last,
				'current' => $page->current,
				'total_pages' => $page->total_pages,
				'total_items' => $page->total_items,

				'sorting' => $sorting
			),
		);

		echo json_encode($result);
	}

	public function suspendAction()
	{
		$id = $this->request->getQuery('id', 'int', 0);
		$manager = \Party::findFirst($id);
		if (!$manager) {
			return;
		}
	}

	public function changestatusAction() {
		$message = '';
		$states = array('Created', 'Suspended');

		$this->view->disable();

		$id = $this->request->getQuery('id', 'int', 0);
		$state = $this->request->getQuery('status');

		if (in_array($state, $states)) {
			$manager = \Party::findFirst($id);

			if ($manager) {
				$manager->State = $state;
				$manager->save();
			} else {
				$message = 'This user don`t have in database.';
			}
		} else {
			$message = 'This bad status!!!';
		}

		echo json_encode(array(
			'error' => !!$message,
			'message' => $message,
		));
	}

	public function getsettingspmAction() {
		$this->view->disable();

		$id = $this->request->getQuery('pmi_id', 'int', 0);
		if (!$id) {
			die(json_encode(array(
				'error' => true
			)));
		}

		$pmi = \PropertyManagerInfo::findFirst($id);

		if (!$pmi) {
			die(json_encode(array(
				'error' => true
			)));
		}

		die(json_encode(array(
			'error' => false,
			'item' => array(
				'id' => $pmi->id,
				'net_rate' => $pmi->net_rate,
				'commission' => $pmi->commission,
				'bp_commission' => $pmi->bp_commission,
				'pms_markup' => $pmi->pms_markup,
				'additional_commission' => ($pmi->funds_holder != 1) ? $pmi->additional_commission : 0,
				'funds_holder' => $pmi->funds_holder,
			)
		)));
	}

	public function changesettingspmAction() {
		$this->view->disable();

		$id = $this->request->getQuery('id', 'int', 0);
		$net_rate = $this->request->getQuery('net_rate', 'int', 0);
		$bp_commission = $this->request->getQuery('bp_commission', 'float', null);
		$commission = $this->request->getQuery('commission', 'float', null);
		$pms_markup = $this->request->getQuery('pms_markup', 'float', null);
		$additional_commission = $this->request->getQuery('additional_commission', 'float', null);

		if (!$id) {
			die(json_encode(array(
				'error' => true,
				'message' => 'Don`t have ID'
			)));
		}

		$pmi = \PropertyManagerInfo::findFirst($id);
		if (!$pmi) {
			die(json_encode(array(
				'error' => true,
				'message' => 'Don`t have any row!'
			)));
		}

		if ($pmi->funds_holder != 1) {
			$pmi->additional_commission = $additional_commission;
		}

		$pmi->net_rate = $net_rate;
		$pmi->commission = $commission;
		$pmi->bp_commission = $bp_commission;
		$pmi->pms_markup = $pms_markup;
		$pmi->save();

		die(json_encode(array(
			'error' => false,
			'message' => 'Changes saved'
		)));

	}

}