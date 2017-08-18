'use strict';


var installed = true;
module.exports = function(app) {


if (!installed) {

  var User = app.models.account;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

User.create([
    {username: 'admin', email: 'ggriffin84@gmail.com', password: 'admin', "firstName": "greg", "lastName": "griffin"}
  ], function(err, users) {
    if (err) throw err;

    console.log("Created User: ", users)
    //create the admin role
    
    Role.create({
      name: 'administrator'
    }, function(err, Role) {
      if (err) throw err;

      //make bob an admin
      Role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
  
     console.log('Created principal: ', principal);        

      });
    });
  });

}

};


