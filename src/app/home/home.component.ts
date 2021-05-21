import { Component, OnInit } from '@angular/core';
import { Chalet } from '../models/chalet';
import { ChaletsService } from '../services/chalets.service';

@Component({
	selector: 'app-index',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public chaletsList : Chalet[]; 

	constructor(private chaletsService: ChaletsService) { }

	ngOnInit(): void {
		this.chaletsService.getAllChalets().subscribe(data=>{
			this.chaletsList = data;
		});
	}


	public getClass(tauxRemplissage: number): string {
		return tauxRemplissage > 80 ? "full" : (tauxRemplissage > 40 ? "medium" : "empty");
	}

}
