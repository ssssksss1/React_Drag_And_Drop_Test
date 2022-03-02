import React, { useState } from 'react';
import styled from 'styled-components';
import { dragGrab, otherDragCheck } from '../store/drag/action';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  margin: 10px 0px;
  background: white;
`;
const Item = styled.div`
  width: 100px;
  margin: auto;
  background: ${(props) => props.color || "gold"};
`;
const Description = styled.div`
  height: 100px;
  background: white;
  padding: 5px;
`;

const RawDragAndDrop2 = () => {

  return (
    <React.StrictMode>
      <Description>
        2개의 다른 컴포넌트에서 이동하기
      </Description>
      <RawDragAndDropTestBox1 />
      <RawDragAndDropTestBox2 />
    </React.StrictMode>
  );
};


const RawDragAndDropTestBox1 = () => {

  const content = [
    {
      id: 1, parent: "content", name: "red", color: "red"
    },
    {
      id: 2, parent: "content", name: "orange", color: "orange"
    },
    {
      id: 3, parent: "content", name: "gold", color: "gold"
    }
  ]

  const [dragList, setDragList] = useState(content);
  const parent = content[0].parent;
  const dispatch = useDispatch();
  const grab = useSelector((state) => state.drag.dragGrab);
  const isOtherDragCheck = useSelector((state) => state.drag.isOtherDragCheck);
  const dragOverHandler = e => {
    e.preventDefault();
  }

  const dragStartHandler = e => {
    dispatch(dragGrab(e.target));
    dispatch(otherDragCheck(false));
    e.target.classList.add("grabbing");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  }

  const dragEndHandler = e => {
    e.target.classList.remove("grabbing");
    e.dataTransfer.dropEffect = "move";
    if (isOtherDragCheck) {
      let tempList = [...dragList];
      tempList.splice(grab.dataset.position, 1);
      setDragList(tempList);
    }
    dispatch(dragGrab(null));
  }

  const dragDropHandler = e => {
    if (grab !== null) {
      let grabPosition = grab.dataset.position;
      let targetPosition = e.target.dataset.position;
      if (grab.dataset.parent !== parent) {
        dispatch(otherDragCheck(true));
        let tempList = [...dragList];
        let tempItem = { id: grab.dataset.id, parent: parent, name: grab.dataset.name, color: grab.dataset.color };
        tempList.splice(targetPosition, 0, tempItem);
        setDragList(tempList);
      } else {
        let tempList = [...dragList];
        tempList[grabPosition] = tempList.splice(targetPosition, 1, tempList[grabPosition])[0];
        setDragList(tempList);
      }
    }
  }

  return (
    <Container
      draggable
      onDragOver={dragOverHandler}
      onDrop={dragDropHandler}
    >
      {
        dragList.map((i, index) => {
          return <Item
            key={i.parent + "" + index}
            data-parent={i.parent}
            data-position={index}
            data-color={i.color}
            data-name={i.name}
            color={i.color}
            draggable

            onDragOver={dragOverHandler}
            onDragStart={dragStartHandler}
            onDrop={dragDropHandler}
            onDragEnd={dragEndHandler}
          > {i.name} </Item>
        })
      }
    </Container>
  );
};

const RawDragAndDropTestBox2 = () => {

  //데이터베이스에서 실제 데이터를 가지고 가공해서 사용하면된다.
  const content2 = [
    {
      id: 4, parent: "content2", name: "green", color: "green"
    },
    {
      id: 5, parent: "content2", name: "blue", color: "blue"
    },
    {
      id: 6, parent: "content2", name: "purple", color: "purple"
    }
  ]

  const [dragList, setDragList] = useState(content2);
  const parent = content2[0].parent;
  const dispatch = useDispatch();
  const grab = useSelector((state) => state.drag.dragGrab);
  const isOtherDragCheck = useSelector((state) => state.drag.isOtherDragCheck);
  const dragOverHandler = e => {
    e.preventDefault();
  }

  const dragStartHandler = e => {
    dispatch(dragGrab(e.target));
    dispatch(otherDragCheck(false));
    e.target.classList.add("grabbing");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  }

  const dragEndHandler = e => {
    e.target.classList.remove("grabbing");
    e.dataTransfer.dropEffect = "move";
    //다른 컴포넌트에 요소를 옮긴 경우 현재 컴포넌트에 요소를 삭제
    if (isOtherDragCheck) {
      let tempList = [...dragList];
      tempList.splice(grab.dataset.position, 1);
      setDragList(tempList);
    }
    dispatch(dragGrab(null));
  }

  const dragDropHandler = e => {
    //리스트가 비어있으면 DropHandler가 아래 코드를 작동되지 않게한다.
    if (grab !== null) {
      //드래그한 요소의 위치
      let grabPosition = grab.dataset.position;
      //드래그한 요소를 넣을 위치
      let targetPosition = e.target.dataset.position;
      //다른 컴포넌트에서 온 요소인지를 판단
      if (grab.dataset.parent !== parent) {
        //otherDragCheck를 사용한 이유는 다른 컴포넌트 요소를 옮기면 현재 컴포넌트에서는 Start와 End dragEvent만 
        //감지를 하기 때문에 다른 컴포넌트에 옮겼는지 알 수 없다.
        //다른 컴포넌트에 요소를 옮기면 기존에 있던 컴포넌트에 요소를 삭제 할 수 있는 시그널 용도로 사용한다.
        dispatch(otherDragCheck(true));
        let tempList = [...dragList];
        //다른 컴포넌트에서 온 요소의 dataset 정보를 이용하여 새로운 요소를 만듬(나중에 데이터베이스에서 받아와서 커스텀해서 사용)
        let tempItem = { id: grab.dataset.id, parent: parent, name: grab.dataset.name, color: grab.dataset.color };
        //새로 만들어진 요소를 기존 리스트에 추가
        tempList.splice(targetPosition, 0, tempItem);
        setDragList(tempList);
      } else {
        //같은 컴포넌트에서 요소를 옮길때
        let tempList = [...dragList];
        tempList[grabPosition] = tempList.splice(targetPosition, 1, tempList[grabPosition])[0];
        setDragList(tempList);
      }
    }
  }

  return (
    <Container
      draggable
      onDragOver={dragOverHandler}
      onDrop={dragDropHandler}
    >
      {
        dragList.map((i, index) => {
          return <Item
            //나중에 데이터베이스에서 사용할 경우 커스텀 필요
            key={i.parent + "" + index}
            data-parent={i.parent}
            data-position={index}
            data-color={i.color}
            data-name={i.name}
            color={i.color}
            draggable

            onDragOver={dragOverHandler}
            onDragStart={dragStartHandler}
            onDrop={dragDropHandler}
            onDragEnd={dragEndHandler}
          > {i.name} </Item>
        })
      }
    </Container>
  );
};


export default RawDragAndDrop2;