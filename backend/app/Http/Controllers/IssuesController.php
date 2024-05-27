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


    /* public function countIssuesByWeek()
    {
        $issueCountsByWeek = DB::table('it_info')
            ->select(DB::raw('YEARWEEK(STR_TO_DATE(`Date/Time Fault Reported`, "%Y-%m-%d")) AS week_number'), DB::raw('COUNT(*) AS total_count'))
            ->groupBy('week_number')
            ->get();

        return response()->json($issueCountsByWeek);
    } */
    public function getIssueCountsByMonth()
    {
        $issueCountsByMonth = DB::select("
        SELECT 
    MONTHNAME(STR_TO_DATE(`Date/Time Fault Reported`, '%Y-%m-%d')) AS month_name, 
    COUNT(*) AS total_count 
FROM 
    it_info 
GROUP BY 
    MONTHNAME(STR_TO_DATE(`Date/Time Fault Reported`, '%Y-%m-%d')), 
    YEAR(STR_TO_DATE(`Date/Time Fault Reported`, '%Y-%m-%d')),
    MONTH(STR_TO_DATE(`Date/Time Fault Reported`, '%Y-%m-%d'))
ORDER BY 
    YEAR(STR_TO_DATE(`Date/Time Fault Reported`, '%Y-%m-%d')), 
    MONTH(STR_TO_DATE(`Date/Time Fault Reported`, '%Y-%m-%d'));

");

        return response()->json($issueCountsByMonth);
    }

    public function getIssueCountsByWeek(): JsonResponse
    {
        $issueCountsByWeek = DB::table('it_info')
            ->select(DB::raw('YEARWEEK(STR_TO_DATE(`Date/Time Fault Reported`, "%A, %d %M %Y")) AS week_number'), 
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

    public function getTopReporters()
    {
        // Execute the SQL command
        $topReporters = DB::select("
            SELECT `Reported By` AS reporter_name, `Reported By Email` AS reporter_email, COUNT(*) AS total_reports 
            FROM it_info 
            GROUP BY `Reported By`, `Reported By Email` 
            ORDER BY total_reports DESC 
            LIMIT 6
        ");

        // Loop through the top reporters to fetch their issues
    foreach ($topReporters as $reporter) {
        // Retrieve issues reported by each reporter
        $issues = DB::table('it_info')
                    ->select('Date/Time Fault Reported', 'Service Provider', 'Fault Reported', 'Category', 'Assigned to', 'Status')
                    ->where('Reported By', $reporter->reporter_name)
                    ->get();

        // Add issues to the reporter object
        $reporter->issues = $issues;
    }

    // Return the results
    return response()->json($topReporters);
    }

    public function getOutstandingIssues()
    {
        // Execute SQL command to retrieve outstanding issues
        $outstandingIssues = DB::select("
            SELECT 
                `Fault Reported` AS issue_description,
                `Reported By` AS reporter_name,
                `Assigned to` AS assigned_to,
                `Date/Time Fault Reported` AS logged_time,
                `Service Provider` AS service_provider
            FROM it_info
            WHERE `Status` = 'Outstanding'
        ");

        // Return the results as JSON
        return response()->json($outstandingIssues);
    }

    public function issuesByCategoryCurrentWeek()
    {
        $currentWeekIssues = DB::select("
            SELECT 
                category,
                COUNT(*) AS total_count
            FROM 
                it_info 
            WHERE 
                YEAR(`Date/Time Fault Reported`) = YEAR(CURDATE()) 
                AND WEEK(`Date/Time Fault Reported`) = WEEK(CURDATE())
            GROUP BY 
                category;
        ");

        return response()->json($currentWeekIssues);
    }

    public function issuesByCategoryWeekBeforeCurrentWeek()
    {
        $weekBeforeIssues = DB::select("
        SELECT 
        category,
        COUNT(*) AS total_count
        FROM 
            it_info 
        WHERE 
            YEAR(`Date/Time Fault Reported`) = YEAR(CURDATE()) 
            AND WEEK(`Date/Time Fault Reported`) = WEEK(CURDATE()) - 1
        GROUP BY 
        category;
        ");

        return response()->json($weekBeforeIssues);
    }


    public function issuesByCategoryJanuary()
    {
        $data = DB::select("
        SELECT 
        YEAR(`Date/Time Fault Reported`) AS year,
        MONTH(`Date/Time Fault Reported`) AS month_number,
        MONTHNAME(`Date/Time Fault Reported`) AS month,
        category,
        COUNT(*) AS total_count
        FROM 
            it_info 
        WHERE 
            YEAR(`Date/Time Fault Reported`) = 2024
            AND MONTH(`Date/Time Fault Reported`) = 1
        GROUP BY 
            year, month_number, month, category
        ORDER BY 
            year, month_number;
        ");

        return response()->json($data);
    }


    public function issuesByCategoryFeb()
    {
        $data = DB::select("
        SELECT 
        YEAR(`Date/Time Fault Reported`) AS year,
        MONTH(`Date/Time Fault Reported`) AS month_number,
        MONTHNAME(`Date/Time Fault Reported`) AS month,
        category,
        COUNT(*) AS total_count
        FROM 
            it_info 
        WHERE 
            YEAR(`Date/Time Fault Reported`) = 2024
            AND MONTH(`Date/Time Fault Reported`) = 2
        GROUP BY 
            year, month_number, month, category
        ORDER BY 
            year, month_number;
        ");

        return response()->json($data);
    }


    public function issuesByCategoryMarch()
    {
        $data = DB::select("
        SELECT 
        YEAR(`Date/Time Fault Reported`) AS year,
        MONTH(`Date/Time Fault Reported`) AS month_number,
        MONTHNAME(`Date/Time Fault Reported`) AS month,
        category,
        COUNT(*) AS total_count
        FROM 
            it_info 
        WHERE 
            YEAR(`Date/Time Fault Reported`) = 2024
            AND MONTH(`Date/Time Fault Reported`) = 3
        GROUP BY 
            year, month_number, month, category
        ORDER BY 
            year, month_number;
        ");

        return response()->json($data);
    }


    public function issuesByCategoryApril()
    {
        $data = DB::select("
        SELECT 
        YEAR(`Date/Time Fault Reported`) AS year,
        MONTH(`Date/Time Fault Reported`) AS month_number,
        MONTHNAME(`Date/Time Fault Reported`) AS month,
        category,
        COUNT(*) AS total_count
        FROM 
            it_info 
        WHERE 
            YEAR(`Date/Time Fault Reported`) = 2024
            AND MONTH(`Date/Time Fault Reported`) = 4
        GROUP BY 
            year, month_number, month, category
        ORDER BY 
            year, month_number;
        ");

        return response()->json($data);
    }

    public function issuesByCategoryMay()
    {
        $data = DB::select("
        SELECT 
        YEAR(`Date/Time Fault Reported`) AS year,
        MONTH(`Date/Time Fault Reported`) AS month_number,
        MONTHNAME(`Date/Time Fault Reported`) AS month,
        category,
        COUNT(*) AS total_count
        FROM 
            it_info 
        WHERE 
            YEAR(`Date/Time Fault Reported`) = 2024
            AND MONTH(`Date/Time Fault Reported`) = 5
        GROUP BY 
            year, month_number, month, category
        ORDER BY 
            year, month_number;
        ");

        return response()->json($data);
    }

}
