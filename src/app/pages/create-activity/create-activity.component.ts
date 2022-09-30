import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UrlConstants } from 'src/app/constants';
import { CreateActivity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/service/activity.service';
import { ToastService, ToastType } from 'src/app/service/toast.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss'],
})
export class CreateActivityComponent implements OnInit {
  loading: boolean = true;
  backUrl!: string;
  eventId!: string;

  editing: boolean = false;
  createActivityForm = this.fb.group({
    name: ['', Validators.required],
    img: [''],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const activityId: string | null = params.get('activityId');
      const eventId: string | null = params.get('eventId');

      if (eventId) {
        this.eventId = eventId;
        this.backUrl = UrlConstants.home;

        if (activityId) {
          this.editing = true;

          this.activityService
            .getActivityById(activityId)
            .pipe(take(1))
            .subscribe((activity) => {
              if (activity) {
                this.createActivityForm.patchValue({
                  name: activity.name,
                  img: activity.imgUrl,
                });

                this.loading = false;
              } else {
                this.toastService.addToast(
                  ToastType.error,
                  'Something went wrong fetching activity details'
                );
                this.router.navigate([UrlConstants.home]);
              }
            });
        } else {
          this.loading = false;
        }
      } else {
        this.toastService.addToast(ToastType.error, 'Something went wrong');
        this.router.navigate([UrlConstants.home]);
      }
    });
  }

  ngOnInit(): void {}

  Submit() {
    if (this.createActivityForm.invalid) {
      this.toastService.addToast(ToastType.error, 'Fields are incorrect');
      return;
    }

    const name = this.createActivityForm.get('name')?.value;
    let imgUrl = this.createActivityForm.get('img')?.value;

    if (name) {
      if (imgUrl == undefined || imgUrl == null) imgUrl = '';

      const model: CreateActivity = {
        name: name,
        imgUrl: imgUrl,
      };

      if (!this.editing) {
        this.activityService.createActivity(model).subscribe({
          next: (res) => {
            this.router.navigate([UrlConstants.home]);
          },
          error: () => {
            this.toastService.addToast(
              ToastType.error,
              'Could not create activity'
            );
          },
        });
      } else {
        console.log('edit activity');
      }
    } else {
      this.toastService.addToast(ToastType.error, 'Something went wrong');
    }
  }
}
