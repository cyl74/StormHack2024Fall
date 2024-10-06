import './App.css';
import UploadFile from './function';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Sm-AI-le App</h1>
        <p className="App-subtitle">Find out if you're sad or happy!</p>
      </header>

      <Container className="content">
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <p className="Instructions">Upload your picture and let us analyze your facial expression!</p>
            <UploadFile />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
