<?php
namespace Razor\Admin\Controllers\channel;
use \Phalcon\Mvc\Controller;

class ReservationsController extends ChannelBaseController{

	public function indexAction() {
		$this->assets
			->addCss('css/jqueryUiForDatepicker.css')
			->addCss('css/admin/pm/reservations.css')

			->addJs('scripts/inc/jquery-ui-1.10.4.custom.js')
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/pm/main.js')
			->addJs('scripts/admin/pm/reservations.js');

		$last_day = $this->request->getQuery('last_day');
		$current_time = time();

		$this->view->setVar('main_menu_active', 'reservations');


		$from_date = date('m/01/Y', $current_time);
		if ((int)$last_day) {
			$from_date = date('m/d/Y', $current_time - 24 * 3600 * $last_day);
		} else if ($last_day == 'all') {
			$from_date = '';
		}

		$this->view->setVar('check_in', $from_date);
		$this->view->setVar('check_out', $from_date ? date('m/d/Y', $current_time) : '');
	}

	public function listAction() {
		$limit = 25;

		$startSearchDate = $this->request->getQuery('check_in');
		$endSearchDate = $this->request->getQuery('check_out');
		$s = $this->request->getQuery('s');
		$status = $this->request->getQuery('status');
		$page = $this->request->getQuery('page', 'int', 1);

		$query = $this->modelsManager->createBuilder()
			->columns("Reservation.ID as rID,
				DATE_FORMAT(Reservation.FromDate, '%c/%e/%y') as rFromDate,
				DATE_FORMAT(Reservation.ToDate, '%c/%e/%y') as rToDate,
				DATEDIFF(Reservation.ToDate, Reservation.FromDate) as rNights,
				client.ID as cID,
				client.Name as cName,
				client.DayPhone as cPhone,
				client.EmailAddress as cEmail,
				p.Name as pName,
				Reservation.ID as rID,
				Reservation.State as rState,
				Reservation.Price as rPrice,
				Reservation.Currency as rCurrency,
				DATE_FORMAT(Reservation.Date, '%c/%e/%y') as rDate,
				channel.Name  as rChannel")
			->from('Reservation')
			->leftJoin('Product', 'Reservation.ProductID = p.ID', 'p')
			->leftJoin('Party', 'Reservation.AgentID = channel.ID', 'channel')
			->leftJoin('Party', 'Reservation.CustomerID = client.ID', 'client')
			->where('Reservation.AgentID = ' . (int) $this->view->user_id)
			->orderBy('rFromDate');

		if ($startSearchDate) {
			$query->andWhere("Reservation.Date >= '" . $startSearchDate . "'");
		}
		if ($endSearchDate) {
			$query->andWhere("Reservation.Date <= '" . $endSearchDate . "'");
		}
		if ($s) {
			$search = "(";
			if (intval($s)) {
				$search .= "Reservation.ID = " . (int) $s . " OR ";
			}
			$search .= "client.Name LIKE '%$s%' OR p.Name LIKE '%$s%')";
			$query->andWhere($search);
		}
		if ($status) {
			$query->inWhere('Reservation.State', $status);
		}

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => $limit,
			"page" => $page
		));

		$page = $paginator->getPaginate();

		$rows = array();
		foreach ($page->items as $row) {
			$row->cName = utf8_encode($row->cName);
			$row->pName = utf8_encode($row->pName);
			$row->rChannel = utf8_encode($row->rChannel);
			$row->rPrice = \CorrectValues::short_currency($row->rCurrency)  . \CorrectValues::number_format($row->rPrice);
			$row->rStateClass = strtolower($row->rState);
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
			),
		);

		die(json_encode($result));
	}

	public function detailAction() {
		$id = $this->request->getQuery('id', 'int', 0);

		$query = $this->modelsManager->createBuilder()
			->columns("Reservation.ID as rID,
				DATE_FORMAT(Reservation.FromDate, '%c/%e/%y') as rFromDate,
				DATE_FORMAT(Reservation.ToDate, '%c/%e/%y') as rToDate,
				TIME_FORMAT(ArrivalTime, '%l:%i %p') as rArrivalTime,
				TIME_FORMAT(DepartureTime, '%l:%i %p') as rDepartureTime,
				DATEDIFF(Reservation.ToDate, Reservation.FromDate) as rNights,
				client.Name as cName,
				client.DayPhone as cPhone,
				client.EmailAddress as cEmail,
				p.Name as pName,
				p.Room as pBed,
				p.Bathroom as pBath,
				Reservation.State as rState,
				Reservation.Price as rPrice,
				Reservation.Currency as rCurrency,
				channel.Name  as rChannel")
			->from('Reservation')
			->leftJoin('Product', 'Reservation.ProductID = p.ID', 'p')
			->leftJoin('Party', 'Reservation.AgentID = channel.ID', 'channel')
			->leftJoin('Party', 'Reservation.CustomerID = client.ID', 'client')
			->where('Reservation.ID = ' . $id);
		$row = $query->getQuery()->execute()->getFirst();
		$row->rPrice = \CorrectValues::short_currency($row->rCurrency)  . \CorrectValues::number_format($row->rPrice);
		$result = array(
			'error' => false,
			'message' => false,
			'data' => array(
				'item' =>$row
			),
		);

		die(json_encode($result));
	}

	public function questlistAction() {
		$limit = 5;
		$id = $this->request->getQuery('id', 'int', 0);
		$page = $this->request->getQuery('page', 'int', 0);

		$query = $this->modelsManager->createBuilder()
			->columns("Reservation.ID as rID,
				DATE_FORMAT(Reservation.FromDate, '%c/%e/%y') as rFromDate,
				DATE_FORMAT(Reservation.ToDate, '%c/%e/%y') as rToDate,
				p.Name as pName,
				p.Physicaladdress as pPhysicaladdress,
				Reservation.State as rState,
				channel.Name  as rChannel")
			->from('Reservation')
			->leftJoin('Product', 'Reservation.ProductID = p.ID', 'p')
			->leftJoin('Party', 'Reservation.AgentID = channel.ID', 'channel')
			->leftJoin('Party', 'Reservation.CustomerID = client.ID', 'client')
			->where('p.OwnerID = ' . (int) $this->view->user_id . ' AND client.ID = ' . $id);

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => $limit,
			"page" => $page
		));

		$page = $paginator->getPaginate();

		$rows = array();
		foreach ($page->items as $row) {
			$row->pName = utf8_encode($row->pName);
			$row->rStateClass = strtolower($row->rState);
			$rows[] = $row;
		}

		$query = $this->modelsManager->createBuilder()
			->columns("Name as cName,
				DayPhone as cPhone,
				EmailAddress as cEmail,
				PostalAddress as cAddress")
			->from('Party')
			->where('ID = ' . $id);

		$customer = $query->getQuery()->execute()->getFirst();

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
				'customer' => $customer
			),
		);

		die(json_encode($result));
	}
}