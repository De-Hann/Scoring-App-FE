import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() imgUrl: string = '';
  @Input() scored: number = 0;
  @Input() categories: number = 0;

  @Output() score: EventEmitter<string> = new EventEmitter<string>();

  clickEvent() {
    this.score.emit(this.id);
  }
}
