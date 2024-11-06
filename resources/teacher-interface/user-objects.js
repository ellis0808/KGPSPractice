class UserObject {
  constructor() {
    this.id;
    this.access;
    this.lastName;
  }
}

class StudentObject extends UserObject {
  constructor() {
    super();
    this.firstName;
    this.gradeLevel;
  }
}

class TeacherObject extends UserObject {
  constructor() {
    super();
    this.title;
    this.admin;
  }
}
const userObject = new UserObject();
const studentObject = new StudentObject();
const teacherObject = new TeacherObject();

console.log(studentObject, teacherObject);
