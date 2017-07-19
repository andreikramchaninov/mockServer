var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var port = 8080;

var userDataBase = require('./userData');
var projectDataBase = require('./projectData');

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


function jsonGenerator(respons, error) {
    var json = {
        "response": respons,
        "error": error
    };
    return json;
};

function errorGenerator(errorNum, message) {
    var json = null;
    if (errorNum && message != null) {
        json = {
            "code": errorNum,
            "message": message
        }
    }
    return json;
}


function projectGenerator(id) {
    var json = {
        "id": id,
        "user_id": id + 8,
        "name": 'test',
        "created_date": 12011017,
        "last_version_number": id + 12
    }
    return json;
}

function collaboratorGenerator(id) {
    var json = {
        "user_id": id,
        "role": id + 18
    }
    return json;
}

function versionGenerator(id) {
    var json = {
        "user_id": id + 11,
        "version_number": id,
        "download_link": '/myfile/test.xml',
        "approved": true,
        "commit_message": 'this is test',
        "created_date": 12032016
    }

    return json;
}

function noteGenerator(id) {
    var json = {
        "id": id,
        "str": 'A',
        "fret": '6',
        "flag": 1,
    }
    return json;
}

//get all users
app.get('/api/v1/user/', function (req, res) {
    var users = userDataBase.userData;
    var result = jsonGenerator(users, null);
    res.send(result);
});

//get one user by id
app.get('/api/v1/user/:id', function (req, res, next) {
    var users = userDataBase.userData;
    if (req.params.id > users.length) {
        next();
    } else {
        var user = users[req.params.id];
        var result = jsonGenerator(user, null);
        res.send(result);
    }
});

//add new user
app.post('/api/v1/user/', function (req, res) {
    var bodyData = req.body;
    var users = userDataBase.userData;
    var id = users.length;
    var user = new userDataBase.User(id, bodyData.username, bodyData.email, "none", "none", 18, "none", "none");
    users.push(user);
    res.send(user);
});

//get all projects
app.get('/api/v1/project/', function (req, res) {
    var projects = projectDataBase.projectData;
    var result = jsonGenerator(projects, null);
    res.send(result);
});

//get one project by id
app.get('/api/v1/project/:id', function (req, res, next) {
    var projects = projectDataBase.projectData;
    if (req.params.id > projects.length) {
        next();
    } else {
        var project = projects[req.params.id];
        var result = jsonGenerator(project, null);
        res.send(result);
    }
});

//add new project
app.post('/api/v1/project/', function (req, res) {
    var bodyData = req.body;
    var projects = projectDataBase.projectData;
    var id = projects.length;
    var project = new projectDataBase.Project(id, bodyData.user_id, bodyData.name, "01012017", 0);
    projects.push(project);
    res.send(project);
});


app.use(function (req, res) {
    var error = errorGenerator(404, 'wrong request')
    var result = jsonGenerator(null, error);
    res.statusCode = 404;
    res.send(result);
});

app.listen(port, function () {
    console.log('Server has been started on port ' + port);
});
