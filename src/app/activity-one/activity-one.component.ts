import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChoiceModel } from '../models/choice-model';
import { ImageConfidenceModel } from '../models/image-confidence-model';
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
  confidenceArray: ImageConfidenceModel[] = [];
  sumConfidence: number = 0;
  avgConfidence: number = 0;

  accuracyTooltip = "We already know whether the images in the test set are healthy. Accuracy is calculated by comparing the model's predictions to the know health status of an image, then counting what percent the model got correct";
  confidenceTooltip = "This confidence value is an average of the confidence values for each test set image. It tells you how sure the model was that its prediction was accurate. "

  ngOnInit(): void {
    this.selectedLabel = 'Unhealthy';
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
    const userId = localStorage.getItem("userID");
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
      console.log('labeled images: ' + this.labeledImages);
    }
    // this.imageService.postNewChoice(newChoice);
    this.selectedLabel = 'Unhealthy';
    this.imageCount++;
    if(this.imageCount > 9) { 
      this.notComplete = false; 
      const authToken = localStorage.getItem('auth');
      if(authToken) {
        this.imageService.postNewChoice(this.labeledImages, authToken).subscribe(response => {
          if(userId != null) {
            this.imageService.trainModel(userId, authToken, '1').subscribe(response => {
              this.accuracy = response.Accuracy;
              console.log(response.Accuracy);
              Object.entries(response.image_confidence).forEach(entry => {
                console.log(entry[1]);
                const imgConf: ImageConfidenceModel = <ImageConfidenceModel>entry[1];
                imgConf.imageUrl = 'http://'+imgConf.imageUrl;
                imgConf.confidence *= 100;
                this.sumConfidence += imgConf.confidence;
                this.confidenceArray.push(imgConf);
                // if(typeof entry[1] == 'con') {
                //   this.confidenceArray.push({'imageUrl': this.addPrefix(entry[0]), 'confidence': entry[1]})
                // }
              });
            });
          }
          console.log(this.confidenceArray);
          console.log('Sum '+this.sumConfidence);
          console.log('length '+this.confidenceArray.length);
          this.avgConfidence = this.sumConfidence / this.confidenceArray.length;
        });
      }
    }
  }

  tryNow() {
    this.started = true;
  }

  /**
   * returns image url plus prefix needed for display
   * @param imageURL 
   */
  addPrefix(imageURL: string): string {
    return 'data:image/png;base64,' + imageURL;
  }


}
