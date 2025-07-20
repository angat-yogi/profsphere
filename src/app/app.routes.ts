import { Routes } from '@angular/router';
import { AskQuestion } from '../app/components/ask-question/ask-question';

export const routes: Routes = [
    { path: 'ask', component: AskQuestion },
    { path: '**', redirectTo: 'ask' },
  ];