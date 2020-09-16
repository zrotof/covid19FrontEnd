import { Component, OnInit } from '@angular/core';

import { Covid19Service }from '../covid19.service';

// amCharts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";


@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {

  constructor( private covidService : Covid19Service ) { }

  ngOnInit(): void {
    this.createWorldMap();
  }


  createWorldMap(){
    // Create map instance
  let chart = am4core.create("chartdiv", am4maps.MapChart);
  
  // Set map definition
  chart.geodata = am4geodata_worldLow;
  
  // Set projection
  chart.projection = new am4maps.projections.Miller();
  
  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  
  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;
  
  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = am4core.color("#74B266");
  
  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#367B25");
  
  // Remove Antarctica
  polygonSeries.exclude = ["AQ"];
  
  
  }

}
