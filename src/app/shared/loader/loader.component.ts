import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="loaderService.loading$ | async" class="loader-backdrop">
    <div class="image-container">
      <img src='../../../assets/img/watermark.png' style="width:60px; height:auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%;" />
      <img src="../../../assets/img/Eclipse-1.4s-197px.gif" style="position: absolute; width: 70px; height: 150%; top: 230%; left: 50%; transform: translateX(-50%);" />
    </div>
  </div>
  `,

  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) { }
}
