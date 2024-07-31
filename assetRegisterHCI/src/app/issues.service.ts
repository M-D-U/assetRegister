import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl_issues = 'http://127.0.0.1:8000/api/issues';// display all issues

  private apiUrl_category = 'http://127.0.0.1:8000/api/issue-counts-by-category'; // displays issues by the category

  private apiUrl_issues_counts_weekly = 'http://127.0.0.1:8000/api/issue-counts-by-month'; // displays number of issues by week

  private apiUrl_issues_count_current_week = "http://127.0.0.1:8000/api/total-issues-this-week" //counts the number of issues this current week

  private apiUrl_counts_by_service_provider = 'http://127.0.0.1:8000/api/issue-counts-by-service-provider'; // displays issue count by service provider

  private apiUrl_counts = 'http://127.0.0.1:8000/api/issues/counts/' // displays issues by status and total count

  private apiUrl_issue_counts_by_resolution_status = 'http://localhost:8000/api/issue-counts-by-resolution-status' //displays counts by status

  private apiUrl_average_time_to_resolve = 'http://127.0.0.1:8000/api/average-time-to-resolve';

  private apiUrl_total_issues_month = 'http://127.0.0.1:8000/api/total-issues-this-month';

  private apiUrl_issue_report = 'http://127.0.0.1:8000/api/top-reporters';

  private apiUrl_outstanding_issues = 'http://127.0.0.1:8000/api/outstanding-issues';

  private apiUrl_previous_week = 'http://127.0.0.1:8000/api/previous-week';
  
  private apiUrl_current_week = 'http://127.0.0.1:8000/api/current-week';
   
  private apiUrl_current_year_issue_By_category_january = 'http://127.0.0.1:8000/api/issues-by-category-january';

  private apiUrl_current_year_issue_By_category_feb = 'http://127.0.0.1:8000/api/issues-by-category-feb';

  private apiUrl_current_year_issue_By_category_march = 'http://127.0.0.1:8000/api/issues-by-category-march';

  private apiUrl_current_year_issue_By_category_april = 'http://127.0.0.1:8000/api/issues-by-category-april';

  private apiUrl_current_year_issue_By_category_may = 'http://127.0.0.1:8000/api/issues-by-category-may';

  private apiUrl_current_year_issue_By_category_june = 'http://127.0.0.1:8000/api/issues-by-category-june';

  private apiUrl_current_year_issue_By_category_july = 'http://127.0.0.1:8000/api/issues-by-category-july';

  constructor(private http: HttpClient) { }

  getIssues(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl_issues).pipe(
      map((data: any[]) => data) // No need for mapping if the response is already in the correct format
    );
  }

  getTopPreviousWeekIssues(){
    return this.http.get<any[]>(this.apiUrl_previous_week);
  }

  getIssuesByCategoryForCurrentYearJanuary(){
    return this.http.get<any[]>(this.apiUrl_current_year_issue_By_category_january);
  }

  getIssuesByCategoryForCurrentYearFeb(){
    return this.http.get<any[]>(this.apiUrl_current_year_issue_By_category_feb);
  }
  
  getIssuesByCategoryForCurrentYearMarch(){
    return this.http.get<any[]>(this.apiUrl_current_year_issue_By_category_march);
  }

  getIssuesByCategoryForCurrentYearApril(){
    return this.http.get<any[]>(this.apiUrl_current_year_issue_By_category_april);
  }

  getIssuesByCategoryForCurrentYearMay(){
    return this.http.get<any[]>(this.apiUrl_current_year_issue_By_category_may);
  }

  getIssuesByCategoryForCurrentYearJune(){
    return this.http.get<any[]>(this.apiUrl_current_year_issue_By_category_june);
  }

  getIssuesByCategoryForCurrentYearJuly(){
    return this.http.get<any[]>(this.apiUrl_current_year_issue_By_category_july);
  }

  getTopCurrentWeekIssues(){
    return this.http.get<any[]>(this.apiUrl_current_week);
  }

  getTotalOutstandingIssues(){
    return this.http.get<any[]>(this.apiUrl_outstanding_issues);
  }

  getTopReporters(){
    return this.http.get<any[]>(this.apiUrl_issue_report);
  }
  getTotalIssuesThisCurrentMonth(){
    return this.http.get<any[]>(this.apiUrl_total_issues_month);
  }

  getAverageTimetoResolve(){
    return this.http.get<any[]>(this.apiUrl_average_time_to_resolve);
  }
  getTotalIssuesCurrentWeek(){
    return this.http.get<any[]>(this.apiUrl_issues_count_current_week);
  }

  getIssueCountsByCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl_category);
  }

  getIssueCountByResolutionStatus(): Observable<any[]> {
    console.log(this.apiUrl_issue_counts_by_resolution_status); 
    return this.http.get<any[]>(this.apiUrl_issue_counts_by_resolution_status);
  }

  getIssuesByCount(){console.log(this.apiUrl_counts);
    return this.http.get<any[]>(this.apiUrl_counts);
  }

  getIssuesByCountMonthly(){
    return this.http.get<any[]>(this.apiUrl_issues_counts_weekly);
  }

  getIssueCountsByServiceProvider(): Observable<any[]> {
    console.log(this.apiUrl_counts_by_service_provider); 
    return this.http.get<any[]>(this.apiUrl_counts_by_service_provider);
  }
}