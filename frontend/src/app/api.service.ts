import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Policy } from './policy';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  createProject(policy: Policy): Observable<Policy> {
    return this.httpClient.post<Policy>(`${environment.apiUrl}/api/createproject`, policy);
  }
  createSite(policy: Policy): Observable<Policy> {
    return this.httpClient.post<Policy>(`${environment.apiUrl}/api/createsite`, policy);
  }
  getProject(): Observable<Policy[]> {
    return this.httpClient.get<Policy[]>(`${environment.apiUrl}/api/getProject`);
  }
}
