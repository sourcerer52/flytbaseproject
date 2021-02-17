import "./App.css";
import { useState } from "react";

function App() {
  const [boxes, setBoxes] = useState([]);
  const [eventListenerOn, setEventListener] = useState("On");
  const winWidth = 800;
  const winHeight = 600;
  const addBox = () => {
    let randomTop = Math.random() * winHeight;
    let randomleft = Math.random() * winWidth;
    setBoxes([
      ...boxes,
      {
        x: randomTop,
        y: randomleft,
        selected: false,
        color: "blue",
        zIndex: boxes.length,
      },
    ]);
  };

  const setSelected = (event, ref) => {
    let temp = boxes;
    temp = temp.map((curr, index) => {
      if (index == ref) {
        return {
          ...curr,
          selected: true,
          color: "red",
        };
      }
      return {
        ...curr,
        selected: false,
        color: "blue",
      };
    });
    setBoxes(temp);
  };

  const moveSelected = (event, ref) => {
    let temp = boxes;
    console.log(event);
    switch (event.which) {
      case 87:
      case 38:
        if (temp[ref].x > 85) {
          event.target.style.top = `${temp[ref].x - 10}px`;
          temp[ref].x = temp[ref].x - 10;
        }
        break;
      case 83:
      case 40:
        if (temp[ref].x < 580) {
          event.target.style.top = `${temp[ref].x + 10}px`;
          temp[ref].x = temp[ref].x + 10;
        }
        break;
      case 65:
      case 37:
        if (temp[ref].y > 0) {
          event.target.style.left = `${temp[ref].y - 10}px`;
          temp[ref].y = temp[ref].y - 10;
        }
        break;
      case 68:
      case 39:
        if (temp[ref].y < 890) {
          event.target.style.left = `${temp[ref].y + 10}px`;
          temp[ref].y = temp[ref].y + 10;
        }
        break;
      case 46:
        temp = temp.filter((curr, index) => index !== ref);
        break;
      default:
        break;
    }
    setBoxes(temp);
  };

  const toggleEventListener = () => {
    setEventListener(eventListenerOn == "On" ? "Off" : "On");
  };

  const boxesArray = boxes.map((curr, index) => (
    <div
      className="box"
      style={{
        height: "100px",
        width: "100px",
        backgroundColor: boxes[index].color,
        margin: "10px",
        position: "fixed",
        top: boxes[index].x,
        left: boxes[index].y,
        zIndex: boxes[index].zIndex,
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      }}
      tabIndex="0"
      key={index}
      onClick={(event) => setSelected(event, index)}
      onKeyDown={(event) => moveSelected(event, index)}
    ></div>
  ));

  return (
    <div className="container">
      <div className="action">
        <button onClick={addBox}>+</button>
        <button onClick={toggleEventListener}>{eventListenerOn}</button>
      </div>
      <div className="boxContainer">{boxesArray}</div>
    </div>
  );
}

export default App;
