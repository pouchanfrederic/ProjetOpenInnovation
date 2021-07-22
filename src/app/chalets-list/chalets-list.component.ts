import { Component, Input, OnInit } from '@angular/core';
import { Chalet } from '../models/chalet';
import { ChaletsService } from '../services/chalets.service';

@Component({
  selector: 'app-chalets-list',
  templateUrl: './chalets-list.component.html',
  styleUrls: ['./chalets-list.component.scss']
})
export class ChaletsListComponent implements OnInit {

  @Input('chalets') dataSource: Chalet[];
  displayedColumns: string[] = ['entite', 'type', 'adresse', 'ville','codeP', 'tauxRemplissage'];

  constructor(private cs: ChaletsService) { }

  ngOnInit(): void {
  }

  getClass(chalet : Chalet){
      if (chalet.tauxRemplissage < 0.4){
          return 'low';
      }
      else if(chalet.tauxRemplissage > 0.7){
        return 'high';
      }
      return 'medium'
  }

}
