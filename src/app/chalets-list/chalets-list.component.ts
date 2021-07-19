import { Component, OnInit } from '@angular/core';
import { ChaletsService } from '../services/chalets.service';

@Component({
  selector: 'app-chalets-list',
  templateUrl: './chalets-list.component.html',
  styleUrls: ['./chalets-list.component.scss']
})
export class ChaletsListComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['id', 'numero', 'rue', 'ville', 'tauxRemplissage'];

  constructor(private cs: ChaletsService) { }

  ngOnInit(): void {
    this.cs.getAllChalets().subscribe( data => this.dataSource = data);
  }

}
