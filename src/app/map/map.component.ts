import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Chalet } from '../models/chalet';
import { ChaletsService } from '../services/chalets.service';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import { Coordinate } from 'ol/coordinate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pipe } from 'rxjs';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import Polyline from 'ol/format/Polyline';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  Stroke,
  Style,
} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {getVectorContext} from 'ol/render';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import MultiLineString from 'ol/geom/MultiLineString';
import LineString from 'ol/geom/LineString';

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
  public routeData;
  url = 'https://api.openrouteservice.org/v2/directions/driving-car';
  body = {"coordinates":[[ 5.870546,45.256708],[5.755975,45.215054], [5.8036, 45.23773]]};
  HttpOptions = {
    headers: new HttpHeaders({'Authorization': '5b3ce3597851110001cf62480804046221a34fc9b4278ccde20986a9',
                'Content-Type': 'Application/json; charset=UTF-8'})
  };

  constructor(private cs: ChaletsService, private zone: NgZone, private cd: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit(): void {
		this.cs.getAllChalets().subscribe(data=>{
			this.chalets = data;
		});
    if(!this.map) {
      this.zone.runOutsideAngular(() => this.initMap())
    } 
    //setTimeout(()=>this.mapReady.emit(this.Map));
    this.http.post(this.url, this.body, this.HttpOptions).subscribe(data => {
      this.routeData = data;

      const polyline = this.routeData.routes[0].geometry;
      const route = new Polyline()
        .readGeometry(polyline, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        });
        const routeFeature = new Feature({
          type: 'route',
          geometry: route,
        });
        const routeSimple = route as SimpleGeometry;
        const startMarker = new Feature({
          type: 'icon',
          geometry: new Point(routeSimple.getFirstCoordinate()),
        });
        const endMarker = new Feature({
          type: 'icon',
          geometry: new Point(routeSimple.getLastCoordinate()),
        });

        // const position = startMarker.getGeometry().clone();
        // const geoMarker = new Feature({
        //   type: 'geoMarker',
        //   geometry: position,
        // });

        const styles = {
          'route': new Style({
            stroke: new Stroke({
              width: 6,
              color: [237, 212, 0, 0.8],
            }),
          }),
          'icon': new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'assets/images/icon.png',
            }),
          }),
          // 'geoMarker': new Style({
          //   image: new CircleStyle({
          //     radius: 7,
          //     fill: new Fill({color: 'black'}),
          //     stroke: new Stroke({
          //       color: 'white',
          //       width: 2,
          //     }),
          //   }),
          // }),
        };

        const vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: [routeFeature, startMarker, endMarker],
          }),
          style: function (feature) {
            return styles[feature.get('type')];
          },
        });


        this.map.addLayer(vectorLayer);
    },  err => console.log(err.message));
  }


  private initMap(): void{
   
    this.map = new Map({
      layers: [
        new TileLayer({source: new OSM()})
      ],
      view: new View({
        center: [0, 0],
        zoom: 4
      }),
      target: 'map'
    });
  }

  getmoncul() {
    let n = 0;
    return n;
  }
}
