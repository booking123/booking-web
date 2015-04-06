<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/27/14
 * Time: 12:29 PM
 */
namespace Razor\Admin\Controllers\root;

use \Phalcon\Mvc\Controller;

class IndexController extends RootBaseController{

	public function indexAction()
	{

	}

	public function cleardemouserAction()
	{
		$this->view->disable();

		$result = \PropertyManagerInfo::findFirst('pm_id = 8800');

		if ($result) {
			$result->delete();
		}

		echo json_encode(array('error' => !$result));
	}

	public function updatepmAction()
	{
		$this->view->disable();

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
}