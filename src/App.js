import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import Box from './Box';

function App() {
  return (
    <Container>
      <Row id="header">
        <Col>
          <h1>LIVE COUNT</h1>
          <img src="instagram.png" id="instagram-logo"></img>
        </Col>
      </Row>
      <Row id="content">
        <Col>
          <Box username='demi.demik'></Box>
        </Col>
        <Col>
          <Box username='fikinakii'></Box>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
