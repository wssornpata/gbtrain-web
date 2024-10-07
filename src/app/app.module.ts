import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppComponent,
    HttpClientModule,
    TypeaheadModule.forRoot(),
  ],
  bootstrap: [],
})
export class AppModule {}