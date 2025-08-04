import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';


@Component({
  selector: 'navbar',
  imports: [],
  template: `
    <nav class="flex justify-between bg-sky-900  text-white p-3">
      <h2 class=" text-3xl justify-start">{{ title() }}</h2>
    </nav>
  `,
})
export class NavbarComponent implements OnChanges {
  title = signal('CRUD');
  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
  }
}
