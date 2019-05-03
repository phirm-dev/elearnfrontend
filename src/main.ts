import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log('YO!, new browser update!');

if (navigator.userAgent.indexOf(' UCBrowser/') >= 0) {
  //  do stuff here
  alert('You are on UCBrowser, use chrome browser for the full experience!'); 
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
