<?php

namespace Razor\Admin;

use Phalcon\Loader,
    Phalcon\Mvc\View\Engine\Volt,
    Phalcon\Mvc\Dispatcher,
    Phalcon\Mvc\View,
    Phalcon\Mvc\ModuleDefinitionInterface;

class Module implements ModuleDefinitionInterface
{

    /**
     * Register a specific autoloader for the module
     */
    public function registerAutoloaders(){
        $loader = new Loader();
        $loader->registerNamespaces(
            array(
                'Razor\Admin\Controllers'    => '../app/admin/controllers/',
                'Razor\Admin\Models'         => '../app/admin/models/',
                'User'                       => '../app/obj/user/',
            )
        );

        //die('autoloaders');
        $loader->register();
    }

    /**
     * Register specific services for the module
     */
    public function registerServices($di)
    {
        //Registering a dispatcher
        $di->set('dispatcher', function() {
            $dispatcher = new Dispatcher();
            $dispatcher->setDefaultNamespace("Razor\Admin\Controllers");
            return $dispatcher;
        });

        //Registering the view component
        $di->set('view', function() {
            $view = new View();
            $view->setViewsDir( __DIR__ . '/../admin/views/' );
            $view->registerEngines(array(
                '.volt' => 'voltSettings',
                '.phtml' => 'Phalcon\Mvc\View\Engine\Php'
            ));
            return $view;
        });
    }
}