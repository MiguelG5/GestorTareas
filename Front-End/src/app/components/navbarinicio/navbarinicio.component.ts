import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbarinicio',
  templateUrl: './navbarinicio.component.html',
  styleUrls: ['./navbarinicio.component.css']
})
export class NavbarinicioComponent {
  isTransparent: boolean = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isTransparent = (window.pageYOffset || document.documentElement.scrollTop) < 400;
  }
}
