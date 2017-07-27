function Collaborator(id, user_id, project_id, role, archived) {
    this.id = id;
    this.user_id = user_id;
    this.project_id = project_id;
    this.role = role;
    this.archived = archived;
};

var collaborator0 = new Collaborator(0, 0, 0, 0, 0);
var collaborator1 = new Collaborator(1, 1, 0, 1, 0);
var collaborator2 = new Collaborator(2, 2, 1, 0, 0);
var collaborator3 = new Collaborator(3, 3, 1, 1, 0);

var collaboratorData = [collaborator0, collaborator1, collaborator2, collaborator3];


exports.Collaborator = Collaborator;
exports.collaboratorData = collaboratorData;