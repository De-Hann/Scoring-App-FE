import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ToastService {
  constructor(private messageService: MessageService) {}

  addToast(type: ToastType, message: string, summary: string | null = null) {
    this.messageService.add({
      summary: summary === null ? type + '!' : summary,
      detail: message,
      severity: type.toLowerCase(),
    });
  }
}

export enum ToastType {
  success = 'Success',
  error = 'Error',
  warning = 'Warning',
}
