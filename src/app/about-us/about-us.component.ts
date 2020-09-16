import { Component, OnInit } from '@angular/core';
/* import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";





function aboutUs(){
  console.clear();

gsap.registerPlugin(MorphSVGPlugin);

const morphs = {
	believeIn: gsap.utils.toArray("#morphs #believe_in path"),
	yourself: gsap.utils.toArray("#morphs #yourself path")
};

const STAGGER_OPTIONS = {
	each: 0.06,
	repeat: -1,
	yoyo: true,
	// repeatDelay: -0.12
};

const OPTIONS = {
	duration: 1.5,
	ease: "elastic.inOut(1.1, 0.9)"
};

gsap.to("#original #believe_in path", {
	...OPTIONS,
	stagger: {
		...STAGGER_OPTIONS,
		from: "start"
	},
	morphSVG: (i) => morphs.believeIn[i]
});

gsap.to("#original #yourself path", {
	...OPTIONS,
	stagger: {
		...STAGGER_OPTIONS,
		from: "end"
	},
	morphSVG: (i) => morphs.yourself[i]
});

} */
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
