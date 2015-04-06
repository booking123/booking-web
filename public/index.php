<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set('America/New_York');

use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\DI\FactoryDefault;
use Phalcon\Loader;
use Phalcon\Mvc\Application;
use Phalcon\Mvc\Router;
use Phalcon\Mvc\Url as UrlResolver;
use Phalcon\Session\Adapter\Files as SessionAdapter;

// Include project constants
include __DIR__ . "/../app/config/constants.php";
$config = include __DIR__ . "/../app/config/config.php";

// Add www if we need this
/*
if ( strpos($_SERVER['HTTP_HOST'], 'www') !== false ){
    $config->application->baseUri = str_replace('http://', 'http://www.', $config->application->baseUri);
    $config->application->apiUri = str_replace('http://', 'http://www.', $config->application->apiUri);
}

// add httpS if need into config url
if ( isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443 ){
    $config->application->baseUri = str_replace('http://', 'https://', $config->application->baseUri);
    $config->application->apiUri = str_replace('http://', 'https://', $config->application->apiUri);
}
*/
define('SITE_NAME_VHC', 'vacationhomes.center');
define('SITE_NAME_HVH', 'holidayvillas.house');
//define('SITE_NAME_VHC', 'vh.work');

define('API_URL', $config->application->apiUri);

$di = new FactoryDefault();

$di->set('config', $config);

$di->set('url', function () use ($config) {
	$url = new UrlResolver();
	$url->setBaseUri($config->application->baseUri);
	return $url;
}, true);

// Initialize database
$di->set('db', function () use ($config) {
	return new DbAdapter(array(
		'host' => $config->database->host,
		'username' => $config->database->username,
		'password' => $config->database->password,
		'dbname' => $config->database->dbname
	));
});


// Initialize routes
$di->set('router', function(){
	return require __DIR__ . "/../app/config/routes.php";
}, true);

// Initialize session
$di->set('session', function () {
	$session = new SessionAdapter();
	$session->start();
	return $session;
});

// Initialize memcache
$di->set('memcache', function () use ($config) {
	$frontCache = new Phalcon\Cache\Frontend\Data(array(
		"lifetime" => $config->memcache->lifetime
	));

	$cache = new Phalcon\Cache\Backend\Memcache($frontCache, array(
		'host' => $config->memcache->host,
		'port' => $config->memcache->port,
		'persistent' => false
	));

	return $cache;
});

// Model manager
$di->set('modelsManager', function () {
	return new Phalcon\Mvc\Model\Manager();
});

$di->set('voltSettings', function ($view, $di) use ($config) {
	$volt = new Phalcon\Mvc\View\Engine\Volt($view, $di);

	$volt->setOptions(array(
		'compiledPath' => $config->application->cacheDir,
		'compiledSeparator' => '_'
	));

	$volt->getCompiler()->addFunction(
		'get_registration_step',
		function ($id) {
			return "StaticText::get_registration_step({$id})";
		}
	);

	$volt->getCompiler()->addFunction(
		'get_payment_method_type',
		function ($id) {
			return "StaticText::get_payment_method_type({$id})";
		}
	);
	$volt->getCompiler()->addFunction(
		'get_funds_holder',
		function ($id) {
			return "StaticText::get_funds_holder({$id})";
		}
	);

	//
	$volt->getCompiler()->addFunction(
		'number_format',
		function ($id) {
			return "CorrectValues::number_format({$id})";
		}
	);
	$volt->getCompiler()->addFunction(
		'short_currency',
		function ($id) {
			return "CorrectValues::short_currency({$id})";
		}
	);

	return $volt;
});


try {
	$loader = new \Phalcon\Loader();
	$loader->registerDirs(array(
		__DIR__ . '/../app/models/',
		__DIR__ . '/../app/obj/',
		__DIR__ . '/../app/obj/user/',
	));
    
    //var_dump( __DIR__ . '/../app/obj/user/' ); die();

	/*
	$loader->registerNamespaces(array(
		'User' => '/../app/obj/user/'
	));
	*/

	$loader->register();

	$application = new Application($di);
	$application->registerModules(
		array(
			'frontend' => array(
				'className' => 'Razor\Frontend\Module',
				'path' => '../app/frontend/Module.php',
			),
			'admin' => array(
				'className' => 'Razor\Admin\Module',
				'path' => '../app/admin/Module.php',
			),
			'api' => array(
				'className' => 'Razor\Api\Module',
				'path' => '../app/api/Module.php',
			),
		)
	);

	// Обработка запроса
	echo $application->handle()->getContent();

} catch (\Exception $e) {
	echo $e->getMessage();
}
/*
error_reporting(E_ALL);

try {
	$config = include __DIR__ . "/../app/config/config.php";
	include __DIR__ . "/../app/config/loader.php";
	include __DIR__ . "/../app/config/services.php";

	$application = new \
Phalcon\Mvc\Application($di);

	echo $application->handle()->getContent();

} catch (\Exception $e) {
	echo $e->getMessage();
}
*/