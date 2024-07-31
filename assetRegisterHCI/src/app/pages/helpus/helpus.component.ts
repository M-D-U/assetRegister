import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issues.service';
import * as html2pdf from 'html2pdf.js';
import { forkJoin } from 'rxjs';
import { Chart, ChartItem } from 'chart.js/auto';


declare var google: any;
// declare module 'html2pdf.js';
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
  noIssuesMessageVisible: boolean = false; // Flag to indicate if the "No issues" message should be visible
  top_5_issue_reporters : any[] = [];
  previous_week_top_issues : any[] = [];
  current_week_top_issues : any[] = [];
  selectedTab: string = 'dashboard'; // Initially selected tab
  issuesByCategoryTHisMOnthJan : any[] = [];
  issuesByCategoryTHisMOnthFeb : any[] = [];
  issuesByCategoryTHisMOnthMar : any[] = [];
  issuesByCategoryTHisMOntApr : any[] = [];
  issuesByCategoryTHisMOntMay : any[] = [];
  issuesByCategoryTHisMOntJune : any[] = [];
  issuesByCategoryTHisMOntJuly : any[] = [];
  constructor(private issueService: IssueService) {
  }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['timeline', 'corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.fetchIssues();
      this.drawBarGraph();
      this.drawPieChart();
      this.drawColumnChart();
      this.drawCharts();
      this.drawCharts2();
      this.drawCharts3();
      this.drawCharts4();
      this.drawCharts5();
      this.drawCharts6();
      this.drawCharts7();
      this.drawStackedBarChart();
      this.drawTrendlineChart();
      this.getIussueByStatus();
      this.getIssuesByCountFunction();
      this.getTotalIssuesThisCurrentWeek();
      this.getAverageTimetoResolveIssue();
      this.getTotalIssuesThisMonth();
      this.getTopIssueReportes();
      this.getOutstandingIssuesList();
      this.getPreviousWeekTopOutstandingIssues();
      this.getCurrentWeekTopOutstandingIssues();
      this.getCurrentYearIssuesByCategoryFunctionJanuary();
    });
  }

  generatePdf(): void {
    const options = {
      filename: 'helpdesk weekly report.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: 'in', format: 'legal', orientation: 'landscape' } 
    };

    const element = document.getElementById('dashboardInformation');
    html2pdf().from(element).set(options).save();
  }

  getPreviousWeekTopOutstandingIssues(){
    this.issueService.getTopPreviousWeekIssues().subscribe((data: any[]) =>{
      this.previous_week_top_issues = data;
      console.log(data, 'data from previous week by category');
    });
}


  getCurrentWeekTopOutstandingIssues(){
  this.issueService.getTopCurrentWeekIssues().subscribe((data: any[]) =>{
    this.previous_week_top_issues = data;
    console.log(data, 'data from current week by category');
  });
}


