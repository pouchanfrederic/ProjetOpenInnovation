import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChaletsService } from '../services/chalets.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-chalets-list',
  templateUrl: './chalets-list.component.html',
  styleUrls: ['./chalets-list.component.scss']
})
export class ChaletsListComponent implements OnInit, AfterViewInit {

  dataSource;
  displayedColumns: string[] = ['id', 'numero', 'rue', 'ville', 'tauxRemplissage'];
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private cs: ChaletsService) { }

  ngOnInit(): void {
    this.cs.getAllChalets().subscribe( data => this.dataSource = data);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
