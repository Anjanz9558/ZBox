// confirm.directive.ts
import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appConfirm]'
})
export class ConfirmDirective {
  @Input() confirmTitle: string = 'Are you sure?';
  @Input() confirmContent: string = 'Do you want to proceed?';

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!confirm(`${this.confirmTitle}\n${this.confirmContent}`)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
