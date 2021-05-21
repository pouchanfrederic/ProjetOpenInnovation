import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chalet } from '../models/chalet';

@Injectable({
  providedIn: 'root'
})
export class ChaletsService {

  constructor(private http:HttpClient) { }

  private getAllChalets$ = this.http.get<Chalet[]>("assets/data.json");

  public getAllChalets() : Observable<Chalet[]>{
    return this.getAllChalets$;
  }

  
}
