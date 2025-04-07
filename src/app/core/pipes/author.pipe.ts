import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clone',
  standalone: true,
})
export class ClonePipe implements PipeTransform {
  transform(object: any): any {
    return structuredClone(object);
  }
}
