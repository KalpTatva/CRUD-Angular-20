import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { AuthServices } from '../../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [],
  template: `
    <nav class="flex justify-between bg-sky-900  text-white p-3 px-5">
      <h2 class=" text-3xl justify-start">{{ title() }}</h2>
      <!-- @if(active)
      { -->
          <a href="" class="my-auto cursor-pointer" (click)="HandleLogout()">
            Logout
          </a>
      <!-- } -->
    </nav>
  `,
})
export class NavbarComponent implements OnChanges, OnInit {
  authService = inject(AuthServices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  constructor() {}
  title = signal('CRUD');
  active = signal(true);

  ngOnInit(): void {
    // console.log("+++++++",this.activatedRoute.snapshot.url);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("+++++++",this.activatedRoute.snapshot);
  }

  HandleLogout() {
    this.authService.logout();
  }
}
