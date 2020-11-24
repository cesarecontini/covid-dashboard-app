import { Injectable } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from '../services/api.service';
import { ChartMakerConstants } from './chart-maker.constants';

export interface IMetaData {
    chartMakerId: number;
    chartName: string;
    chartDescription: string;
    chartHeight: number;
    indexRangeFrom: number;
    indexRangeTo: number;
    chartType: string;
    chartSelected: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {

    chartMakersMetaData:any[] = [];
    data:any = [];

    constructor(private apiService:ApiService) {
        this.apiService.data.subscribe(data => (this.data = data));
    }

    addChartMakerMetaData(metaData:IMetaData) {
        const index = this.chartMakersMetaData.findIndex((el:any) => el.chartMakerId === metaData.chartMakerId);
        if(index === -1) {
            this.chartMakersMetaData.push(metaData);
        } else {
            this.chartMakersMetaData[index] = metaData;
        }
    }

    getDataForChart(metaData:IMetaData): any{
        const chartType:string = metaData.chartType;
       
        let chartObject: any = {};
        switch(chartType) {
            case 'line': {
                chartObject = this.arrangeDataForLineChart(metaData, 'line');
                break;
            }
            case 'bar': {
                chartObject = this.arrangeDataForLineChart(metaData, 'bar');
                break;
            }
            default: { 
                break; 
            } 
        }
        return chartObject;
    }

    private arrangeDataForLineChart(metaData: IMetaData, chartType:ChartType) {
        const datasets: ChartDataSets[] = [];
        const dataSlice: any[] = this.data.slice( metaData.indexRangeFrom, metaData.indexRangeTo + 1);

        for(let cs of metaData.chartSelected) {
            const label = ChartMakerConstants.CHART_PROPERTIES.find((cProp:any) => cProp.prop === cs)?.label;
            
            datasets.push({
                label: label,
                data: dataSlice.map(d => d[cs])
            })
        }
        
        const labels: Label[] = dataSlice.map(d => d.data);

        const lineChartType: ChartType = chartType;
        const lineChartLegend:boolean = true;

        return {
            datasets,
            lineChartType,
            labels,
            lineChartLegend
        }
    }

}
