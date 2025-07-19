import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideAuth0 } from '@auth0/auth0-angular'; // ✅ this is correct for your version
import { authConfig } from './auth.config';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([])),
    provideRouter(routes),
    provideAuth0(authConfig), // ✅ this works with current version
  ],
});