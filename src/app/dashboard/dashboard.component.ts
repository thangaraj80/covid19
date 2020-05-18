import { CoronaHistory } from "./../classes/corona-history";
import { CoronaAll } from "../classes/coronaAll";
import { CoronaApiService } from "./../corona-api.service";
import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { Observable } from "rxjs";
import *  as moment from "moment";
declare const jQuery: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  condition: boolean = true;

  // for general info
  totalInfected: number;
  totalRecovered: number;
  totalDeath: number;
  lastUpdate: Date;
  lastAffected: any
  lastAffectedTimeStamp: string;



  // for plotting
  worldHistory: CoronaHistory[] = [];
  InfectedHistory: any[] = [];
  DeathHistory: any[] = [];

  constructor(public coronaNews: CoronaApiService) { }
  ngOnInit(): void {
    this.getAll();
    this.getAllCountries();
    this.getHistory();
  }

  getAll() {
    this.coronaNews.coronaAll().subscribe((results: CoronaAll) => {
      this.totalInfected = results.cases;
      this.totalRecovered = results.recovered;
      this.totalDeath = results.deaths;
      this.lastUpdate = results.updated;

    });
  }

  getAllCountries() {
    this.coronaNews.coronaAllCountries().subscribe(
      results => {
        let lastTime = Math.max.apply(Math, results.map(o => { return o.updated; }))
        // let lastTime = results.reduce((max, p) => {
        //   //   console.log("******************* - " + max)
        //   p.updated > max ? p.updated : max, results[0].updated
        //   //  console.log(p)

        // });
        lastTime = moment(lastTime).unix(); // 1318874398
        //  console.log(moment.unix(lastTime).format('dddd, MMMM Do, YYYY h:mm:ss A'))
        const maxPeak = results.reduce((p, c) => p.updated > c.updated ? p : c);
        lastTime = moment(maxPeak.updated).unix();
        // console.log(maxPeak);
        this.lastAffected = maxPeak
        this.lastAffectedTimeStamp = moment.unix(lastTime).format('dddd, MMMM Do, YYYY h:mm:ss A')
        //  console.log(moment.unix(lastTime).format('dddd, MMMM Do, YYYY h:mm:ss A'))
      },
      err => {
        console.error('Observer got an error: ' + err
        )
      },
      () => {

      }
    )


    // this.coronaNews.coronaAllCountries().subscribe((results:any[]) => {
    //   this.allCountries= results.sort((a, b) => b.cases - a.cases)
    //   this.lastUpdate = this.allCountries[0].updated

    // }

    // )

  }

  getHistory() {
    this.coronaNews.coronaHistory().subscribe(res => {
      this.condition = false;
      this.worldHistory = res;
      this.worldHistory.forEach(res => {
        this.InfectedHistory.push(res.totalConfirmed);
        this.DeathHistory.push(res.totalDeathPerDay);
      });
    });
  }
}
