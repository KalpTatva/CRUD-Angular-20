import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./dashboard/components/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
      <main>
        <navbar />
      </main>
      <router-outlet></router-outlet>
    `,
  styleUrl: './app.css',
})
export class App  {}
