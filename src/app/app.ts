import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
      <main>
        <!-- <dashboard-component></dashboard-component> -->
      </main>
      <router-outlet></router-outlet>
    `,
  styleUrl: './app.css',
})
export class App  {}
