import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Chalet } from '../models/chalet';
import { ChaletsService } from '../services/chalets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public chaletsList: Chalet[];
  isLoaded: boolean;
  updateMapSubject: Subject<Chalet[]> = new Subject<Chalet[]>();


  constructor(private cs: ChaletsService) { }

  ngOnInit(): void {
    this.cs.getAllChalets().subscribe( d => {
      this.chaletsList = d;
      this.chaletsList.forEach(c => {
        c.tauxRemplissage = Math.random();
      });
      this.chaletsList.sort((a,b) => b.tauxRemplissage - a.tauxRemplissage)
      this.isLoaded = true;
    });
  }

  updateMap(chaletsList: Chalet[]) {
    this.updateMapSubject.next(chaletsList);
  }

}
