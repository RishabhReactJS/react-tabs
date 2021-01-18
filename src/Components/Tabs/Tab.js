import React, { useRef } from "react";
import "./tab.scss";

const Tab = props => {
  const listRef = useRef(null);
  let over;
  let dragged;
  const handleScrool = right => {
    right
      ? (listRef.current.scrollLeft -= 116)
      : (listRef.current.scrollLeft += 116);
  };

  const dragStart = e => {
    dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", dragged);
  };
  const dragEnd = e => {
    if (over.parentNode === dragged.parentNode) {
      props.dragged(dragged, over);
    }
  };

  const dragOver = e => {
    over = e.target;
  };

  const tabs = props.tabs;
  return (
    <div className="tabs">
      <div className="tab-container">
        <div className="tab-action-inline">
          <div onClick={() => handleScrool(true)} className="right left-arrow">
            &#8249;
          </div>
        </div>
        <ul
          onDragOver={dragOver}
          id="tab-list"
          ref={listRef}
          className="inline"
        >
          {tabs.map((ele, index) => {
            let style = index == props.selected ? "selected" : "";
            return (
              <li
                data-pos={index}
                draggable="true"
                onDragEnd={dragEnd}
                onDragStart={dragStart}
                className={style}
                key={ele.key}
                id={ele.key}
                onClick={() => props.handleChange(index)}
              >
                {ele.title}
                <div
                  className="close"
                  id={ele.key}
                  data-close-pos={index}
                  onClick={props.delete}
                >
                  x
                </div>
              </li>
            );
          })}
        </ul>
        <div className="left">
          <div
            onClick={() => handleScrool(false)}
            className="tab-action-inline"
          >
            &#8250;
          </div>
          <div className="tab-action-inline" onClick={props.add}>
            +
          </div>
        </div>
      </div>
      <div className="tab-content">{tabs[props.selected]?.content}</div>
    </div>
  );
};

export default Tab;
