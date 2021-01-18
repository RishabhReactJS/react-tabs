import "./App.css";
import Tab from "./Components/Tabs/Tab";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Alert from "./Components/Alert/Alert";

function App() {
  const [tabs, setTabs] = useState([
    { key: uuidv4(), title: "Tab1", content: "Tab1 content" },
    { key: uuidv4(), title: "Tab2", content: "Tab2 Content" },
    { key: uuidv4(), title: "Tab3", content: "Tab3 Content" }
  ]);
  let timerCloseAlert;
  const [showAlert, setAlert] = useState(false);
  const [selected, setSelected] = useState(0);

  const addTabs = event => {
    let length = tabs.length + 1;
    if (length > 10) {
      return;
    }
    const newObj = {
      key: uuidv4(),
      title: `Tab${length}`,
      content: `Tab${length} content`
    };
    setTabs([...tabs, { ...newObj }]);
  };

  useEffect(() => {
    setSelected(0);
  }, [tabs]);

  const deleteTab = event => {
    const id = event.target.dataset.closePos;
    if (tabs.length === 1) {
      return;
    }
    const copyObj = [...tabs];
    copyObj.splice(id, 1);
    setTabs([...copyObj]);
    setAlert(true);
    if (timerCloseAlert) {
      clearTimeout(timerCloseAlert);
    }
    timerCloseAlert = setTimeout(handleCloseAlert, 6000);
  };

  const moveTabs = (draged, over) => {
    const copyObj = [...tabs];
    copyObj.splice(
      over.dataset.pos,
      0,
      ...copyObj.splice(draged.dataset.pos, 1)
    );
    setTabs([...copyObj]);
  };

  const handleCloseAlert = event => {
    clearTimeout(timerCloseAlert);
    setAlert(false);
  };
  const handleChange = index => {
    setSelected(index);
  };
  return (
    <div>
      <Alert
        close={handleCloseAlert}
        showAlert={showAlert}
        msg={"Tab deleted"}
      />
      <Tab
        handleChange={handleChange}
        selected={selected}
        tabs={tabs}
        add={addTabs}
        delete={deleteTab}
        dragged={moveTabs}
      />
    </div>
  );
}

export default App;
