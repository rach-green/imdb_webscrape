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
        <div className="Range">
          <div
            {...getTrackProps({
              style: {
                height: "8px",
                background: "#6A1A4C",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,.6)",
                borderRadius: "2px"
              }
            })}
          >
            {handles.map(({ getHandleProps }) => (
              <div
                {...getHandleProps({
                  style: {
                    width: "30px",
                    height: "25px",
                    borderRadius: "100%",
                    background: "#F1F0E2",
                    border: "solid 1px #888"
                  }
                })}
              />
            ))}
          </div>
          <div className = "values-text">Min:{values[0]}Max:{values[1]}</div>
        </div>
      );
    }


export default Range;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
