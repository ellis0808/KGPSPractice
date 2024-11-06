// class UserObject {
//   constructor(id, access, lastName) {
//     this.id = id;

//     this.access = access;
//     this.lastName = lastName;
//   }
// }

// class StudentObject extends UserObject {
//   constructor(firstName, gradeLevel) {
//     super(id, this.access, this.lastName);
//     this.firstName = firstName;
//     this.gradeLevel = gradeLevel;
//   }
// }

// class TeacherObject extends UserObject {
//   constructor(title, admin) {
//     super(id, this.access, this.lastName);
//     this.title = title;
//     this.admin = admin;
//   }
// }
// const userObject = new UserObject();
// const studentObject = new StudentObject();
// const teacherObject = new TeacherObject();

// console.log(studentObject, teacherObject);

const userObject = {
  studentObject: {},
  teacherObject: {},
};

export { userObject };
