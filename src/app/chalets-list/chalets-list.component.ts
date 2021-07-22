import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Chalet } from '../models/chalet';
import { ChaletsService } from '../services/chalets.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-chalets-list',
  templateUrl: './chalets-list.component.html',
  styleUrls: ['./chalets-list.component.scss']
})
export class ChaletsListComponent implements OnInit {

  @Input('chalets') chalets: Chalet[];
  dataSource : MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['entite', 'type', 'adresse', 'ville','codeP', 'tauxRemplissage', 'checkbox'];
  selected : Chalet[];
  constructor(private cs: ChaletsService) { }
  ngOnInit(): void {
    this.cs.getAllChalets().subscribe( data => this.dataSource = new MatTableDataSource (data));
    
  }
  ngAfterViewChecked(){
    this.dataSource.sort  = this.sort;
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

  cbxOnChange(matcheckbox : MatCheckboxChange, chalet : Chalet){
    if(matcheckbox.checked){
		this.selected.push(chalet);
	}
	else{
		let index = this.selected.indexOf(chalet);
		this.selected.splice(index, 1);
		
	}
	console.log(this.selected);
  }
  

}
