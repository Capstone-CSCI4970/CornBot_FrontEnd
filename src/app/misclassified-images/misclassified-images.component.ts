import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { MisclassImageModel } from '../models/misclass-image-model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-misclassified-images',
  templateUrl: './misclassified-images.component.html',
  styleUrls: ['./misclassified-images.component.css']
})
export class MisclassifiedImagesComponent implements OnInit {
  // data: MisclassImageModel[] = [];
  data: any[] = [];
  imageURLS: string[] = [];

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Image';
  showYAxisLabel = true;
  yAxisLabel = 'Total Times Mislabeled';

  colorScheme = {
    domain: ['#7ac72c', '#99c72c', '#bac72c', ' #c7bf2c', '#C7B42C']
  };

  constructor(private analyticService: AnalyticsService) { }

  ngOnInit(): void {
    const authToken = localStorage.getItem('auth')
    if(authToken) {
      this.analyticService.getMisclassifiedImages(authToken).subscribe(response => {
        const entries = Object.entries(response)
        console.log(entries);
        for(let i = 0; i < entries.length; i++) {
          console.log(i + ': ' + entries[i][0]);
          this.imageURLS.push('http://' + entries[i][0]);
          const label = 'Image ' + (i+1);
          // this.data.push({'name': label, 'value': entries[i][1]});
          this.data = [...this.data, {'name': label, 'value': entries[i][1]}]
          console.log(this.data);
        }
      })
    // this.data = [ {"name": "image 1", "value": 1}, {"name": "image 2", "value": 2}]
    }
    
  }

}
