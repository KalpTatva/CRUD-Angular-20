import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../../dashboard.service";

@Component({
  selector : 'edit-course',
  imports : [],
  template : `
    <div>
      <span>
        Edit Course
      </span>
    </div>
  `,
})
export class EditCourseComponent{
  private route = inject(ActivatedRoute);
  private dashboardService = inject(DashboardService);

}