import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recognize-blight',
  templateUrl: './recognize-blight.component.html',
  styleUrls: ['./recognize-blight.component.css']
})
export class RecognizeBlightComponent implements OnInit {

  answerShown = false;

  constructor() { }

  ngOnInit(): void {
  }

  showAnswer(): void {
    this.answerShown = true;
  }

}
