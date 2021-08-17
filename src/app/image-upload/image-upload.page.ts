import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { ApiService } from '../shared/services/api.service';
import { Image } from '../shared/model/image';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { SlicePipe } from '@angular/common';
const { Camera } = Plugins;
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.page.html',
  styleUrls: ['./image-upload.page.scss'],
})
export class ImageUploadPage implements OnInit {
  images: Image[] = [];
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private api: ApiService,
    private plt: Platform,
    private action: ActionSheetController) { }

  ngOnInit() {
    this.loadImage();
  }
  loadImage() {
    this.api.getImages().subscribe(res => {
      this.images = res.data.data;
      console.log(this.images);

    })
  }
  deleteImage(image: Image, index) {
    this.api.deleteImage(image._id).subscribe(res => {
      this.images.splice(index, 1);
    });
  }
  async selectImageSource() {
    const buttons = [{
      text: 'Take Photo',
      icon: 'camera',
      handler: () => {
        this.addImage(CameraSource.Camera)
      }
    }, {
      text: 'Choose from photos',
      icon: 'image',
      handler: () => {
        this.addImage(CameraSource.Photos)
      }
    }];
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a file',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }

    const actionSheet = await this.action.create({
      header: 'Select Image Source',
      buttons
    });

    await actionSheet.present();

  }



  async addImage(source: CameraSource) {
    console.log('addimage');

    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    });
    console.log('image', image);
    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    const imageName = 'Give me a name';
    this.api.uploadImage(blobData, imageName, image.format).subscribe((newImage: Image) => {
      console.log('after caoture',newImage);
      this.images.push(newImage);

    })
  }
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);

      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);

    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  uploadFile(event: EventTarget) {
    console.log('uploadfile');

    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    this.api.uploadImageFile(file).subscribe((newImage: Image) => {
      this.images.push(newImage);
    })
  }
}
