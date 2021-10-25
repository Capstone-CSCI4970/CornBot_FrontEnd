import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChoiceModel } from '../models/choice-model';
import { ImageModel } from '../models/image-model';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-activity-one',
  templateUrl: './activity-one.component.html',
  styleUrls: ['./activity-one.component.css']
})
export class ActivityOneComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  images: ImageModel[] = [];
  imageCount = 0;
  // labelForm = new FormGroup({
  //   label: new FormControl('Healthy'),
  // });
  labels = ['Healthy', 'Unhealthy'];
  selectedLabel!: string;
  notComplete = true;

  ngOnInit(): void {
    this.imageService.getImageSet().subscribe( data => {
      for (const datum of data) {
        datum.imageUrl = 'http://' + datum.imageUrl;
        this.images.push(datum); 
        console.log(datum.imageUrl);}
    })
  }

  onSubmit() {
    let bool: boolean;
    if(this.selectedLabel == "Healthy") { bool = true; }
    else { bool = false; }
    const newChoice: ChoiceModel = {
      user: 8,
      image: this.images[this.imageCount].id,
      userLabel: bool
    }
    this.imageService.postNewChoice(newChoice);
    this.selectedLabel = '';
    this.imageCount++;
    if(this.imageCount > 9) { this.notComplete = false; }
  }


}
