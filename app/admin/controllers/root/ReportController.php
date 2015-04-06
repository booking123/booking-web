<?php

namespace Razor\Admin\Controllers\root;

class ReportController extends RootBaseController
{

	private $accountverificationspending_rows = array(
		array('Name (property manager)', 'pUserName'),
		array('phone number', 'pUserPhone'),
		array('Verification amount', 'pmAmount'),
		array('Type (ach/paypal)', 'pmType'),
		array('Date verified', 'pmVerifiedDate')
	);

	public function accountverificationspendingAction()
	{
		$this->assets
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/root/report.js')
			->addJs('scripts/admin/root/report/accountverificationspending.js');

		$this->view->setVar('thead', $this->accountverificationspending_rows);
	}

	public function get_accountverificationspendingAction()
	{
		$this->view->disable();

		$sorting = array(
			'name' => $this->accountverificationspending_rows[0][1],
			'order' => 'asc'
		);

		$page = $this->request->getQuery("page");
		$sort_val = $this->request->getQuery("sort");
		$sort_order = $this->request->getQuery("sort_order");
		$filter = $this->request->getQuery("filter");

		$csv = $this->request->getQuery('csv', 'int', 0);

		$conditions = array();
		for ($i = 0; $i < count($filter); $i++) {
			switch ($filter[$i]) {
				case 'notverified':
					$conditions[] = "(PaymentMethod.verified_date = '' OR PaymentMethod.verified_date IS NULL)";
					break;
				case 'verified':
					$conditions[] = "PaymentMethod.verified_date != ''";
					break;
			}
		}

		$query = $this->modelsManager->createBuilder()
			->columns("p.Name as pUserName,
			  p.DayPhone as pUserPhone,
			  PaymentMethod.amount as pmAmount,
			  PaymentMethod.type as pmType,
			  DATE_FORMAT(PaymentMethod.verified_date, '%m/%d/%Y %H:%i:%s') as pmVerifiedDate")
			->from('PaymentMethod')
			->join('Party', 'p.ID = PaymentMethod.pmid', 'p');

		if (count($conditions)) {
			$query->where(implode(' OR ', $conditions));
		}


		if ($sort_val && $this->isSortName($this->accountverificationspending_rows, $sort_val)) {
			$sorting['name'] = $sort_val;

			if ($sort_order) {
				$sorting['order'] = $sort_order;
			}
		}

		$query->orderBy($sorting['name'] . " " . $sorting['order']);

		if ($csv) {
			$result = $query->getQuery()->execute();

			$rows = array();
			foreach ($result as $row) {
				$row->pmType = \StaticText::get_payment_method_type($row->pmType);
				$row->pmAmount = $this->convertPriceForCSV($row->pmAmount);
				$rows[] = $row;
			}

			$this->getCsv('account_verifications_pending', $rows, $this->accountverificationspending_rows);
			return;
		}

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => REPORT_ROWS_PER_PAGE,
			"page" => $page
		));

		$page = $paginator->getPaginate();

