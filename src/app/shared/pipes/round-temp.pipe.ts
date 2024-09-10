import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundTemp',
  standalone: true
})
export class RoundTempPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.floor(value);
  }

}
