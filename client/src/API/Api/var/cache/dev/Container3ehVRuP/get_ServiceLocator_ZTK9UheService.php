<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private '.service_locator.ZTK9Uhe' shared service.

return $this->privates['.service_locator.ZTK9Uhe'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($this->getService, [
    'cat' => ['privates', '.errored..service_locator.ZTK9Uhe.App\\Entity\\Category', NULL, 'Cannot autowire service "fos_rest.serializer.form_error_handler.inner": it references class "App\\Entity\\Category" but no such service exists.'],
    'manger' => ['services', 'doctrine.orm.default_entity_manager', 'getDoctrine_Orm_DefaultEntityManagerService', false],
], [
    'cat' => 'App\\Entity\\Category',
    'manger' => '?',
]);