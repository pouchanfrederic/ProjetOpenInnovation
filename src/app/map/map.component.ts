import { ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Chalet } from '../models/chalet';
import OSM, { ATTRIBUTION } from 'ol/source/OSM';
import { Coordinate } from 'ol/coordinate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, Subscription } from 'rxjs';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import Polyline from 'ol/format/Polyline';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {
  Circle as CircleStyle,
  Icon,
  Stroke,
  Style,
} from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import SimpleGeometry from 'ol/geom/SimpleGeometry';

interface Body {
  'coordinates': number[][]
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() chalets: Chalet[];
  @Input() center: Coordinate;
  @Input() zoom: number;
  @Input() updateMapObservable: Observable<Chalet[]>;
  private eventSubscription: Subscription;
  map: Map;
  //public routeData;
  url = 'https://api.openrouteservice.org/v2/directions/driving-car';
  body: Body = { 'coordinates': [] };
  HttpOptions = {
    headers: new HttpHeaders({
      'Authorization': '5b3ce3597851110001cf62480804046221a34fc9b4278ccde20986a9',
      'Content-Type': 'Application/json; charset=UTF-8'
    })
  };
  vectorLayer: VectorLayer<any>;

  constructor(private zone: NgZone, private cd: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit(): void {
    this.eventSubscription = this.updateMapObservable.subscribe((data => {
      this.calulateNewRoute(data);
    }));
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    this.addRouteToMap(this.chalets);
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }


  private initMap(): void {

    this.map = new Map({
      layers: [
        new TileLayer({ source: new OSM() })
      ],
      view: new View({
        center: [652000, 5660000],
        zoom: 12
      }),
      target: 'map'
    });
  }

  getMarkers(coordinates: number[][]) {
    let markers = [];
    coordinates.forEach(element => {
      let marker = new Feature({
        type: 'icon',
        geometry: new Point(element),
      });
      marker.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      markers.push(marker);
    });
    return markers;
  }

  addRouteToMap(data){
    this.body = { 'coordinates': [] };
    // TODO : manage API limitations
    data.slice(0,10).forEach(c => {
      this.body.coordinates.push([c.long, c.lat]);
    });

    this.http.post(this.url, this.body, this.HttpOptions).subscribe(data => {
      let routeData: any = data;

      const polyline = routeData.routes[0].geometry;
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

      let markers = this.getMarkers(this.body.coordinates);

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
      };


      this.vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [routeFeature, ...markers],
        }),
        style: function (feature) {
          return styles[feature.get('type')];
        },
      });
      this.map.addLayer(this.vectorLayer);
      this.map.getView().fit(routeSimple.getExtent(),
        { size: this.map.getSize(), padding: [50, 50, 50, 50] });
    });
  }

  calulateNewRoute(data) {
    this.map.removeLayer(this.vectorLayer);
    this.addRouteToMap(data);
  }

}
