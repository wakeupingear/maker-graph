import './App.css';

function App() {
  let url:string=window.location.href;

  return (
    <div className="App">
      <a className="clickable" id="startButton" href={url+"start"}>
        Start
      </a>
    </div>
  );
}

export default App;
