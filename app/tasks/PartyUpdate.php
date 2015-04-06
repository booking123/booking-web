<?php

/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 14.03.14
 * Time: 13:32
 */
class PartyUpdate extends \Phalcon\CLI\Task
{
	public function updatepmAction()
	{
		$result = $this->modelsManager->createBuilder()
			->columns('DISTINCT Party.ID AS ID')
			->from('Party')
			->join('Relation', 'r.HeadID = Party.ID  AND r.LineID = Party.ID', 'r')
			->where("r.Link = :Link:", array("Link" => "ORG_PARTY_Organization"))
			->notInWhere('Party.state', array('Initial', 'Final'))
			->orderBy('Party.Name')
			->getQuery()
			->execute();

		foreach ($result as $user) {
			$this->modelsManager->executeQuery("UPDATE Party SET UserType = 'PropertyManager' WHERE ID=" . $user->ID);
			echo "Row ID = " . $user->ID . " update UserType\n";
		}
	}

	public function setchannelAction()
	{
		$channels = \ChannelPartner::find("state='Created' "); // AND party_id IS NULL

		echo "Count Channel for insert to base: " . count($channels) . "\n";

		foreach ($channels as $channel) {
			$email = $channel->email ? $channel->email : 'agent' . $channel->id . '@notemail.com';

			$party_arr = array(
				'EmployerID' => $channel->id,
				'CreatorID' => 5,
				'LocationID' => null,
				'FinanceID' => null,
				'JurisdictionID' => null,
				'AltPartyID' => null,
				'AltID' => null,
				'Name' => $channel->channel_name,
				'State' => $channel->state,
				'Options' => 11,
				'ExtraName' => null,
				'IdentityNumber' => null,
				'TaxNumber' => null,
				'PostalAddress' => $channel->office_address,
				'PostalCode' => '',
				'Country' => '',
				'EmailAddress' => $email,
				'Password' => '$2a$10$Eq6tdYZ7oG8rMTSYULtpEu2X8rm5B3Jv9HBlFAtByVVDEPmCjtz2e',
				'WebAddress' => $channel->privacy_policy,
				'DayPhone' => $channel->phone,
				'NightPhone' => null,
				'FaxPhone' => null,
				'MobilePhone' => null,
				'Birthdate' => null,
				'Language' => 'EN',
				'Currency' => 'USD',
				'Unit' => 0,
				'FormatDate' => 'MM/dd/yyyy',
				'FormatPhone' => '(###)###-####',
				'Latitude' => null,
				'Longitude' => null,
				'Altitude' => 0,
				'Rank' => 0,
				'Notes' => null,
				'version' => @date('Y-m-d H:i:s'),
				'UserType' => 'ChannelPartner',
				'skip_license' => 0
			);

			$Party = new \Party();
			if (!$Party->save($party_arr)) {
				echo "\nParty insert error. Channel " . $channel->id . ": ";
				foreach ($Party->getMessages() as $message) {
					echo $message, ",";
				}
				continue;
			}


			$channel->party_id = $Party->ID;
			if (!$channel->save()) {
				echo "\nChanel update error: ";
				foreach ($channel->getMessages() as $message) {
					echo $message, ",";
				}
			}

			$party_role_arr = array(
				'Link' => 'Party Role',
				'HeadID' => $Party->ID,
				'LineID' => 10,
				'version' => @date('Y-m-d H:i:s')
			);
			$Rol = new \Relation();
			if (!$Rol->save($party_role_arr)) {
				echo "\nRol 'Party Role': " . json_encode($party_role_arr);
				foreach ($Rol->getMessages() as $message) {
					echo $message, ",";
				}
			}

			$rol_arr = array(
				'Link' => 'ORG_PARTY_Employer',
				'HeadID' => $Party->ID,
				'LineID' => $Party->ID,
				'version' => @date('Y-m-d H:i:s')
			);
			$Rol = new \Relation();
			if (!$Rol->save($rol_arr)) {
				echo "\nRol 'ORG_PARTY_Employer': ";
				foreach ($Rol->getMessages() as $message) {
					echo $message, ",";
				}
			}

			$rol_arr = array(
				'Link' => 'ORG_PARTY_Agent',
				'HeadID' => $Party->ID,
				'LineID' => $Party->ID,
				'version' => @date('Y-m-d H:i:s')
			);
			$Rol = new \Relation();
			if (!$Rol->save($rol_arr)) {
				echo "\nRol 'ORG_PARTY_Agent': ";
				foreach ($Rol->getMessages() as $message) {
					echo $message, ",";
				}
			}

			echo "\nadd to party = " . $channel->id . "\n\n";
		}
	}

}