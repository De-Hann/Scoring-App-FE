import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UrlConstants } from 'src/app/constants';
import { CreateTeam } from 'src/app/models/team';
import { TeamService } from 'src/app/service/team.service';
import { ToastService, ToastType } from 'src/app/service/toast.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit {
  loading: boolean = true;
  activityId!: string;
  backUrl!: string;

  editing: boolean = false;
  createTeamForm = this.fb.group({
    name: ['', Validators.required],
    img: [''],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const teamId: string | null = params.get('teamId');
      const activityId: string | null = params.get('activityId');

      if (activityId) {
        this.activityId = activityId;
        this.backUrl = UrlConstants.viewActivity + '/' + activityId;

        if (teamId) {
          this.editing = true;

          this.teamService
            .getTeamById(teamId)
            .pipe(take(1))
            .subscribe({
              next: (team) => {
                console.log(team);
                if (team) {
                  this.createTeamForm.patchValue({
                    name: team.name,
                    img: team.imgUrl,
                  });

                  this.loading = false;
                } else {
                  this.toastService.addToast(
                    ToastType.error,
                    'Something went wrong fetching team details'
                  );
                  this.router.navigate([UrlConstants.home]);
                }
              },
              error: () => {
                this.toastService.addToast(
                  ToastType.error,
                  'Something went wrong fetching team details'
                );
                this.router.navigate([UrlConstants.home]);
              },
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
    if (this.createTeamForm.invalid) {
      this.toastService.addToast(ToastType.error, 'Fields are incorrect');
      return;
    }

    const name = this.createTeamForm.get('name')?.value;
    let imgUrl = this.createTeamForm.get('img')?.value;

    if (name) {
      if (imgUrl == undefined || imgUrl == null) imgUrl = '';

      const model: CreateTeam = {
        name: name,
        imgUrl: imgUrl,
        activityId: this.activityId,
      };

      if (!this.editing) {
        this.teamService.createTeam(model).subscribe({
          next: (res) => {
            this.router.navigate([
              UrlConstants.viewActivity + '/' + this.activityId,
            ]);
          },
          error: () => {
            this.toastService.addToast(
              ToastType.error,
              'Could not create team'
            );
          },
        });
      } else {
        console.log('edit team');
      }
    } else {
      this.toastService.addToast(ToastType.error, 'Something went wrong');
    }
  }
}
