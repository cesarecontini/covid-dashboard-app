import { Component, OnInit } from '@angular/core';
import { ChartService } from './chart-maker/chart.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'covid-dashboard-app';

  chartsApps = [{
    chartMakerId: new Date().getTime(),
    editMode: true
  }];

  chartsMetaData:any = [];
  data:any = [];
  
  constructor(
      private apiService: ApiService,
      private chartService: ChartService
    ){}

  ngOnInit() {
    this.apiService.data.subscribe(d => this.data = d);
  }

  addChartMaker() {
    this.chartsApps.forEach(ca => ca.editMode = false);
    this.chartsApps.push({
      chartMakerId: new Date().getTime(),
      editMode: true
    });
  }

  onTestClick($event:boolean) {
    console.log('===>', this.chartService.chartMakersMetaData, $event);

    this.chartsMetaData = this.chartService.chartMakersMetaData.map(cmd => {
      return {
        ngChart: this.chartService.getDataForChart(cmd),
        metaData: cmd
      }
    });
    console.log('this.chartsMetaData', this.chartsMetaData)
  }


}
