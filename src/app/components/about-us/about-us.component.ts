import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})



export class AboutUsComponent implements OnInit {

	constructor() {
    
	}

  ngOnInit(): void {

  }


  openNetwork(param: string){

    let website; 
    if(param === 'linkedin'){
      website = "https://www.linkedin.com/in/bonachisamuel";

    }
    else if(param === 'instagram'){
      website = "https://www.instagram.com/zrotof_"

    }
    else if(param == 'github'){
      website = "https://github.com/zrotof"
    }

    else if(param == 'portfolio'){
      website =  "https://sm-digitalizer.fr/#accueil"
    }

    window.open(website, "_blank");

  }



  

}
