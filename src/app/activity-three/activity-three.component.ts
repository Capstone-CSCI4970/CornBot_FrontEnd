import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../services/image-upload.service';

@Component({
  selector: 'app-activity-three',
  templateUrl: './activity-three.component.html',
  styleUrls: ['./activity-three.component.css']
})
export class ActivityThreeComponent implements OnInit {
  // imageUploaded = false;
  fileName = '';
  imageURL = '';
  selectedFile!: File;

  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
  }

  // onFileSelected(event: any) {
  //   const file:File = event.target.files[0];
  //   if (file) {
  //     this.fileName = file.name;
  //     // const reqData = {uploadedFile: file};
  //     const formData = new FormData();
  //     formData.append("uploadedFile", file);
  //     const authToken = localStorage.getItem('auth');
  //     if(authToken) {
  //       this.imageUploadService.getCNNImage(formData, authToken).subscribe(response => {
  //         this.imageURL = 'data:image/png;base64,' + response['Pred_URI'];
  //       // console.log(response['Pred_URI']);
  //       });
  //     }
  //   }  
  // }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
  }
  onUpload() {
    if (this.selectedFile) {
      // const reqData = {uploadedFile: file};
      const formData = new FormData();
      formData.append("uploadedFile", this.selectedFile);
      const authToken = localStorage.getItem('auth');
      if(authToken) {
        this.imageUploadService.getCNNImage(formData, authToken).subscribe(response => {
          this.imageURL = 'data:image/png;base64,' + response['Pred_URI'];
        // console.log(response['Pred_URI']);
        });
      }
    } 
  }

}
