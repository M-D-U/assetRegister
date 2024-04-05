import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issues.service';

declare var google: any;

@Component({
  selector: 'app-helpus',
  templateUrl: './helpus.component.html',
  styleUrls: ['./helpus.component.scss']
})
export class HelpusComponent implements OnInit {

  sampleData: any[] = [];
  issueCountsByServiceProvider: any[] = [];
  apiUrl_status_counts: any[] = [];
  issueStatusData: any[] = [];
  issue_by_count: any = {};
  issue_by_current_week: any = {}
  issue_by_time_to_resolve: any = {};
  issue_for_the_month: any ={};
  issue_outstaning_list: any[] = [];
  top_5_issue_reporters : any[] = [];
  selectedTab: string = 'dashboard'; // Initially selected tab

  constructor(private issueService: IssueService) {
  }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['timeline', 'corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.fetchIssues();
      this.drawBarGraph();
      this.drawPieChart();
      this.drawColumnChart()
      this.drawTrendlineChart();
      this.getIussueByStatus();
      this.getIssuesByCountFunction();
      this.getTotalIssuesThisCurrentWeek();
      this.getAverageTimetoResolveIssue();
      this.getTotalIssuesThisMonth();
      this.getTopIssueReportes();
      this.getOutstandingIssuesList();
    });
  }

  getOutstandingIssuesList(){
    this.issueService.getTotalOutstandingIssues().subscribe((data: any[]) =>{
      this.issue_outstaning_list = data;
      console.log(data);
    });
}

  getTopIssueReportes(){
    this.issueService.getTopReporters().subscribe((data: any[]) =>{
      this.top_5_issue_reporters = data;
      console.log(data);
      
    })
  }
  getTotalIssuesThisMonth(){
    this.issueService.getTotalIssuesThisCurrentMonth().subscribe((data: any[]) => {
      this.issue_for_the_month = data;
      console.log(data);
    });
  }

  getAverageTimetoResolveIssue() {
    this.issueService.getAverageTimetoResolve().subscribe((data: any[]) => {
      this.issue_by_time_to_resolve = data;
      console.log(data);
    });
  }

  getTotalIssuesThisCurrentWeek() {
    this.issueService.getTotalIssuesCurrentWeek().subscribe((data: any[]) => {
      this.issue_by_current_week = data;
      console.log(data);
    });
  }

  getIssuesByCountFunction() {
    this.issueService.getIssuesByCount().subscribe((data: any[]) => {
      this.issue_by_count = data;
      console.log(data);
    });
  }

  getIussueByStatus() {
    this.issueService.getIssueCountsByServiceProvider().subscribe((data: any[]) => {
      this.issueStatusData = data;
      console.log(data);
    });
  }


  drawTrendlineChart(): void {
    this.issueService.getIssuesByCountMonthly().subscribe((data: any[]) => {
        const dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Month');
        dataTable.addColumn('number', 'Total Count');

        // Iterate through the data and add rows to the DataTable
        data.forEach(item => {
            const monthLabel = item.month_name || 'Unknown'; // Use the month name, handle null values
            dataTable.addRow([monthLabel, parseInt(item.total_count)]);
        });

        const options = {
            title: 'Trendline of Issues by Month',
            legend: { position: 'top' }, // Show legend on top
            chartArea: { width: '70%', height: '70%' }, // Adjust size as needed
            trendlines: {
                0: { type: 'linear', visibleInLegend: true, color: 'green', lineWidth: 3 } // Add trendline
            },
            hAxis: {
                title: 'Month',
                slantedText: false, // Disable slanted text
                textStyle: {
                    fontSize: 12 // Adjust font size for better readability
                }
            },
            vAxis: {
                title: 'Total Count',
                minValue: 0
            }
        };

        const chart = new google.visualization.LineChart(document.getElementById('trendline_chart'));
        chart.draw(dataTable, options);
    });
}



  drawColumnChart(): void {
    // Fetch issue counts by category from the service
    this.issueService.getIssueCountsByCategory().subscribe((data: any[]) => {
      // Create a new DataTable
      const dataTable = new google.visualization.DataTable();
      // Add columns to the DataTable
      dataTable.addColumn('string', 'Category');
      dataTable.addColumn('number', 'Total Count');
      dataTable.addColumn({ type: 'string', role: 'style' });
      dataTable.addColumn({ type: 'string', role: 'annotation' }); // Add annotation column
  
      // Iterate through the data and add rows to the DataTable
      data.forEach(item => {
        // Generate a random color for each category
        const color = this.getRandomColor();
        // Add a row with category, count, color, and annotation
        dataTable.addRow([item.Category, parseInt(item.total_count), color, item.Category]); // Use category name as annotation
      });
  
      // Set options for the chart
      const options = {
        title: 'Issues by Category', // Chart title
        legend: { position: 'none' }, // Hide the legend
        chartArea: { width: '80%', height: '70%',bar: {groupWidth: "95%"},
        legend: { position: "none" }, }, // Adjust chart area width and height
        hAxis: {
          title: 'Category', // X-axis title
          textStyle: {
            bold: true,
            fontSize: 12,
            color: '#4d4d4d' // Text color for X-axis labels
          },
          slantedText: true, // Slant X-axis labels
          slantedTextAngle: 45 // Angle for slanted X-axis labels
        },
        vAxis: {
          title: 'Total Count', // Y-axis title
          minValue: 0 // Minimum value for Y-axis
        },
        isStacked: true // Enable stacking of bars
      };
  
      // Instantiate and draw the ColumnChart
      const chart = new google.visualization.ColumnChart(document.getElementById('column_chart'));
      chart.draw(dataTable, options);
    });
  }
  
  

  // Function to generate random colors
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  } 

  drawBarGraph(): void {
    this.issueService.getIssueCountByResolutionStatus().subscribe((data: any[]) => {
      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Status');
      dataTable.addColumn('number', 'Total Count');

      data.forEach(item => {
        dataTable.addRow([item.Status, parseInt(item.total_count)]);
      });

      const options = {
        title: 'Issues by Resolution Status',
        legend: { position: 'none' },
        chartArea: { width: '50%' },
        hAxis: {
          title: 'Total Count',
          minValue: 0
        },
        vAxis: {
          title: 'Status'
        }
      };

      const chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
      chart.draw(dataTable, options);
    });
  }



  fetchIssues(): void {
    this.issueService.getIssues().subscribe(data => {
      this.sampleData = data;
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  drawPieChart(): void {
    this.issueService.getIssueCountsByServiceProvider().subscribe((data: any[]) => {
      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn('string', 'Service Provider');
      dataTable.addColumn('number', 'Issues');

      data.forEach(item => {
        dataTable.addRow([item['Service Provider'], item['total_count']]);
      });

      const options = {
        title: 'Issues by Service Provider',
        chartArea: { width: '80%', height: '80%' }, // Adjust size as needed
      };

      const chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
      chart.draw(dataTable, options);
    });
  }
}
