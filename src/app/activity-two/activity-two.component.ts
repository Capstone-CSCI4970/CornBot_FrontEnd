import { Component, OnInit } from '@angular/core';
import { ChoiceModel } from '../models/choice-model';
import { ImageModel } from '../models/image-model';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-activity-two',
  templateUrl: './activity-two.component.html',
  styleUrls: ['./activity-two.component.css']
})
export class ActivityTwoComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  images: ImageModel[] = [];
  imageCount = 0;
  labels = ['Healthy', 'Unhealthy'];
  selectedLabel!: string;
  notComplete = true;
  labeledImages: ChoiceModel[] = [];
  accuracy: number = 0;

  ngOnInit(): void {
    this.imageService.getImageSet().subscribe( data => {
      for (const datum of data) {
        datum.imageUrl = 'http://' + datum.imageUrl;
        this.images.push(datum); 
        console.log(datum.imageUrl);}
    })
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
        user_training_record: false
      }
      this.labeledImages.push(newChoice);
    }
    this.selectedLabel = '';
    this.imageCount++;
    if(this.imageCount > 9) { 
      this.notComplete = false;
      this.imageService.postNewChoice(this.labeledImages).subscribe(response => {
        if(userId != null) {
          this.imageService.trainModel(userId).subscribe(response => {
            this.accuracy = response.Accuracy;
            console.log(response.Accuracy);
          });
        }
      });
    }
  }

}
