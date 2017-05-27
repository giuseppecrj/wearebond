import './polyfills'
import './main.sass'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app/app'

if (module.hot) {
  module.hot.accept()
}

platformBrowserDynamic().bootstrapModule(AppModule)
