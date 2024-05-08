import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {

  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options | null = null
  @Input() labels: string[] = []
  @Input() data: number[] = []
  updateFlag = false;
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chartOptions?.series) {
      this.data=changes['data'].currentValue
      this.chartOptions.series[0] = {
        type: 'bar',
        data: this.data
      }

      this.updateFlag=true
      

    }


  }
  ngOnInit() {

    this.chartOptions = {
      credits:{
        enabled:false,
      },
      title: {
        text: 'Monitoreo'
      },
      xAxis: {
        categories: this.labels
      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 10,
        title: {
          text: 'Valor',
        },
        labels:{
          align:'right'
        }
        
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            inside: true,
            align: 'center', // Alineación a la derecha
            formatter: function () { // Función para formatear los valores
              return this.y;
            },


          }


        },
        bar: {
          color: '#18bc9c' // Color rojo para las barras
        },

      },
      series: [{
        data: this.data,
        type: 'bar',
        pointWidth: 50
      }]


    };

  }


}
