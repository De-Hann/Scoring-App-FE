import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss'],
})
export class SmallCardComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() imgUrl: string = '';
  @Input() editable: boolean = false;

  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() view: EventEmitter<string> = new EventEmitter<string>();

  clickEdit() {
    this.edit.emit(this.id);
  }

  clickEvent() {
    this.view.emit(this.id);
  }
}
