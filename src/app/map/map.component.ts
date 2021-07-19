import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import { Chalet } from '../models/chalet';
import { ChaletsService } from '../services/chalets.service';
import TileLayer from 'ol/layer/Tile';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public chalets: Chalet[];
  map: Map;
  @Input() center: Coordinate;
  @Input() zoom: number;

  constructor(private cs: ChaletsService, private zone: NgZone, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
		this.cs.getAllChalets().subscribe(data=>{
			this.chalets = data;
		});
    if(!this.map) {
      this.zone.runOutsideAngular(() => this.initMap())
    } 
    //setTimeout(()=>this.mapReady.emit(this.Map));
  }


  private initMap(): void{
    // proj4.defs("EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");
    // register(proj4)
    // this.projection = GetProjection('EPSG:3857');
    // this.projection.setExtent(this.extent);
    // this.view = new View({
    //   center: this.center,
    //   zoom: this.zoom,
    //   projection: this.projection,
    // });

    this.map = new Map({
      layers: [
        new TileLayer({source: new OSM()})
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      target: 'map'
    });
  }
}
