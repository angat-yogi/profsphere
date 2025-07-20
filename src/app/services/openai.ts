import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // if you use env vars
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  askQuestion(prompt: string): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openaiApiKey}`, // or hardcoded for now
    };

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    };
    console.log('Sending request to OpenAI:', body);
    console.log('Using API URL:', this.apiUrl);
    console.log('With headers:', headers);

    return this.http.post(this.apiUrl, body, { headers });
  }
}