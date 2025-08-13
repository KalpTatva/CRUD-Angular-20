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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { filter } from 'rxjs';

@Component({
  selector: 'navbar',
  imports: [TranslocoModule],
  template: `
    <nav class="flex justify-between bg-sky-900  text-white p-3 px-5">
      <h2 class=" text-3xl justify-start">{{ 'TITLE' | transloco }}</h2>
      <div class="flex gap-4">
        <select class="text-white" (change)="changeLang($event)">
          <option class=" text-black" value="en">English</option>
          <option class=" text-black" value="hi">हिन्दी</option>
          <option class=" text-black" value="de">German</option>
        </select>
        @if(activeLogout()) {
        <a href="" class="my-auto cursor-pointer" (click)="HandleLogout()">
        {{ 'LOGOUT' | transloco }}
        </a>
        }
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  authService = inject(AuthServices);
  activatedRoute = inject(ActivatedRoute);
  activeLogout = signal(false);

  constructor(private router: Router, private transloco: TranslocoService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url != '/auth-login') {
          this.activeLogout.set(true);
        }
      });
  }

  changeLang(lang: any) {
    this.transloco.setActiveLang(lang.target.value);
  }

  HandleLogout() {
    this.authService.logout();
  }
}
