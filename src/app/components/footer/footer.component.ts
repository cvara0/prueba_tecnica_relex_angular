import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  currentYear! : number;

  constructor() { }

  ngOnInit(): void {
    //const currentDate = new Date();
    //this.currentYear = currentDate.getFullYear();
  }

}
