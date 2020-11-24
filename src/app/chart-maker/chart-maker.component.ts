import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ChartMakerConstants } from './chart-maker.constants';
import { ChartService } from './chart.service';

@Component({
  selector: 'app-chart-maker',
  templateUrl: './chart-maker.component.html',
  styleUrls: ['./chart-maker.component.css']
})
export class ChartMakerComponent implements OnInit {

  @Input() chartMakerId:number = 0;
  @Input() editMode:boolean = false;

  @Output() onChartCreation = new EventEmitter<boolean>();

  chartProperties = ChartMakerConstants.CHART_PROPERTIES;

  chartName:string = 'My chart';
  chartDescription: string = 'A description';
  chartHeight: number = 100;
  indexRangeFrom: number = 0;
  indexRangeTo: number = 0;
  maxRange = 0;

  chartSelected = [];

  data = [];

  chartType: string = 'line';
  chartTypes = [
    {
      label: 'Line Chart', value: 'line'
    },
    {
      label: 'Bar Chart', value: 'bar'
    },
    
  ];
  
  constructor(
      private apiService: ApiService,
      private chartService: ChartService
    ){
    this.apiService.data.subscribe(d => {
        this.maxRange = d.length - 1;
        this.indexRangeTo = d.length < 10 ? d.length : 10;
        this.data = d;
    });
  }

  ngOnInit(): void {
  }

  sendChartDisplayArea() {
      this.chartService.addChartMakerMetaData({
        chartMakerId: this.chartMakerId,
        chartName: this.chartName,
        chartDescription: this.chartDescription,
        chartHeight: this.chartHeight,
        indexRangeFrom: this.indexRangeFrom,
        indexRangeTo: this.indexRangeTo,
        chartType: this.chartType,
        chartSelected: this.chartSelected,
      });
      this.onChartCreation.emit(true);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    console.log(this.editMode)
  }

  onSliderChange() {
      if(this.indexRangeTo <= this.indexRangeFrom) {
        
        this.indexRangeFrom = this.indexRangeTo;
      }
  }

  formatRangeDate(range: 'from' | 'to') {
    if(this.data.length === 0) return '';
    return this.data[range === 'from' ? this.indexRangeFrom : this.indexRangeTo]['data'];
  }

}
