var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var port = 8080;

var userDataBase = require('./data/userData');
var projectDataBase = require('./data/projectData');
var versionDataBase = require('./data/versionData');
var collaboratorDataBase = require('./data/collaboratorData');

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

//=========== user requests =============
//=======================================

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
    var user = new userDataBase.User(id, bodyData.username, bodyData.password, bodyData.email, 
        0, "none", "none", 18, "none", "none");
    users.push(user);
    res.send(user);
});

//update user 
 app.put('/api/v1/user/:id', function (req, res) {
    var bodyData = req.body;
    var user = userDataBase.userData[req.params.id];
    user.photo = bodyData.photo;
    user.bio = bodyData.bio;
    user.age = bodyData.age;
    user.instrument = bodyData.instrument;
    user.phoneNumber = bodyData.phoneNumber;
    res.send(user);
 });

 //delete user
 app.delete('/api/v1/user/:id', function (req, res) {
    userDataBase.userData[req.params.id].archived = 1;
    res.send("User " + req.params.id + " was deleted");
 });

//=========== project requests =============
//==========================================

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
    var project = new projectDataBase.Project(id, bodyData.user_id, bodyData.project_name, "01012017", 0, 0);
    projects.push(project);
    res.send(project);
});

//update project
app.put('/api/v1/project/:id', function (req, res) {
    var bodyData = req.body;
    var project = projectDataBase.projectData[req.params.id];
    project.last_version_number = bodyData.last_version_number;
    res.send(project);
});

//delete project
app.delete('/api/v1/project/:id', function (req, res) {
    projectDataBase.projectData[req.params.id].archived = 1;
    var versionsByProject = versionDataBase.versionData.filter(function(Version) {
        return Version.project_id == req.params.id;
    });
    for (var i = 0; i < versionsByProject.length; i++) {
        versionsByProject[i].archived = 1;
    };
    res.send("Project " + req.params.id + " and its " + versionsByProject.length + 
        " versions were deleted");
});


//=========== version requests =============
//==========================================

//get all versions by project
app.get('/api/v1/project/:id/versions/all', function (req, res) {
    var versionsByProject = versionDataBase.versionData.filter(function(Version) {
        return Version.project_id == req.params.id;
    });
    var result = jsonGenerator(versionsByProject, null);
    res.send(result);
});


//get version by version_number
app.get('/api/v1/project/:id/versions/:number', function (req, res, next) {
    var versionsByProject = versionDataBase.versionData.filter(function(Version) {
        return Version.project_id == req.params.id;
    });
    var versionsByNumber = versionsByProject.filter(function(Version) {
        return Version.version_number == req.params.number;
    });
    var version = versionsByNumber[0];
    var result = jsonGenerator(version, null);
    res.send(result);
});

//add a new version
app.post('/api/v1/project/:id/versions', function (req, res) {
    var bodyData = req.body;
    var id = versionDataBase.versionData.length;
    var versionsByProject = versionDataBase.versionData.filter(function(Version) {
        return Version.project_id == req.params.id;
    });
    var versionsNumber = versionsByProject.length;
    var version = new versionDataBase.Version(id, bodyData.user_id, req.params.id, 
        versionsNumber, "/myfile/test.xml", 0, "just added new version", "01012017", 0);
    versionDataBase.versionData.push(version);
    res.send(version);
});

//update version 
app.put('/api/v1/project/:id/versions/:number', function (req, res) {
    var bodyData = req.body;
    var versionsByProject = versionDataBase.versionData.filter(function(Version) {
        return Version.project_id == req.params.id;
    });
    var versionsByNumber = versionsByProject.filter(function(Version) {
        return Version.version_number == req.params.number;
    });
    var updatedVersion = versionsByNumber[0];
    updatedVersion.approved = bodyData.approved;
    projectDataBase.projectData.last_version_number = req.params.number;
    res.send(updatedVersion);
});

//delete version
app.delete('/api/v1/project/:id/versions/:number', function (req, res) {
    var versionsByProject = versionDataBase.versionData.filter(function(Version) {
        return Version.project_id == req.params.id;
    });
    var versionsByNumber = versionsByProject.filter(function(Version) {
        return Version.version_number == req.params.number;
    });
    var deletedVersion = versionsByNumber[0];
    deletedVersion.archived = 1;
    res.send("Version was deleted");
});


//=========== collaborator requests =============
//===============================================

//get all collaborators in project 
app.get('/api/v1/project/:id/collaborators', function(req, res) {
    var collaboratorsByProject = collaboratorDataBase.collaboratorData.filter(function(Collaborator) {
        return Collaborator.project_id == req.params.id;
    });
    res.send(collaboratorsByProject);
});

//get collaborator in project by user id
app.get('/api/v1/project/:p_id/collaborators/:user_id', function(req, res) {
    var collaboratorsByProject = collaboratorDataBase.collaboratorData.filter(function(Collaborator) {
        return Collaborator.project_id == req.params.p_id;
    });
    var collaboratorsByUser = collaboratorsByProject.filter(function(Collaborator) {
        return Collaborator.user_id = req.params.user_id;
    });
    var collaborator = collaboratorsByUser[0];
    res.send(collaborator);
});

//add collaborator to project
app.post('/api/v1/project/:p_id/collaborators/:user_id', function(req, res) {
    var bodyData = req.body;
    var coll_id = collaboratorDataBase.collaboratorData.length;
    var collaborator = new collaboratorDataBase.Collaborator(coll_id, req.params.user_id,
        req.params.p_id, bodyData.role, 0);
    collaboratorDataBase.collaboratorData.push(collaborator);
    res.send(collaborator);
});

//update collaborator role
app.put('/api/v1/project/:p_id/collaborators/:user_id', function(req, res) {
    var bodyData = req.body;
    var collaboratorsByProject = collaboratorDataBase.collaboratorData.filter(function(Collaborator) {
        return Collaborator.project_id == req.params.p_id;
    });
    var collaboratorsByUser = collaboratorsByProject.filter(function(Collaborator) {
        return Collaborator.user_id = req.params.user_id;
    });
    var collaborator = collaboratorsByUser[0];
    collaborator.role = bodyData.role;
    res.send(collaborator);
});

//delete collaborator from project
app.delete('/api/v1/project/:p_id/collaborators/:user_id', function(req, res) {
    var collaboratorsByProject = collaboratorDataBase.collaboratorData.filter(function(Collaborator) {
        return Collaborator.project_id == req.params.p_id;
    });
    var collaboratorsByUser = collaboratorsByProject.filter(function(Collaborator) {
        return Collaborator.user_id = req.params.user_id;
    });
    var collaborator = collaboratorsByUser[0];
    collaborator.role = 2;
    collaborator.archived = 1;
    res.send(req.params.user_id +" user was deleted from collaborators");
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