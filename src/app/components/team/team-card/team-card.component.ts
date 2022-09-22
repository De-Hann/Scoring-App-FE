import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Output() score: EventEmitter<{ id: string; score: number }> =
    new EventEmitter<{ id: string; score: number }>();
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();

  clickEdit() {
    this.edit.emit(this.id);
  }

  clickScore() {
    this.score.emit({ id: this.id, score: this.myScore });
  }
}
