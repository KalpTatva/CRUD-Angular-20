import { Component, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DashboardService } from '../../dashboard.service';
import { NavbarComponent } from '../../components/navbar.component';
import { CourseTableComponent } from '../../components/course-table.component';

@Component({
  selector: 'dashboard-component',
  imports: [NavbarComponent, CourseTableComponent],
  template: `
    <div class="w-full">
      <navbar [numberOfCourses]="numberOfCourses()" />
      <div class="w-full flex justify-center">
        <course-table [courses] = "courses" />
      </div>
    </div>
  `,
})
export class DashboardComponent {
  message = signal('');
  numberOfCourses = signal(0);
  courses : any;

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit(): Promise<void> {
    const Response = await firstValueFrom(
      this.dashboardService.GetStringData()
    );
    const Courses = await firstValueFrom(this.dashboardService.GetAllCourses());

    if (Courses.data.length > 0) {
      this.numberOfCourses.set(Courses.data.length);
      this.courses = Courses.data;
      console.log(Courses);

    }
  }
}
