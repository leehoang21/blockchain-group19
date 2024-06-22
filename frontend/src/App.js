import { useEffect, useRef, useState } from "react";
import getBlockchain from './ethereum.js';
import "./App.css";
import { formatDate } from './lib/utils.js';
import Tasks from './models/tasks.js';

function App() {
  const [tasks, setTasks] = useState(undefined);
  const [job, setJob] = useState("");
  const [author, setAuthor] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const init = async () => {
      const { signerAddress, todo } = await getBlockchain();
      const todos = await (new Tasks(todo, [])).getTasks();
      setTasks(new Tasks(todo, todos));
    };

    init();

  }, []);

  if (
    typeof tasks === 'undefined'
  ) {
    return 'Loading...';
  }

  const handleSubmit = () => {
    // Tôi lấy dữ liệu nhập vào từ ô input content gán vào biến setJob, ô input author gán vào biến setAuthor rồi nhé
    // Ông lấy dữ liệu của biến setJob và setAuthor mà gửi lên block chain nhé
    // Xong thì ông đổ dữ liệu ra bảng
    tasks.createTask(
      job,
      author,
    ).then(() => {
      setJob("")
      setAuthor("")
      inputRef.current.focus();
    })
  };

  const toggleDone = (id) => {
    tasks.toggleDone(id).then(() => {
      //lấy tag table-date-complete tương ứng
      let dateComplete = document.getElementsByClassName("table-date-complete" + id);
      //thay đổi giá trị của tag table-date-complete tương ứng
      dateComplete[0].innerHTML = formatDate(new Date().getTime());
      //thay đổi button done thành text
      let btnDone = document.getElementById('btn-done');
      btnDone.outerHTML = "done";
    });

  }

  return (
    <div className="App">
      <header className="header">BNB Smart chain ToDo List App</header>

      <div className="container">
        <div className="wraper">
          <div className="container-create-task">
            <h2 className="container-title">Create Task</h2>
            <div className="container-form">
              <h3 className="container-form__lable">Content</h3>
              <input
                value={job}
                ref={inputRef}
                placeholder="Ten cong viec"
                onChange={(e) => setJob(e.target.value)}
                type="text"
                className="container-form__input"
              ></input>
            </div>
            <div className="container-form">
              <h3 className="container-form__lable">Author</h3>
              <input
                value={author}
                placeholder="Nguoi thuc hien"
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                className="container-form__input"
              ></input>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="container-form__submit-btn"
            >
              Submit
            </button>
          </div>

          <div className="container-task">
            <h2 className="container-title">Tasks</h2>
            <table className="table-tasks">
              <thead className="table-head">
                <tr>
                  <th className="table-id table-title">ID</th>
                  <th className="table-date table-title">Date</th>
                  <th className="table-content table-title">Content</th>
                  <th className="table-author table-title">Author</th>
                  <th className="table-done table-title">Done</th>
                  <th className="table-date-complete table-title">Date complete</th>

                </tr>
              </thead>
              <tbody>
                {tasks.todos.map((todo, index) =>
                  <tr key={index}>
                    <td className="table-id">{todo.id}</td>
                    <td className="table-date">{formatDate(todo.date)}</td>
                    <td className="table-content">{todo.job}</td>
                    <td className="table-author">{todo.author}</td>
                    {todo.done ?
                      <td>done</td> :
                      <td><button onClick={() => toggleDone(todo.id)} type="submit" id='btn-done' name='btn-done'>done </button></td>
                    }

                    <td className={"table-date-complete" + todo.id}>{formatDate(todo.dateComplete)}</td>

                  </tr>
                )}
                {/* <tr>
                  <td className="table-id">1</td>
                  <td className="table-date">21/06/2024 - 12h 30m</td>
                  <td className="table-content">project blockchain</td>
                  <td className="table-author">19</td>
                  <td><input type="checkbox" id="checkbox-1" name="checkbox-1" value="false" /></td>
                  <td className="table-date-complete">0</td>

                </tr> */}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="footer">Copyright 2024</footer>
    </div>
  );
}

export default App;
