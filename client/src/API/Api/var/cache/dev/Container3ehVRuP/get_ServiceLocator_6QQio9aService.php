<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private '.service_locator.6QQio9a' shared service.

return $this->privates['.service_locator.6QQio9a'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($this->getService, [
    'rUser' => ['privates', 'App\\Repository\\UserRepository', 'getUserRepositoryService.php', true],
], [
    'rUser' => 'App\\Repository\\UserRepository',
]);