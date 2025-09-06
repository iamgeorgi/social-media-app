import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

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
  public members = signal<{ id: string, displayName: string, email: string }[]>([]);

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: response => this.members.set(response as { id: string, displayName: string, email: string }[]),
      error: error => console.log(error),
      complete: () => console.log('completed request')
    })

    // this.members.set(await this.getMembers());
  }

  // Alternative which returns a Promise
  async getMembers() {
    try {
      return lastValueFrom(this.http.get<{ id: string, displayName: string, email: string }[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
