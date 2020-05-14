import { Component, OnInit } from '@angular/core';
import { CoronaApiService } from "./../corona-api.service";
import { CoronaAllCountries } from "app/classes/corona-all-countries";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  allCountries: CoronaAllCountries[];

  constructor(public coronaNews: CoronaApiService) { }

  ngOnInit() {
    this.getAllCountries();
  }
  getAllCountries() {
    this.coronaNews.coronaAllCountries().subscribe((results:any[]) => {
      this.allCountries= results.sort((a, b) => b.cases - a.cases)
    })
    

  }
}
