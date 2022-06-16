import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { PaginationService } from './_services/index';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        PaginationService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
