import { Component, Input, OnInit } from '@angular/core';
import { ChartMakerConstants } from '../chart-maker/chart-maker.constants';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.css']
})
export class ChartDisplayComponent implements OnInit {

    @Input() cmd:any;
    @Input() data = [];

    dataTable:any = {};
    chartMode:boolean = true;


    constructor() {
    }

    ngOnInit(): void {
    }

    switchToChartMode() {
        this.chartMode = true;
    }

    switchToDataMode() {
        if(Object.keys(this.dataTable).length === 0) {
            this.setDataTable();
        }
        this.chartMode = false;
    }

    private setDataTable() {
        const dataSet = this.data.slice(
                this.cmd.metaData.indexRangeFrom,
                this.cmd.metaData.indexRangeTo + 1
            ).map((d:any) => {
                const res:any = {};
                res.data = d.data;
                for(let k of this.cmd.metaData.chartSelected) {
                    res[k] = d[k];
                }
                return res;
            });

        const meta = ['Date'];
        this.cmd.metaData.chartSelected.forEach((prop:any) => {
            const chartProp = ChartMakerConstants.CHART_PROPERTIES.find(e => e.prop === prop);
            meta.push(chartProp?.label || 'Data');
        });
        console.log(dataSet, meta)
        this.dataTable = {
            dataSet,
            meta
        };
    }

    getKeys(row:any):string[] {
        return Object.keys(row);
    }

}
