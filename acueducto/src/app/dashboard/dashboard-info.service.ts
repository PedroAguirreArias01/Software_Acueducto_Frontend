import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient} from "@angular/common/http";
import { map, debounceTime, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DashboardInfo } from './DashboardInfo';

@Injectable({
  providedIn: 'root'
})
export class DashboardInfoService {

  private urlEndPoint: string = 'http://localhost:8080/dashboard/';

  constructor(private http: HttpClient, private router: Router) { }

  getSummaryInfo(): Observable<DashboardInfo> {
    return this.http.get(`${this.urlEndPoint}summaryInfo`).pipe(
      map(response => response as DashboardInfo)
    );
  }

}
