import { Component, OnInit } from '@angular/core';
import { textHeights } from 'ol/render/canvas';
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

}