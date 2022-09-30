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
  @Input() editable: boolean = false;
  @Input() totalScore: number = 0;
  @Input() maxScore: number = 0;
  @Input() myScore: number = 0;
  @Input() scorable: boolean = true;

  @Output() score: EventEmitter<string> = new EventEmitter<string>();

  clickEvent() {
    this.score.emit(this.id);
  }
}
