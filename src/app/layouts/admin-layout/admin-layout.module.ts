import { PlottingModule } from "./../../plotting/plotting.module";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { MapsComponent } from "../../maps/maps.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { CoronaModule } from "app/corona/corona.module";
import { IndiaModule } from "app/india/india.module";
import { VectorMapsComponent } from "app/vectormaps/vectormaps.component";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



import { HighchartsChartModule } from 'highcharts-angular';
import { LineBarChartComponent } from '../../shared/component/line-bar-chart/line-bar-chart.component';

import { SpinnerComponent } from 'app/spinner/spinner.component';
import { PieChartComponent } from 'app/shared/component/pie-chart/pie-chart.component';


@NgModule({
  imports: [
    
    CommonModule,
   
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSortModule,
    PlottingModule,
    CoronaModule,
    IndiaModule,
    NgxDatatableModule,
    HighchartsChartModule
    
   
  ],
  declarations: [DashboardComponent,
    TableListComponent,
    MapsComponent,
    VectorMapsComponent,
    SpinnerComponent,
    LineBarChartComponent,
    PieChartComponent
  ]
})
export class AdminLayoutModule {}
