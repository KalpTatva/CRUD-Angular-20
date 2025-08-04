import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/container/dashboardContainer/dashboardContainer.component';
import { NotFoundComponent } from './app.notfound.component';
import { EditCourseComponent } from './dashboard/container/dashboardContainer/edit-course.component';
import { AddCourseComponent } from './dashboard/container/dashboardContainer/add-course.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'edit-course/:id', component: EditCourseComponent },
  { path: '**', component: NotFoundComponent },
];
