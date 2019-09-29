import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('/ngsw-worker.js');
//   });
// }

console.log(`Wanna work with me? contact me on twitter at https://twitter.com/phirmware`);


console.log(`https://jefftutors.com`);

console.log(`Wanna work with me on Infrastructure? Contact me via

https://twitter.com/_nerdeveloper

`)

if (navigator.userAgent.indexOf(' UCBrowser/') >= 0) {
  //  do stuff here
  alert('You are on UCBrowser, use chrome browser for the full experience!'); 
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
