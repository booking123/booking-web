<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 01.04.14
 * Time: 19:14
 */

namespace Razor\Admin\Controllers\pm;


class ChannelsController extends PmBaseController
{

	public function indexAction()
	{
		$this->view->setVar('main_menu_active', 'channels');

		$query = $this->modelsManager->createBuilder()
			->columns('channel.id,
			channel.logo_url,
			channel.channel_name,
			channel.coverage,
			channel.channel_type,
			channel.payment_process,
			channel.payouts,
			channel.traffic,
			channel.damage_coverage,
			channel.website_url,
			channel.privacy_policy')
			->from('ManagerToChannel')
			->join('ChannelPartner', 'channel.id = ManagerToChannel.channel_partner_id', 'channel')
			->where('ManagerToChannel.property_manager_id = ' . $this->view->user_id);

		$this->view->setVar('channels', $query->getQuery()->execute());
	}

	public function listAction()
	{
		$channels = $this->modelsManager->executeQuery("SELECT
		  cp.id,
		  cp.privacy_policy,
		  cp.terms_conditions,
		  cp.channel_name,
		  cp.channel_type,
		  cp.logo_url,
		  cp.coverage,
		  cp.payment_process,
		  cp.commission,
		  cp.website_url,
		  cp.listing_fees,
		  mtc.channel_partner_id as used
		FROM ChannelPartner as cp
		LEFT JOIN ManagerToChannel as mtc ON (cp.id = mtc.channel_partner_id AND mtc.property_manager_id = {$this->view->user_id})
		WHERE
		  cp.state='Created'
		  AND cp.channel_type IS NOT NULL
		GROUP BY cp.id
		HAVING used IS NULL");

		$data = array(
			'booking' => array(),
			'listing' => array(),
			'inquiry' => array(),
		);

		foreach ($channels as $channel) {
			if ($channel->used) {
				continue;
			}

			$arr_channel = explode(',', $channel->channel_type);
			for ($i = 0; $i < count($arr_channel); $i++) {
				switch ($arr_channel[$i]) {
					case 1 :
						$data['booking'][] = $channel;
						break;
					case 2 :
						$data['listing'][] = $channel;
						break;
					case 3 :
						$data['inquiry'][] = $channel;
						break;
				}
			}

		}

		$this->view->setVar('channels', $data);
		$this->view->setVar('main_menu_active', 'channels');
	}

	public function addAction()
	{
		$ids = $this->request->getQuery('channels', array());

		for ($i = 0; $i < count($ids); $i++) {
			$ids[$i] = (int)$ids[$i];
		}

		$query_result = $this->modelsManager->createBuilder()
			->columns('channel_partner_id')
			->from('ManagerToChannel')
			->inWhere('channel_partner_id', $ids)
			->andWhere('property_manager_id = ' . $this->view->user_id)
			->getQuery()
			->execute();

		$exist_ids = array();
		foreach ($query_result as $row) {
			$exist_ids[] = $row->channel_partner_id;
		}

#TODO: HIDE error reports!!!
		for ($i = 0; $i < count($ids); $i++) {
			if (!in_array($ids[$i], $exist_ids)) {
				echo $ids[$i], '<br />';
				$ManagerToChannel = new \ManagerToChannel();
				if (!$ManagerToChannel->save(array('channel_partner_id' => $ids[$i], 'property_manager_id' => $this->view->user_id))) {
					foreach ($ManagerToChannel->getMessages() as $message) {
						echo "Message: ", $message->getMessage();
						echo "Field: ", $message->getField();
						echo "Type: ", $message->getType();
					}
				}
			}
		}
		$this->response->redirect('admin/pm/channels/index/');
	}

	public function delAction()
	{
		$ids = $this->request->getQuery('channels', array());

		for ($i = 0; $i < count($ids); $i++) {
			$ids[$i] = (int)$ids[$i];
		}

		$find = 'property_manager_id = ' . $this->view->user_id . " AND channel_partner_id IN (" . implode(',', $ids) . ")";

		$return = array();
		foreach (\ManagerToChannel::find($find) as $channel) {
			$ret = array(
				'id' => $channel->channel_partner_id,
				'error' => true
			);
//			echo $channel->channel_partner_id;
			if ($channel->delete()) {
//				echo "Sorry, we can't delete the robot right now: \n";
//				foreach ($channel->getMessages() as $message) {
//					echo $message, "\n";
//				}
//			} else {
				$ret['error'] = false;
			}
			$return[] = $ret;
		}

		$this->view->disable();

		echo json_encode($return);
	}
}