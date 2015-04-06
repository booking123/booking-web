<?php

namespace Razor\Frontend;

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
    public function registerAutoloaders()
    {

        $loader = new Loader();

        $loader->registerNamespaces(
            array(
                'Razor\Frontend\Controllers' => '../app/frontend/controllers/',
                'Razor\Frontend\Models'      => '../app/frontend/models/',
                //'Razor\Frontend\Layouts'      => '../app/frontend/layouts/',
                'User'      => '../app/obj/user/',
            )
        );

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
            $dispatcher->setDefaultNamespace("Razor\Frontend\Controllers");
            return $dispatcher;
        });

        //Registering the view component
        $di->set('view', function() {
            $view = new View();
            $view->setViewsDir( __DIR__ . '/../frontend/views/' );
            $view->registerEngines(array(
                '.volt' => function($view, $di) {
                        $volt = new Volt($view, $di);

                        $volt->setOptions(array(
                            'compiledPath' => __DIR__ . '/../cache/',
                            'compiledSeparator' => '_'
                        ));

                        return $volt;
                    },
                '.phtml' => 'Phalcon\Mvc\View\Engine\Php'
            ));
            return $view;
        });
    }

}