		$rows = array();
		foreach ($page->items as $row) {
			$row->pmType = \StaticText::get_payment_method_type($row->pmType);
			$row->pmAmount = $this->convertPriceForReport($row->pmAmount);
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
			)
		);

		echo json_encode($result);
	}


	private $registrationpending_rows = array(
		array('Created Date', 'pmCreatedDate'),
		array('PM ID', 'pmID'),
		array('Name', 'pName'),
		array('Email', 'pEmail'),
		array('Creator', 'creatorName'),
		array('Step Name', 'pmRegStepID'),
		array('New Registration', 'pmNewReg'),
		array('State', 'pState')
	);

	public function registrationpendingAction() {
		$this->assets
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/root/report.js')
			->addJs('scripts/admin/root/report/registrationpending.js');

		$this->view->setVar('thead', $this->registrationpending_rows);
		$this->view->setVar('reg_steps', \StaticText::get_static_data_list('registration_step'));
		$this->view->setVar('filter', array(
			'email' => '',
			'name' => '',
			'step' => ''
		));
	}

	public function get_registrationpendingAction()
	{
		$this->view->disable();

		$sorting = array(
			'name' => $this->registrationpending_rows[0][1],
			'order' => 'desc'
		);

		$page = $this->request->getQuery("page", 'int', 0);
		$step = $this->request->getQuery("step", 'int', 0);
		$email = $this->request->getQuery("email");
		$name = $this->request->getQuery("name");
		$sort_val = $this->request->getQuery("sort");
		$sort_order = $this->request->getQuery("sort_order");

		$csv = $this->request->getQuery('csv', 'int', 0);

		$query = $this->modelsManager->createBuilder()
			->columns('PropertyManagerInfo.created_date as pmCreatedDate,
			p.ID as pmID,
			p.Name as pName,
			p.EmailAddress as pEmail,
			creator.Name as creatorName,
			PropertyManagerInfo.registration_step_id as pmRegStepID,
			PropertyManagerInfo.new_registration as pmNewReg,
			p.State as pState')
			->from('PropertyManagerInfo')
			->leftJoin('Party', 'p.ID = PropertyManagerInfo.pm_id', 'p')
			->leftJoin('Party', 'p.CreatorID = creator.ID', 'creator');

		if ($email) {
			$query->andWhere("p.EmailAddress LIKE '%" . $email . "%'");
		}

		if ($step) {
			$query->andWhere("PropertyManagerInfo.registration_step_id = " . $step);
		}

		if ($step) {
			$query->andWhere("p.Name LIKE '%" . $name . "%'");
		}

		if ($sort_val && $this->isSortName($this->registrationpending_rows, $sort_val)) {
			$sorting['name'] = $sort_val;

			if ($sort_order) {
				$sorting['order'] = $sort_order;
			}
		}

		$query->orderBy($sorting['name'] . " " . $sorting['order']);

		if ($csv) {
			$result = $query->getQuery()->execute();

			$rows = array();
			foreach ($result as $row) {
				$row->pmRegStepID = \StaticText::get_static_data('registration_step', $row->pmRegStepID);
				$row->pmCreatedDate = $this->convertDateToStandard($row->pmCreatedDate);
				$row->pmNewReg = $row->pmNewReg ? 'Yes' : 'No';
				$rows[] = $row;
			}

			$this->getCsv('registration_pending', $rows, $this->registrationpending_rows);
			return;
		}

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => REPORT_ROWS_PER_PAGE,
			"page" => $page
		));

		$page = $paginator->getPaginate();

		$rows = array();
		foreach ($page->items as $row) {
			$row->pmRegStepID = \StaticText::get_static_data('registration_step', $row->pmRegStepID);
			$row->pmCreatedDate = $this->convertDateToStandard($row->pmCreatedDate);
			$row->pmNewReg = $row->pmNewReg ? 'Yes' : 'No';
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


	private $pendingtransactions_rows = array(
		array('Date', 'ptEntryDateTime'),
		array('Payment Gateway', 'pgpName'),
		array('Funds Holder', 'ptFundsHolder'),
		array('First Name', 'ptFirstName'),
		array('Last Name', 'ptLastName'),
		array('Phone Number', 'ptPhoneNumber'),
		array('Chanel', 'PartnerName'),
		array('PM', 'SupplierName'),
		array('Charge Date', 'ChargeDate'),
		array('Charge Amount', 'ptChargeAmount'),
		array('Currency', 'ptCurrency'),
		array('Gateway Transaction', 'ptTransaction'),
		array('Status', 'ptStatus'),
		array('Action'),
	);

	public function pendingtransactionsAction()
	{
		$this->assets
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/root/report.js')
			->addJs('scripts/admin/root/report/pendingtransactions.js');

		$this->view->setVar('thead', $this->pendingtransactions_rows);

		$channels = \ChannelPartner::find(array(
			'columns' => 'id, channel_name',
			'conditions' => "state = 'Created'",
			'order' => 'channel_name'
		));

		$this->view->setVar('channels', $channels);

		$this->view->setVar('filter', array(
			'start_date' => date('m/01/Y'),
			'end_date' => date('m/d/Y'),
			'booking_id' => '',
			'product_id' => '',
			'filter_status' => '',
			'channel' => '',
			'pms' => ''
		));
	}

	public function get_pendingtransactionsAction()
	{
		$this->view->disable();

		$sorting = array(
			'name' => $this->pendingtransactions_rows[0][1],
			'order' => 'desc'
		);

		$page = $this->request->getQuery("page", 'int', 0);
		$sort_val = $this->request->getQuery("sort");
		$sort_order = $this->request->getQuery("sort_order");
		$time_start = $this->getCorrectTime($this->request->getQuery('start_date'));
		$time_end = $this->getCorrectTime($this->request->getQuery('end_date'));
		$booking_id = $this->request->getQuery('booking_id', 'int', 0);
		$product_id = $this->request->getQuery('product_id', 'int', 0);
		$status = $this->request->getQuery('filter_status');

		$csv = $this->request->getQuery('csv', 'int', 0);

		$pms = $this->request->getQuery('pms', 'int', 0);
		$channel = $this->request->getQuery('channel', 'int', 0);

		$query = $this->modelsManager->createBuilder()
			->columns("
				PendingTransaction.entry_date_time as ptEntryDateTime,
				pgp.name as pgpName,
				payt.funds_holder as ptFundsHolder,
				PendingTransaction.first_name as ptFirstName,
				PendingTransaction.last_name as ptLastName,
				PendingTransaction.phone_number as ptPhoneNumber,
				partner.Name as PartnerName,
				supplier.Name as SupplierName,
				PendingTransaction.charge_date as ChargeDate,
				PendingTransaction.charge_amount as ptChargeAmount,
				PendingTransaction.currency as ptCurrency,
				PendingTransaction.gateway_transaction_id as ptTransaction,
				PendingTransaction.status as ptStatus,
				PendingTransaction.id as ptID")
			->from('PendingTransaction')
			->leftJoin('PaymentTransaction', "payt.gateway_transaction_id = PendingTransaction.gateway_transaction_id AND payt.gateway_transaction_id NOT IN ('0','')", 'payt')
			->leftJoin('Party', 'partner.ID = PendingTransaction.partner_id', 'partner')
			->leftJoin('Party', 'supplier.ID = PendingTransaction.supplier_id', 'supplier')
			->leftJoin('PaymentGatewayProvider', 'pgp.id = PendingTransaction.payment_gateway_id', 'pgp');

		// FILTERS QUERY
		if ($product_id) {
			$query->leftJoin('Reservation', 'r.ID = PendingTransaction.booking_id', 'r')
				->andWhere("r.ProductID = " . $product_id);
		}

		if ($time_start) {
			$query->andWhere("PendingTransaction.charge_date >= '" . date('Y-m-d', $time_start) . "'");
		}

		if ($time_end) {
			$query->andWhere("PendingTransaction.charge_date <= '" . date('Y-m-d', $time_end) . "'");
		}

		if ($booking_id) {
			$query->andWhere("PendingTransaction.booking_id = " . $booking_id);
		}

		if ($pms) {
			$query->andWhere("PendingTransaction.partner_id = " . $pms);
		}

		if ($channel) {
			$query->andWhere("PendingTransaction.supplier_id = " . $channel);
		}


		if (is_array($status)) {
			$query->inWhere("PendingTransaction.status", $status);
		}

		if ($sort_val && $this->isSortName($this->pendingtransactions_rows, $sort_val)) {
			$sorting['name'] = $sort_val;

			if ($sort_order) {
				$sorting['order'] = $sort_order;
			}
		}

		$query->orderBy($sorting['name'] . " " . $sorting['order']);

		if ($csv) {
			$pendingtransactions_rows = $this->pendingtransactions_rows;
			$pendingtransactions_rows[13] = array('Pending Transaction ID');

			$result = $query->getQuery()->execute();

			$rows = array();
			foreach ($result as $row) {
				$row->ptFundsHolder = \StaticText::get_funds_holder($row->ptFundsHolder);
				$row->ptStatus = \StaticText::get_static_data('pending_transaction_status', $row->ptStatus);
				$row->ptChargeAmount = $this->convertPriceForCSV($row->ptChargeAmount);
				$row->ptEntryDateTime = $this->convertDateToStandard($row->ptEntryDateTime, true);
				$row->ChargeDate = $this->convertDateToStandard($row->ChargeDate);
				unset($row->ID);
				$rows[] = $row;
			}

			$this->getCsv('pending_transactions', $rows, $pendingtransactions_rows);
			return;
		}

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => REPORT_ROWS_PER_PAGE,
			"page" => $page
		));

		$page = $paginator->getPaginate();

		$rows = array();
		foreach ($page->items as $row) {
			$row->ptFundsHolder = \StaticText::get_funds_holder($row->ptFundsHolder);
			$row->ptStatus = \StaticText::get_static_data('pending_transaction_status', $row->ptStatus);
			$row->ptChargeAmount = $this->convertPriceForReport($row->ptChargeAmount);
			$row->ptEntryDateTime = $this->convertDateToStandard($row->ptEntryDateTime, true);
			$row->ChargeDate = $this->convertDateToStandard($row->ChargeDate);
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

	public function pendingtransactionchangestateAction() {
		$id = $this->request->getQuery('id', 'int', 0);
		$state = $this->request->getQuery('type');

		switch ($state) {
			case 'clear'; $state = 3; break;
			case 'delete'; $state = 5; break;
			default: $state = 0;
		}

		$res = array(
			'error' => true
		);

		if ($state && $id) {
			$transaction = \PendingTransaction::findFirst($id);
			$transaction->status = $state;

			if ($transaction->save()) {
				$reservation = \Reservation::findFirst($transaction->booking_id);
				$reservation->State = 'FullyPaid';
				$reservation->save();

				$res['error'] = false;
				$res['val'] = \StaticText::get_static_data('pending_transaction_status', $state);
			}
		}


		die(json_encode($res));
	}


	private $reservation_rows = array(
		array('ID', 'rID'),
		array('Reservation Date', 'rDate'),
		array('Reservation Name', 'rName'),
		array('Property ID', 'pID'),
		array('Property Name', 'pName'),
		array('From Date', 'rFromDate'),
		array('To Date', 'rToDate'),
		array('Client', 'cName'),
//		array('Client Phone', 'cPhone'),
//		array('Client Email', 'cEmail'),
		array('State', 'rState'),
		array('PM Name', 'pmName'),
		array('Channel', 'aName'),
		array('History')
	);

	public function reservationsAction()
	{
		$this->assets
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/root/report.js')
			->addJs('scripts/admin/root/report/reservations.js');

		$property_managers = \Party::find(array(
			'columns' => 'ID, Name',
			'conditions' => "UserType IN ('PropertyManager', 'PMS')",
			'order' => 'Name'
		));


		$this->view->setVar('property_managers', $property_managers);

		$this->view->setVar('thead', $this->reservation_rows);

		$this->view->setVar('filter', array(
			'start_date' => date('m/01/Y'),
			'end_date' => date('m/d/Y'),
			'property_id' => '',
			'reservation_id' => '',
			'number' => '',
			'pm' => ''
		));
	}

	public function get_reservationsAction()
	{
		$this->view->disable();

		error_reporting(0);
		$sorting = array(
			'name' => $this->reservation_rows [0][1],
			'order' => 'desc'
		);

		$page = $this->request->getQuery("page");
		$sort_val = $this->request->getQuery("sort");
		$sort_order = $this->request->getQuery("sort_order");
		$time_start = $this->getCorrectTime($this->request->getQuery('start_date'));
		$time_end = $this->getCorrectTime($this->request->getQuery('end_date'));
		$property_id = $this->request->getQuery('property_id', 'int', 0);
		$reservation_id = $this->request->getQuery('reservation_id', 'int', 0);
		$number = $this->request->getQuery('number');
		$pm = $this->request->getQuery('pm');
		$status = $this->request->getQuery('filter_status');
		$types = $this->request->getQuery('filter_types');
		$types = (is_array($types) && count($types) == 1) ? $types[0] : null;

		$csv = $this->request->getQuery('csv', 'int', 0);

        $queryCount = $this->modelsManager->createBuilder()
            ->columns('COUNT(Reservation.ID) as countResult')
            ->from('Reservation');

        $query = $this->modelsManager->createBuilder()
            ->columns("Reservation.ID as rID,
				DATE_FORMAT(Reservation.Date, '%m/%d/%Y') as rDate,
				p.ID as pID,
				Reservation.Name as rName,
				p.Name as pName,
				DATE_FORMAT(Reservation.FromDate, '%m/%d/%Y') as rFromDate,
				DATE_FORMAT(Reservation.ToDate, '%m/%d/%Y') as rToDate,
				client.Name as cName,
				client.DayPhone as cPhone,
				client.EmailAddress as cEmail,
				Reservation.State as rState,
				pm.Name as pmName,
				agent.Name as aName,
				COUNT(e.ID) as countEvents")
            ->from('Reservation')
            ->leftJoin('Product', 'Reservation.ProductID = p.ID', 'p')
            ->leftJoin('Event', 'Reservation.ID = e.ParentID', 'e')
            ->leftJoin('Party', 'Reservation.CustomerID = client.ID', 'client')
            ->leftJoin('Party', 'Reservation.AgentID = agent.ID', 'agent')
            ->leftJoin('Party', 'Reservation.OrganizationID = pm.ID', 'pm');

        if ($reservation_id) {
            $query->andWhere("Reservation.ID = " . $reservation_id );
			$queryCount->andWhere("Reservation.ID = " . $reservation_id );
        } else if ($number) {
            $query->andWhere("Reservation.Name = '" . $number . "'");
			$queryCount->andWhere("Reservation.Name = '" . $number . "'");
        } else {
            if ($time_start) {
                $query->andWhere("Reservation.Date >= '" . date('Y-m-d', $time_start) . "'");
                $queryCount->andWhere("Reservation.Date >= '" . date('Y-m-d', $time_start) . "'");
            }

            if ($time_end) {
                $query->andWhere("Reservation.Date <= '" . date('Y-m-d', $time_end) . "'");
                $queryCount->andWhere("Reservation.Date <= '" . date('Y-m-d', $time_end) . "'");
            }

            if ($property_id) {
                $query->andWhere("p.ID = '" . $property_id . "'");
                $queryCount->leftJoin('Product', 'Reservation.ProductID = p.ID', 'p');
                $queryCount->andWhere("p.ID = '" . $property_id . "'");
            }
            if ($pm) {
                $query->andWhere("Reservation.OrganizationID = '" . $pm . "'");
            }

            if (is_array($status)) {
                $query->inWhere("Reservation.State", $status);
            }

            if ($types) {
                $types = ($types == 'Inquiry') ? "= 'Inquiry'" : "!= 'Inquiry'";
                $query->andWhere("Reservation.State " . $types);
            }
        }


        $query->groupBy('Reservation.ID');

        if ($sort_val && $this->isSortName($this->reservation_rows, $sort_val)) {
            $sorting['name'] = $sort_val;

	        if ($sort_order) {
		        $sorting['order'] = $sort_order;
	        }
        }

		$query->orderBy($sorting['name'] . " " . $sorting['order']);
		if ($csv) {
			$reservation_rows = $this->reservation_rows;
			$reservation_rows[0][0] = 'Reservation ID';
			$result = $query->getQuery()->execute();

			$rows = array();
			foreach ($result as $row) {
				$row->pName = utf8_encode($row->pName);
				$row->cName = utf8_encode($row->cName) . ($row->cEmail ? ', Email: ' . $row->cEmail : '') . ($row->cPhone ? ', Phone: ' . $row->cPhone : '');
				unset($row->cPhone);
				unset($row->cEmail);
				$rows[] = $row;
			}

			$this->getCsv('reservations', $rows, $reservation_rows);
			return;
		}

        $query->limit(REPORT_ROWS_PER_PAGE, REPORT_ROWS_PER_PAGE * ($page > 0 ? $page - 1 : 0));

        $result = $query->getQuery()->execute();

        $dataCount = $queryCount->getQuery()->execute();
        $dataCount = $dataCount->toArray();
        if (count($dataCount)) {
            $dataCount = $dataCount[0]['countResult'];
        }

        $total_items = $dataCount;
        $total_pages = ceil($total_items / REPORT_ROWS_PER_PAGE);
        $next = $page >= $total_pages ? $total_pages : $page + 1;
        $before = $page > 1 ? $page - 1 : 1;

        $rows = array();
        foreach ($result as $row) {
            $row->pName = utf8_encode($row->pName);
//			$row->cContactInfo = "<b>Phone:</b>{$row->cPhone}<br /><b>Email:</b>{$row->cEmail}<br />";
            $rows[] = $row;
        }

        $this->view->disable();
        $result = array(
            'error' => false,
            'message' => false,
            'data' => array(
                'items' => $rows,
                'first' => 1,
                'before' => $before,
                'next' => $next,
                'last' => $total_pages,
                'current' => $page,
                'total_pages' => $total_pages,
                'total_items' => $total_items,

                'sorting' => $sorting
            )
        );

        die(json_encode($result));
    }

	public function get_history_reservationAction() {
		$this->view->disable();
		$result = array(
			'error' => false,
			'message' => false,
			'data' => array()
		);


		$id = $this->request->getQuery('id', 'int', 0);
		if (!$id) {
			die(json_encode($result));
		}

		$query = $this->modelsManager->createBuilder()
			->columns("
				Event.State as eState,
				Event.Activity as eActivity,
				Event.Process as eProcess,
				Event.Notes as eNotes,
				actor.Name as aName,
				Event.version as eDate")
			->from('Event')
			->leftJoin('Party', 'Event.ActorID = actor.ID', 'actor')
			->where('ParentID = ' . $id);

		$res = $query->getQuery()->execute()->toArray();


		$rows = array();
		foreach ($res as $row) {
			$rows[] = $row;
		}

		$result['data'] = $rows;

		echo json_encode($result);
	}


	private $overduetransactions_rows = array(
		array('Date', 'ptEntryDateTime'),
		array('Booking ID', 'ptBookingID'),
		array('PMS Confirmation ID', 'ptPmsConfirmID'),
		array('Payment Gateway', 'pgpName'),
		array('Funds Holder', 'ptFundsHolder'),
		array('Partial IIN', 'ptPartialIIN'),
//		array('First Name', 'ptFirstName'),
//		array('Last Name', 'ptLastName'),
//		array('Phone Number', 'ptPhoneNumber'),
		array('Chanel', 'PartnerName'),
		array('PM', 'SupplierName'),
		array('Charge Date', 'ptChargeDate'),
		array('Charge Amount', 'ptChargeAmount'),
		array('Currency', 'ptCurrency'),
		array('Commission', 'ptCommission'),
		array('Partner Payment', 'ptPartnerPayment'),
		array('Bookingpal Payment', 'ptBookingpalPayment'),
		array('Gateway Transaction', 'ptTransaction'),
		array('Status', 'ptStatus'),
		array('Autopay', 'ptAutopay'),
		array('From Date', 'rFromDate'),
		array('To Date', 'rToDate'),
		array('Customer Name', 'customerName'),
		array('Customer Phone', 'customerPhone'),
//		array('Action')
	);

	public function overduetransactionsAction()
	{
		$this->assets
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/root/report.js')
			->addJs('scripts/admin/root/report/overduetransactions.js');

		$channels = \ChannelPartner::find(array(
			'columns' => 'id, channel_name',
			'conditions' => "state = 'Created'",
			'order' => 'channel_name'
		));

		$pms = \Party::find(array(
			'columns' => 'ID, Name',
			'conditions' => "UserType IN ('PMS')",
			'order' => 'Name'
		));

		$this->view->setVar('thead', $this->overduetransactions_rows);
		$this->view->setVar('channels', $channels);
		$this->view->setVar('pms', $pms);

		$this->view->setVar('filter', array(
			'start_date' => date('m/01/Y'),
			'end_date' => date('m/d/Y'),
			'channel' => '',
			'pms' => '',
			'product_id' => '',
			'booking_id' => '',
			'desc' => false
		));
	}

	public function get_overduetransactionsAction()
	{

		$this->view->disable();

		$sorting = array(
			'name' => $this->pendingtransactions_rows[0][1],
			'order' => 'desc'
		);

		// Request
		$page = $this->request->getQuery("page", 'int', 0);
		$sort_val = $this->request->getQuery("sort");
		$sort_order = $this->request->getQuery("sort_order");

		$pms = $this->request->getQuery('pms', 'int', 0);
		$channel = $this->request->getQuery('channel', 'int', 0);
		$booking_id = $this->request->getQuery('booking_id', 'int', 0);
		$product_id = $this->request->getQuery('product_id', 'int', 0);

		$csv = $this->request->getQuery('csv', 'int', 0);

		$status = $this->request->getQuery('filter_status');
		if (!is_array($status) || !count($status)) {
			$status = array(1,2,4);
		}
/* PendingTransaction.phone_number as ptPhoneNumber, */
		$query = $this->modelsManager->createBuilder()
			->columns("PendingTransaction.entry_date_time as ptEntryDateTime,
				PendingTransaction.booking_id as ptBookingID,
				PendingTransaction.pms_confirmation_id as ptPmsConfirmID,
				pgp.name as pgpName,
				payt.funds_holder as ptFundsHolder,
				PendingTransaction.partial_iin as ptPartialIIN,
				partner.Name as PartnerName,
				supplier.Name as SupplierName,
				DATE_FORMAT(PendingTransaction.charge_date, '%m/%d/%Y') as ptChargeDate,
				PendingTransaction.charge_amount as ptChargeAmount,
				PendingTransaction.currency as ptCurrency,
				PendingTransaction.commission as ptCommission,
				PendingTransaction.partner_payment as ptPartnerPayment,
				PendingTransaction.bookingpal_payment as ptBookingpalPayment,
				PendingTransaction.gateway_transaction_id as ptTransaction,
				PendingTransaction.status as ptStatus,
				PendingTransaction.autopay as ptAutopay,
				r.FromDate as rFromDate,
				r.ToDate as rToDate,
				customer.Name as customerName,
				customer.DayPhone as customerPhone,
				PendingTransaction.id as ptID
				")
			->from('PendingTransaction')
			->leftJoin('Reservation', 'r.ID = PendingTransaction.booking_id', 'r')
			->leftJoin('PaymentTransaction', "payt.gateway_transaction_id = PendingTransaction.gateway_transaction_id AND payt.gateway_transaction_id  NOT IN ('0','')", 'payt')
			->leftJoin('Party', 'supplier.ID = PendingTransaction.supplier_id', 'supplier')
			->leftJoin('Party', 'partner.ID = PendingTransaction.partner_id', 'partner')
			->leftJoin('Party', 'customer.ID = r.CustomerID', 'customer')
			->leftJoin('PaymentGatewayProvider', 'pgp.id = PendingTransaction.payment_gateway_id', 'pgp');

		if ($booking_id) {
			// If the booking ID is entered then ignore the other filter options and display this booking
			$query->andWhere("PendingTransaction.booking_id = " . $booking_id);
//			$query->having('ptID');
		} else {
			if ($product_id) {
				// If Product ID is entered then find all bookings for this product ID filtered by Partner and PMS
				$query->andWhere("r.ProductID = " . $product_id);
			} else {
				// List all the transactions that are past due from today
				$query->andWhere("PendingTransaction.charge_date < '" . date('Y-m-d') . "'");
			}

			if ($pms) {
				$query->andWhere("PendingTransaction.partner_id = " . $pms);
			}

			if ($channel) {
				$query->andWhere("PendingTransaction.supplier_id = " . $channel);
			}

			if (is_array($status)) {
				$query->inWhere("PendingTransaction.status", $status);
			}

			if ($sort_val && $this->isSortName($this->overduetransactions_rows, $sort_val)) {
				$sorting['name'] = $sort_val;

				if ($sort_order) {
					$sorting['order'] = $sort_order;
				}
			}
		}

		$query->orderBy($sorting['name'] . " " . $sorting['order']);


		if ($csv) {
			$result = $query->getQuery()->execute();

			$rows = array();
			foreach ($result as $row) {
				$row->ptFundsHolder = \StaticText::get_funds_holder($row->ptFundsHolder);
				$row->ptStatus = \StaticText::get_static_data('pending_transaction_status', $row->ptStatus);
				$row->ptChargeAmount = $this->convertPriceForCSV($row->ptChargeAmount);
				$row->ptBookingpalPayment = $this->convertPriceForCSV($row->ptBookingpalPayment);
				$row->ptCommission = $this->convertPriceForCSV($row->ptCommission);
				$row->rFromDate = $this->convertDateToStandard($row->rFromDate);
				$row->rToDate = $this->convertDateToStandard($row->rToDate);
				$row->ptEntryDateTime = $this->convertDateToStandard($row->ptEntryDateTime, true);
				$row->ptAutopay = $row->ptAutopay ? 'BookingPal' : 'Payment Gateway';
				$rows[] = $row;

				unset($row->ptID);
			}

			$this->getCsv('overdue_transactions', $rows, $this->overduetransactions_rows);
			return;
		}

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => REPORT_ROWS_PER_PAGE,
			"page" => $page
		));

		$page = $paginator->getPaginate();

		$rows = array();
		foreach ($page->items as $row) {
			$row->ptFundsHolder = \StaticText::get_funds_holder($row->ptFundsHolder);
			$row->ptStatus = \StaticText::get_static_data('pending_transaction_status', $row->ptStatus);
			$row->ptChargeAmount = $this->convertPriceForReport($row->ptChargeAmount);
			$row->ptBookingpalPayment = $this->convertPriceForReport($row->ptBookingpalPayment);
			$row->ptCommission = $this->convertPriceForReport($row->ptCommission);
			$row->rFromDate = $this->convertDateToStandard($row->rFromDate);
			$row->rToDate = $this->convertDateToStandard($row->rToDate);
			$row->ptEntryDateTime = $this->convertDateToStandard($row->ptEntryDateTime, true);
			$row->ptAutopay = $row->ptAutopay ? 'BookingPal' : 'Payment Gateway';
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


	private $paymentssend_rows = array(
		array('ID', 'prID'),
		array('Property Manager', 'pmName'),
		array('Property Address', 'propertyAddress'),
		array('Booking ID', 'BookingID'),
		array('Check in Date', 'prCheckInDate'),
		array('Type', 'prType'),
		array('Channel Partner', 'ChannelPartner'),
		array('Cleared', 'prCleared'),
		array('Action', 'Action'),
	);

	public function paymentssentAction() {
		$this->assets
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/root/report.js')
			->addJs('scripts/admin/root/report/paymentssent.js');

		$channels = \ChannelPartner::find(array(
			'columns' => 'id, channel_name',
			'conditions' => "state = 'Created'",
			'order' => 'channel_name'
		));

		$pm = $this->modelsManager->createBuilder()
			->columns("Party.Name, Party.ID")
			->from('Party')
			->innerJoin('Relation', 'r.HeadID = Party.ID AND r.LineID = Party.ID', 'r')
			->where("r.Link = 'ORG_PARTY_Organization'")
			->notInWhere('Party.state', array('Initial', 'Final'))
			->orderBy('Party.Name')
			->groupBy('Party.ID')
			->getQuery()
			->execute();


		$this->view->setVar('channels', $channels);
		$this->view->setVar('pmes', $pm);
		$this->view->setVar('thead', $this->paymentssend_rows);
		$this->view->setVar('filter', array(
			'start_date' => date('m/01/Y'),
			'end_date' => date('m/d/Y'),
			'channel' => '',
			'pm' => '',
			'property_id' => '',
			'booking_id' => '',
			'desc' => false
		));
	}

	public function get_paymentssentAction() {
		$this->view->disable();

		$sorting = array(
			'name' => $this->paymentssend_rows[0][1],
			'order' => 'desc'
		);

		// Request
		$page = $this->request->getQuery("page", 'int', 0);
		$sort_val = $this->request->getQuery("sort");
		$sort_order = $this->request->getQuery("sort_order");

		$time_start = $this->getCorrectTime($this->request->getQuery('start_date'));
		$time_end = $this->getCorrectTime($this->request->getQuery('end_date'));

		$pm_id = $this->request->getQuery('pms', 'int', 0);
		$channel = $this->request->getQuery('channel', 'int', 0);
		$booking_id = $this->request->getQuery('booking_id', 'int', 0);
		$product_id = $this->request->getQuery('product_id', 'int', 0);

		$csv = $this->request->getQuery('csv', 'int', 0);

		$status = $this->request->getQuery('filter_status');

		$query = $this->modelsManager->createBuilder()
			->columns("PaymentRegister.ID as prID,
				pm.Name as pmName,
				property.Name as propertyAddress,
				PaymentRegister.reservation_id as BookingID,
				r.FromDate as prCheckInDate,
				PaymentRegister.type as prType,
				cp.channel_name as ChannelPartner,
				PaymentRegister.cleared as prCleared,
				'NULL' as Action
				")
			->from('PaymentRegister')
			->leftJoin('Reservation', 'r.ID = PaymentRegister.reservation_id', 'r')
			->leftJoin('Product', 'property.ID = PaymentRegister.property_id', 'property')
			->leftJoin('Party', 'pm.ID = PaymentRegister.pm_id', 'pm')
			->leftJoin('ChannelPartner', 'cp.id = PaymentRegister.partner_id', 'cp');

		if ($time_end) {
			$query->andWhere("r.FromDate <= '" . date('Y-m-d', $time_end) . "'");
		}

		if ($time_start) {
			$query->andWhere("r.ToDate >= '" . date('Y-m-d', $time_start) . "'");
		}

		if ($booking_id) {
			$query->andWhere('PaymentRegister.reservation_id = ' . $booking_id);
		}

		if ($pm_id) {
			$query->andWhere('PaymentRegister.pm_id = ' . $pm_id);
		}

		if ($product_id) {
			$query->andWhere('PaymentRegister.property_id = ' . $product_id);
		}
		if ($channel) {
			$query->andWhere('PaymentRegister.partner_id = ' . $channel);
		}

		if (is_array($status)) {
			$query->inWhere("PaymentRegister.cleared", $status);
		}


		if ($sort_val && $this->isSortName($this->paymentssend_rows, $sort_val)) {
			$sorting['name'] = $sort_val;

			if ($sort_order) {
				$sorting['order'] = $sort_order;
			}
		}
		$query->orderBy($sorting['name'] . " " . $sorting['order']);

		if ($csv) {
			$paymentssend_rows = $this->paymentssend_rows;
			$result = $query->getQuery()->execute();

			$paymentssend_rows[0][0] = "Payment Register ID";
			$rows = array();
			foreach ($result as $row) {
				$row->prCheckInDate = $this->convertDateToStandard($row->prCheckInDate);
				$row->prType = \StaticText::get_static_data('payments_sent_pending', $row->prType);
				$row->prCleared = $row->prCleared ? 'Yes' : 'No';
				$rows[] = $row;
			}

			$this->getCsv('payments_sent_pending', $rows, $paymentssend_rows);
			return;
		}

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => REPORT_ROWS_PER_PAGE,
			"page" => $page
		));

		$page = $paginator->getPaginate();

		$rows = array();
		foreach ($page->items as $row) {
			$row->prCheckInDate = $this->convertDateToStandard($row->prCheckInDate);
			$row->prType = \StaticText::get_static_data('payments_sent_pending', $row->prType);
			$row->prCleared = $row->prCleared ? 'Yes' : 'No';
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

	public function paymentssent_set_clearedAction() {
		$this->view->disable();

		$id = $this->request->getQuery('id', 'int', 0);

		$res = array(
			'error' => true
		);

		if ($id) {
			$pr = \PaymentRegister::findFirst($id);
			$pr->cleared = !$pr->cleared;

			if ($pr->save()) {
				$res['error'] = false;
				$res['values'] = array(
					'cleared' => $pr->cleared
				);
			}
		}

		echo json_encode($res);
	}


	private function getCorrectTime($date)
	{
		$date = date_parse_from_format('m/d/Y', $date);

		if ($date['error_count'] > 0) {
			return null;
		}

		return mktime($date['hour'], $date['minute'], $date['second'], $date['month'], $date['day'], $date['year']);
	}

	private function convertDateToStandard($date, $isTime=false)
	{
		$standard = 'm/d/Y';
		$convert = 'Y-m-d';

		if ($isTime) {
			$standard .= ' H:i:s';
			$convert .= ' H:i:s';
		}
		$date = date_parse_from_format($convert, $date);

		return date($standard, mktime($date['hour'], $date['minute'], $date['second'], $date['month'], $date['day'], $date['year']));
	}

//	private function isSortName($sort_arr, $sort_name)
//	{
//		for ($i = 0; $i < count($sort_arr); $i++) {
//			if (isset($sort_arr[$i][1]) && $sort_arr[$i][1] == $sort_name) {
//				return true;
//			}
//		}
//		return false;
//	}



	private $transactions_rows = array(
		array('Date', 'ptCreateDate'),
		array('Transaction ID', 'ptTransactionID'),
		array('Customer', 'pCustomerName'),
		array('Reservation ID', 'rID'),
		array('Product ID', 'rProductID'),
		array('Gateway Transaction', 'ptTransaction'),
		array('Funds Holder', 'ptFundsHolder'),
		array('Reservation State', 'rState'),
		array('Status', 'ptStatus'),
		array('Partner', 'PartnerName'),
		array('Supplier', 'SupplierName'),
		array('Current Transaction Amount', 'ptTotalAmount'),
		array('Currency', 'ptCurrency'),
		array('Total Commission', 'ptTotalCommission'),
		array('Total Amount', 'ptFinalAmount'),
		array('Invoice Date', 'InvoiceDate'),
		array('Charge Type', 'ptChargeType'),
		array('Commission Detail')
	);

	public function transactionsAction()
	{
		$this->assets
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/root/report.js')
			->addJs('scripts/admin/root/report/transactions.js');

		$this->view->setVar('thead', $this->transactions_rows);

		$this->view->setVar('filter', array(
			'start_date' => date('m/01/Y'),
			'end_date' => date('m/d/Y'),
			'name' => '',
			'desc' => false
		));
	}

	public function get_transactionsAction()
	{
		$this->view->disable();

		$sorting = array(
			'name' => $this->transactions_rows[0][1],
			'order' => 'desc'
		);

		$page = $this->request->getQuery("page", 'int', 0);
		$sort_val = $this->request->getQuery("sort");
		$sort_order = $this->request->getQuery("sort_order");
		$time_start = $this->getCorrectTime($this->request->getQuery('start_date'));
		$time_end = $this->getCorrectTime($this->request->getQuery('end_date'));
		$booking_id = $this->request->getQuery('booking_id');
		$product_id = $this->request->getQuery('product_id');
		$status = $this->request->getQuery('filter_status');
		$types = $this->request->getQuery('filter_types');

		$csv = $this->request->getQuery('csv', 'int', 0);

		$types = (is_array($types) && count($types) == 1) ? $types[0] : null;

		$query = $this->modelsManager->createBuilder()
			->columns("
				DATE_FORMAT(PaymentTransaction.create_date, '%m/%d/%Y %H:%i:%s') as ptCreateDate,
				PaymentTransaction.id as ptTransactionID,
				p.Name as pCustomerName,
				r.ID as rID,
				r.ProductID as rProductID,
				PaymentTransaction.gateway_transaction_id as ptTransaction,
				PaymentTransaction.funds_holder as ptFundsHolder,
				r.State as rState,
				PaymentTransaction.status as ptStatus,
				partner.Name as PartnerName,
				supplier.Name as SupplierName,
				PaymentTransaction.total_amount as ptTotalAmount,
				PaymentTransaction.currency as ptCurrency,
				PaymentTransaction.total_commission as ptTotalCommission,
				PaymentTransaction.final_amount as ptFinalAmount,
				DATE_FORMAT(ADDTIME(r.FromDate, '1 0:0:0.0'), '%m/%d/%Y') as InvoiceDate,
				PaymentTransaction.charge_type as ptChargeType,

				PaymentTransaction.net_rate as ptNetRate,
				PaymentTransaction.total_bookingpal_payment as ptTotalBookingpalPayment,
				PaymentTransaction.pms_payment as ptPaymentPMS,
				PaymentTransaction.partner_payment as ptPartnerPayment,
				PaymentTransaction.credit_card_fee as ptCreditCardFee,

				PaymentTransaction.message as ptMessage,
				p.DayPhone as pCustomerPhone")
			->from('PaymentTransaction')
			->leftJoin('Party', 'supplier.ID = PaymentTransaction.supplier_id', 'supplier')
			->leftJoin('Party', 'partner.ID = PaymentTransaction.partner_id', 'partner')
			->leftJoin('Reservation', 'r.ID = PaymentTransaction.reservation_id', 'r')
			->leftJoin('Party', 'p.ID = r.CustomerID', 'p');

		if ($time_start) {
			$query->andWhere("PaymentTransaction.create_date >= '" . date('Y-m-d', $time_start) . " 00:00:00'");
		}

		if ($time_end) {
			$query->andWhere("PaymentTransaction.create_date <= '" . date('Y-m-d', $time_end) . " 23:59:59'");
		}

		if (is_array($status)) {
			$query->inWhere("PaymentTransaction.status", $status);
		}

		if ($types) {
			$types = ($types == 'Inquiry') ? "= 'Inquiry'" : "!= 'Inquiry'";
			$query->andWhere("r.State " . $types);
		}

		if ($booking_id) {
			$query->andWhere("r.ID = " . $booking_id);
		}
		if ($product_id) {
			$query->andWhere("r.ProductID = " . $product_id);
		}

		if ($sort_val && $this->isSortName($this->transactions_rows, $sort_val)) {
			$sorting['name'] = $sort_val;

			if ($sort_order) {
				$sorting['order'] = $sort_order;
			}
		}

		$query->orderBy($sorting['name'] . " " . $sorting['order']);

		if ($csv) {
			$csv_transactions_rows = $this->transactions_rows;

			$csv_transactions_rows[count($csv_transactions_rows) - 1] = array("Net Rate", "ptNetRate");
			$csv_transactions_rows[] = array("Total Bookingpal Payment","ptTotalBookingpalPayment");
			$csv_transactions_rows[] = array("PMS Payment", "ptPaymentPMS");
			$csv_transactions_rows[] = array("Partner Payment", "ptPartnerPayment");
			$csv_transactions_rows[] = array("Credit Card Fee", "ptCreditCardFee");

			$result = $query->getQuery()->execute();

			$rows = array();
			foreach ($result as $row) {
				$row->ptFundsHolder = \StaticText::get_funds_holder($row->ptFundsHolder);
				$row->ptTotalAmount = $this->convertPriceForCSV($row->ptTotalAmount, 2, '.', ' ');
				$row->ptTotalCommission = $this->convertPriceForCSV($row->ptTotalCommission, 2, '.', ' ');
				$row->ptTotalBookingpalPayment = $this->convertPriceForCSV($row->ptTotalBookingpalPayment, 2, '.', ' ');
				$row->ptFinalAmount = $this->convertPriceForCSV($row->ptFinalAmount, 2, '.', ' ');
				$row->ptCreditCardFee = $this->convertPriceForCSV($row->ptCreditCardFee, 2, '.', ' ');

				$row->ptNetRate = $row->ptNetRate ? 'Active' : 'Not Active';
//				var_dump((float)$row->ptCreditCardFee);die();
				$row->ptCreditCardFee = $this->convertPriceForCSV((float)$row->ptCreditCardFee, 2, '.', ' ');
				$row->ptPaymentPMS = $this->convertPriceForCSV($row->ptPaymentPMS);

				if ($row->pCustomerPhone) {
					$row->pCustomerName .= ' (' . $row->pCustomerPhone . ')';
				}

				unset($row->ptMessage);
				unset($row->pCustomerPhone);
				$rows[] = $row;
			}

			$this->getCsv('transactions', $rows, $csv_transactions_rows);
			return;
		}

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => REPORT_ROWS_PER_PAGE,
			"page" => $page
		));


		$page = $paginator->getPaginate();
		$rows = array();
		foreach ($page->items as $row) {
			$row->ptFundsHolder = \StaticText::get_funds_holder($row->ptFundsHolder);
			$row->ptTotalAmount = $this->convertPriceForReport($row->ptTotalAmount, 2, '.', ' ');
			$row->ptTotalCommission = $this->convertPriceForReport($row->ptTotalCommission, 2, '.', ' ');
			$row->ptTotalBookingpalPayment = $this->convertPriceForReport($row->ptTotalBookingpalPayment, 2, '.', ' ');
			$row->ptFinalAmount = $this->convertPriceForReport($row->ptFinalAmount, 2, '.', ' ');
			$row->ptCreditCardFee = $this->convertPriceForReport($row->ptCreditCardFee, 2, '.', ' ');
			$row->ptPartnerPayment = $this->convertPriceForReport($row->ptPartnerPayment, 4, '.', ' ');
			$row->ptPaymentPMS = $this->convertPriceForReport($row->ptPaymentPMS, 2, '.', ' ');
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
			)
		);

		die(json_encode($result));
	}
}