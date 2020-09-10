import { Component, OnInit } from '@angular/core';

import { Covid19Service }from '../covid19.service';
import { World } from '../../../models/world';
@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {

  worlds : World

  constructor( private covidService : Covid19Service ) { }

  ngOnInit(): void {
    this.getWorld();
  }

  getWorld() : void {
    this.covidService.getWorldCases()
    .subscribe(world => this.worlds = world)

    console.log("World :",this.worlds);
  }

}
