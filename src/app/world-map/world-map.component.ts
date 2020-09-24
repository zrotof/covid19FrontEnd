import { Component, OnInit } from '@angular/core';
import { Countries } from '../../../models/countries';
import { Covid19Service }from '../covid19.service';

// amCharts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Themes begin
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {


  countriesAll : Countries[];
  chartValues : [];
  worldHistoricData : any;
  date: any[]
  cases : any[];
  deaths : number[];
  recovered: number[];
  i = 0;
  constructor( private covidService : Covid19Service ) { }

  ngOnInit(): void {
    this.createWorldMap();
    this.createGraph();
  }


  createWorldMap(){
    // Create map instance
  let chart = am4core.create("mapdiv", am4maps.MapChart);
  
  // Set map definition
  chart.geodata = am4geodata_worldLow;
  
  // Set projection
  chart.projection = new am4maps.projections.Miller();
  // Disabling amChart logo
  chart.logo.disabled = true;

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  
  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;
  
  //Adding external datas for the series
  
  this.covidService.getCountriesAllCases().subscribe(data => {
    polygonSeries.data = data;
    //console.log(data);
  });

  

  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#d11141");
    polygonTemplate.fill = am4core.color("#161748");

  polygonTemplate.tooltipHTML =`<div style="display:flex; flex-direction: column; justify-content:center; background: gray; width:100%; padding:2px;">
                                  <div style="display:flex; align-items:center; justify-content:center;" ><img style="width:10vh" src="{cyFlag}" alt="flag"></div>
                                  <span>Country : {cyName}</span> 
                                  <span style="margin-bottom:3px;">Population : {cyPopulation}</span> 
                                  <span>Cases : {cyCases} <span style="color:skyblue; margin-left:5px;"> +{cyToDayCases}</span></span> 
                                  <span>Recovered : {cyRecovered}</span> 
                                  <span>Criticals : {cyCritical}</span> 
                                  <span>Deaths : {cyDeaths} <span style="color:red; margin-left:5px;"> +{cyToDayDeaths}</span></span> 
                                <div>`

  // Adding external values, values of all countries covid19 cases

  
  // Remove Antarctica
  polygonSeries.exclude = ["AQ"];


  //Adding zoom control
  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.slider.height = 50;
  }

  createGraph(){
    // Create chart instance
    let chart = am4core.create("graphdiv", am4charts.XYChart);
    // Add data
   
  this.covidService.getWorldHistorical().subscribe(data2 => {
//console.log(data2);
    for(var key in data2.cases ){
      
      var i=0;
      // Add data
    chart.data.push({date: new Date(key), cases: data2.cases[key], recovered: data2.recovered[key],deaths: data2.deaths[key]});
    }

    });
 
//console.log(chart.data);
    //chart.data=[];

// Create axes
let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 50;
//dateAxis.renderer.labels.template.fill = am4core.color("#e59165");


let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series for cases
let series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "cases";
series.dataFields.dateX = "date";
series.name = "Cases";
series.strokeWidth = 3;
series.minBulletDistance = 10;
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; background-color:gray;">
                      <strong >Date: {date}</strong>
                      <div style="display:flex; flex-direction:column; margin-left:5px; padding-left: 5px; border-left: solid white;">
                       <div> Cases: <span style="color:skyblue"> {cases}</span></div>
                        <div>Recovererd:<span style="color: green;"> {recovered}</span></div>
                        <div>Deaths:<span style="color:red;"> {deaths}</span></div>
                      </div>
                      </div>`;
series.tooltip.pointerOrientation = "vertical";

// Create series for Recovered
let series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "recovered";
series2.dataFields.dateX = "date";
series2.name = "Recovered";
series2.strokeWidth = 3;
series2.stroke = am4core.color("#008000");


// Create series for deaths
let series3 = chart.series.push(new am4charts.LineSeries());
series3.dataFields.valueY = "deaths";
series3.dataFields.dateX = "date";
series3.name = "Deaths";
series3.strokeWidth = 3;
series3.stroke = am4core.color("#FF0000");

//Legend
chart.legend = new am4charts.Legend();
chart.cursor = new am4charts.XYCursor();

//Adding scrollbar
var scrollbarX = new am4charts.XYChartScrollbar();
scrollbarX.series.push(series);
chart.scrollbarX = scrollbarX;

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;
  
  // Disabling amChart logo
  chart.logo.disabled = true;
}
}
