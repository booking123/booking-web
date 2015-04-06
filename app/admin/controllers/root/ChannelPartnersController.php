<?php

namespace Razor\Admin\Controllers\root;

use Phalcon\Exception;

class ChannelPartnersController extends RootBaseController
{
	private $channel_rows = array(
		array('ID','cpID'),
		array('Channel Name','cpChannelName'),
		array('State','cpState'),
		array('Coverage','cpCoverage'),
		array('Channel Type','cpChannelType'),
		array('Contact Type','cpContactType'),
		array('Payment Process','cpPaymentProcess'),
		array('cpTraffic','cpTraffic'),
		array('Commission','cpCommission'),
		array('Phone','cpPhone'),
		array('Email','cpEmail'),
		array('Office Address','cpOfficeAddress')
	);

	public function indexAction()
	{
		$this->assets
			->addCss('css/admin/root/channel-partners.css')
			->addJs('scripts/inc/underscore-min.js')
			->addJs('scripts/admin/root/report.js')
			->addJs('scripts/admin/root/channel-partners.js');

		$countries = \Country::query()
			->columns('ID, Name, PhoneCode')
			->notInWhere('ID', array('ZZ')) //, 'AS', 'GU', 'MP', 'PR', 'VG', 'VI'
			->andWhere("Name != ''")
			->orderBy('Name')
			->execute();


		$this->view->setVar('countries', $countries);
		$this->view->setVar('thead', $this->channel_rows);
	}

