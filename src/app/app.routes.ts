import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'ask',
    loadComponent: () =>
      import('./components/ask-question/ask-question').then(m => m.AskQuestion),
  },
  {
    path: 'request-expert',
    loadComponent: () =>
      import('./components/request-expert/request-expert').then(m => m.RequestExpert),
  },
  {
    path: 'my-posts',
    loadComponent: () =>
      import('./components/myposts/myposts').then(m => m.MyPosts),
  },
  {
    path: 'add-post',
    loadComponent: () =>
      import('./components/add-post/add-post').then(m => m.AddPost),
  },
  { path: '', redirectTo: 'ask', pathMatch: 'full' }, // Add pathMatch!

];