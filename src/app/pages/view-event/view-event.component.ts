import { TeamService } from './../../service/team.service';
import { ActivityService } from './../../service/activity.service';
import { UrlConstants } from './../../constants';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Team } from 'src/app/models/team';
import { ToastService } from 'src/app/service/toast.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/store';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable, timer, Subscription } from 'rxjs';
import { Html5Qrcode } from "html5-qrcode";
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
  providers: [ToastService],
})
export class ViewEventComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  currentEvent!: Event;
  activities: Activity[] = [];
  teamData: { activityId: string; teams: Team[] }[] = [];
  backUrl!: string;
  isAdmin: boolean = false;
  dialogVisible: boolean = false;
  dialogContent!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private teamService: TeamService,
    private toastService: ToastService,
    private store: Store<AppState>,
    private bookingService: BookingService
  ) {
    this.backUrl = UrlConstants.home;

    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((store) => {
        this.isAdmin = store?.userType === 1;

        this.activityService.getActivities().subscribe((activities) => {
          this.activities = activities;

          const ids: string[] = [];
          activities.forEach((activity) => {
            ids.push(activity.id);
          });

          this.loading = false;
        });
      });
  }

  ngOnInit(): void {
    this.readAvailableVideoInputs();
  }

  navigateToActivity(id: string) {
    this.router.navigate([UrlConstants.viewActivity + '/' + id]);
  }

  editActivity(id: string) {
    this.router.navigate([UrlConstants.editActivty + '/' + id]);
  }

  navigateToCreate() {
    this.router.navigate([UrlConstants.createActivty]);
  }

  logout() {
    this.router.navigate([UrlConstants.logout]);
  }

  leaderboard() {
    this.router.navigate([UrlConstants.leaderboard]);
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
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  private triggerSubscription: Subscription = new Subscription();

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;

    if (this.showWebcam) {
      const source = timer(100, 100);
      this.triggerSubscription = source.subscribe(val => {
        this.triggerSnapshot();
      });
    } else {
      this.triggerSubscription.unsubscribe();
    }
  }

  public handleInitError(error: WebcamInitError): void {
    this.messages.push(error);
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
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
    this.html5QrCode = new Html5Qrcode(/* element id */ "reader");
  }

  toggleDialog() {
    this.dialogVisible = !this.dialogVisible;
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;

    // scan image
    const imageBlob = this.dataURItoBlob(webcamImage.imageAsBase64);
    const imageFile = new File([imageBlob], "scan", { type: 'image/png' });

    this.html5QrCode.scanFile(imageFile, true)
      .then(decodedText => {
        // success, use decodedText
        console.log(decodedText);

        this.bookingService.uploadQrCode(decodedText).subscribe(x => {
          console.log(x);
          this.dialogContent = x;
          this.dialogVisible = true;
        })


        this.toggleWebcam();
      })
      .catch(err => {
        // failure, handle it.
        console.log(`Error scanning file. Reason: ${err}`)
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
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        console.log("Available inputs: ", mediaDevices)
      });
  }
}
