<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GigController;
use App\Http\Controllers\LanguagesController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\OrderSseController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SkillsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user', [UserController::class, 'update']);
    Route::post('/user/verify', [UserController::class, 'verify']);
    Route::get('/user', [UserController::class, 'index']);
    Route::delete('/user', [UserController::class, 'destroy']);
});

Route::post('/login', [AuthController::class, 'Login']);
Route::post('/register', [AuthController::class, 'Register']);
Route::post('/logout', [AuthController::class, 'Logout'])->middleware('auth:sanctum');

Route::get('/gigs', [GigController::class, 'index']);
Route::get('/gig/show/{id}', [GigController::class, 'show']);
Route::post('/gigs/add', [GigController::class, 'store'])->middleware('auth:sanctum');
Route::post('/gigs/update/{id}', [GigController::class, 'update'])->middleware('auth:sanctum');
Route::post('/gigs/delete/{id}', [GigController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/gigs/{id}/reviews/', [ReviewController::class, 'show']);
Route::post('/gigs/reviews', [ReviewController::class, 'store'])->middleware('auth:sanctum');
Route::post('/gigs/{id}/reviews/delete', [ReviewController::class, 'destroy'])->middleware('auth:sanctum');

Route::post('/payment', [PaypalController::class, 'payment'])->name('payment')->middleware('auth:sanctum');
Route::get('/cancel', [PaypalController::class, 'cancel'])->name('payment.cancel');
Route::get('/success', [PaypalController::class, 'success'])->name('payment.success');
Route::post('/payout', [PayPalController::class, 'createPayout'])->middleware('auth:sanctum');
Route::post('/refund/{id}', [PaypalController::class, 'processRefund']);
Route::post('/acceptOrder/{id}', [PaypalController::class, 'acceptOrder']);
Route::get('/payment-message', [PayPalController::class, 'message'])->name('payment.message');

Route::get('/orders/poll/{userId}', [OrdersController::class, 'pollOrders']);
Route::get('/orders/seen/{userId}', [OrdersController::class, 'orderSeen']);
Route::get('/orders/{userId}', [OrdersController::class, 'index'])->middleware('auth:sanctum');

Route::prefix('languages')->group(function () {
    Route::post('/', [LanguagesController::class, 'store']);
    Route::put('/{language}', [LanguagesController::class, 'update']);
    Route::delete('/{language}', [LanguagesController::class, 'destroy']);
});

Route::prefix('skills')->group(function () {
    Route::post('/', [SkillsController::class, 'store']);
    Route::put('/{skill}', [SkillsController::class, 'update']);
    Route::delete('/{skill}', [SkillsController::class, 'destroy']);
});