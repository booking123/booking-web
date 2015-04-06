<?php
namespace Razor\Admin\Controllers\pm;


class TransactionsController extends PmBaseController
{
	public function indexAction()
	{
		$current_time = time();
		$from_date = date('m/01/Y', $current_time);

		$this->assets
			->addCss('css/admin/pm/main.css')
			->addCss('css/admin/pm/transactions.css')
			->addCss('css/jqueryUiForDatepicker.css')
			->addJs('scripts/inc/jquery-ui-1.10.4.custom.js')
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/pm/main.js')
			->addJs('scripts/admin/pm/transactions.js');

		$last_day = $this->request->getQuery('last_day');

		if ((int)$last_day) {
			$from_date = date('m/d/Y', $current_time - 24 * 3600 * $last_day);
		} else if ($last_day == 'all') {
			$from_date = '';
		}

		$this->view->setVar('check_in', $from_date);
		$this->view->setVar('check_out', $from_date ? date('m/d/Y', $current_time) : '');

		$this->view->setVar('main_menu_active', 'transactions');
		$this->view->setVar('statuses', array(
			'accepted' => 'Accepted',
			'failed' => 'Failed',
			'declined' => 'Declined',
			'inquired' => 'Inquired',
		));
	}

	public function listAction()
	{
		$this->view->disable();

		$rows = array();

		$page = $this->request->getQuery('page', 'int', 1);
		$s = $this->request->getQuery('s');
		$startSearchDate = $this->request->getQuery('check_in');
		$endSearchDate = $this->request->getQuery('check_out');
		$status = $this->request->getQuery('status');

		if (!is_array($status) && $status) {
			$status = array($status);
		}


		$query = $this->modelsManager->createBuilder()
			->columns("
			DATE_FORMAT(PaymentTransaction.create_date, '%c/%e/%y')  as ptDate,
			PaymentTransaction.partner_id as ptPartnerID,
			PaymentTransaction.total_amount as ptAmount,
			PaymentTransaction.currency as ptCurrency,
			PaymentTransaction.reservation_id as ptRes,
			PaymentTransaction.charge_type as ptChtype,
			PaymentTransaction.status as ptStatus,
			PaymentTransaction.id as tID,
			customer.Name as cName")
			->from('PaymentTransaction')
			->leftJoin('Reservation', 'PaymentTransaction.reservation_id = res.ID', 'res')
			->leftJoin('Party', 'res.CustomerID = customer.ID', 'customer')
			->where('PaymentTransaction.supplier_id = :user_id:', array('user_id' => $this->view->user_id));


		if ($startSearchDate) {
			$query->andWhere("PaymentTransaction.create_date >= '" . $startSearchDate . "'");
		}
		if ($endSearchDate) {
			$query->andWhere("PaymentTransaction.create_date <= '" . $endSearchDate . "'");
		}
		if ($s) {
			$whereWhitID = "";
			if (intval($s)) {
				$whereWhitID .= "res.ID = " . (int)$s . " OR ";
			}

			$query->andWhere("{$whereWhitID}customer.Name LIKE '%$s%'");
		}
		if ($status) {
			$query->inWhere('PaymentTransaction.status', $status);
		}


		$transactions = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => 25,
			"page" => $page
		));
		$transactions = $transactions->getPaginate();

		foreach ($transactions->items as $item) {
			$item->cName = !$item->cName ? 'none' : $item->cName;
			$rows[] = $item;
		}

		echo json_encode(array(
			'error' => false,
			'message' => false,
			'data' => array(
				'items' => $rows,
				'first' => $transactions->first,
				'before' => $transactions->before,
				'next' => $transactions->next,
				'last' => $transactions->last,
				'current' => $transactions->current,
				'total_pages' => $transactions->total_pages,
				'total_items' => $transactions->total_items,
			),
		));
	}

	public function detailAction()
	{
		$this->view->disable();

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
				Reservation.State as rState,
				Reservation.Price as rPrice,
				Reservation.Currency as rCurrency,
				PaymentTransaction.status as tStatus,
				PaymentTransaction.id as tID,
				PaymentTransaction.funds_holder as tFundsHolder,
				PaymentTransaction.total_amount as tTotalAmount,
				PaymentTransaction.final_amount as tFinalAmount,
				PaymentTransaction.gateway_transaction_id as tGatwayID,
				channel.Name  as rChannel")
			->from('PaymentTransaction')
			->leftJoin('Reservation', 'Reservation.ID = PaymentTransaction.reservation_id')
			->leftJoin('Product', 'Reservation.ProductID = p.ID', 'p')
			->leftJoin('Party', 'Reservation.AgentID = channel.ID', 'channel')
			->leftJoin('Party', 'Reservation.CustomerID = client.ID', 'client')
			->where('PaymentTransaction.id = ' . $id);
		$row = $query->getQuery()->execute()
			->getFirst();

		$row->rPrice = \CorrectValues::short_currency($row->rCurrency) . \CorrectValues::number_format($row->rPrice);
		$row->tTotalAmount = \CorrectValues::short_currency($row->rCurrency) . \CorrectValues::number_format($row->tTotalAmount);
		$row->tFinalAmount = \CorrectValues::short_currency($row->rCurrency) . \CorrectValues::number_format($row->tFinalAmount);

		$result = array(
			'error' => false,
			'message' => false,
			'data' => array(
				'item' => $row
			),
		);

		echo json_encode($result);
	}
}