
// explain project

//  1- user api 

///******signup user

//http://localhost:5000/api/user/signupUser
/*
{
    name , email, phone, type: student or teacher , password
}

this route save user in database
*/


////******login user
//http://localhost:5000/api/user/login

/*
{
email,password
}
this route return  access token and user in formation
*/

////******update user
//http://localhost:5000/api/user/updateUser

/*
{
send your data you need update it.
}
this route return  access token and user in formation
*/

////******delete user
//http://localhost:5000/api/user/deleteUser/:id

/*
delete user from  database by id
*/

 
////******get all student
//http://localhost:5000/api/user/allStudent

/*
get all student in database
*/

 
////****** all teachers
//hhttp://localhost:5000/api/user/allTeacher
/*
get all teachers in database.
*/
 
////****** refresh token
//http://localhost:5000/api/user/refreshToken
/*
get new token by send refresh token
*/
////****** rest Password token
//http://localhost:5000/api/user/restPass
/*
{email}
send email to user for rest his password in database return id an token
link= `http://localhost:3000/user/restPass/${user.id}/${token}`
*/
////****** update password
//http://localhost:5000/api/user/:id
/*
{token is a header}
update user password in database
link= `http://localhost:3000/user/restPass/${user.id}/${token}`
*/


//************************************ */  1- group api *********************************


////******all group
//http://localhost:5000/api/group/getAll
/*
get all group in database
*/

 
////****** add new group
//http://localhost:5000/api/group/addNewGroup
/*
{
  "teacherId": "1465412454158548152",
  "teacherName": "Hadeer",
  "name": "english first",
  "count": 20
}
*/
 
////****** update group
//http://localhost:5000/api/group/updateGroup
/*
send data that you are update
*/
 
////****** delete group
//http://localhost:5000/api/group/deleteGroup/:id
/*
delete group from teacher
*/
////****** add New Student group
//http://localhost:5000/api/group/addNewStudentInGroup
/*
{
    "studentName":"hoda",
    "studentId":"63a0c17062c28f5579aacc01",
    "groupId":"6398265e8b9b90ad0c8fbefc"
}
*/
////****** delete User From Group
//http://localhost:5000/api/group/deleteUserFromGroup/:id
/*
{
"groupId":"6398332ee1c2283cab106876",
"studentId":"hskkjdjldsmvldmvdl"

}
*/

 
// user api 

/*
router.post("/user/signupUser", userController.signupUser);
router.post("/user/login", userController.loginUser);
router.put("/user/updateUser", auth, userController.updateUser);
router.delete("/user/deleteUser/:id", auth, userController.deleteUser);
router.get("/user/allStudent", auth, userController.getAllStudent);
router.get("/user/allTeacher", auth, userController.getAllTeacher);
router.post("/user/refreshToken", userController.createRefreshToken);
router.post("/user/restPass", userController.restPass);
router.put("/user/restPass/:id",auth, userController.restPassById);

*/
 
// user api 

/*

router.get("/group/getAll",auth ,groupController.getAllGroups);
router.post("/group/addNewGroup", auth,groupController.addNewGroup);
router.put("/group/updateGroup",auth, groupController.updateGroup);
router.delete("/group/deleteGroup/:id", auth, groupController.deleteGroup);
router.post("/group/addNewStudentInGroup",auth, groupController.addNewStudentInGroup);
router.delete("/group/deleteUserFromGroup/:groupId/:studentId", auth, groupController.deleteUserFromGroup);


*/