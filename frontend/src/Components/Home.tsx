function Home() {
  let url:string=window.location.href;

  return (
    <div className="App">
      <h1>Maker Graph</h1>
      <a className="clickable" id="startButton" href={url+"graph"}>
        Start
      </a>
    </div>
  );
}

export default Home;
