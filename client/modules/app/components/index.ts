import { NgModule } from '@angular/core'
import { FormModule } from './form/index'

@NgModule({
  imports: [FormModule],
  exports: [FormModule]
})

export class ComponentsModule {}
