export default class Task {
    id = 0;
    job = ''
    author = ''
    date = 0;
    done = false
    dateComplete = 0;

    constructor(id, job, author, date, done, dateComplete) {
        this.id = id;
        this.job = job;
        this.author = author;
        this.date = date;
        this.done = done;
        this.dateComplete = dateComplete;
    }
}