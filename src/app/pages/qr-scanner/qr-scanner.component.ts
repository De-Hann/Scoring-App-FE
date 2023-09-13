import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Html5Qrcode } from 'html5-qrcode';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Subscription, timer, Observable } from 'rxjs';
import { UrlConstants } from 'src/app/constants';
import { ActivityService } from 'src/app/service/activity.service';
import { BookingService } from 'src/app/service/booking.service';
import { TeamService } from 'src/app/service/team.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit, AfterViewInit {
  dialogVisible: boolean = false;
  dialogContent!: any;

  roleMap = ['General', 'Admin', 'Judge', 'Scanner'];

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.readAvailableVideoInputs();
  }

  logout() {
    this.router.navigate([UrlConstants.logout]);
  }
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string = '';
  public facingMode: string = 'environment';
  public messages: any[] = [];

  // latest snapshot
  public webcamImage: WebcamImage | null = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  private triggerSubscription: Subscription = new Subscription();

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;

    if (this.showWebcam) {
      const source = timer(100, 100);
      this.triggerSubscription = source.subscribe((val) => {
        this.triggerSnapshot();
      });
    } else {
      this.triggerSubscription.unsubscribe();
    }
  }

  public handleInitError(error: WebcamInitError): void {
    this.messages.push(error);
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === 'NotAllowedError'
    ) {
      this.addMessage('User denied camera access');
    }
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  html5QrCode!: Html5Qrcode;
  cameraId: any;

  ngAfterViewInit(): void {
    this.html5QrCode = new Html5Qrcode(/* element id */ 'reader');
  }

  toggleDialog() {
    this.dialogVisible = !this.dialogVisible;
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

    // scan image
    const imageBlob = this.dataURItoBlob(webcamImage.imageAsBase64);
    const imageFile = new File([imageBlob], 'scan', { type: 'image/png' });

    this.html5QrCode
      .scanFile(imageFile, true)
      .then((decodedText) => {
        // success, use decodedText
        console.log(decodedText);

        this.bookingService.uploadQrCode(decodedText).subscribe((x) => {
          console.log(x);
          this.dialogContent = x;
          this.dialogVisible = true;
        });

        this.toggleWebcam();
      })
      .catch((err) => {
        // failure, handle it.
        console.log(`Error scanning file. Reason: ${err}`);
      });
  }

  public cameraWasSwitched(deviceId: string): void {
    this.addMessage('Active device: ' + deviceId);
    this.deviceId = deviceId;
    this.readAvailableVideoInputs();
  }

  addMessage(message: any): void {
    console.log(message);
    this.messages.unshift(message);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }

  private readAvailableVideoInputs() {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        console.log('Available inputs: ', mediaDevices);
      }
    );
  }
}
