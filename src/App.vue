<template>

  <div id="app">
    <div class="vl"></div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <div class="col">
              <video style="margin-left: 0" autoplay width="640" height="480"></video>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col">
              <button id="image-capture-btn" class="btn btn-primary" @click="captureImage()">Capture Image</button>
            </div>
            <div class="col">
              <button id="reset-btn" class="btn btn-secondary" @click="reset()">Reset Image</button>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="row">
            <div class="col">
              <h4>Status : {{getStatus()}}</h4>
            </div>
          </div>

          <div class="row">

            <div class="col">
              <b-card img-src="https://image.flaticon.com/icons/svg/424/424436.svg" img-alt="Card image" img-left
                      class="mb-3">
                <b-card-text>
                  <h1>Parent Details</h1>
                  <br>
                  <form style="margin-left: 30px">
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Name</label>
                      <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext"
                               v-bind:value="parentMapping.parent.name">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Email</label>
                      <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext"
                               v-bind:value="parentMapping.parent.email">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Phone</label>
                      <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext"
                               v-bind:value="parentMapping.parent.phone">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Relation</label>
                      <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext"
                               v-bind:value="parentMapping.parent.relation">
                      </div>
                    </div>
                  </form>
                </b-card-text>
              </b-card>
              <!--<div class="card">-->
            </div>
          </div>


          <div class="row">

            <div class="col">
              <b-card img-src="https://image.flaticon.com/icons/svg/265/265674.svg" img-alt="Card image" img-left
                      class="mb-3">
                <b-card-text>
                  <h1>Child Details</h1>
                  <br>
                  <form style="margin-left: 30px">
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Name</label>
                      <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext"
                               v-bind:value="parentMapping.child.name">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Class</label>
                      <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext"
                               v-bind:value="parentMapping.child.class">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Roll No</label>
                      <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext"
                               v-bind:value="parentMapping.child.rollNo">
                      </div>
                    </div>
                  </form>
                </b-card-text>
              </b-card>
              <!--<div class="card">-->
              <canvas style="display: none" id="frame-actual" height="300"></canvas>
            </div>
          </div>


        </div>
      </div>


    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HelloWorld from './components/HelloWorld.vue';

  import * as  ImageCapture from "image-capture/lib/imagecapture.js";


  @Component({
    components: {
      HelloWorld,
    },
  })
  export default class App extends Vue {
    videoDevice: any;
    video: any;

    resultHeadline: string = "Click Image to Continue...";
    resultStatus = "HangUp.., We are detecting guardian details";

    isImageCaptured: boolean = false;
    parentMapping: any = {
      parent: {},
      child: {}
    };
    mapping = [{
      parent: {
        id: "32",
        name: "Abhishek",
        email: "asinghal@hp.in",
        relation: "brother",
        phone: "9211921101"
      },
      child: {
        name: "Shivu",
        class: "2 A",
        rollNo: "1"
      }
    },
      {
        parent: {
          id: "33",
          name: "Kartik",
          email: "kartik@hp.in",
          relation: "Dad",
          phone: "9242042011"
        },
        child: {
          name: "kalpana",
          class: "4 B",
          rollNo: "10"
        }
      }];

    isDetecting: boolean = false;
    isNotDetected: boolean = false;

    mounted() {


      this.video = document.querySelector('video');

      navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
            frameRate: 10
          }
        }
      ).then(function (stream: any) {
        let video = document.querySelector('video');
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      }).catch(function (err) {
        // deal with an error (such as no webcam)
      });


      this.video.addEventListener('play', function () {
        // trigger business logic
      }, false);


      // let canvas = document.getElementById('frame');
      let photo = document.getElementById('photo');
      //
      // setInterval(x=>{
      //   navigator.mediaDevices.getUserMedia({video: true}).then(this.gotMedia);
      // },100);
      //
      //
      //
      // photo.addEventListener('load', function () {
      //   // After the image loads, discard the image object to release the memory
      //   window.URL.revokeObjectURL((this as any).src);
      // });
    }

    getStatus() {
      if (this.isDetecting) {
        return "Detecting Parent"
      } else {
        if (this.isNotDetected) {
          return "Unknown Person"
        } else {
          if (this.parentMapping.parent.name) {
            return `Successfully Detected Parent`
          } else
            return "Click Image to Continue"
        }
      }
    }

    captureImage() {
      this.isDetecting = true;
      this.video.pause();
      this.isImageCaptured = true;
      this.resultHeadline = "Detecting...";
      var canvases = [];
      let hiddenCanvas: any = document.getElementById("frame-actual");
      // let canvas: any = document.getElementById('frame');
      canvases.push(hiddenCanvas);
      //   canvases.push(canvas);
      canvases.forEach(canvas => {
        let context = canvas.getContext('2d');
        context.drawImage(this.video, 0, 0, canvas.width, canvas.height);

      })

      var jpegUrl = hiddenCanvas.toDataURL("image/jpeg");

      let faceApiService = new (window as any).FaceApiService();
      faceApiService.init().then(x => {
        let labelledFaceDEscriptor = faceApiService.getLabeledFacedDescriptor();
        faceApiService.detectFace(labelledFaceDEscriptor, jpegUrl).then(x => {
          if (x && x.length) {
            let parentId = x[0];
            this.parentMapping = this.mapping.find(x => x.parent.id === parentId);
            console.dir(this.parentMapping);
            this.isNotDetected = false;
          } else {
            this.isNotDetected = true;
            this.parentMapping = {
              parent: {},
              child: {}
            }
          }
          this.isDetecting = false;
        });
      })
      // video 'play' event listener
      // this.video.addEventListener('play', function () {
      //   context.drawImage(this, 0, 0, canvas.width, canvas.height);
      // }, false);
    }

    reset() {
      this.video.play();
      this.isNotDetected = false;
      this.isDetecting = false;
      this.parentMapping = {
        parent: {},
        child: {}
      }
    }

    gotMedia(mediaStream) {
      let videoDevice;
      // Extract video track.
      videoDevice = mediaStream.getVideoTracks()[0];
      // Check if this device supports a picture mode...
      let captureDevice = new (window as any).ImageCapture(videoDevice);
      if (captureDevice) {
        captureDevice.takePhoto().then(this.processPhoto).catch(this.stopCamera);
        captureDevice.grabFrame().then(this.processFrame).catch(this.stopCamera);
      }
    }

    processPhoto(blob) {
      let photo: any = document.getElementById('photo');
      photo.src = window.URL.createObjectURL(blob);
    }

    processFrame(imageBitmap) {
      let canvas: any = document.getElementById('frame');
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      canvas.getContext('2d').drawImage(imageBitmap, 0, 0);

    }

    stopCamera(error) {
      console.error(error);
      if (this.videoDevice) this.videoDevice.stop();  // turn off the camera
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  video {
    display: block;
  }

  #image-capture-btn {
    display: block;
    margin-left: 0;
  }

  .vl {
    border-left: 6px solid black;
    height: 100vh;
    margin: 0 !important;
    left: 50%;
    top: 0;
    position: absolute;
  }

  .form-group, .form-group * {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
    text-align: left;
  }
</style>