getOutstandingIssuesList() {
  this.issueService.getTotalOutstandingIssues().subscribe((data: any[]) => {
      this.issue_outstaning_list = data;
      console.log(data);
      
      // Check if the list is empty
      if (this.issue_outstaning_list.length === 0) {
          // If the list is empty, set the flag to true to show the message
          this.noIssuesMessageVisible = true;
      } else {
          // If the list is not empty, set the flag to false to hide the message
          this.noIssuesMessageVisible = false;
      }
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

  getCurrentYearIssuesByCategoryFunctionJanuary(){
    this.issueService.getIssuesByCategoryForCurrentYearJanuary().subscribe((data: any[]) => {
      this.issuesByCategoryTHisMOnthJan = data;
      console.log(data, 'issues by the year');
    });
  }

  getCurrentYearIssuesByCategoryFunctionFeb(){
    this.issueService.getIssuesByCategoryForCurrentYearFeb().subscribe((data: any[]) => {
      this.issuesByCategoryTHisMOnthFeb = data;
      console.log(data, 'issues by the year');
    });
  }

  getCurrentYearIssuesByCategoryFunctionMar(){
    this.issueService.getIssuesByCategoryForCurrentYearMarch().subscribe((data: any[]) => {
      this.issuesByCategoryTHisMOnthMar = data;
      console.log(data, 'issues by the year');
    });
  }

  getCurrentYearIssuesByCategoryFunctionApr(){
    this.issueService.getIssuesByCategoryForCurrentYearApril().subscribe((data: any[]) => {
      this.issuesByCategoryTHisMOntApr = data;
      console.log(data, 'issues by the year');
    });
  }

  getCurrentYearIssuesByCategoryFunctionMay(){
    this.issueService.getIssuesByCategoryForCurrentYearMay().subscribe((data: any[]) => {
      this.issuesByCategoryTHisMOntMay = data;
      console.log(data, 'issues by the year');
    });
  }

  getCurrentYearIssuesByCategoryFunctionJune(){
    this.issueService.getIssuesByCategoryForCurrentYearMay().subscribe((data: any[]) => {
      this.issuesByCategoryTHisMOntJune = data;
      console.log(data, 'issues by the year');
    });
  }

  getCurrentYearIssuesByCategoryFunctionJuly(){
    this.issueService.getIssuesByCategoryForCurrentYearMay().subscribe((data: any[]) => {
      this.issuesByCategoryTHisMOntJuly = data;
      console.log(data, 'issues by the year');
    });
  }


drawBarChart(data: any[]): void {
  // Create DataTable
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn('string', 'Category');
  dataTable.addColumn('number', 'Total Count');

  // Add data to DataTable
  data.forEach(item => {
    dataTable.addRow([item.category, item.total_count]);
  });

  // Set chart options
  const options = {
    title: 'Issues by Category',
    legend: { position: 'top' },
    chartArea: { width: '70%', height: '70%' },
    hAxis: {
      title: 'Category',
      slantedText: false,
      textStyle: {
        fontSize: 12
      }
    },
    vAxis: {
      title: 'Total Count',
      minValue: 0
    }
  };

  // Instantiate and draw the chart
  const chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
  chart.draw(dataTable, options);
}

  /* drawBarChart(): void {
    this.issueService.getTopPreviousWeekIssues().subscribe((data: any[]) => {
        const dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Category');
        dataTable.addColumn('number', 'Total Count');

        data.forEach(item => {
            dataTable.addRow([item.category, item.total_count]);
        });

        const options = {
            title: 'Issues by Category (Previous Week)',
            legend: { position: 'top' },
            chartArea: { width: '70%', height: '70%' },
            hAxis: {
                title: 'Category',
                slantedText: true,
                textStyle: {
                    fontSize: 12
                }
            },
            vAxis: {
                title: 'Total Count',
                minValue: 0
            }
        };

        const chart = new google.visualization.ColumnChart(document.getElementById('bar_chart2'));
        chart.draw(dataTable, options);
    });
} */

/* drawBarChart(): void {
  let previousWeekData: any[];
  let currentWeekData: any[];

  // Fetch data for previous week issues
  this.issueService.getTopPreviousWeekIssues().subscribe((previousData: any[]) => {
    previousWeekData = previousData;

    // Fetch data for current week issues
    this.issueService.getTopCurrentWeekIssues().subscribe((currentData: any[]) => {
      currentWeekData = currentData;

      // Combine both sets of data
      const mergedData = [['Category', 'Previous Week Total Count', 'Current Week Total Count']];
      const categoriesSet = new Set([...previousWeekData.map(item => item.category), ...currentWeekData.map(item => item.category)]);
      categoriesSet.forEach(category => {
        const previousCount = previousWeekData.find(item => item.category === category)?.total_count || 0;
        const currentCount = currentWeekData.find(item => item.category === category)?.total_count || 0;
        mergedData.push([category, previousCount, currentCount]);
      });

      // Create DataTable from merged data
      const data = google.visualization.arrayToDataTable(mergedData);

      const options = {
        title: 'Issues by Category (Current and Previous Week)',
        legend: { position: 'right' },
        chartArea: { width: '70%', height: '70%' },
        hAxis: {
          title: 'Category',
          slantedText: false,
          textStyle: {
            fontSize: 12
          }
        },
        vAxis: {
          title: 'Total Count',
          minValue: 0
        }
      };

      const chart = new google.visualization.ColumnChart(document.getElementById('bar_chart2'));

      chart.draw(data, options);
    });
  });
}
 */
/* drawBarChart(): void {
  forkJoin({
    previousWeekData: this.issueService.getTopPreviousWeekIssues(),
    currentWeekData: this.issueService.getTopCurrentWeekIssues()
  }).subscribe(({ previousWeekData, currentWeekData }) => {
    // Combine both sets of data
    const mergedData = [['Category', 'Previous Week Total Count', 'Current Week Total Count']];
    const categoriesSet = new Set([...previousWeekData.map(item => item.category), ...currentWeekData.map(item => item.category)]);
    categoriesSet.forEach(category => {
      const previousCount = previousWeekData.find(item => item.category === category)?.total_count || 0;
      const currentCount = currentWeekData.find(item => item.category === category)?.total_count || 0;
      mergedData.push([category, previousCount, currentCount]);
    });

    // Create DataTable from merged data
    const data = google.visualization.arrayToDataTable(mergedData);

    const options = {
      title: 'Issues by Category (Current and Previous Week)',
      legend: { position: 'right' },
      chartArea: { width: '70%', height: '70%' },
      hAxis: {
        title: 'Category',
        slantedText: false,
        textStyle: {
          fontSize: 12
        }
      },
      vAxis: {
        title: 'Total Count',
        minValue: 0
      }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('bar_chart2'));

    chart.draw(data, options);
  });
} */

drawCharts(): void {
  // Fetch issue counts by category from the service
  this.issueService.getIssuesByCategoryForCurrentYearJanuary().subscribe((data: any[]) => {
      // Sort the data array by category name
      data.sort((a, b) => a.category.localeCompare(b.category));

      // Create a new DataTable
      const dataTable = new google.visualization.DataTable();
      // Add columns to the DataTable
      dataTable.addColumn('string', 'Category');
      dataTable.addColumn('number', 'Total Count');
      dataTable.addColumn({ type: 'string', role: 'style' });
      dataTable.addColumn({ type: 'string', role: 'annotation' }); // Add annotation column

      // Iterate through the data and add rows to the DataTable
      data.forEach(item => {
          // Get color for the category using the getCategoryColor function
          const color = this.getCategoryColor(item.category);
          // Add a row with category, count, color, and annotation
          dataTable.addRow([item.category, parseInt(item.total_count), color, item.category]); // Use category name as annotation
      });

      // Set options for the chart
      const options = {
          title: 'Issues by Category January', // Chart title
          legend: { position: 'none' }, // Hide the legend
          chartArea: { width: '70%', height: '70%', bar: { groupWidth: "95%" }, legend: { position: "none" } }, // Adjust chart area width and height
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
      const chart = new google.visualization.ColumnChart(document.getElementById('column_chart1'));
      chart.draw(dataTable, options);
  });
}


drawCharts2(): void {
  // Fetch issue counts by category from the service
  this.issueService.getIssuesByCategoryForCurrentYearFeb().subscribe((data: any[]) => {
      // Sort the data array by category name
      data.sort((a, b) => a.category.localeCompare(b.category));

      // Create a new DataTable
      const dataTable = new google.visualization.DataTable();
      // Add columns to the DataTable
      dataTable.addColumn('string', 'Category');
      dataTable.addColumn('number', 'Total Count');
      dataTable.addColumn({ type: 'string', role: 'style' });
      dataTable.addColumn({ type: 'string', role: 'annotation' }); // Add annotation column

      // Iterate through the data and add rows to the DataTable
      data.forEach(item => {
          // Get color for the category using the getCategoryColor function
          const color = this.getCategoryColor(item.category);
          // Add a row with category, count, color, and annotation
          dataTable.addRow([item.category, parseInt(item.total_count), color, item.category]); // Use category name as annotation
      });

      // Set options for the chart
      const options = {
          title: 'Issues by Category February', // Chart title
          legend: { position: 'none' }, // Hide the legend
          chartArea: { width: '70%', height: '70%', bar: { groupWidth: "95%" }, legend: { position: "none" } }, // Adjust chart area width and height
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
      const chart = new google.visualization.ColumnChart(document.getElementById('column_chart2'));
      chart.draw(dataTable, options);
  });
}


drawCharts3(): void {
  // Fetch issue counts by category from the service
  this.issueService.getIssuesByCategoryForCurrentYearMarch().subscribe((data: any[]) => {
      // Sort the data array by category name
      data.sort((a, b) => a.category.localeCompare(b.category));

      // Create a new DataTable
      const dataTable = new google.visualization.DataTable();
      // Add columns to the DataTable
      dataTable.addColumn('string', 'Category');
      dataTable.addColumn('number', 'Total Count');
      dataTable.addColumn({ type: 'string', role: 'style' });
      dataTable.addColumn({ type: 'string', role: 'annotation' }); // Add annotation column

      // Iterate through the data and add rows to the DataTable
      data.forEach(item => {
          // Get color for the category using the getCategoryColor function
          const color = this.getCategoryColor(item.category);
          // Add a row with category, count, color, and annotation
          dataTable.addRow([item.category, parseInt(item.total_count), color, item.category]); // Use category name as annotation
      });

      // Set options for the chart
      const options = {
          title: 'Issues by Category March', // Chart title
          legend: { position: 'none' }, // Hide the legend
          chartArea: { width: '70%', height: '70%', bar: { groupWidth: "95%" }, legend: { position: "none" } }, // Adjust chart area width and height
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
      const chart = new google.visualization.ColumnChart(document.getElementById('column_chart3'));
      chart.draw(dataTable, options);
  });
}

drawCharts4(): void {
  // Fetch issue counts by category from the service
  this.issueService.getIssuesByCategoryForCurrentYearApril().subscribe((data: any[]) => {
      // Sort the data array by category name
      data.sort((a, b) => a.category.localeCompare(b.category));

      // Create a new DataTable
      const dataTable = new google.visualization.DataTable();
      // Add columns to the DataTable
      dataTable.addColumn('string', 'Category');
      dataTable.addColumn('number', 'Total Count');
      dataTable.addColumn({ type: 'string', role: 'style' });
      dataTable.addColumn({ type: 'string', role: 'annotation' }); // Add annotation column

      // Iterate through the data and add rows to the DataTable
      data.forEach(item => {
          // Get color for the category using the getCategoryColor function
          const color = this.getCategoryColor(item.category);
          // Add a row with category, count, color, and annotation
          dataTable.addRow([item.category, parseInt(item.total_count), color, item.category]); // Use category name as annotation
      });

      // Set options for the chart
      const options = {
          title: 'Issues by Category April', // Chart title
          legend: { position: 'none' }, // Hide the legend
          chartArea: { width: '70%', height: '70%', bar: { groupWidth: "95%" }, legend: { position: "none" } }, // Adjust chart area width and height
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
      const chart = new google.visualization.ColumnChart(document.getElementById('column_chart4'));
      chart.draw(dataTable, options);
  });
}

drawCharts5(): void {
  // Fetch issue counts by category from the service
  this.issueService.getIssuesByCategoryForCurrentYearMay().subscribe((data: any[]) => {
      // Sort the data array by category name
      data.sort((a, b) => a.category.localeCompare(b.category));

      // Create a new DataTable
      const dataTable = new google.visualization.DataTable();
      // Add columns to the DataTable
      dataTable.addColumn('string', 'Category');
      dataTable.addColumn('number', 'Total Count');
      dataTable.addColumn({ type: 'string', role: 'style' });
      dataTable.addColumn({ type: 'string', role: 'annotation' }); // Add annotation column

      // Iterate through the data and add rows to the DataTable
      data.forEach(item => {
          // Get color for the category using the getCategoryColor function
          const color = this.getCategoryColor(item.category);
          // Add a row with category, count, color, and annotation
          dataTable.addRow([item.category, parseInt(item.total_count), color, item.category]); // Use category name as annotation
      });

      // Set options for the chart
      const options = {
          title: 'Issues by Category May', // Chart title
          legend: { position: 'none' }, // Hide the legend
          chartArea: { width: '70%', height: '70%', bar: { groupWidth: "95%" }, legend: { position: "none" } }, // Adjust chart area width and height
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
      const chart = new google.visualization.ColumnChart(document.getElementById('column_chart5'));
      chart.draw(dataTable, options);
  });
}

drawCharts6(): void {
  // Fetch issue counts by category from the service
  this.issueService.getIssuesByCategoryForCurrentYearJune().subscribe((data: any[]) => {
      // Sort the data array by category name
      data.sort((a, b) => a.category.localeCompare(b.category));

      // Create a new DataTable
      const dataTable = new google.visualization.DataTable();
      // Add columns to the DataTable
      dataTable.addColumn('string', 'Category');
      dataTable.addColumn('number', 'Total Count');
      dataTable.addColumn({ type: 'string', role: 'style' });
      dataTable.addColumn({ type: 'string', role: 'annotation' }); // Add annotation column

      // Iterate through the data and add rows to the DataTable
      data.forEach(item => {
          // Get color for the category using the getCategoryColor function
          const color = this.getCategoryColor(item.category);
          // Add a row with category, count, color, and annotation
          dataTable.addRow([item.category, parseInt(item.total_count), color, item.category]); // Use category name as annotation
      });

      // Set options for the chart
      const options = {
          title: 'Issues by Category June', // Chart title
          legend: { position: 'none' }, // Hide the legend
          chartArea: { width: '70%', height: '70%', bar: { groupWidth: "95%" }, legend: { position: "none" } }, // Adjust chart area width and height
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
      const chart = new google.visualization.ColumnChart(document.getElementById('column_chart6'));
      chart.draw(dataTable, options);
  });
}


drawCharts7(): void {
  // Fetch issue counts by category from the service
  this.issueService.getIssuesByCategoryForCurrentYearJuly().subscribe((data: any[]) => {
      // Sort the data array by category name
      data.sort((a, b) => a.category.localeCompare(b.category));

      // Create a new DataTable
      const dataTable = new google.visualization.DataTable();
      // Add columns to the DataTable
      dataTable.addColumn('string', 'Category');
      dataTable.addColumn('number', 'Total Count');
      dataTable.addColumn({ type: 'string', role: 'style' });
      dataTable.addColumn({ type: 'string', role: 'annotation' }); // Add annotation column

      // Iterate through the data and add rows to the DataTable
      data.forEach(item => {
          // Get color for the category using the getCategoryColor function
          const color = this.getCategoryColor(item.category);
          // Add a row with category, count, color, and annotation
          dataTable.addRow([item.category, parseInt(item.total_count), color, item.category]); // Use category name as annotation
      });

      // Set options for the chart
      const options = {
          title: 'Issues by Category July', // Chart title
          legend: { position: 'none' }, // Hide the legend
          chartArea: { width: '70%', height: '70%', bar: { groupWidth: "95%" }, legend: { position: "none" } }, // Adjust chart area width and height
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
      const chart = new google.visualization.ColumnChart(document.getElementById('column_chart7'));
      chart.draw(dataTable, options);
  });
}
// Adjusted drawCharts4 function
/* drawCharts4(): void {
  // Fetch issue counts by category from the service
  this.issueService.getIssuesByCategoryForCurrentYearApril().subscribe((data: any[]) => {
      // Sort the data array by category name
      data.sort((a, b) => a.category.localeCompare(b.category));

      // Create a new DataTable
      const dataTable = new google.visualization.DataTable(); 
      // Add columns to the DataTable
      dataTable.addColumn('string', 'Category');
      dataTable.addColumn('number', 'Total Count');
      dataTable.addColumn({ type: 'string', role: 'style' });
      dataTable.addColumn({ type: 'string', role: 'annotation' }); // Add annotation column

      // Iterate through the data and add rows to the DataTable
      data.forEach(item => {
          // Get color for the category using the getCategoryColor function
          const color = this.getCategoryColor(item.Category);
          // Add a row with category, count, color, and annotation
          dataTable.addRow([item.Category, parseInt(item.total_count), color, item.Category]); // Use category name as annotation
      });

      // Set options for the chart
      const options = {
          title: 'Issues by Category April', // Chart title
          legend: { position: 'none' }, // Hide the legend
          chartArea: { width: '70%', height: '70%', bar: { groupWidth: "95%" }, legend: { position: "none" } }, // Adjust chart area width and height
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
      const chart = new google.visualization.ColumnChart(document.getElementById('column_chart4'));
      chart.draw(dataTable, options);
  });
} */




drawStackedBarChart(): void {
  forkJoin({
    previousWeekData: this.issueService.getTopPreviousWeekIssues(),
    currentWeekData: this.issueService.getTopCurrentWeekIssues()
  }).subscribe(({ previousWeekData, currentWeekData }) => {
    // Combine both sets of data
    const mergedData = [['Category', 'Previous Week', { role: 'annotation' }, 'Current Week', { role: 'annotation' }]];
    const categoriesSet = new Set([...previousWeekData.map(item => item.category), ...currentWeekData.map(item => item.category)]);
    categoriesSet.forEach(category => {
      const previousCount = previousWeekData.find(item => item.category === category)?.total_count || 0;
      const currentCount = currentWeekData.find(item => item.category === category)?.total_count || 0;
      mergedData.push([category, previousCount, previousCount.toString(), currentCount, currentCount.toString()]);
    });

    // Create DataTable from merged data
    const data = google.visualization.arrayToDataTable(mergedData);

    const options = {
      title: 'Issues by Category (Current and Previous Week)',
      legend: { position: 'right' },
      chartArea: { width: '70%', height: '70%' },
      hAxis: {
        title: 'Total Count',
        minValue: 0
      },
      vAxis: {
        title: 'Category'
      },
      isStacked: true, // Enable stacking
      annotations: {
        textStyle: {
          fontSize: 12,
          bold: true,
          italic: true,
          color: '#000', // Text color
          auraColor: 'none' // Transparent outline color
        }
      }
    };

    const chart = new google.visualization.BarChart(document.getElementById('stacked_bar_chart'));

    chart.draw(data, options);
  });
}


drawTrendlineChart(): void {
  this.issueService.getIssuesByCountMonthly().subscribe((data: any[]) => {
    // Extract labels and data from the service response
    const labels = data.map(item => item.month_name || 'Unknown');
    const dataPoints = data.map(item => parseInt(item.total_count));

    // Get the canvas element
    const canvas = document.getElementById('trendline_chart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Create the chart
        new Chart(ctx as ChartItem, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Total Count',
              data: dataPoints,
              borderColor: 'green',
              fill: false,
              tension: 0,
              borderWidth: 3
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: true,
                text: 'Trendline of Issues by Month'
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Month'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Total Count'
                },
                min: 0
              }
            }
          }
        });
      }
    }
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
        // Get color for the category using the getCategoryColor function
        const color = this.getCategoryColor(item.Category);
        // Add a row with category, count, color, and annotation
        dataTable.addRow([item.Category, parseInt(item.total_count), color, item.Category]); // Use category name as annotation
    });
  
      // Set options for the chart
      const options = {
        title: 'Issues by Category', // Chart title
        legend: { position: 'none' }, // Hide the legend
        chartArea: { width: '70%', height: '70%',bar: {groupWidth: "95%"},
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
  
  

  // Define a function to map categories to colors
getCategoryColor(category: string): string {
  switch (category) {
      case 'Camera Visuals':
          return '#FF5733'; // Red
      case 'Connectivity':
          return '#33FF57'; // Green
      case 'Hardware':
          return '#3366FF'; // Blue
      case 'Password Resets':
          return '#FF33FF'; // Purple
      case 'Printing':
          return '#FFFF33'; // Yellow
      case 'Software':
          return '#33FFFF'; // Cyan
      case 'Telephony':
          return '#FF5733'; // Orange
      case 'User Support':
          return '#B266FF'; // Lavender
      default:
          return '#000000'; // Default to black
  }
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
