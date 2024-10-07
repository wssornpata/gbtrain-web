import { Component } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SearchRouteImgComponent } from './search-route-img/search-route-img.component';
import { InputBoxComponent } from './search-input-box/input-box.component';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputBoxComponent, SearchRouteImgComponent, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {}
