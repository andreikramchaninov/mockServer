function Version(id, user_id, project_id, version_number, 
	download_link, approved, commit_message, created_date) {
    this.id = id;
    this.user_id = user_id;
    this.project_id = project_id;
    this.version_number = version_number;
    this.download_link = download_link;
    this.approved = approved;
    this.commit_message = commit_message;
    this.created_date = downloacreated_dated_link;
};

var version0 = new Version(0,0,0,0,"/myfile/test.xml",1, "base project0 version", "01012017");
var version1 = new Project(1,1,0,1,"/myfile/test.xml",0, "unapproved project version", "01012017");
var version2 = new Project(2,2,1,0,"/myfile/test.xml",1, "base project1 version", "01012017");
var version3 = new Project(3,3,1,1,"/myfile/test.xml",0, "unapproved project version", "01012017");


var versionData = [version0, version1, version2, version3];


exports.Version = Version;
exports.versionData = versionData;