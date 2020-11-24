import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ApiService } from './services/api.service';
import { ChartsModule } from 'ng2-charts';
import { ChartMakerComponent } from './chart-maker/chart-maker.component';
import { FormsModule } from '@angular/forms';
import { ChartService } from './chart-maker/chart.service';
import { ChartDisplayComponent } from './chart-display/chart-display.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ChartMakerComponent,
    ChartDisplayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [ApiService, ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