	public function get_channelsAction() {
		$this->view->disable();

		$sorting = array(
			'name' => $this->channel_rows[0][1],
			'order' => 'desc'
		);

		// Request
		$page = $this->request->getQuery("page", 'int', 0);

		$sort_val = $this->request->getQuery("sort");
		$sort_order = $this->request->getQuery("sort_order");
		if ($sort_val && $this->isSortName($this->channel_rows, $sort_val)) {
			$sorting['name'] = $sort_val;

			if ($sort_order) {
				$sorting['order'] = $sort_order;
			}
		}

		$channel_name = $this->request->getQuery('s_channel_name');

		$query = $this->modelsManager->createBuilder()
			->columns("id as cpID,
			ChannelPartner.channel_name as cpChannelName,
			p.state as cpState,
			ChannelPartner.coverage as cpCoverage,
			ChannelPartner.channel_type as cpChannelType,
			ChannelPartner.contact_type as cpContactType,
			ChannelPartner.payment_process as cpPaymentProcess,
			ChannelPartner.payouts as cpPayouts,
			ChannelPartner.damage_coverage as cpDamageCoverage,
			ChannelPartner.traffic as cpTraffic,
			ChannelPartner.commission as cpCommission,
			ChannelPartner.listing_fees as cpListingFees,
			ChannelPartner.phone as cpPhone,
			ChannelPartner.email as cpEmail,
			ChannelPartner.office_address as cpOfficeAddress,
			ChannelPartner.description as cpDescription,
			p.ID AS pID")
			->from('ChannelPartner')
			->leftJoin('Party', 'p.ID = ChannelPartner.party_id', 'p');

		if ($channel_name) {
			$query->where("ChannelPartner.channel_name LIKE '%" . $channel_name . "%'");
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
			$row->cpChannelName = utf8_encode($row->cpChannelName);
			$row->cpOfficeAddress = utf8_encode($row->cpOfficeAddress);
			$row->cpPaymentProcess = utf8_encode($row->cpPaymentProcess);
			$row->cpPhone = utf8_encode($row->cpPhone);
			$row->cpDescription = utf8_encode($row->cpDescription);
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



	public function changesettingscpAction() {
		$this->view->disable();

		$id = $this->request->getQuery('id', 'int', 0);
		$cp_id = $this->request->getQuery('cp_id', 'int', 0);

		$address = $this->request->getQuery('address');
		$commission = $this->request->getQuery('commission', 'float', null);
		$contact_name = $this->request->getQuery('contact_name');
		$country = $this->request->getQuery('country');
		$mail = $this->request->getQuery('mail');
		$name = $this->request->getQuery('name');
		$phone = $this->request->getQuery('phone');
		$site = $this->request->getQuery('site');
		$state = $this->request->getQuery('state');
		$traffic = $this->request->getQuery('traffic');
		$zip = $this->request->getQuery('zip');
		$channel_type = $this->request->getQuery('channel_type');
		$send_email = $this->request->getQuery('send_mail', 'int', 0);
		$ftp_password = $this->request->getQuery('ftp_password');

		if (!$name) {
			die(json_encode(array(
				'error' => true,
				'message' => 'Please enter Channel Name'
			)));
		}

		if (!$mail) {
			die(json_encode(array(
				'error' => true,
				'message' => 'Please enter Email Address'
			)));
		}

		$user = \Party::findFirst(array(
			'columns' => 'ID',
			'conditions' => "EmailAddress = '$mail' AND State IN ('Created', 'Suspended') AND ID != $id",
//			'bind' => array(1 => $mail, 2 => $id)
		));

		if ($user) {
			die(json_encode(array(
				'error' => true,
				'message' => "Email Address '$mail' exist, please enter new email."
			)));
		}

		if ($id) {
			$Party = \Party::findFirst($id);
			if (!$Party) {
				die(json_encode(array(
					'error' => true,
					'message' => "Don't have any user with this ID."
				)));
			}

			$CP = \ChannelPartner::findFirst(array(
				'conditions' => "party_id = ?1",
				'bind' => array(1 => $Party->ID)
			));

			if (!$CP && $cp_id) {
				die(json_encode(array(
					'error' => true,
					'message' => "Don`t have any Channel for user with ID = {$Party->ID}!"
				)));
			}
		} else {
			$Party = new \Party();
			//TODO: Create Password and add row in form
			$Party->Password = '$2a$10$u5dJp/fCpGTLVs6Dx.Q7MuEF5YFvgkPmyGUkZORvl3/23ZV9ok9h.';
			$Party->version = date('Y-m-d H:i:s');

		}


		$Party->Name = $name;
		$Party->ExtraName = $contact_name;
		$Party->EmailAddress = $mail;
		$Party->DayPhone = $phone;
		$Party->WebAddress = $site;
		$Party->State = $state;
		$Party->PostalAddress = $address;
		$Party->PostalCode = $zip;
		$Party->Country = $country;
		$Party->UserType = 'ChannelPartner';

		$Party->skip_license = 0;
		if (!$Party->save()) {
			$messages = 'Error Save User:';
			foreach ($Party->getMessages() as $message) {
				$messages .= $message . "\n";
			}

			die(json_encode(array(
				'error' => true,
				'message' => $messages
			)));
		}

		if (empty($CP)) {
			$CP = new \ChannelPartner();
		}

		$CP->channel_name = $Party->Name;
		$CP->email = $Party->EmailAddress;
		$CP->phone = $Party->DayPhone;
		$CP->website_url = $Party->WebAddress;
		$CP->channel_type = $channel_type;
		$CP->state = $Party->State;
		$CP->office_address = $Party->PostalAddress;
		$CP->party_id = $Party->ID;
		$CP->traffic = $traffic;
		$CP->commission = $commission;
		$CP->send_confirmation_email = $send_email;
		$CP->ftp_password = $ftp_password;
		if (!$CP->save()) {
			$messages = 'Error Save Channel Partner:';
			foreach ($CP->getMessages() as $message) {
				$messages .= $message . "\n";
			}

			die(json_encode(array(
				'error' => true,
				'message' => $messages
			)));
		}

		die(json_encode(array(
			'error' => false,
			'message' => 'Changes saved',
			'item' => array(
				'user' => $CP->id,
				'channel' => $CP->commission,
			)
		)));

	}

	public function searchcpAction()
	{
		$this->view->disable();

		$search = $this->request->getQuery('s');
		$query = $this->modelsManager->createBuilder()
			->columns('Party.Name, Party.ID, Party.EmailAddress, cp.id as cp_id, Party.state, Party.UserType, Party.version')
			->from('Party')
			->leftJoin('ChannelPartner', 'cp.party_id = Party.ID', 'cp');

		$arr_search = explode(',', $search);
		for ($i = 0; $i < count($arr_search); $i++) {
			$query->orWhere("Party.Name LIKE '%" . trim($arr_search[$i]) . "%'");
		}

		$channels = $query->getQuery()
			->execute();

		echo json_encode(array(
			'error' => false,
			'data' => array(
				'exist_channels' => $channels->toArray()
			)
		));
	}


	public function getsettingscpAction() {
		$this->view->disable();

		$party_id = $this->request->getQuery('party_id', 'int', 0);
		$cp_id = $this->request->getQuery('cp_id', 'int', 0);
		if (!$party_id && !$cp_id) {
			die(json_encode(array(
				'error' => true
			)));
		}
		$query = $this->modelsManager->createBuilder()
			->columns('
				Party.ID,
				cp.id as cpID,
				Party.Name,
				Party.ExtraName,
				Party.EmailAddress,
				Party.DayPhone,
				Party.WebAddress,
				Party.State,
				Party.PostalAddress,
				Party.PostalCode,
				Party.Country,
				cp.commission,
				cp.channel_type,
				cp.traffic,
				cp.ftp_password,
				cp.send_confirmation_email as send_email')
			->from('Party')
			->leftJoin('ChannelPartner', 'cp.party_id = Party.ID', 'cp');


		if ($party_id) {
			$query->where('Party.ID = ' . $party_id);
		} else {
			$query->where('cp.id = ' . $cp_id);
		}

		$res = $query->getQuery()->execute();

		if (!count($res)) {
			die(json_encode(array(
				'error' => true,
				'message' => "Don't have any user for this channel."
			)));
		}

		$channel = $res->getFirst();
		$channel->posError = false;
		try {
			$channel->posID = \StaticServiceApi::getPosById($channel->ID);
		} catch (\Exception $e) {
			$channel->posError = true;
			$channel->posID = 'Server doesn`t work. To get POS ID, try again later, please';
			die(json_encode(array(
				'error' => false,
				'message' => '',
				'data' => array('item' => $channel)
			)));
		}

		die(json_encode(array(
			'error' => false,
			'message' => '',
			'data' => array('item' => $channel)
		)));
	}
}