import { CoronaHistory } from "./../../classes/corona-history";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Input
} from "@angular/core";

export interface SeriesData {
  name: string;
  type: string;
  data: number[];
  animationDelay: any;
}
@Component({
  selector: "bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})


export class BarChartComponent implements OnInit, AfterViewInit {
  @Input("History") history;
  @Input("PlottingData") plottingData;
  @Input("DeathHistory") deathHistory;
  @Input() plotType: string;
  @Input() plotLabels: string;
  @Input() color:string;

  options: any = {};
  xAxisData: string[] = [];
  plotData: number[] = [];
  data2: number[] = [];
  series : SeriesData[] = [];


  constructor() {}
  ngOnInit() {
    this.plotData = this.plottingData;
    this.history.forEach(each => {
      this.xAxisData.push(each.dates);
    });
    this.plotLabels;


  }
  ngAfterViewInit(): void {
    
    
    this.options = {
      /* background// ,
      color: [colors.primaryLight, colors.infoLight], */
      color: [this.color],
      legend: {
        data: [this.plotLabels],
        align: "left",
        textStyle: {
          //color: echarts.textColor,
        }
      },
      grid: {
        top: 70,
        bottom: 50
      },
      tooltip: {},
      xAxis: [
        {
          data: this.xAxisData,
          silent: false,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              //color: echarts.axisLineColor,
            }
          },
          axisLabel: {
            textStyle: {
              //color: echarts.textColor,
            }
          }
        }
      ],
      yAxis: [
        { 
          axisLine: {
            lineStyle: {
              //color: echarts.axisLineColor,
            }
          },

          splitLine: {
            lineStyle: {
              //color: echarts.splitLineColor,
            }
          },
          axisLabel: {
            textStyle: {
              // echarts.textColor,
            },
            formatter: function(value) {
              return value / 1000 + "k";
            }
          }
        }
      ],
      series: [
        {
          name: this.plotLabels,
          type: this.plotType,
          data: this.plotData,
          animationDelay: idx => idx * 10
        }
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: idx => idx * 5
    };
  }
}

