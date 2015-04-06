<?php

namespace Razor\Admin\Controllers\root;

class ChannelsController extends RootBaseController
{
	public function indexAction()
	{

	}

	public function connect_pm_channelAction()
	{
		$this->assets
			->addJS('scripts/inc/underscore-min.js')
			->addJS('scripts/admin/root/channels/connect_cp_pm.js');
	}

	public function connect_ajax_get_connectsAction()
	{
		$this->view->disable();

		$type = $this->request->getQuery('type');
		$id_items = $this->request->getQuery('id_items');

		$tempMerge = array(
			'cp' => array( 'id' => 0, 'name' => '' ),
			'pm' => array( 'id' => 0, 'name' => '' ),
			'active' => array( 'id' => 0, 'name' => '' )
		);

		$users = $this->modelsManager->createBuilder()
			->columns('ID, Name')
			->from('Party')
			->inWhere('ID', $id_items)
			->orderBy('Name')
			->getQuery()
			->execute();

		if (!$users || !count($users)) {
			return;
		}

		$users_connects = array();
		foreach ($users as $user) {
			$query = $this->modelsManager->createBuilder()
				->from('Party')
				->innerJoin('ManagerToChannel', 'Party.ID = mtc.property_manager_id', 'mtc')
				->innerJoin('ChannelPartner', 'cp.id = mtc.channel_partner_id', 'cp')
				->orderBy('Name');

			switch ($type) {
				case 'cp' :
					$query->columns("Party.ID, Party.Name, Party.AltPartyID as PMSID")
						->andWhere("cp.party_id = " . $user->ID);
					$anti_type = 'pm';
					break;
				case 'pm' :
					$query->columns("cp.party_id as ID, cp.channel_name as Name")
						->andWhere("mtc.property_manager_id = " . $user->ID);
					$anti_type = 'cp';
					break;
				default:
					$query->andWhere('1=0');
					$anti_type = 'xx';
			}

			$tempMerge[$type]['id'] = $user->ID;
			$tempMerge[$type]['name'] = $user->Name;

			$res = $query->getQuery()->execute();

			$merges = array();
			foreach ($res as $merge) {
				$tempMerge['active']['id'] = $tempMerge[$anti_type]['id'] = $merge->ID;
				$tempMerge['active']['name'] = $tempMerge[$anti_type]['name'] = $merge->Name;

				$merges[] = $tempMerge;
			}


			$users_connects[] = array(
				'id' => $user->ID,
				'name' => $user->Name,
				'connects' => $merges
			);
		}

		echo json_encode(array(
			'data' => $users_connects
		));
	}

	public function listAction()
	{
		$this->view->disable();

		$type = $this->request->getQuery('type');
		$s = $this->request->getQuery('s');

		$search_array = explode(',', $s);
		$like = array();
		foreach ($search_array as $word) {
			$like[] = "Party.Name LIKE '%" . trim($word) . "%'";
		}

		$query = $this->modelsManager->createBuilder()
			->columns("Party.ID, Party.Name, Party.UserType, Party.UserType as PMSID")
			->from('Party')
			->where(implode(' OR ', $like))
			->orderBy('Name');

		switch ($type) {
			case 'cp':
				$query->innerJoin('ChannelPartner', 'cp.party_id = Party.ID', 'cp')
					->andWhere("Party.UserType = 'ChannelPartner'");
				break;
			case 'pm':
				$query->andWhere("Party.UserType IN ('PropertyManager', 'PMS')")
					->andWhere("Party.State != 'Final'"); # AND Party.State = 'Created'
				break;
			default :
				$query->andWhere("1 = 0");
		}

		$res = $query->getQuery()
			->execute();

		echo json_encode(array(
			'data' => array(
				'channels' => $res->toArray()
			)
		));
	}

	#TODO: old version
	public function merges_ajax_listAction()
	{
		$this->view->disable();

		$type = $this->request->getQuery('type');
		$id = $this->request->getQuery('id');

		$current_user = \Party::findFirst($id);

		if (!$current_user) {
			return;
		}

		$query = $this->modelsManager->createBuilder()
			->from('Party')
			->innerJoin('ManagerToChannel', 'Party.ID = mtc.property_manager_id', 'mtc')
			->innerJoin('ChannelPartner', 'cp.id = mtc.channel_partner_id', 'cp')
			->orderBy('Name');

		$tempMerge = array(
			'cp' => array( 'id' => 0, 'name' => '' ),
			'pm' => array( 'id' => 0, 'name' => '' ),
			'active' => array( 'id' => 0, 'name' => '' )
		);
		switch ($type) {
			case 'cp' :
				$query->columns("Party.ID, Party.Name, Party.AltPartyID as PMSID")
					->andWhere("cp.party_id = " . $id);
				$anti_type = 'pm';
				break;
			case 'pm' :
				$query->columns("cp.party_id as ID, cp.channel_name as Name")
					->andWhere("mtc.property_manager_id = " . $id);
				$anti_type = 'cp';
				break;
			default:
				$query->andWhere('1=0');
				$anti_type = 'xx';
		}

		$tempMerge[$type]['id'] = $current_user->ID;
		$tempMerge[$type]['name'] = $current_user->Name;


		$title = $current_user->Name . '(' . $current_user->ID . ')';

		$res = $query->getQuery()->execute();

		$merges = array();
		foreach ($res as $merge) {
			$tempMerge['active']['id'] = $tempMerge[$anti_type]['id'] = $merge->ID;
			$tempMerge['active']['name'] = $tempMerge[$anti_type]['name'] = $merge->Name;

			$merges[] = $tempMerge;
		}

		echo json_encode(array(
			'data' => array(
				'ID' => $id,
				'List' => $merges,
				'ItemName' => $title
			)
		));
	}

