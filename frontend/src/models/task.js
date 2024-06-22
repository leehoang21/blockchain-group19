export default class Task {
    id = 0;
    job = ''
    author = ''
    date = 0
    done = false
    dateCompele = 0

    constructor(id, job, author, date, done, dateCompele) {
        this.id = id;
        this.job = job;
        this.author = author;
        this.date = date;
        this.done = done;
        this.dateCompele = dateCompele;
    }
}