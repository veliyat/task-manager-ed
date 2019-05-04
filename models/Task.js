class Task {
    constructor(id, title, desc, url) {
        this.id = id;
        this.title = title;
        this.description = desc;
        this.resourceURL = url;
        this.completed = false;
        this.date = new Date();
    }
}

module.exports = Task;