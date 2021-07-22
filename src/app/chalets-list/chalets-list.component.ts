import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Chalet } from '../models/chalet';
import { ChaletsService } from '../services/chalets.service';

@Component({
  selector: 'app-chalets-list',
  templateUrl: './chalets-list.component.html',
  styleUrls: ['./chalets-list.component.scss']
})
export class ChaletsListComponent implements OnInit {

  @Input('chalets') dataSource: Chalet[];
  selected : Chalet[] = [];
  displayedColumns: string[] = ['entite', 'type', 'adresse', 'ville','codeP', 'tauxRemplissage', 'checkbox'];

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
