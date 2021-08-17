import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
const MEDIA_FOLDER_NAME = 'my_media';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  files: any = [];
  constructor(
    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private plt: Platform

  ) { }
  ngOnInit() {
    this.plt.ready().then(() => {
      let path = this.file.dataDirectory;
      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(() => {
        this.loadFiles();
      }, err => {
        this.file.createDir(path, MEDIA_FOLDER_NAME, false);
      });
    })
  }

  loadFiles() {
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(res => {
      this.files = res;
      console.log('files: ', this.files);

    }, err => {
      console.log('error loading files:', err);

    })
  }
  async selectMedia() {
    const actionSheet = await this.actionSheetController.create({
      header: 'What would you like to add',
      buttons: [{
        text: 'Capture Image',

        handler: () => {
          this.captureImage();
        }
      },
      {
        text: 'Record Video',

        handler: () => {
          this.recordVideo();
        }
      },
      {
        text: 'Record Audio',

        handler: () => {
          this.recordAudio();
        }
      },
      {
        text: 'Load Multiple',

        handler: () => {
          this.pickImages();
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',

      }]
    });

    await actionSheet.present();
  }
  pickImages() {
    this.imagePicker.getPictures({}).then(results => {
      console.log('images: ', results);
      for (const result of results) {
        this.copyFileToLocalDir(result);

      }

    });
  }

  captureImage() {
    this.mediaCapture.captureImage().then((data: MediaFile[]) => {
      if (data.length > 0) {
        this.copyFileToLocalDir(data[0].fullPath);
      }
    })
  }
  recordAudio() {
    this.mediaCapture.captureAudio().then((data: MediaFile[]) => {
      if (data.length > 0) {
        this.copyFileToLocalDir(data[0].fullPath);
      }
    }, (err: CaptureError) =>
      console.error(err)
    );
  }
  recordVideo() {
    this.mediaCapture.captureVideo().then((data: MediaFile[]) => {
      if (data.length > 0) {
        this.copyFileToLocalDir(data[0].fullPath);
      }
    }, (err: CaptureError) =>
      console.error(err)
    );
  }
  copyFileToLocalDir(fullpath) {
    console.log('copy now', fullpath);
    let myPath = fullpath;
    // Make sure we copy from the right location
    if (fullpath.indexOf('file://') < 0) {
      myPath = 'file://' + fullpath
    }
    const ext = myPath.split('.').pop();
    const d = Date.now();
    const newName = `${d}.${ext}`;

    const name = myPath.substr(myPath.lastIndexOf('/') + 1);
    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;

    this.file.copyFile(copyFrom, name, copyTo, newName).then(success => {
      this.loadFiles();
    }, err => {
      console.error('error:', err);

    });
  }

  openFile(f: FileEntry) {
    if (f.name.indexOf('.wav') > -1) {
      // We need to remove file:// from the path for the audio plugin to work
      const path = f.nativeURL.replace(/^file:\/\//, '');
      const audioFile: MediaObject = this.media.create(path);
      audioFile.play();
    } else if (f.name.indexOf('.MOV') > -1 || f.name.indexOf('.mp4') > -1) {
      // E.g:Use the streaming Media to play a video
      this.streamingMedia.playVideo(f.nativeURL);
    } else if (f.name.indexOf('.jpg') > -1) {
      // E.g:Use the  Photoviewer to present an image
      this.photoViewer.show(f.nativeURL, 'My awsome Image');
    }
  }

  deleteFile(f: FileEntry) {
    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
    this.file.removeFile(path, f.name).then(() => {
      this.loadFiles();

    }, err => {
      console.log('error remove: ', err);

    })
  }
}
