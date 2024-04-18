<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IssuesController;
use App\Models\Issue;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/issue-counts-by-category', [IssuesController::class, 'getIssueCountsByCategory']);//bar graph
Route::get('/issue-counts-by-resolution-status', [IssuesController::class, 'countIssuesByResolutionStatus']); //bar graph
Route::get('/weekly-issue-stats', [IssuesController::class, 'getWeeklyIssueStats']);
Route::get('/total-issues-this-month', [IssuesController::class, 'getTotalIssuesThisMonth']);
Route::get('/total-issues-this-week', [IssuesController::class, 'getTotalIssuesThisWeek']);
Route::get('/issue-counts-by-service-provider', [IssuesController::class, 'getIssueCountsByServiceProvider']); //pie chart
Route::get('/issue-counts-by-week', [IssuesController::class, 'countIssuesByWeek']);
Route::get('/average-time-to-resolve', [IssuesController::class, 'getAverageTimeToResolve']);
Route::get('/issues', [IssuesController::class, 'index']);
Route::get('/issues/counts', [IssuesController::class, 'getIssueCounts']);
Route::get('/top-reporters', [IssuesController::class, 'getTopReporters']);
Route::post('/issues', [IssuesController::class, 'store']);
Route::get('/issues/{id}', [IssuesController::class, 'show']);
Route::put('/issues/{id}', [IssuesController::class, 'update']);
Route::delete('/issues/{id}', [IssuesController::class, 'destroy']);
Route::get('/outstanding-issues', [IssuesController::class, 'getOutstandingIssues']);
Route::get('/issue-counts-by-month', [IssuesController::class, 'getIssueCountsByMonth']);
Route::get('/outstanding-issues', [IssuesController::class, 'getOutstandingIssues']);
Route::get('/current-week', [IssuesController::class, 'issuesByCategoryCurrentWeek']);//issues the current week
Route::get('/previous-week', [IssuesController::class, 'issuesByCategoryWeekBeforeCurrentWeek']);//issues the previous week
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
