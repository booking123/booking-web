<?php
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 01.04.14
 * Time: 19:14
 */

namespace Razor\Admin\Controllers\pm;


class ListingsController extends PmBaseController
{

	public function indexAction()
	{
		$this->view->setVar('main_menu_active', 'listings');
		$this->assets
			->addCss('css/admin/pm/listings.css')
			->addCss('css/admin/pm/main.css')
			->addJS('scripts/admin/pm/main.js')
			->addJS('scripts/admin/pm/listings.js');


		$counts_with_status = array();
		$results = array();
		$state_map = array(
			0 => 'Inactive',
			1 => 'Live',
		);

		$count = $this->modelsManager->createBuilder()
			->columns('Product.AssignedtoManager as pAtoM, COUNT(Product.ID) as pCount')
			->from('Product')
			->where("Product.State = 'Created' AND Product.SupplierID = :user_id:", array('user_id' => $this->view->user_id))
			->groupBy('Product.AssignedtoManager');
		$res = $count->getQuery()->execute();
		foreach ($res AS $row) {
			$results[$row['pAtoM']] = $row['pCount'];
		}

		for ($i = 0; $i < count($state_map); $i++) {
			$counts_with_status[$state_map[$i]] = empty($results[$i]) ? 0 : $results[$i];
		}

		$this->view->setVar('counts_with_status', $counts_with_status);
	}


	public function listAction()
	{
		$page_location = $this->request->get('page');
		$per_page = $this->request->get('per_page', 'int', 0);

		$atm = $this->request->get('atm', 'int', 0);
		$products = $this->getListings($page_location, $atm, $per_page);

		$this->view->disable();

		$rows = array();
		foreach ($products->items as $product) {
			$product->Name = utf8_encode($product->Name);
			$product->lName = utf8_encode($product->lName);
			$product->cName = utf8_encode($product->cName);
			$rows[] = $product;

		}

		echo json_encode(array(
			'error' => false,
			'message' => false,
			'data' => array(
				'items' => $rows,
				'first' => $products->first,
				'before' => $products->before,
				'next' => $products->next,
				'last' => $products->last,
				'current' => $products->current,
				'total_pages' => $products->total_pages,
				'total_items' => $products->total_items,
			),
		));
	}


	private function getListings($page, $atm, $per_page)
	{
		$query = $this->modelsManager->createBuilder()
			->columns(array(
				'Product.ID as pID',
				'Product.Name',
				'Product.Room as pBed',
				'Product.inquire_state',
				'Product.State',
				'Product.SupplierID',
				'l.Name as lName',
				'c.Name as cName',
				'Product.Bathroom as pBath'
			))
			->from('Product')
			->leftJoin('Location', 'Product.LocationID = l.ID', 'l')
			->leftJoin('Country', 'l.Country = c.ID','c')
			->where('Product.SupplierID = :pm_id: AND Product.AssignedtoManager = :p_atm: AND Product.State = :p_state:', array(
				'p_state' => 'Created',
				'pm_id' => $this->view->user_id,
				'p_atm' => $atm
			));

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => $per_page,
			"page" => $page
		));

		return $paginator->getPaginate();
	}
} 

