import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-update-footer',
  templateUrl: './update-footer.component.html',
  styleUrls: ['./update-footer.component.scss'],
})
export class UpdateFooterComponent {
  @Output() update: EventEmitter<number> = new EventEmitter();

  save() {
    this.update.emit(0);
  }
}
