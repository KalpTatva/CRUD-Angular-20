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
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'navbar',
  imports: [],
  template: `
    <nav class="flex justify-between bg-sky-900  text-white p-3 px-5">
      <h2 class=" text-3xl justify-start">{{ title() }}</h2>
      <!-- @if(active)
      { -->
      <select (change)="changeLang($event)">
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="de">German</option>
      </select>
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
  constructor(private transloco: TranslocoService) {}
  title = signal('CRUD');
  active = signal(true);

  ngOnInit(): void {
    // console.log("+++++++",this.activatedRoute.snapshot.url);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("+++++++",this.activatedRoute.snapshot);
  }

  changeLang(lang: any) {
    console.log(lang.target.value);
    this.transloco.setActiveLang(lang.target.value);
  }

  HandleLogout() {
    this.authService.logout();
  }
}
