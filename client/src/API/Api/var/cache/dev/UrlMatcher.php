<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/article' => [
            [['_route' => 'article_index', '_controller' => 'App\\Controller\\ArticleController::index'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'article_new', '_controller' => 'App\\Controller\\ArticleController::create'], null, ['POST' => 0], null, false, false, null],
        ],
        '/login' => [[['_route' => 'api_login', '_controller' => 'App\\Controller\\AuthController::login'], null, ['POST' => 0], null, false, false, null]],
        '/register' => [[['_route' => 'api_register', '_controller' => 'App\\Controller\\AuthController::register'], null, ['POST' => 0], null, false, false, null]],
        '/category' => [
            [['_route' => 'categories_all', '_controller' => 'App\\Controller\\CategoryController::readAll'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'category_create', '_controller' => 'App\\Controller\\CategoryController::create'], null, ['POST' => 0], null, false, false, null],
        ],
        '/search' => [[['_route' => 'search', '_controller' => 'App\\Controller\\SearchController::Search'], null, ['GET' => 0], null, false, false, null]],
        '/user/user' => [[['_route' => 'user', '_controller' => 'App\\Controller\\UserController::index'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/article/([^/]++)(?'
                    .'|(*:27)'
                    .'|/increment(*:44)'
                    .'|(*:51)'
                .')'
                .'|/category/([^/]++)(?'
                    .'|(*:80)'
                    .'|/article(*:95)'
                    .'|(*:102)'
                .')'
                .'|/user/([^/]++)/check(*:131)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        27 => [[['_route' => 'article_show', '_controller' => 'App\\Controller\\ArticleController::read'], ['id'], ['GET' => 0], null, false, true, null]],
        44 => [[['_route' => 'article_inc_views', '_controller' => 'App\\Controller\\ArticleController::incrementViews'], ['id'], ['PUT' => 0, 'PATCH' => 1], null, false, false, null]],
        51 => [
            [['_route' => 'article_delete', '_controller' => 'App\\Controller\\ArticleController::delete'], ['id'], ['DELETE' => 0], null, false, true, null],
            [['_route' => 'article_update', '_controller' => 'App\\Controller\\ArticleController::update'], ['id'], ['POST' => 0], null, false, true, null],
        ],
        80 => [[['_route' => 'category_read', '_controller' => 'App\\Controller\\CategoryController::read'], ['id'], ['GET' => 0], null, false, true, null]],
        95 => [[['_route' => 'category_article_all', '_controller' => 'App\\Controller\\CategoryController::readNestedArticles'], ['id'], null, null, false, false, null]],
        102 => [
            [['_route' => 'category_upd', '_controller' => 'App\\Controller\\CategoryController::update'], ['id'], ['POST' => 0], null, false, true, null],
            [['_route' => 'del_category', '_controller' => 'App\\Controller\\CategoryController::deleteCategory'], ['id'], ['DELETE' => 0], null, false, true, null],
        ],
        131 => [
            [['_route' => 'is_admin', '_controller' => 'App\\Controller\\UserController::is_admin'], ['token'], ['GET' => 0], null, false, false, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
