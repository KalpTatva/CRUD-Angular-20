import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./dashboard/components/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
      <main class=" h-screen bg-gray-50 dark:bg-gray-900 ">
        <navbar />
        <router-outlet></router-outlet>
      </main>
    `,
  styleUrl: './app.css',
})
export class App  {}
