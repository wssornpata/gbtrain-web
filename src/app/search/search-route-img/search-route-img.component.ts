import { Component } from '@angular/core';

@Component({
  selector: 'app-search-route-img',
  standalone: true,
  imports: [],
  templateUrl: './search-route-img.component.html',
  styleUrls: ['./search-route-img.component.css']
})

export class SearchRouteImgComponent {
  imageSrc = '../../assets/img/RouteMap.jpg';
  scale = 0.9;

  zoomIn() {
    this.scale = Math.min(2.3, this.scale + 0.1);
  }

  zoomOut() {
    this.scale = Math.max(1, this.scale - 0.1);
  }
}