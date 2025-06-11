import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
    selector: 'app-admin-footer',
    templateUrl: './admin-footer.component.html',
    styleUrls: ['./admin-footer.component.scss']
})
export class DefaultFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
