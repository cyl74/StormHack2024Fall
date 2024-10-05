import './App.css';
import UploadFile from './function';
import {Button} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          smAIle App. Are you sad or happy...?
        </p>
      </header>

      <p className="Instructions">Upload your face here:</p>
      <UploadFile />
    </div>
  );
}

export default App;
