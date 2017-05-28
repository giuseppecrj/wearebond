import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'

import { ComponentsModule } from './components/index'

import { AppComponent } from './app.client.component'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {}
