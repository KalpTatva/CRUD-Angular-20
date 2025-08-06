export interface Course{
      courseid: number;
      courseName: string,
      courseContent: string,
      credits: number,
      department: string,
      isDeleted: boolean,
      createdAt: Date,
      editedAt: Date,
      createdById: number,
      editedById: number,
      deletedById: number,
      deletedAt: null,
}