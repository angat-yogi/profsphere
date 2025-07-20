import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { firebaseConfig } from './environments/firebase.config';
import { provideStorage, getStorage } from '@angular/fire/storage'; // ✅ add this

import { provideAuth0 } from '@auth0/auth0-angular'; // ✅ this is correct for your version
import { authConfig } from './auth.config';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([])),
    provideRouter(routes),
    provideAuth0(authConfig), // ✅ this works with current version
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
});