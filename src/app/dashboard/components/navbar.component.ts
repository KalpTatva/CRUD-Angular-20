import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';


@Component({
  selector: 'navbar',
  imports: [],
  template: `
    <nav class="flex justify-between bg-sky-900  text-white p-3">
      <h2 class=" text-3xl justify-start">{{ title() }}</h2>
      <p class=" text-2xl justify-end">courses {{ count() }}</p>
    </nav>
  `,
})
export class NavbarComponent implements OnChanges {
  title = signal('CRUD');
  count = signal(0);
  @Input()
  numberOfCourses: number = 0;
  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    this.count.set(this.numberOfCourses);
  }
}