	public function addtiesAction()
	{
		$this->view->disable();

		$pm_ids = $this->request->getQuery('list_pm');
		$party_cp_ids = $this->request->getQuery('list_cp');

		if (!is_array($pm_ids) && !is_array($party_cp_ids)) {
			return;
		}

		for ($i = 0; $i < count($pm_ids); $i++) {
			$pm_ids[$i] = (int)$pm_ids[$i];
		}
		for ($i = 0; $i < count($party_cp_ids); $i++) {
			$party_cp_ids[$i] = (int)$party_cp_ids[$i];
		}

		$cp_ids = array();
		$chanel_partners = \ChannelPartner::find('party_id IN (' . implode(',', $party_cp_ids) . ')');
		foreach ($chanel_partners as $chanel_partner) {
			$cp_ids[] = $chanel_partner->id;
		}


		$result = $this->modelsManager->createBuilder()
			->from('ManagerToChannel')
			->inWhere('ManagerToChannel.channel_partner_id', $cp_ids)
			->inWhere('ManagerToChannel.property_manager_id', $pm_ids)
			->getQuery()
			->execute();

		$exist_ties = array();
		foreach ($result as $tie) {
			$exist_ties[] = $tie->property_manager_id . ',' . $tie->channel_partner_id;
		}

		$add_arr = array();

		for ($i = 0; $i < count($pm_ids); $i++) {
			if (!$pm_ids[$i]) {
				continue;
			}

			for ($j = 0; $j < count($cp_ids); $j++) {
				$data = $pm_ids[$i] . ',' . $cp_ids[$j];

				if (!in_array($data, $exist_ties)) {
					$mtc = new \ManagerToChannel();
					$mtc->save(array(
						'property_manager_id' => $pm_ids[$i],
						'channel_partner_id' => $cp_ids[$j]
					));

					$channel = \ChannelPartner::findFirst($cp_ids[$j]);
					$manager = \Party::findFirst($pm_ids[$i]);

					$add_arr[] = array(
						'pm_id' => $pm_ids[$i],
						'cp_id' => $channel->party_id,
						'cp_name' => $channel->channel_name,
						'pm_name' => $manager->Name
					);

				}
			}
		}

//		if (count($add_arr)) {
//			$insert = "INSERT INTO ManagerToChannel(property_manager_id, channel_partner_id) VALUES" . implode(',', $add_arr);
//			$res = $this->modelsManager->executeQuery($insert);
//			foreach ($res->getMessages() as $message) {
//				echo $message, "\n";
//			}
//		}


		echo json_encode(array(
			'data' => array(
				'ties' => $add_arr
			)
		));
	}

	public function merges_ajax_delAction()
	{
		$this->view->disable();

		$merges = $this->request->getQuery('merges');

		if (!is_array($merges)) {
			echo json_encode(array(
				'error' => true,
				'messages' => array("Error: Don't have any merge id."),
			));
			return;
		}

		$query = $this->modelsManager->createBuilder()
			->columns('ManagerToChannel.id,
				cp.party_id,
				ManagerToChannel.channel_partner_id,
				ManagerToChannel.property_manager_id')
			->from('ManagerToChannel')
			->innerJoin('ChannelPartner', 'cp.id = ManagerToChannel.channel_partner_id', 'cp');

		for ($i = 0; $i < count($merges); $i++) {
			$query->orWhere("cp.party_id = :cp_id$i: AND ManagerToChannel.property_manager_id = :pm_id$i:", array('cp_id' . $i => (int)$merges[$i][0], 'pm_id' . $i => (int)$merges[$i][1]));
		}
		$deleteMarge = $query->getQuery()->execute();

		$deleted = array();
		$errors = array();
		foreach ($deleteMarge as $merge) {
			$mtc = \ManagerToChannel::findFirst($merge->id);

			if ($mtc && count($mtc)) {
				if (!$mtc->delete()) {
					$messages = 'Merge: ' . $merge->party_id . ' <> ' . $merge->property_manager_id . " error delete: \n";
					foreach ($mtc->getMessages() as $message) {
						$messages .= $message . "\n";
					}
					$errors[] = $messages;
				} else {
					$deleted[] = array(
						$merge->party_id,
						$merge->property_manager_id
					);
				}
			} else {
				$errors[] = "Don't have any merge for delete.";
			}
		}

		echo json_encode(array(
			'error' => !!count($errors),
			'messages' => $errors,
			'data' => array(
				'delete_merges' => $deleted
			)
		));

	}


	public function getcprelationAction()
	{
		$this->view->disable();
		$id = $this->request->getQuery('id', 'int', 0);

		if (!$id) {
			return;
		}

		$pm = \ManagerToChannel::find('channel_partner_id = ' . $id);

		echo json_encode(array(
			'error' => false,
			'data' => array(
				'use_pm' => $pm->toArray()
			)
		));
	}

	#TODO: maybe exist get Party in any classes
	public function getpartyAction() {
		$this->view->disable();

		$party_id = $this->request->getQuery('id', 'int', 0);

		$P = \Party::findFirst($party_id);

		echo json_encode(array(
			'error' => false,
			'message' => '',
			'data' => $P
		));
	}

}




