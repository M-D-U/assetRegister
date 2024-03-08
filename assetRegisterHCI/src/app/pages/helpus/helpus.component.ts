import { Component, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';

declare var google: any;

@Component({
  selector: 'app-helpus',
  templateUrl: './helpus.component.html',
  styleUrls: ['./helpus.component.scss']
})
export class HelpusComponent implements OnInit {

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['timeline', 'corechart'] });
    google.charts.setOnLoadCallback(() => this.drawCharts());
    this.initFlatpickr();
  }

  initFlatpickr() {
    flatpickr('.flatpickr', {
      enableTime: true,
      dateFormat: "Y-m-d",
    });
  }
  selectedTab: string = 'dashboard'; // Initially selected tab


   sampleData = [
    {
        dateTimeFaultReported: '2024-02-14 10:00:00',
        serviceProvider: 'Provider A',
        faultReported: 'Network issue',
        category: 'Networking',
        reportedBy: 'John Doe',
        reportedByEmail: 'john@example.com',
        assignedTo: 'Support Team',
        status: 'Resolved',
        statusColor: 'Success',
        dateTimeFaultResolved: '2024-02-14 12:00:00',
        timeLapsedInDays: 0
    },
    {
        dateTimeFaultReported: '2024-02-14 11:30:00',
        serviceProvider: 'Provider B',
        faultReported: 'Hardware issue',
        category: 'Hardware',
        reportedBy: 'Jane Smith',
        reportedByEmail: 'jane@example.com',
        assignedTo: 'Technical Team',
        status: 'Open',
        statusColor: 'Warning',
        dateTimeFaultResolved: '',
        timeLapsedInDays: ''
    },
    {
        dateTimeFaultReported: '2024-02-15 09:45:00',
        serviceProvider: 'Provider C',
        faultReported: 'Software issue',
        category: 'Software',
        reportedBy: 'Mike Johnson',
        reportedByEmail: 'mike@example.com',
        assignedTo: 'Development Team',
        status: 'In Progress',
        statusColor: 'Info',
        dateTimeFaultResolved: '',
        timeLapsedInDays: ''
    },
    {
        dateTimeFaultReported: '2024-02-15 14:20:00',
        serviceProvider: 'Provider A',
        faultReported: 'Power outage',
        category: 'Electrical',
        reportedBy: 'Sarah Lee',
        reportedByEmail: 'sarah@example.com',
        assignedTo: 'Facilities Team',
        status: 'Open',
        statusColor: 'Warning',
        dateTimeFaultResolved: '',
        timeLapsedInDays: ''
    },
    {
        dateTimeFaultReported: '2024-02-16 08:00:00',
        serviceProvider: 'Provider B',
        faultReported: 'System crash',
        category: 'Software',
        reportedBy: 'Chris Brown',
        reportedByEmail: 'chris@example.com',
        assignedTo: 'IT Department',
        status: 'Open',
        statusColor: 'Warning',
        dateTimeFaultResolved: '',
        timeLapsedInDays: ''
    }
];

  constructor() {
    this.drawCharts = this.drawCharts.bind(this);
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
}
  drawCharts() {
    this.drawTimelineChart();
    this.drawPieChart();
    this.drawBarChart();
    this.drawColumnChart();
  }

  /* drawTimelineChart() {
    var container = document.getElementById('timeline_chart');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    // Define DataTable columns
    dataTable.addColumn({ type: 'string', id: 'Issue' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    // Add data rows to DataTable
    dataTable.addRows([
      ['Issue 1', new Date(2023, 1, 1), new Date(2023, 1, 7)],
      ['Issue 2', new Date(2023, 1, 10), new Date(2023, 1, 14)],
      // Add more rows as needed
    ]);

    // Set chart options
    var options = {
      timeline: { colorByRowLabel: true },
    };

    // Draw the chart
    chart.draw(dataTable, options);
  } */
  drawTimelineChart() {
    var container = document.getElementById('timeline_chart');
    var chart = new google.visualization.LineChart(container); // Use LineChart instead of Timeline
    var dataTable = new google.visualization.DataTable();

    // Define DataTable columns
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Issues' });

    // Add data rows to DataTable
    dataTable.addRows([
      [new Date(2023, 1, 1), 10],
      [new Date(2023, 1, 2), 15],
      [new Date(2023, 1, 3), 20],
      [new Date(2023, 1, 4), 12],
      // Add more rows as needed
    ]);

    // Set chart options
    var options = {
      title: 'Issues Over Time', // Title of the chart
      curveType: 'function', // Smooth line chart
      legend: { position: 'bottom' } // Position of the legend
    };

    // Draw the chart
    chart.draw(dataTable, options);
}

  drawPieChart() {
    var data = google.visualization.arrayToDataTable([
      ['Service Provider', 'Issues'],
      ['Provider A', 30],
      ['Provider B', 50],
      ['Provider C', 20],
    ]);

    var options = {
      title: 'Issues by category'
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
    chart.draw(data, options);
  }

  drawBarChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2019', 1000, 400],
      ['2020', 1170, 460],
      ['2021', 660, 1120],
      ['2022', 1030, 540]
    ]);

    var options = {
      title: 'Issues by Service Provider',
      hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 }
    };

    var chart = new google.visualization.BarChart(document.getElementById('bar_chart'));
    chart.draw(data, options);
  }

  drawColumnChart() {
    var data = google.visualization.arrayToDataTable([
      ['City', 'Population'],
      ['New York City, NY', 8175000],
      ['Los Angeles, CA', 3792000],
      ['Chicago, IL', 2695000],
      ['Houston, TX', 2099000],
      ['Philadelphia, PA', 1526000]
    ]);

    var options = {
      title: 'Population of Largest U.S. Cities',
      chartArea: { width: '50%' },
      hAxis: {
        title: 'Total Population',
        minValue: 0
      },
      vAxis: {
        title: 'City'
      }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('column_chart'));
    chart.draw(data, options);
  }
}
