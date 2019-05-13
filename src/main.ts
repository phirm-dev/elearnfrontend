import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log(`https://jefftutors.com`);

console.log(`Wanna work with me? contact me on twitter at

https://twitter.com/phirmware

`)

if (navigator.userAgent.indexOf(' UCBrowser/') >= 0) {
  //  do stuff here
  alert('You are on UCBrowser, use chrome browser for the full experience!'); 
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
