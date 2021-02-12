import "./App.css";
import Form from "./components/Form";
import Memes from "./components/Memes";

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="left-container">
          <div className="logo">
            <h2 id="logo">Xmeme</h2>
          </div>
          <div className="form">
            <h1 id="heading">Meme Stream</h1>
            <Form />
          </div>
        </div>
        <div className="memes">
          <Memes />
        </div>
      </div>
    </div>
  );
}

export default App;
