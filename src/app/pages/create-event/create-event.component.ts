import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEvent } from 'src/app/models/event';
import { EventService } from 'src/app/service/event.service';
import { ToastService, ToastType } from 'src/app/service/toast.service';
import * as moment from 'moment';
import { GeneralConstants, UrlConstants } from 'src/app/constants';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [EventService],
})
export class CreateEventComponent implements OnInit {
  loading: boolean = true;
  backUrl: string = UrlConstants.home;

  editing: boolean = false;
  createEventForm = this.fb.group({
    name: ['', Validators.required],
    img: [''],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
  });

  minDateStart: Date = new Date();
  minDateEnd: Date = new Date();

  dateStart: Date | null = new Date();
  dateEnd: Date | null = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const id: string | null = params.get('id');

      if (id) {
        this.editing = true;

        this.eventService
          .getEventById(id)
          .pipe(take(1))
          .subscribe((event) => {
            if (event) {
              this.dateStart = new Date(event.dateStart);
              this.dateEnd = new Date(event.dateEnd);

              this.createEventForm.patchValue({
                name: event.name,
                img: event.imgUrl,
                dateStart: new Date(event.dateStart).toString(),
                dateEnd: new Date(event.dateEnd).toString(),
              });
              this.updateMinEndDate();

              this.loading = false;
            } else {
              this.toastService.addToast(
                ToastType.error,
                'Something went wrong fetching event details'
              );
              this.router.navigate([UrlConstants.home]);
            }
          });
      } else {
        this.dateStart = null;
        this.dateEnd = null;
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {}

  Submit() {
    if (this.createEventForm.invalid) {
      this.toastService.addToast(ToastType.error, 'Fields are incorrect');
      return;
    }

    const dateStart = moment(
      this.createEventForm.get('dateStart')?.value
    ).format(GeneralConstants.ApiDateTime);
    const dateEnd = moment(this.createEventForm.get('dateEnd')?.value).format(
      GeneralConstants.ApiDateTime
    );
    const name = this.createEventForm.get('name')?.value;
    let imgUrl = this.createEventForm.get('img')?.value;

    if (dateStart && dateEnd && name) {
      if (imgUrl == undefined || imgUrl == null) imgUrl = '';

      const model: CreateEvent = {
        name: name,
        imgUrl: imgUrl,
        dateStart: dateStart,
        dateEnd: dateEnd,
      };

      if (!this.editing) {
        this.eventService.createEvent(model).subscribe({
          next: (res) => {
            this.router.navigate([UrlConstants.home]);
          },
          error: () => {
            this.toastService.addToast(
              ToastType.error,
              'Could not create event'
            );
          },
        });
      } else {
        console.log('edit event');
      }
    } else {
      this.toastService.addToast(ToastType.error, 'Something went wrong');
    }
  }

  updateMinEndDate() {
    const val: string | undefined | null =
      this.createEventForm.get('dateStart')?.value;

    if (this.createEventForm.get('dateStart')?.valid && val) {
      const date: Date = new Date(val);

      this.minDateEnd = date;
      this.createEventForm.get('dateEnd')?.reset();
      this.createEventForm.updateValueAndValidity();
    }
  }
}
