import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-disclaimers',
  templateUrl: './disclaimers.component.html',
  styleUrls: ['./disclaimers.component.css']
})
export class DisclaimersComponent implements OnInit {

	constructor(private translate: TranslateService) {

	}

  ngOnInit(): void {

  }

}
