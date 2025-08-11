import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/container/dashboardContainer/dashboardContainer.component';
import { NotFoundComponent } from './app.notfound.component';
import { EditCourseComponent } from './dashboard/container/dashboardContainer/edit-course.component';
import { AddCourseComponent } from './dashboard/container/dashboardContainer/add-course.component';
import { LoginComponent } from './dashboard/container/auth/auth-login.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component : DashboardComponent, canActivate:[AuthGuard]},
  { path: 'auth-login', component: LoginComponent},
  { path: 'add-course', component: AddCourseComponent, canActivate:[AuthGuard] },
  { path: 'edit-course/:id', component: EditCourseComponent, canActivate:[AuthGuard] },
  { path: '**', component: NotFoundComponent },
];
