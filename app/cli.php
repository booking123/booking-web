<?php
/**
 * Created by PhpStorm.
 * User: veniamins
 */
use Phalcon\DI\FactoryDefault\CLI as CliDI,
    Phalcon\CLI\Console as ConsoleApp,
    Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;

define('VERSION', '1.0.0');

//Using the CLI factory default services container
$di = new CliDI();

// Define path to application directory
defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__)));

/**
 * Register the autoloader and tell it to register the tasks directory
 */
$loader = new \Phalcon\Loader();

//var_dump( APPLICATION_PATH . '/models/' );
//die( );

$loader->registerDirs(
    array(
        APPLICATION_PATH . '/tasks',
        // APPLICATION_PATH . '/models/',
        __DIR__ . '/../app/models/',
    )
);
$loader->register();


// Load the configuration file (if any)
if(is_readable(APPLICATION_PATH . '/config/config.php')) {
    $config = include APPLICATION_PATH . '/config/config.php';



    $di->set('config', $config);
}

// Initialize database
$di->set('db', function() use ($config) {
    return new DbAdapter(array(
        'host' => $config->database->host,
        'username' => $config->database->username,
        'password' => $config->database->password,
        'dbname' => $config->database->dbname
    ));
});

// Load memcache
$di->set('memcache', function()  use ($config) {
    $frontCache = new Phalcon\Cache\Frontend\Data(array(
        "lifetime" => $config->memcache->lifetime
    ));

    $cache = new Phalcon\Cache\Backend\Memcache($frontCache, array(
        'host'       => $config->memcache->host,
        'port'       => $config->memcache->port,
        'persistent' => false
    ));

    return $cache;
});

// Model manager
$di->set('modelsManager', function () {
    return new Phalcon\Mvc\Model\Manager();
});

//Create a console application
$console = new ConsoleApp();
$console->setDI($di);

/**
 * Process the console arguments
 */
$arguments = array();
$params = array();

foreach($argv as $k => $arg) {
    if( $k == 1 ){
        $arguments['task'] = $arg;
    } elseif( $k == 2 ) {
        $arguments['action'] = $arg;
    } elseif( $k >= 3 ) {
        $params[] = $arg;
    }
}
if( count($params) > 0 ){
    $arguments['params'] = $params;
}

// define global constants for the current task and action
define('CURRENT_TASK', (isset($argv[1]) ? $argv[1] : null));
define('CURRENT_ACTION', (isset($argv[2]) ? $argv[2] : null));

// $di->setShared('console', $console);
try {
    $loader = new \Phalcon\Loader();
    $loader->registerDirs(array(
        __DIR__ . '/../app/models/',
        __DIR__ . '/../app/obj/',
        __DIR__ . '/../app/obj/user/',
    ));

    $loader->register();

    // handle incoming arguments
    $console->handle( $arguments );
}
catch ( \Phalcon\Exception $e ) {
    echo $e->getMessage();
    exit(255);
}
?>