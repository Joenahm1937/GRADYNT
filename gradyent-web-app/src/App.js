import Header from './components/header.js';
import './App.css';
import UserInput from './components/userInput.js';
// import backGroundColor from './components/gradientBG.js';

function App() {
  return (
    // <div className="App" style = {backGroundColor}>
    <div className="App">
      <Header></Header>
      <UserInput></UserInput>
    </div>
  );
}

export default App;
