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
  displayedColumns: string[] = ['id', 'numero', 'rue', 'ville', 'tauxRemplissage'];

  constructor(private cs: ChaletsService) { }

  ngOnInit(): void {
  }

}
