import { Component, OnInit } from '@angular/core';
import { CoronaApiService } from "./../corona-api.service";
import { CoronaAllCountries } from "app/classes/corona-all-countries";
declare const $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  allCountries: CoronaAllCountries[];
  lastUpdate: Date;

  constructor(public coronaNews: CoronaApiService) { }

  ngOnInit() {
    this.getAllCountries();  
  }
  getAllCountries() {
    this.coronaNews.coronaAllCountries().subscribe(
      results => {
        console.log('Observer got a next value: ' + results)
        this.allCountries = results.sort((a, b) => b.cases - a.cases)
      } ,
      err => {
        console.error('Observer got an error: ' + err
        )
      },
      () => {
       
        $('#covid19-country').DataTable({
          "bProcessing": true,
          "bServerSide": true,
            'bSort': false,
            
            "columnDefs": [
              { "visible": false, "targets": 0 }
            ],
      'aoColumns': [
        {  bSearchable: false, bSortable: true },
        { bSearchable: true, bSortable: true },
        {  bSearchable: false, bSortable: true },
        { bSearchable: false, bSortable: true },
        { bSearchable: false, bSortable: true },
        { bSearchable: false, bSortable: true },
        { bSearchable: true, bSortable: true },
        { bSearchable: false, bSortable: true },
        { bSearchable: true, bSortable: true }
          

      ],
    });
      }
    )
    // this.coronaNews.coronaAllCountries().subscribe((results:any[]) => {
    //   this.allCountries= results.sort((a, b) => b.cases - a.cases)
    //   this.lastUpdate = this.allCountries[0].updated

    // }
    
    // )
  
  }
}
