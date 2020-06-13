import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, EMPTY } from 'rxjs';
import { retry, catchError, shareReplay} from 'rxjs/operators'
import { DistrictWise, CovidData, Update, StatesDaily, StatesDailyStats } from 'app/models/model';
import { API } from 'app/api/API';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private _http: HttpClient) { }

  public getDashBoardData(): Observable<CovidData> {
   return this._http.get<CovidData>(API.dashboardAPI).pipe(
     retry(5)
   );
  }

  public getDistrictData(): Observable<DistrictWise[]> {
    return this._http.get<DistrictWise[]>(API.stateDistrictWiseV2).pipe(
      retry(5)
    );
   }

  public getUpdates(): Observable<Update[]> {
    return this._http.get<Update[]>(API.updates).pipe(
      retry(5)
    );
  }

  public getStatesDaily(): Observable<StatesDailyStats> {
    return this._http.get<StatesDailyStats>(API.statesDailychanges).pipe(
      retry(5)
    );
  }
}
