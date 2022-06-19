import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {

	constructor (private title: Title, private meta: Meta) {  
	}

  ngOnInit(): void {
    this.setTitleAndMetaDescription();
  }

   //Function to set title and meta description of page
   setTitleAndMetaDescription(){

      this.title.setTitle("What is covid-19 ?");
      this.meta.updateTag({ name: 'description', content: "Access a set of information related to covid-19. This page answers frequently asked questions from the World Health Organization (WHO)." });
    
  }

}
