function User(id, username, password, email, archived, photo, bio, age, instrument, phoneNumber) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.archived = archived
    this.photo = photo;
    this.bio = bio;
    this.age = age;
    this.instrument = instrument;
    this.phoneNumber = phoneNumber;
};

var user0 = new User(0,"Vasya", "1234", "vasya@mail.ru", 0, "/test.jpg","test",18,"guitar", "12345678");
var user1 = new User(1,"Vasya", "1234", "vasya@mail.ru", 0, "/test.jpg","test",18,"guitar", "12345678");
var user2 = new User(2,"Vasya", "1234", "vasya@mail.ru", 0, "/test.jpg","test",18,"guitar", "12345678");
var user3 = new User(3,"Vasya", "1234", "vasya@mail.ru", 0, "/test.jpg","test",18,"guitar", "12345678");

var userData = [user0,user1, user2, user3];


exports.User = User;
exports.userData = userData;