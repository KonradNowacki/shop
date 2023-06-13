import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldTextFragment',
  standalone: true,
})
export class BoldTextFragmentPipe implements PipeTransform {
  transform(value: string, textToBold: string | null): string {
    const regex = new RegExp(`${textToBold ?? ''}`, 'ig');
    return value.replace(regex, (x) => `<strong>${x}</strong>`);
  }
}
