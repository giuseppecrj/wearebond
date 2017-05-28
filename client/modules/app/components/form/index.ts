import { NgModule } from '@angular/core'
import { FormMoviesModule } from './form-movies/index'

@NgModule({
  imports: [FormMoviesModule],
  exports: [FormMoviesModule]
})

export class FormModule {}
