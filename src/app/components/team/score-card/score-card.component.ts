import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
})
export class ScoreCardComponent implements OnInit {
  rating: number = 0;

  @Output() starSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() category: Category | null | undefined;
  @Input() score!: number;

  constructor() {}

  ngOnInit(): void {
    console.log(this.score);
    this.rating = this.score;
  }

  onStarSelect(val: number) {
    this.starSelect.emit({ value: val, catId: this.category?.categoryId });
  }
}
