import { Injectable } from '@angular/core';
import { TypeModel } from '../model/type-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { StationModel } from '../model/station-model';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  async getTypes(): Promise<TypeModel[]> {
    try {
      return await firstValueFrom(
        this.http.get<TypeModel[]>(`${environment.BASEURL_DROPDOWN}/type`)
      );
    } catch (error) {
      return [];
    }
  }

  async getStations(): Promise<StationModel[]> {
    try {
      return await firstValueFrom(
        this.http.get<StationModel[]>(`${environment.BASEURL_DROPDOWN}/station`)
      );
    } catch (error) {
      return [];
    }
  }
}
