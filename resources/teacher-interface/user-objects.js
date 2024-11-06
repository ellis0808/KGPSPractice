class UserObject {
  constructor() {
    this.id;
    this.access;
    this.lastName;
  }
}

class StudentObject extends UserObject {
  constructor() {
    this.firstName;
    this.gradeLevel;
  }
}

class TeacherObject extends UserObject {
  constructor() {
    this.title;
    this.admin;
  }
}
const studentObject = new StudentObject();
const teacherObject = new TeacherObject();

console.log(studentObject, teacherObject);
