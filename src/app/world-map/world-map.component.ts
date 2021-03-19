import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Countries } from '../../../models/countries';
import { World } from '../../../models/world';
import { HttpClient } from '@angular/common/http';
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

  @ViewChild('countryHistoricalChart') countryHistoricalChart: ElementRef<HTMLElement>;

  historicalCountry: any[];
  worldNumbers: World[];
  countriesAll : Countries[];
  chartValues : [];
  worldHistoricData : any;
  date: any[]
  cases : any[];
  deaths : number[];
  recovered: number[];
  countryObject: any;
  countryGlobals: Countries[];
  i = 0;
  view = false;
  constructor( private covidService : Covid19Service ) { }

  ngOnInit(): void {

    this.worldCases();
    this.createWorldMap();

  }


  ngAfterViewInit() {
    this.createWorldGraph(); 

    }

  //creating the graph displaying the world historics data of covid
  createWorldGraph() : void{
    // Create chart instance
    let worldHistoricsChart = am4core.create('worldHistoricalChart', am4charts.XYChart);
    // Add data
   
  this.covidService.getWorldHistorical().subscribe(data2 => {
//console.log(data2);
    for(var key in data2.cases ){
      var i=0;
      // Add data
      worldHistoricsChart.data.push({date: new Date(key), cases: data2.cases[key], recovered: data2.recovered[key],deaths: data2.deaths[key]});
    }

    //console.log(chart.data);
    //chart.data=[];

// Create axes
let dateAxis = worldHistoricsChart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 50;
//dateAxis.renderer.labels.template.fill = am4core.color("#e59165");


let valueAxis = worldHistoricsChart.yAxes.push(new am4charts.ValueAxis());

// Create series for cases
let series = worldHistoricsChart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "cases";
series.dataFields.dateX = "date";
series.name = "Cases";
series.strokeWidth = 3;
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; background-color:gray;">
                      <strong >Date: {date}</strong>
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;"> Cases: <span style="color:skyblue"> {cases}</span></div>                    
                      </div>`;
series.tooltip.pointerOrientation = "vertical";

// Create series for Recovered
let series2 = worldHistoricsChart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "recovered";
series2.dataFields.dateX = "date";
series2.name = "Recovered";
series2.strokeWidth = 3;
series2.stroke = am4core.color("#008000");
series2.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; background-color:gray;">
                      <strong >Date: {date}</strong>
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;">Recovererd:<span style="color: green;"> {recovered}</span></div>
                      </div>`;


// Create series for deaths
let series3 = worldHistoricsChart.series.push(new am4charts.LineSeries());
series3.dataFields.valueY = "deaths";
series3.dataFields.dateX = "date";
series3.name = "Deaths";
series3.strokeWidth = 3;
series3.stroke = am4core.color("#FF0000");
series3.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; background-color:gray; color: black;">
                      <strong >Date: {date}</strong>
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;">Deaths:<span style="color:red;"> {deaths}</span></div>
                      </div>`;

//Legend
worldHistoricsChart.legend = new am4charts.Legend();
worldHistoricsChart.cursor = new am4charts.XYCursor();

//Adding scrollbar
var scrollbarX = new am4charts.XYChartScrollbar();
scrollbarX.series.push(series);

worldHistoricsChart.scrollbarX = scrollbarX;

worldHistoricsChart.scrollbarX.background.fill = am4core.color("#dc67ab");
worldHistoricsChart.scrollbarX.background.fillOpacity = 0.2;

//Defining the size ofthe scroll bar
worldHistoricsChart.scrollbarX.minHeight= 40;

//Setting of gris
worldHistoricsChart.scrollbarX.startGrip.background.fill = am4core.color("#000000");
worldHistoricsChart.scrollbarX.startGrip.background.fillOpacity = 0.8;
worldHistoricsChart.scrollbarX.endGrip.background.fill = am4core.color("#000000");
worldHistoricsChart.scrollbarX.endGrip.background.fillOpacity = 0.8;
    

// Disabling amChart logo
worldHistoricsChart.logo.disabled = true;


    });
}





  createWorldMap() : void{
    // Create map instance
  let worldMap = am4core.create("worldMap", am4maps.MapChart);
  


  // Set map definition
  worldMap.geodata = am4geodata_worldLow;
  
  // Set projection
  worldMap.projection = new am4maps.projections.Miller();
  // Disabling amChart logo
  worldMap.logo.disabled = true;

  // Create map polygon series
  var polygonSeries = worldMap.series.push(new am4maps.MapPolygonSeries());

  //Disabling dragable pan (desactivation de l'effet drag dans la map)
  worldMap.seriesContainer.draggable = false;
  worldMap.seriesContainer.resizable = false;

  //disabling zoom:wheel on srolling
  worldMap.chartContainer.wheelable = false;


  //Disabling the zoom on the map
  worldMap.maxZoomLevel = 1;

  
  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;
  
  //Adding external datas for the series
  this.covidService.getCountriesAllCases().subscribe(data => {
    polygonSeries.data = data;
    //console.log(data);
  });

    // Remove Antarctica continent
    polygonSeries.exclude = ["AQ"];


  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;


  
  //Handling a click event on the map and creation of the associated historic map

   polygonTemplate.events.on("hit", function(ev) {

    this.view= true;

    this.countryObject = ev.target.dataItem.dataContext;

    // Create chart instance
    let countryHistoricsChart =  am4core.create(this.countryHistoricalChart.nativeElement, am4charts.XYChart);
    
     this.covidService.getCountryHistorical(this.countryObject['cyName'])
    .subscribe( data4 =>{
      this.historicalCountry = data4;
      console.log("this.historicalCountry :",this.historicalCountry )

     
    //Calling the function who will draw the country historics globals data
    this.createCountryGraph(this.historicalCountry, countryHistoricsChart);
      //console.log("this.historicalCountry :",this.historicalCountry )

    });

    this.covidService.getCountryGlobals(this.countryObject['cyName'])
    .subscribe( data5 =>{
      this.countryGlobals = data5;
      console.log("this.globalCountry :",this.countryGlobals );

    });
    
  },this);

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

  }
















//creating Graph for the historics covid data of the clicked country
createCountryGraph(param, map) : void{

    for(var key in param.timeline.cases ){
      var j=0;
      // Add data
      map.data.push({date: new Date(key), cases: param.timeline.cases[key], recovered: param.timeline.recovered[key],deaths: param.timeline.deaths[key]});
    }

    //console.log(chart.data);
    //chart.data=[];

// Create axes
let dateAxis = map.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 50;
//dateAxis.renderer.labels.template.fill = am4core.color("#e59165");


let valueAxis = map.yAxes.push(new am4charts.ValueAxis());

// Create series for cases
let series4 = map.series.push(new am4charts.LineSeries());
series4.dataFields.valueY = "cases";
series4.dataFields.dateX = "date";
series4.name = "Cases";
series4.strokeWidth = 3;
series4.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; background-color:gray;">
                      <strong >Date: {date}</strong>
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;"> Cases: <span style="color:skyblue"> {cases}</span></div>                    
                      </div>`;
series4.tooltip.pointerOrientation = "vertical";

// Create series for Recovered
let series5 = map.series.push(new am4charts.LineSeries());
series5.dataFields.valueY = "recovered";
series5.dataFields.dateX = "date";
series5.name = "Recovered";
series5.strokeWidth = 3;
series5.stroke = am4core.color("#008000");
series5.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; background-color:gray;">
                      <strong >Date: {date}</strong>
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;">Recovererd:<span style="color: green;"> {recovered}</span></div>
                      </div>`;


// Create series for deaths
let series6 = map.series.push(new am4charts.LineSeries());
series6.dataFields.valueY = "deaths";
series6.dataFields.dateX = "date";
series6.name = "Deaths";
series6.strokeWidth = 3;
series6.stroke = am4core.color("#FF0000");
series6.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; background-color:gray; color: black;">
                      <strong >Date: {date}</strong>
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;">Deaths:<span style="color:red;"> {deaths}</span></div>
                      </div>`;

//Legend
map.legend = new am4charts.Legend();
map.cursor = new am4charts.XYCursor();

//Adding scrollbar
var scrollbarX = new am4charts.XYChartScrollbar();
scrollbarX.series.push(series4);

map.scrollbarX = scrollbarX;

map.scrollbarX.background.fill = am4core.color("#dc67ab");
map.scrollbarX.background.fillOpacity = 0.2;

//Defining the size ofthe scroll bar
map.scrollbarX.minHeight= 40;

//Setting of gris
map.scrollbarX.startGrip.background.fill = am4core.color("#000000");
    map.scrollbarX.startGrip.background.fillOpacity = 0.8;
    map.scrollbarX.endGrip.background.fill = am4core.color("#000000");
    map.scrollbarX.endGrip.background.fillOpacity = 0.8;
    

// Disabling amChart logo
map.logo.disabled = true;

}













  //Getting world cases
   worldCases() : void{
    this.covidService.getWorldCases()
   .subscribe(data3 =>{
     this.worldNumbers = data3;
     console.log("World :",this.worldNumbers);
   });
 
}


}
