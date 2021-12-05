import { Component, OnInit } from '@angular/core';
import { ChoiceModel } from '../models/choice-model';
import { ImageModel } from '../models/image-model';
import { ImageService } from '../services/image.service';
import { ImageConfidenceModel } from '../models/image-confidence-model';

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
  started = false;
  labeledImages: ChoiceModel[] = [];
  accuracy: number = 0;
  confidenceArray: ImageConfidenceModel[] = [];
  sumConfidence: number = 0;

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
  }

  /**
   * calls service to create a new choice record, then 
   * increments count var to advance to next image or to 
   * terminate the classification activity
   */
  onSubmit() {
    let bool: boolean;
    const userId = localStorage.getItem("userID");
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
      const authToken = localStorage.getItem('auth');
      if(authToken) {
        this.imageService.postNewChoice(this.labeledImages, authToken).subscribe(response => {
          if(userId != null) {
            this.imageService.trainModel(userId, authToken, '2').subscribe(response => {
              this.accuracy = response.Accuracy;
              console.log(response.Accuracy);
              Object.entries(response.image_confidence).forEach(entry => {
                console.log(entry[1]);
                const imgConf: ImageConfidenceModel = <ImageConfidenceModel>entry[1];
                imgConf.imageUrl = 'http://'+imgConf.imageUrl;
                imgConf.confidence *= 100;
                this.sumConfidence += imgConf.confidence;
                this.confidenceArray.push(imgConf);
              this.accuracy = response.Accuracy;
              console.log(response.Accuracy);
              });
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
