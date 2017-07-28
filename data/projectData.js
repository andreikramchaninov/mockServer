function Project(id, user_id, project_name, created_date, last_version_number) {
    this.id = id;
    this.user_id = user_id;
    this.project_name = project_name;
    this.created_date = created_date;
    this.last_version_number = last_version_number;
};

var project0 = new Project(0,0, "test Project0", "01012017",0);
var project1 = new Project(1,1, "test Project1", "01012017",0);
var project2 = new Project(2,2, "test Project2", "01012017",0);
var project3 = new Project(3,3, "test Project3", "01012017",0);


var projectData = [project0,project1, project2, project3];


exports.Project = Project;
exports.projectData = projectData;



