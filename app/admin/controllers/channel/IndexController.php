<?php
/**
 * Created by PhpStorm.
 * User: unknownartist
 * Date: 1/27/14
 * Time: 12:29 PM
 */
namespace Razor\Admin\Controllers\channel;
use \Phalcon\Mvc\Controller;

class IndexController extends ChannelBaseController {
	public function indexAction(){
		$this->assets
			->addCss('css/admin/channel/dashboard.css');

		$currentTime = time();
		$date = date('Y-m-d', $currentTime - 1*24*3600);

		$query = $this->modelsManager->createBuilder()
			->columns("COUNT(Reservation.ID) as countRes, SUM(Reservation.Price) as sumPrices")
			->from('Reservation')
			->where('Reservation.AgentID = ' . (int) $this->view->user_id)
			->andWhere("Reservation.Date >= '$date' AND Reservation.Date <= NOW()");
		$this->view->resByDay = $query->getQuery()->execute()->getFirst();
		$this->view->resByDay->avg = ($this->view->resByDay->sumPrices && $this->view->resByDay->countRes) ? $this->view->resByDay->sumPrices / $this->view->resByDay->countRes : 0;

		$date = date('Y-m-d', $currentTime - 7*24*3600);
		$query = $this->modelsManager->createBuilder()
			->columns("COUNT(Reservation.ID) as countRes, SUM(Reservation.Price) as sumPrices")
			->from('Reservation')
			->where('Reservation.AgentID = ' . (int) $this->view->user_id)
			->andWhere("Reservation.Date >= '$date' AND Reservation.Date <= NOW()");
		$this->view->resByWeek = $query->getQuery()->execute()->getFirst();
		$this->view->resByWeek->avg = ($this->view->resByWeek->sumPrices && $this->view->resByWeek->countRes) ? $this->view->resByWeek->sumPrices / $this->view->resByWeek->countRes : 0;


		$date = date('Y-m-d', $currentTime - 30*24*3600);
		$query = $this->modelsManager->createBuilder()
			->columns("COUNT(Reservation.ID) as countRes, SUM(Reservation.Price) as sumPrices")
			->from('Reservation')
			->where('Reservation.AgentID = ' . (int) $this->view->user_id)
			->andWhere("Reservation.Date >= '$date' AND Reservation.Date <= NOW()");
		$this->view->resByMonth = $query->getQuery()->execute()->getFirst();
		$this->view->resByMonth->avg = ($this->view->resByMonth->sumPrices && $this->view->resByMonth->countRes) ? $this->view->resByMonth->sumPrices / $this->view->resByMonth->countRes : 0;


		$query = $this->modelsManager->createBuilder()
			->columns("COUNT(Reservation.ID) as countRes, SUM(Reservation.Price) as sumPrices")
			->from('Reservation')
			->where('Reservation.AgentID = ' . (int) $this->view->user_id);
//			->andWhere("Reservation.Date >= '$date' AND Reservation.Date <= NOW()");
		$this->view->resByAll = $query->getQuery()->execute()->getFirst();
		$this->view->resByAll->avg = ($this->view->resByAll->sumPrices && $this->view->resByAll->countRes) ? $this->view->resByAll->sumPrices / $this->view->resByAll->countRes : 0;


		$this->view->setVar('main_menu_active', 'dashboard');
		$this->view->setVar('tasks_list', '');
		$this->view->setVar('messages_list', '');
		$this->view->setVar('distributions_list', '');
		$this->view->setVar('refer_freand', false);
	}
}