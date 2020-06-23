import React from "react";
import ReactDOM from "react-dom";
import { useRanger } from "react-ranger";

function Range() {
  const [values, setValues] = React.useState([1900, 2020]);

  const { getTrackProps, handles } = useRanger({
    min: 1900,
    max: 2020,
    stepSize: 1,
    values,
    onChange: setValues
  });

      return (
        <div className = "range-container">
            <div className="Range">
              <div
                {...getTrackProps({
                  style: {
                    height: "4px",
                    background: "#2A2A35",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,.6)",
                    borderRadius: "15px"
                  }
                })}
              >
                {handles.map(({ getHandleProps }) => (
                  <div
                    {...getHandleProps({
                      style: {
                        width: "12px",
                        height: "12px",
                        borderRadius: "100%",
                        background: "#2A2A35",
                        border: "solid 0px #888",
                        cursor: "pointer"
                      }
                    })}
                  />
                ))}
              </div>
              </div>
            <div className = "values-text">{values[0]} - {values[1]}</div>
        </div>
      );
    }


export default Range;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
