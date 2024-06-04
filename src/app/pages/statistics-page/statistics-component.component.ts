import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LendopsService } from '../../services/lendops.service';

@Component({
  selector: 'app-stats-chart',
  templateUrl: './statistics-component.component.html',
  styleUrls: ['./statistics-component.component.css']
})
export class StatisticsComponent implements OnInit {
  public chart: any;

  constructor(private lendopservice: LendopsService) { }

  ngOnInit(): void {
    this.lendopservice.getTotalUsers().subscribe(totalUsers => {
      this.lendopservice.getTotalLogins().subscribe(totalLogins => {
        this.createChart(totalUsers, totalLogins);
      });
    });
  }

  createChart(totalUsers: number, totalLogins: number): void {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: ['Total Users', 'Total Logins'],
        datasets: [
          {
            label: 'Stats',
            data: [totalUsers, totalLogins],
            backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Define o incremento entre os ticks
              color: 'red', // Cor dos ticks do eixo Y
              font: {
                size: 18 // Tamanho da fonte dos ticks do eixo Y
              }
            }
          },
          x: {
            ticks: {
              color: 'red', // Cor dos ticks do eixo X
              font: {
                size: 22 // Tamanho da fonte dos ticks do eixo X
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'red', // Cor da legenda
              font: {
                size: 18 // Tamanho da fonte da legenda
              }
            }
          }
        }
      }
    });
  }
}
