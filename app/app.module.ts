import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { PagerService } from './_services/index';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        PagerService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }