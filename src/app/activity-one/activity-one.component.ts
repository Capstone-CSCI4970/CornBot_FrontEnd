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
  started = false;
  labeledImages: ChoiceModel[] = [];
  accuracy: number = 0;

  ngOnInit(): void {
    const authToken = localStorage.getItem('auth');
    if(authToken) {
      this.imageService.getImageSet(authToken).subscribe( data => {
      for (const datum of data) {
        datum.imageUrl = 'http://' + datum.imageUrl;
        this.images.push(datum); 
        console.log(datum.imageUrl);}
    })
  }
    if(localStorage.getItem("userID") != null) {console.log("userID: " + localStorage.getItem("userID")); }
  }

  /**
   * calls service to create a new choice record, then 
   * increments count var to advance to next image or to 
   * terminate the classification activity
   */
  onSubmit() {
    let bool: boolean;
    const userId = localStorage.getItem("uid");
    if(this.selectedLabel == "Healthy") { bool = true; }
    else { bool = false; }
    if(userId != null) {
      const newChoice: ChoiceModel = {
        user: parseInt(userId),
        image: this.images[this.imageCount].id,
        userLabel: bool,
        user_training_record: true
      }
      console.log("image id: "+this.images[this.imageCount].id);
      this.labeledImages.push(newChoice);
    }
    // this.imageService.postNewChoice(newChoice);
    this.selectedLabel = '';
    this.imageCount++;
    if(this.imageCount > 9) { 
      this.notComplete = false; 
      const authToken = localStorage.getItem('auth');
      if(authToken) {
        this.imageService.postNewChoice(this.labeledImages, authToken).subscribe(response => {
          if(userId != null) {
            this.imageService.trainModel(userId, authToken).subscribe(response => {
              this.accuracy = response.Accuracy;
              console.log(response.Accuracy);
            });
          }
        });
      }
    }
  }

  tryNow() {
    this.started = true;
  }


}
