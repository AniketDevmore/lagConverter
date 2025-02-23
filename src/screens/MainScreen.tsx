import React, { useEffect, useState } from "react";
import "./MainScreen.css";
import { getTranslatedList } from "../api/apiServices";

const MainScreen = () => {
  const [translatedValues, setTranslatedValues] = useState([]);
  const [enteredValue, setEnteredValue] = useState("");

  useEffect(() => {}, [translatedValues]);

  const clickHandler = async (text:any) => {
    const value = text.trim().split(" ").pop();
    console.log("clicked------------>>", value);
    if (!value) {
      setEnteredValue("");
      setTranslatedValues([]);
    }
    setEnteredValue(text);

    try {
      let getList:any = await getTranslatedList(value);
      if (getList[0] === "SUCCESS") {
        console.log("getList-------------------->>", getList[1][0][1]);
        setTranslatedValues(getList[1][0][1]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertText:any = (data:any, value:any, index:any) => {
    let val = value.trim().split(" ");
    let newValue = "";
    for (let i = 0; i <= val.length - 2; i++) {
      console.log(val[i]);
      newValue = newValue + " " + val[i];
    }
    return newValue + " " + data[index] + " ";
  };

  const handleKeyDown = (event:any) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault(); // Prevents the default space behavior
      console.log(
        "translatedValues=========??>>",
        convertText(translatedValues, enteredValue)
      );
      setEnteredValue(convertText(translatedValues, enteredValue, 0));
      // setTranslatedValues([]);
      // setEnteredValue((prevText) => prevText + ` ${translatedValues[0]}`); // Replace space with custom text
    }
  };

  const getRandom = (index:any) => {
    setEnteredValue(convertText(translatedValues, enteredValue, index));
  };

  return (
    <div className="inputContainer">
      <div>
        <textarea
          className="form-control indiatyping_data snipcss-6iYGT"
          id="indiatyping_data"
          placeholder="Start Type Here....."
          value={enteredValue}
          onChange={(e) => clickHandler(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>

      <div>
        <ul className="ul-list">
          {translatedValues.map((ele, i) => (
            <li onClick={() => getRandom(i)} key={ele}>
              {ele}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainScreen;
