import { Component } from '@angular/core';
import { SearchRouteImgComponent } from './search-route-img/search-route-img.component';
import { HttpClientModule } from '@angular/common/http';
import { InputBoxComponent } from './search-input-box/input-box.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputBoxComponent, SearchRouteImgComponent, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {}
