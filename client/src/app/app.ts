import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

// constructor if provided is the first thing happens in an  Angular component
// the next step is beign initialized
export class App implements OnInit {
  private http = inject(HttpClient);
  // protected means the property is available to it's children
  protected readonly title = signal('client');
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => console.log('completed request')
  })
}
}
