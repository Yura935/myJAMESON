import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  details: string = 'ДІЗНАТИСЯ БІЛЬШЕ';
  details1: string = 'ДІЗНАТИСЯ БІЛЬШЕ';
  check: boolean = false;
  check1: boolean = false;
  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

  forDetails(): void {
    if (this.details == 'ДІЗНАТИСЯ БІЛЬШЕ') {
      this.details = 'ЗАКРИТИ';
    }
    else if (this.details == 'ЗАКРИТИ') {
      this.details = 'ДІЗНАТИСЯ БІЛЬШЕ';
    }
    document.querySelector('#details').textContent = this.details;
    this.check = !this.check;
  }

  forDetails1(): void {
    if (this.details1 == 'ДІЗНАТИСЯ БІЛЬШЕ') {
      this.details1 = 'ЗАКРИТИ';
    }
    else if (this.details1 == 'ЗАКРИТИ') {
      this.details1 = 'ДІЗНАТИСЯ БІЛЬШЕ';
    }
    document.querySelector('#details1').textContent = this.details1;
    this.check1 = !this.check1;
  }
}
