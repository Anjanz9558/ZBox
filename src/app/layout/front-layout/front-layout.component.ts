import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from './front-navbar/front-navbar.component';
import { FrontSidebarComponent } from './front-sidebar/front-sidebar.component';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss'], // Corrected property name
  standalone: true, // Optional if this component is standalone
  imports: [RouterOutlet, FrontNavbarComponent ,FrontSidebarComponent], // Ensure standalone components are imported
  encapsulation: ViewEncapsulation.None // ✅ Allows styles to apply globally
})
export class FrontLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //   const cursorDot = document.querySelector('.cursor-dot') as HTMLElement;
    //   const cursorRing = document.querySelector('.cursor-ring') as HTMLElement;
  
    //   let ringX = 0, ringY = 0;
  
    //   document.addEventListener('mousemove', (e: MouseEvent) => {
    //     cursorDot.style.left = `${e.clientX}px`;
    //     cursorDot.style.top = `${e.clientY}px`;
  
    //     ringX = e.clientX;
    //     ringY = e.clientY;
    //   });
  
    //   const animateRing = () => {
    //     cursorRing.style.left = `${ringX}px`;
    //     cursorRing.style.top = `${ringY}px`;
    //     requestAnimationFrame(animateRing);
    //   };
  
    //   animateRing();
    }
  }

