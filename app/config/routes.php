<?php
$router = new Phalcon\Mvc\Router();

$router->setDefaultModule("frontend");

$router->add('/:module/:controller/:action/:params', array(
	'module' => 1,
	'controller' => 2,
	'action' => 3,
	'params' => 4
));


// Routes for PM module into admin module
$router->add('/:module/pm/:controller/:params', array(
    'namespace'  => 'Razor\Admin\Controllers\pm',
    'module'     => 1,
    'controller' => 2,
    'action'     => 'index',
    'params'     => 4
));
$router->add('/:module/pm/:controller/:action/:params', array(
    'namespace'  => 'Razor\Admin\Controllers\pm',
    'module'     => 1,
    'controller' => 2,
    'action'     => 3,
    'params'     => 4
));
$router->add('/:module/pm/', array(
    'namespace'  => 'Razor\Admin\Controllers\pm',
    'module'     => 1,
    'controller' => 'index',
    'action'     => 'index',
));

// Routes for ROOT module into admin module
$router->add('/:module/root/:controller/:params', array(
	'namespace'  => 'Razor\Admin\Controllers\root',
	'module'     => 1,
	'controller' => 2,
	'action'     => 'index',
	'params'     => 4
));
$router->add('/:module/root/:controller/:action/:params', array(
    'namespace'  => 'Razor\Admin\Controllers\root',
    'module'     => 1,
    'controller' => 2,
    'action'     => 3,
    'params'     => 4
));
$router->add('/:module/root/', array(
    'namespace'  => 'Razor\Admin\Controllers\root',
    'module'     => 1,
    'controller' => 'index',
    'action'     => 'index',
));


// Routes for Channel module into admin module
$router->add('/:module/channel/:controller/:params', array(
	'namespace'  => 'Razor\Admin\Controllers\channel',
	'module'     => 1,
	'controller' => 2,
	'action'     => 'index',
	'params'     => 4
));
$router->add('/:module/channel/:controller/:action/:params', array(
    'namespace'  => 'Razor\Admin\Controllers\channel',
    'module'     => 1,
    'controller' => 2,
    'action'     => 3,
    'params'     => 4
));
$router->add('/:module/channel/', array(
    'namespace'  => 'Razor\Admin\Controllers\channel',
    'module'     => 1,
    'controller' => 'index',
    'action'     => 'index',
));

return $router;