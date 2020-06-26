import React from "react";
import ReactDOM from "react-dom";
import { useRanger } from "react-ranger";

function Range(props) {
  const [values, setValues] = React.useState([props.min, props.max]);

  const { getTrackProps, handles } = useRanger({
    min: props.min,
    max: props.max,
    stepSize: props.step,
    values,
    onChange: setValues
  });

      props.update(values);
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
