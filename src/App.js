import { Route, Routes, Link } from 'react-router-dom';
import RawDragAndDrop1 from './components/RawDragAndDrop1';
import RawDragAndDrop2 from './components/RawDragAndDrop2';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #aeaeae;
  width: 100%;
  height: 100vh;
  overflow: scroll;
`;

const Header = styled.header`
  width: 100%;
  background: white;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(5,1fr);
`;

const LinkStyle = styled(Link)`
  padding: 5px;
  border: solid 1px black;
  margin: auto;
`;

const App = () => {

  return (
    <Container className="App">
      <Header>
        <LinkStyle to="/drag_example1"> 드래그앤드롭 예제1 </LinkStyle>
        <LinkStyle to="/drag_example2"> 드래그앤드롭 예제2 </LinkStyle>
      </Header>
      <Routes>
        <Route path="/drag_example1" element={<RawDragAndDrop1 />} />
        <Route path="/drag_example2" element={<RawDragAndDrop2 />} />
      </Routes>
    </Container>
  );
}

export default App;
