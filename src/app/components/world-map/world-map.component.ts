import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Countries } from '../../../../models/countries';
import { World } from '../../../../models/world';
import { Covid19Service }from '../../services/main-services/main-covid19.service';

import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Data } from '@angular/router';

import { GoogleAnalyticsService } from '../../services/google-analytics/google-analytics.service';
import { Meta, Title } from '@angular/platform-browser';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { mapToStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import { mapRange } from 'gsap/src';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {

  @ViewChild('countryHistoricalGlobalDataChart') countryHistoricalGlobalDataChart: ElementRef<HTMLElement>;
  @ViewChild('countryHistoricalVaccinesChart') countryHistoricalVaccinesChart: ElementRef<HTMLElement>;


  historicalGlobalDataCountry: any[];
  worldNumbers: World;
  countryObject: any;
  countryGlobals: Countries[];
  countryVaccines: any[];
  isACountryIsClicked = false;

  //is not yet used
  isAlertClosed: boolean =false;

  allCountriesCases: any[];

  resolver : Data;


  constructor( private covidService : Covid19Service,
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private route: ActivatedRoute) {
      this.resolver= this.route.snapshot.data['resolved'];
     }

  ngOnInit(): void {

    this.setTitleAndMetaDescription();
    this.worldCases();
 
  }




  ngAfterViewInit() {


// amCharts imports
//Due to the size of libraries, we import modulelike this, so that they will be used oly when needed
    Promise.all([
      import(/* webpackChunkName: "amcharts" */ "@amcharts/amcharts4/core"),
      import(/* webpackChunkName: "amcharts" */ "@amcharts/amcharts4/charts"),
      import(/* webpackChunkName: "amcharts" */ "@amcharts/amcharts4/themes/animated"),
      import(/* webpackChunkName: "amcharts" */ "@amcharts/amcharts4/maps"),
      import( /* webpackChunkName: "amcharts" */"@amcharts/amcharts4-geodata/worldLow")
    ]).then((modules) => {

      const am4core = modules[0];
      const am4charts = modules[1];
      const am4themes_animated = modules[2].default;
      const am4maps =modules[3];
      const am4geodata_worldLow = modules[4].default;

      // Themes begin
      am4core.options.queue = true;
    
      // Chart code goes here
      this.createWorldMap(am4core, am4geodata_worldLow, am4maps, am4charts);

      //world graph historics
      this.createWorldChart(am4core, am4charts, am4themes_animated); 

      //World graph vaccines 
      this.createWorldVaccinesChart(am4core, am4charts, am4themes_animated)
    }).catch((e) => {
      console.error("Error when creating chart", e);
    }) 


  }


  createWorldMap(am4core, am4geodata_worldLow, am4maps, am4charts): void{
    
  // Create map instance
  let worldMap = am4core.create("worldMap", am4maps.MapChart);
  
  // Set map definition
  worldMap.geodata = am4geodata_worldLow;
  
  // Set projection
  worldMap.projection = new am4maps.projections.Miller();

  // Disabling amChart logo
  worldMap.logo.disabled = true;

  //Disabling dragable pan (desactivation de l'effet drag dans la map)
  worldMap.seriesContainer.draggable = false;
  worldMap.seriesContainer.resizable = false;

  //disabling zoom:wheel on srolling
  worldMap.chartContainer.wheelable = false;

  //Disabling the zoom on the map
  worldMap.maxZoomLevel = 1;

  // Create map polygon series
  var polygonSeries = worldMap.series.push(new am4maps.MapPolygonSeries());

  

  
  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

   

  //Add heat rule
  polygonSeries.heatRules.push({
    "property": "fill",
    "target": polygonSeries.mapPolygons.template,
    "min":  am4core.color("#161748").brighten(1.23),
    "max": am4core.color("#161748")
  });
  

 //Adding external datas for the series 
  let worldMapDataPolygonSeries =[];

  this.resolver.allCountriesCases.forEach(row => {

    let cyToDayCases;
    let cyToDayDeaths;
    let cyCritical;
    let cyTests;
    let cyVaccines;
    
    //correcting what displaying if there is a null value or not
    if(row.cyToDayCases == null){
      cyToDayCases = ' /';
    }
    else{
      cyToDayCases = row.cyToDayCases;
    }

    if(row.cyToDayDeaths == null){
      cyToDayDeaths = ' /';
    }
    else{
      cyToDayDeaths = row.cyToDayDeaths;
    }

    if(row.cyCritical == null){
      cyCritical = ' /';
    }
    else{
      cyCritical = row.cyCritical;
    }

    if(row.cyTests == null){
      cyTests = ' /';
    }
    else{
      cyTests = row.cyTests;
    }

    if(row.cyVaccines == null){
      cyVaccines = ' /';
    }
    else{
      cyVaccines = row.cyVaccines;
    }

    worldMapDataPolygonSeries.push({
      "value":row.cyToDayCases,
      "cyCases": row.cyCases,
      "cyCritical": cyCritical,
      "cyDate": row.cyDate,
      "cyDeaths": row.cyDeaths,
      "cyFlag": row.cyFlag,
      "cyName": row.cyName,
      "cyPopulation": row.cyPopulation,
      "cyRecovered": row.cyRecovered,
      "cyTests": cyTests,
      "cyToDayCases": cyToDayCases,
      "cyToDayDeaths": cyToDayDeaths,
      "cyVaccines": cyVaccines,
      "id":row.id      
    })
  })
  polygonSeries.data = worldMapDataPolygonSeries;
    

  // Remove Antarctica continent
  polygonSeries.exclude = ["AQ"];



  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;


//Affichage des tooltips de l'histographe en fonction de la langue courante
if(this.translate.currentLang === 'en'){
    
  polygonTemplate.tooltipHTML =`<div style="display:flex; flex-direction: column; justify-content:center; padding:2px; ">
  <img style="width:5em;height:3em;border-radius:10px;margin:auto" src="{cyFlag}" alt="country flag">
  <span style="text-align:center; margin-top:0.2em;font-weight:bold;font-size:1.4em;margin-bottom: 0.4em">{cyName}</span> 
  <span>Population : {cyPopulation.formatNumber('#,###')}</span> 
  <span>Cases : {cyCases.formatNumber('#,###')} <span style="color:skyblue; margin-left:5px;"> +{cyToDayCases.formatNumber('#,###')}</span></span> 
  <span>Recovered : {cyRecovered.formatNumber('#,###')}</span> 
  <span>Criticals : {cyCritical.formatNumber('#,###')}</span> 
  <span>Deaths : {cyDeaths.formatNumber('#,###')} <span style="color:red; margin-left:5px;"> +{cyToDayDeaths.formatNumber('#,###')}</span></span> 
  <span>Tests : {cyTests.formatNumber('#,###')}</span> 
  <span>Vaccines : <span style="color: green"; >{cyVaccines.formatNumber('#,###')}</span> </span> 
  <div>`
  
}

if(this.translate.currentLang === 'fr'){

  polygonTemplate.tooltipHTML =`<div style="display:flex; flex-direction: column; justify-content:center; padding:2px; ">
<img style="width:5em;height:3em;border-radius:10px;margin:auto" src="{cyFlag}" alt="country flag">
<span style="text-align:center; margin-top:0.2em;font-weight:bold;font-size:1.4em;margin-bottom: 0.4em">{cyName}</span> 
<span>Population : {cyPopulation.formatNumber('#,###')}</span> 
<span>Cas : {cyCases.formatNumber('#,###')} <span style="color:skyblue; margin-left:5px;"> +{cyToDayCases.formatNumber('#,###')}</span></span> 
<span>Guéris : {cyRecovered.formatNumber('#,###')}</span> 
<span>Critiques : {cyCritical.formatNumber('#,###')}</span> 
<span>Décès : {cyDeaths.formatNumber('#,###')} <span style="color:red; margin-left:5px;"> +{cyToDayDeaths.formatNumber('#,###')}</span></span> 
<div>`

}

this.translate.onLangChange.subscribe(lang =>{


  if(lang.lang === 'en'){

    polygonTemplate.tooltipHTML =`<div style="display:flex; flex-direction: column; justify-content:center; padding:2px; ">
    <img style="width:5em;height:3em;border-radius:10px;margin:auto" src="{cyFlag}" alt="country flag">
    <span style="text-align:center; margin-top:0.2em;font-weight:bold;font-size:1.4em;margin-bottom: 0.4em">{cyName}</span> 
    <span>Population : {cyPopulation.formatNumber('#,###')}</span> 
    <span>Cases : {cyCases.formatNumber('#,###')} <span style="color:skyblue; margin-left:5px;"> +{cyToDayCases.formatNumber('#,###')}</span></span> 
    <span>Recovered : {cyRecovered.formatNumber('#,###')}</span> 
    <span>Criticals : {cyCritical.formatNumber('#,###')}</span> 
    <span>Deaths : {cyDeaths.formatNumber('#,###')} <span style="color:red; margin-left:5px;"> +{cyToDayDeaths.formatNumber('#,###')}</span></span> 
  <div>`

    //console.log("the tooltip normally have to change english")
  }

  if(lang.lang === 'fr'){


    polygonTemplate.tooltipHTML =`<div style="display:flex; flex-direction: column; justify-content:center; padding:2px; ">
  <img style="width:5em;height:3em;border-radius:10px;margin:auto" src="{cyFlag}" alt="country flag">
  <span style="text-align:center; margin-top:0.2em;font-weight:bold;font-size:1.4em;margin-bottom: 0.4em">{cyName}</span> 
  <span>Population : {cyPopulation.formatNumber('#,###')}</span> 
  <span>Cas : {cyCases.formatNumber('#,###')} <span style="color:skyblue; margin-left:5px;"> +{cyToDayCases.formatNumber('#,###')}</span></span> 
  <span>Guéris : {cyRecovered.formatNumber('#,###')}</span> 
  <span>Critiques : {cyCritical.formatNumber('#,###')}</span> 
  <span>Décès : {cyDeaths.formatNumber('#,###')} <span style="color:red; margin-left:5px;"> +{cyToDayDeaths.formatNumber('#,###')}</span></span> 
<div>`



//console.log("the tooltip normally have to change français")

    
  }
})









polygonTemplate.fill = am4core.color("#ffffff");

// Create selected and hover states and set alternative fill color
var ss = polygonTemplate.states.create("active");
ss.properties.fill = am4core.color("#d11141");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#d11141");

//Disable the color of the object hoverided
polygonSeries.tooltip.getFillFromObject = false;

//Setting the color of the tooltip
polygonSeries.tooltip.background.fill = am4core.color("#161748");

polygonTemplate.stroke = am4core.color('#2c2626');





















                                
//Handling a click event on the map and creation of the associated historic country map

var alreadyCliked = false;

var oldClickedCountry : any;
var newClickedCountry : any;

  polygonTemplate.events.on("hit", function(ev) {

  this.isACountryIsClicked= true;


//handling the way of colorize country on click and change when we click on another country
    if(alreadyCliked){

      oldClickedCountry = newClickedCountry;


      setTimeout(function() {
        oldClickedCountry.isActive = false;
      }, 500);

      newClickedCountry = ev.target.dataItem.mapObject;

      // Set active state
      newClickedCountry.isActive = true;

    }
    else{

      newClickedCountry = ev.target.dataItem.mapObject;
      newClickedCountry.isActive = true;
      alreadyCliked = true;
      // Set active state
        newClickedCountry.isActive = true;

    }


    this.countryObject = ev.target.dataItem.dataContext;
    // Create chart for historic global data instance
    let countryHistoricsGlobalDataChart =  am4core.create(this.countryHistoricalGlobalDataChart.nativeElement, am4charts.XYChart );

    let title = countryHistoricsGlobalDataChart.titles.create();
    title.text = this.countryObject['cyName']+" Historical Data";
    title.fontSize = 25;
    title.marginBottom = 15;

    //Getting covid hitorical global data for a country
    this.covidService.getCountryHistoricalGlobalData(this.countryObject['cyName'])
    .subscribe( data4 => {
      this.historicalGlobalDataCountry = data4;
      //Calling the function who will draw the country historics globals data
      this.createCountryChart(this.historicalGlobalDataCountry, countryHistoricsGlobalDataChart,am4core, am4charts);
      //console.log("this.historicalCountry :",this.historicalCountry )
    });

    //Getting covid global data for the selected country
    this.covidService.getCountryGlobals(this.countryObject['cyName'])
    .subscribe( data5 =>{
      this.countryGlobals = data5;
      //console.log("this.globalCountry :",this.countryGlobals );
    });



    //create chart for Vaccines data
    let countryHistoricsVaccinesChart = am4core.create(this.countryHistoricalVaccinesChart.nativeElement, am4charts.XYChart);
    

    //Getting Covid vaccines  datafor a country
    this.covidService.getCountryHistoricalVaccinesData(this.countryObject['cyName'])
    .subscribe( data6 =>{
      this.countryVaccines = data6;
      //Calling the function who will draw the country historics vaccines data
      this.createCountryVaccinesChart(this.countryVaccines, countryHistoricsVaccinesChart, am4core, am4charts)
    })


    
  },this);

  }











//creating Graph for the historics covid data of the clicked country
createCountryChart(param, map, am4core, am4charts) : void{

    for(var key in param.timeline.cases ){
      // Add data
      map.data.push({date: new Date(key), cases: param.timeline.cases[key], recovered: param.timeline.recovered[key],deaths: param.timeline.deaths[key]});
    }

    

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
series4.strokeWidth = 3;
series4.stroke = am4core.color("#00a2ff");
series4.tooltip.getFillFromObject = false;
series4.tooltip.background.fill = am4core.color("#00a2ff");


// Create series for Recovered
let series5 = map.series.push(new am4charts.LineSeries());
series5.dataFields.valueY = "recovered";
series5.dataFields.dateX = "date";
series5.strokeWidth = 3;
series5.stroke = am4core.color("#008000");
series5.tooltip.getFillFromObject = false;
series5.tooltip.background.fill = am4core.color("#008000");


// Create series for deaths
let series6 = map.series.push(new am4charts.LineSeries());
series6.dataFields.valueY = "deaths";
series6.dataFields.dateX = "date";
series6.strokeWidth = 3;
series6.stroke = am4core.color("#FF0000");
series6.tooltip.getFillFromObject = false;
series6.tooltip.background.fill = am4core.color("#FF0000");


//Affichage des tooltips de l'histographe en fonction de la langue courante
if(this.translate.currentLang === 'en'){

  series4.name = "Cases";
  series4.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Cases: {cases}</div>                    
                        </div>`;
  
  series5.name = "Recovered";
  series5.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Recovererd:{recovered}</div>
                        </div>`;
  
  series6.name = "Deaths";
  series6.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;  color: white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Deaths: {deaths}</div>
                        </div>`;
}

if(this.translate.currentLang ==='fr'){

  series4.name = "Cas";
  series4.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Cas: {cases}</div>                    
                        </div>`;
  
  series5.name = "Guéris";
  series5.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Guéris:{recovered}</div>
                        </div>`;
  
  series6.name = "Décès";
  series6.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Décès: {deaths}</div>
                        </div>`;
  
}


this.translate.onLangChange.subscribe(lang =>{


  if(lang.lang === 'en'){

    series4.name = "Cases";
  series4.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Cases: {cases}</div>                    
                        </div>`;
  
  series5.name = "Recovered";
  series5.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Recovererd:{recovered}</div>
                        </div>`;
  
  series6.name = "Deaths";
  series6.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;  color: white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Deaths: {deaths}</div>
                        </div>`;
    
  }

  if(lang.lang === 'fr'){

    series4.name = "Cas";
  series4.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Cas: {cases}</div>                    
                        </div>`;
  
  series5.name = "Guéris";
  series5.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Guéris:{recovered}</div>
                        </div>`;
  
  series6.name = "Décès";
  series6.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Décès: {deaths}</div>
                        </div>`;
    
  }

})

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

//creating the graph displaying the world historics data of covid
createWorldChart( am4core, am4charts, am4themes_animated) : void{

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    let worldHistoricsChart = am4core.create('worldHistoricalChart', am4charts.XYChart);
    
    let title = worldHistoricsChart.titles.create();
    title.text = "World  Historical Data";
    title.fontSize = 25;
    title.marginBottom = 15;

    // Add historics data coming from the resolver of maps
   let data2= this.resolver.worldHistoricsData;

          for(var key in data2.cases ){
            // Add data
            worldHistoricsChart.data.push({date: new Date(key), cases: data2.cases[key], recovered: data2.recovered[key],deaths: data2.deaths[key]});
          }

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
  series.strokeWidth = 3;
  series.stroke = am4core.color("#00a2ff");
  series.tooltip.getFillFromObject = false;
  series.tooltip.background.fill = am4core.color("#00a2ff");

// Create series for Recovered
let series2 = worldHistoricsChart.series.push(new am4charts.LineSeries());
  series2.dataFields.valueY = "recovered";
  series2.dataFields.dateX = "date";
  series2.strokeWidth = 3;
  series2.stroke = am4core.color("#008000");
  series2.tooltip.getFillFromObject = false;
  series2.tooltip.background.fill = am4core.color("#008000");


// Create series for deaths
let series3 = worldHistoricsChart.series.push(new am4charts.LineSeries());
  series3.dataFields.valueY = "deaths";
  series3.dataFields.dateX = "date";
  series3.strokeWidth = 3;
  series3.stroke = am4core.color("#FF0000");
  series3.tooltip.getFillFromObject = false;
  series3.tooltip.background.fill = am4core.color("#FF0000");



series.tooltip.pointerOrientation = "vertical";





//Affichage des tooltips de l'histographe en fonction de la langue courante
if(this.translate.currentLang==='en'){

  series.name = "Cases";
  series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Cases: {cases}</div>                    
                        </div>`;
  
  series2.name = "Recovered";
  series2.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Recovererd:{recovered}</div>
                        </div>`;
  
  series3.name = "Deaths";
  series3.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;  color: white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Deaths: {deaths}</div>
                        </div>`;
}

if(this.translate.currentLang ==='fr'){

  title.text = "Données Mondiales";


  series.name = "Cas";
  series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: solid white;"> Cas: {cases}</div>                    
                        </div>`;
  
  series2.name = "Guéris";
  series2.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: solid white;">Guéris:{recovered}</div>
                        </div>`;
  
  series3.name = "Décès";
  series3.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: solid white;">Décès: {deaths}</div>
                        </div>`;
  
}


this.translate.onLangChange.subscribe(lang =>{


  if(lang.lang === 'en'){

    title.text = "World Historical Data";

    series.name = "Cases";
  series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Cases: {cases}</div>                    
                        </div>`;
  
  series2.name = "Recovered";
  series2.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Recovererd:{recovered}</div>
                        </div>`;
  
  series3.name = "Deaths";
  series3.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;  color: white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;">Deaths: {deaths}</div>
                        </div>`;
    
  }

  if(lang.lang === 'fr'){
    title.text = "Données Historiques Mondiales";

    series.name = "Cas";
  series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: solid white;"> Cas: {cases}</div>                    
                        </div>`;
  
  series2.name = "Guéris";
  series2.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: solid white;">Guéris:{recovered}</div>
                        </div>`;
  
  series3.name = "Décès";
  series3.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                        Date: {date}
                        <div style="margin-left:5px; padding-left: 5px; border-left: solid white;">Décès: {deaths}</div>
                        </div>`;
    
  }
})


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


}

//creating the graph displaying the world historics data of covid
createWorldVaccinesChart( am4core, am4charts, am4themes_animated) : void{

  am4core.useTheme(am4themes_animated);

  // Create chart instance
  let worldVaccineChart = am4core.create('worldVaccineChart', am4charts.XYChart);
  
  let title = worldVaccineChart.titles.create();
  title.text = "World Vaccines Data";
  title.fontSize = 25;
  title.marginBottom = 15;

  //Adding historics vaccines data coming from the resolver of maps
 let data3= this.resolver.worldVaccines;

    for(let i=0; i< data3.length - 1; i++ ){
          // Add data
          worldVaccineChart.data.push({date: new Date(data3[i].date), vaccines: data3[i].daily});
    }

// Create axes
let dateAxis = worldVaccineChart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 50;
//dateAxis.renderer.labels.template.fill = am4core.color("#e59165");

let valueAxis = worldVaccineChart.yAxes.push(new am4charts.ValueAxis());

// Create series for cases
let series = worldVaccineChart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "vaccines";
series.dataFields.dateX = "date";
series.strokeWidth = 3;
series.stroke = am4core.color("#00a2ff");
series.tooltip.getFillFromObject = false;
series.tooltip.background.fill = am4core.color("#00a2ff");


series.tooltip.pointerOrientation = "vertical";


//Affichage des tooltips de l'histographe en fonction de la langue courante
if(this.translate.currentLang==='en'){

series.name = "Vaccines";
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                      Date: {date}
                      <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Vaccines: {vaccines}</div>                    
                      </div>`;
}

if(this.translate.currentLang ==='fr'){

title.text = "Vaccins Dans Le Monde";

series.name = "Vaccins";
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                      Date: {date}
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;"> Vaccins: {vaccines}</div>                    
                      </div>`;
}


this.translate.onLangChange.subscribe(lang =>{


if(lang.lang === 'en'){

  title.text = "World Vaccines Data";

  series.name = "Vaccines";
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                      Date: {date}
                      <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Vaccines: {vaccines}</div>                    
                      </div>`;

  
}

if(lang.lang === 'fr'){
  title.text = "Vaccins Dans Le Monde";

  series.name = "Vaccins";
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                      Date: {date}
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;"> Vaccins: {vaccines}</div>                    
                      </div>`;
  
}
})


//Legend
worldVaccineChart.legend = new am4charts.Legend();
worldVaccineChart.cursor = new am4charts.XYCursor();

//Adding scrollbar
var scrollbarX = new am4charts.XYChartScrollbar();
scrollbarX.series.push(series);

worldVaccineChart.scrollbarX = scrollbarX;

worldVaccineChart.scrollbarX.background.fill = am4core.color("#dc67ab");
worldVaccineChart.scrollbarX.background.fillOpacity = 0.2;

//Defining the size ofthe scroll bar
worldVaccineChart.scrollbarX.minHeight= 40;

//Setting of gris
worldVaccineChart.scrollbarX.startGrip.background.fill = am4core.color("#000000");
worldVaccineChart.scrollbarX.startGrip.background.fillOpacity = 0.8;
worldVaccineChart.scrollbarX.endGrip.background.fill = am4core.color("#000000");
worldVaccineChart.scrollbarX.endGrip.background.fillOpacity = 0.8;
  
// Disabling amChart logo
worldVaccineChart.logo.disabled = true;

}


//Creating world vaccines graph
createCountryVaccinesChart( param, map, am4core, am4charts) : void{

  let title = map.titles.create();
    title.text = this.countryObject['cyName']+" Vaccines Data";
    title.fontSize = 25;
    title.marginBottom = 15;
  
  for(let key in param.timeline ){
    // Add data
    console.log("max ",param.timeline.length)
    console.log("hey ",key)
    if( parseInt(key) < (param.timeline.length -1) ){
    map.data.push({date: new Date(param.timeline[key].date), vaccines: param.timeline[key].daily});
  }
  }

// Create axes
let dateAxis = map.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 50;
//dateAxis.renderer.labels.template.fill = am4core.color("#e59165");

let valueAxis = map.yAxes.push(new am4charts.ValueAxis());

// Create series for cases
let series = map.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "vaccines";
series.dataFields.dateX = "date";
series.strokeWidth = 3;
series.stroke = am4core.color("#00a2ff");
series.tooltip.getFillFromObject = false;
series.tooltip.background.fill = am4core.color("#00a2ff");


series.tooltip.pointerOrientation = "vertical";


//Affichage des tooltips de l'histographe en fonction de la langue courante
if(this.translate.currentLang==='en'){

series.name = "Vaccines";
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                      Date: {date}
                      <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Vaccines: {vaccines}</div>                    
                      </div>`;
}

if(this.translate.currentLang ==='fr'){


series.name = "Vaccins";
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                      Date: {date}
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;"> Vaccins: {vaccines}</div>                    
                      </div>`;
}


this.translate.onLangChange.subscribe(lang =>{


if(lang.lang === 'en'){

  series.name = "Vaccines";
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center; color:white;">
                      Date: {date}
                      <div style="margin-left:5px; padding-left: 5px; border-left: 2px solid white;"> Vaccines: {vaccines}</div>                    
                      </div>`;

  
}

if(lang.lang === 'fr'){

  series.name = "Vaccins";
series.tooltipHTML = `<div style="display:flex; align-items:center; justify-content:center;color:white;">
                      Date: {date}
                      <div style="margin-left:5px; padding-left: 5px; border-left: solid white;"> Vaccins: {vaccines}</div>                    
                      </div>`;
  
}
})


//Legend

map.legend = new am4charts.Legend();
map.cursor = new am4charts.XYCursor();


//Adding scrollbar
var scrollbarX = new am4charts.XYChartScrollbar();
scrollbarX.series.push(series);

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
    this.covidService.getWorldGlobals()
   .subscribe(data3 =>{
     this.worldNumbers = data3;
   });
  }


  alertClosed(){
    this.isAlertClosed =true;
  }


  //Function to set title and meta description of page
  setTitleAndMetaDescription(){
    if( this.translate.currentLang == 'en'){
      this.title.setTitle("World map of covid-19 infected countries");
      this.meta.updateTag({ name: 'description', content: "See all countries affected by covid-19 and historical data since January 2020." });
    }
    else{
      this.title.setTitle("Carte mondiales des pays infectés par la covid-19" );
      this.meta.updateTag({ name: 'description', content: "Consultez l'ensemble des pays touchés par la covid-19 et des données historiques depuis Janvier 2020." });

    }
  }

}
