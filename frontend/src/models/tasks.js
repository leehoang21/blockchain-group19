import Task from './task.js';

export default class Tasks {

    constructor(todo, todos) {
        this.todo = todo;
        this.todos = this.convertTasks(todos);
        console.log(this.todos);
    }

    convertTasks(tasks) {
        return tasks.map((task) => {
            return new Task(parseInt(task[0]), task[2], task[3], parseInt(task[1]), task[4], parseInt(task[5]));
        });
    }

    createTask(job, author) {
        this.todos.push(new Task(this.todos.length + 1, job, author, new Date().getTime(), false, 0));
        return this.todo.createTask(
            job,
            author,
            { gasLimit: 300000 }
        );
    }

    getTasks() {
        //return this.todos;
        return new Promise((resolve, reject) => {
            this.todo.getTaskIds()
                .then((taskIds) => {
                    console.log(taskIds);
                    const promises = [];
                    taskIds.forEach((taskId) => {
                        promises.push(this.todo.getTask(taskId));
                    });
                    return Promise.all(promises);
                })
                .then((tasks) => {
                    resolve(tasks);
                    this.todos = this.convertTasks(tasks);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    getTask(id) {
        return this.todos.find(task => task.id == id);
        // return this.todo.getTask(id);
    }

    toggleDone(id) {
        let task = this.getTask(id);
        task.done = !task.done;
        task.dateComplete = task.done ? new Date().getTime() : 0;
        return this.todo.toggleDone(id, { gasLimit: 300000 });

    }


}