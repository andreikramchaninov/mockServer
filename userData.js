function User(id, username, email, photo, bio, age, instrument, phoneNumber) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.photo = photo;
    this.bio = bio;
    this.age = age;
    this.instrument = instrument;
    this.phoneNumber = phoneNumber;
};

var user0 = new User(0,"Vasya", "vasya@mail.ru", "/test.jpg","test",18,"guitar", "12345678");
var user1 = new User(1,"Vasya", "vasya@mail.ru", "/test.jpg","test",18,"guitar", "12345678");
var user2 = new User(2,"Vasya", "vasya@mail.ru", "/test.jpg","test",18,"guitar", "12345678");
var user3 = new User(3,"Vasya", "vasya@mail.ru", "/test.jpg","test",18,"guitar", "12345678");

var userData = [user0,user1, user2, user3];


exports.User = User;
exports.userData = userData;