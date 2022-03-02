import React, { useState } from 'react';
import styled from 'styled-components';

const Item = styled.div`
  width: 100px;
  margin: auto;
  background: ${(props) => props.color || "gold"};
`;

const TestBox = styled.div`
  background: white;
  margin: 10px;
  padding: 100px;
`;
const Description = styled.div`
  height: 100px;
  background: white;
  padding: 5px;
`;

const content = [
  {
    id: 1, name: "1", color: "red"
  },
  {
    id: 2, name: "2", color: "orange"
  },
  {
    id: 3, name: "3", color: "gold"
  },
  {
    id: 4, name: "4", color: "green"
  },
  {
    id: 5, name: "5", color: "blue"
  },
  {
    id: 6, name: "6", color: "purple"
  },
]


const RawDragAndDrop1 = () => {
  const [dragList, setDragList] = useState(content);
  const [grab, setGrab] = useState(null);

  const dragOverHandler = e => {
    e.preventDefault();
  }

  const dragStartHandler = e => {
    setGrab(e.target);
    e.target.classList.add("grabbing");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  }

  const dragEndHandler = e => {
    e.target.classList.remove("grabbing");
    e.dataTransfer.dropEffect = "move";
  }

  const dragDropHandler = e => {
    let grabPosition = grab.dataset.position;
    let targetPosition = e.target.dataset.position;
    let tempList = [...dragList];
    tempList[grabPosition] = tempList.splice(targetPosition, 1, tempList[grabPosition])[0];
    setDragList(tempList);
  }

  return (
    <React.StrictMode>
      <Description>
        드래그 해서 순서를 바꾸는 예제
      </Description>
      <TestBox>
        {
          dragList.map((i, index) => {
            return <Item
              key={i.id}
              data-position={index}
              color={i.color}
              draggable

              onDragOver={dragOverHandler}
              onDragStart={dragStartHandler}
              onDrop={dragDropHandler}
              onDragEnd={dragEndHandler}
            > {i.name} </Item>
          })
        }
      </TestBox>
    </React.StrictMode>
  );
};

export default RawDragAndDrop1;



