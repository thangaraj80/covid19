import { CoronaHistory } from "./../classes/corona-history";
import { CoronaAll } from "../classes/coronaAll";
import { CoronaApiService } from "./../corona-api.service";
import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { Observable } from "rxjs";
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

  

  // for plotting
  worldHistory: CoronaHistory[] = [];
  InfectedHistory: any[] = [];
  DeathHistory: any[] = [];

  constructor(public coronaNews: CoronaApiService) {}
  ngOnInit(): void {
    this.getAll();
   
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
