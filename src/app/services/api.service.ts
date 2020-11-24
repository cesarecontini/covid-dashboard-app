import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IData } from './data.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private readonly configUrl = 'assets/data.json';

    data: BehaviorSubject<[]> = new BehaviorSubject([]);
   
    constructor(private http: HttpClient) { 
        this.data.subscribe(d => {
            if(d.length == 0) {
                this.getDataFromServer();
            }
        });
    }

    private getDataFromServer() {
        console.log('getting data....')
        this.http.get<[]>(this.configUrl)
            .subscribe((data) => {
                console.log('getting...', data.length)
                this.data.next(data);
            })
    }
}
