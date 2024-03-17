<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IssuesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Issue::all();
    }

    public function store(Request $request)
    {
        // Logic to store a new issue
    }

    public function show($id)
    {
        return Issue::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        // Logic to update an existing issue
    }

    public function destroy($id)
    {
        // Logic to delete an existing issue
    }

    public function getIssueCounts()
    {
        try {
            $query = "SELECT 
                SUM(CASE WHEN `Status` = 'Outstanding' THEN 1 ELSE 0 END) AS outstanding_count, 
                SUM(CASE WHEN `Status` = 'Resolved' THEN 1 ELSE 0 END) AS resolved_count, 
                COUNT(*) AS total_count 
                FROM `it_info`";

            $results = DB::select(DB::raw($query));

            return response()->json($results[0]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching issue counts.'], 500);
        }
    }

    public function getIssueCountsByCategory()
    {
        $issueCounts = DB::table('it_info')
            ->select('Category', DB::raw('COUNT(*) AS total_count'))
            ->groupBy('Category')
            ->orderByDesc('total_count')
            ->get();

        return response()->json($issueCounts);
    }


    public function getWeeklyIssueStats()
    {
        $weeklyIssueStats = DB::table('it_info')
            ->select('Category', 'Service Provider', 'Reported By', 'Reported By Email', 'Assigned to', 'Status', DB::raw('COUNT(*) AS TotalIssues'))
            ->whereRaw('YEARWEEK(STR_TO_DATE(`Date/Time Fault Reported`, "%Y-%m-%d"), 1) = YEARWEEK(CURDATE(), 1)')
            ->groupBy('Category', 'Service Provider', 'Reported By', 'Reported By Email', 'Assigned to', 'Status')
            ->get();

        return response()->json($weeklyIssueStats);
    }


    public function getTotalIssuesThisWeek()
    {
        $totalIssuesThisWeek = DB::table('it_info')
            ->whereRaw('WEEK(STR_TO_DATE(`Date/Time Fault Reported`, "%Y-%m-%d")) = WEEK(CURDATE())')
            ->count();

        return response()->json(['total_issues_this_week' => $totalIssuesThisWeek]);
    }


    public function getIssueCountsByServiceProvider()
    {
        $issueCountsByServiceProvider = DB::table('it_info')
            ->select('Service Provider', DB::raw('COUNT(*) AS total_count'))
            ->groupBy('Service Provider')
            ->orderByDesc('total_count') // Sort by total_count in descending order
            ->get();

        return response()->json($issueCountsByServiceProvider);
    }


    public function getAverageTimeToResolve()
    {
        $averageTimeToResolve = DB::table('it_info')
            ->select(DB::raw('AVG(DATEDIFF(`Date/Time Fault Resolved`, `Date/Time Fault Reported`)) AS Average_Time_To_Resolve'))
            ->where('Status', 'resolved')
            ->first();

        return response()->json($averageTimeToResolve);
    }


    public function countIssuesByResolutionStatus()
    {
        $issueCountsByResolutionStatus = DB::table('it_info')
            ->select('Status', DB::raw('COUNT(*) AS total_count'))
            ->groupBy('Status')
            ->get();

        return response()->json($issueCountsByResolutionStatus);
    }


    public function countIssuesByWeek()
    {
        $issueCountsByWeek = DB::table('it_info')
            ->select(DB::raw('YEARWEEK(STR_TO_DATE(`Date/Time Fault Reported`, "%Y-%m-%d")) AS week_number'), DB::raw('COUNT(*) AS total_count'))
            ->groupBy('week_number')
            ->get();

        return response()->json($issueCountsByWeek);
    }
   

    public function getIssueCountsByWeek(): JsonResponse
{
    $issueCountsByWeek = DB::table('it_info')
        ->select(DB::raw('YEARWEEK(STR_TO_DATE(`Date/Time Fault Reported`, "%Y-%m-%d")) AS week_number'), 
                 DB::raw('COUNT(*) AS total_count'))
        ->groupBy('week_number')
        ->orderBy('week_number')
        ->get();

    return response()->json($issueCountsByWeek);
}


public function getTotalIssuesThisMonth()
    {
        $totalIssuesMonth = DB::table('it_info')
            ->selectRaw('COUNT(*) AS TotalIssuesMonth')
            ->whereRaw('MONTH(STR_TO_DATE(`Date/Time Fault Reported`, "%Y-%m-%d")) = MONTH(CURDATE())')
            ->whereRaw('YEAR(STR_TO_DATE(`Date/Time Fault Reported`, "%Y-%m-%d")) = YEAR(CURDATE())')
            ->first();

        return response()->json($totalIssuesMonth);
    }
}
