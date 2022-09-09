import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, characters: number | string) {
    console.log(value.length);

    if (+characters >= value.length) return value;

    return value.substring(0, +characters) + ' ...';
  }
}
