import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

@Pipe({
  name: 'strForKatex'
})
export class StrForKatexPipe implements PipeTransform {

  constructor(private readonly dompurifySanitizer: NgDompurifySanitizer){}

  transform(value: any, ...args: unknown[]): string {
    let ret: string = this.dompurifySanitizer.sanitize(SecurityContext.HTML, value)
    return !ret ? " " : ret;
  }

}
