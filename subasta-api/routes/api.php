<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SubastaController;
use App\Http\Controllers\Api\OfertaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/subastas', [SubastaController::class, 'index']);

Route::post('/subastas', [SubastaController::class, 'store']);

Route::post('/subastas/{subasta}/ofertas', [OfertaController::class, 'store']);
