import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() label: string = '';
  @Input() backUrl: string | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  back() {
    if (this.backUrl === undefined) {
      console.error('Back Url is not defined!');
      return;
    }
    this.router.navigate([this.backUrl]);
  }
}
