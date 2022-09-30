import { Component, OnInit } from '@angular/core';
import { UrlConstants } from 'src/app/constants';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  backUrl: string = "";
  constructor() {
    this.backUrl = UrlConstants.home;
  }

  ngOnInit(): void {
  }

}
