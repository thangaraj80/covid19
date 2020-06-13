import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CoronaApiService } from "./../corona-api.service";
import { CoronaAllCountries } from "app/classes/corona-all-countries";
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { ColumnChangesService } from '@swimlane/ngx-datatable';

import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

declare const $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  // @ViewChild('cotable') cotable: any;
  allCountries: CoronaAllCountries[];
  lastUpdate: Date;
  temp: any;
  selected = [];
  hideNow: boolean = true;

  @ViewChild('firstTable') cotable: DatatableComponent;
  @Output() onCountrySelected: EventEmitter<any> = new EventEmitter<any>();
  rows = [];
  columns
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  constructor(public coronaNews: CoronaApiService, private columnChangesService: ColumnChangesService) {


  }

  ngOnInit() {

    this.getAllCountries();

    // change detection 
    // this.rows = [...this.rows];
  }

  triggerColumnChangeDetection(): void {
    console.log("test")
    this.columnChangesService.onInputChange();
  }
  updateFilter(event) {
    this.triggerColumnChangeDetection()
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.country.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    //  this.cotable.offset = 0;
  }
  getAllCountries() {
    this.coronaNews.coronaAllCountries().subscribe(
      results => {
        this.allCountries = results.sort((a, b) => b.cases - a.cases)
        this.lastUpdate = this.allCountries[0].updated
        this.rows = results
        this.temp = [...this.rows];

        // function getMaxY() {
        //   return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
        // }
      },
      err => {
        console.error('Observer got an error: ' + err
        )
      },
      () => {
        this.columns = [
          { prop: 'country', name: 'Country' },
          { prop: 'todayCases', name: 'Today cases' },
          { prop: 'cases', name: 'Cases' },
          { prop: 'recovered', name: 'Recovered' },
          { prop: 'critical', name: 'Critical' },
          { prop: 'deaths', name: 'Deaths' },
        ];

      }
    )


    // this.coronaNews.coronaAllCountries().subscribe((results:any[]) => {
    //   this.allCountries= results.sort((a, b) => b.cases - a.cases)
    //   this.lastUpdate = this.allCountries[0].updated

    // }

    // )

  }
  onSelect({ selected }) {
    this.onCountrySelected.emit(selected[0].country);
  }
}
