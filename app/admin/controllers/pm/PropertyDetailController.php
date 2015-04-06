<?php
/* TODO: Old version, we use ListingsController */
/**
 * Created by PhpStorm.
 * User: kostyantin
 * Date: 28.07.14
 * Time: 15:02
 */

namespace Razor\Admin\Controllers\pm;

class PropertyDetailController extends PmBaseController
{

	public function indexAction()
	{
		$this->view->setVar('main_menu_active', 'property_detail');
	}

	public function product_listAction()
	{
		$page = $this->request->getQuery('p', 'int', 0);
		$id = $this->request->getQuery('search_id', 'int', 0);
		$name = $this->request->getQuery('search_name');
		$location_id = $this->request->getQuery('search_location_id', 'int', 0);

		$products = $this->getUserProduct($page, $id, $name, $location_id);

		$this->view->disable();

		$rows = array();
		foreach ($products->items as $product) {
			$product->Name = utf8_encode($product->Name);
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

	public function product_status_changeAction()
	{
		$this->view->disable();

		$status = $this->request->getQuery('status');
		$id = $this->request->getQuery('id', 'int', 0);

		$product = \Product::findFirst($id);

		if (!$product) {
			echo json_encode(array(
				'error' => true,
				'message' => 'Don`t have any product',
				'data' => array()
			));
			return;
		}

		switch ($status) {
			case 'Created' :
//				$product->State = 'Created';
				$product->inquire_state = "";
				break;
			case 'Use API' :
				$product->inquire_state = 'Use API';
				break;
			case 'Send e-mail' :
				$product->inquire_state = 'Send e-mail';
				break;
		}

		$messages = '';
		if (!$product->save()) {
			foreach ($product->getMessages() as $message) {
				$messages .= $message . "\n";
			}
		}

		echo json_encode(array(
			'error' => !!$messages,
			'message' => $messages,
			'data' => array(
				'State' => $product->State,
				'inquire_state' => $product->inquire_state
			)
		));
	}

	private function getUserProduct($page, $id, $name, $location_id)
	{
		$query = $this->modelsManager->createBuilder()
			->columns('DISTINCT Product.ID as pID, Product.Name, Product.State, Product.inquire_state')
			->from('Product')
			->leftJoin('Location', 'Product.LocationID = l.ID', 'l')
			->where('Product.SupplierID = :user_id:', array('user_id' => $this->view->user_id));

		if ($id) {
			$query->andWhere('Product.ID = :id:', array('id' => $id));
		}
		if ($name) {
			$query->andWhere("Product.Name LIKE '%$name%'");
		}

		if ($location_id) {
			$query->andWhere('Product.LocationID = :location_id:', array('location_id' => $location_id));
		}

		$paginator = new \Phalcon\Paginator\Adapter\QueryBuilder(array(
			"builder" => $query,
			"limit" => 10,
			"page" => $page
		));

		return $paginator->getPaginate();
	}
}