'use strict';


var installed = true;
module.exports = function(app) {


if (!installed) {

  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

User.create([
    {username: 'admin', email: 'admin1@gmail.com', password: 'admin'}
  ], function(err, users) {
    if (err) throw err;

    console.log("Created User: ", users)
    //create the admin role
    
    Role.create({
      name: 'admin'
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


