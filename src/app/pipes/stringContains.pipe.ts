import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'stringContains'})
export class stringContains implements PipeTransform {
  transform(value: string, compare: string): boolean {
    return value != null && value.toLocaleLowerCase().includes(compare);
  }
}