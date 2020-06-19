// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import '../index.css';
// import { Slider, Switch } from 'antd';
//
// export default class Slider2 extends React.Component {
//   state = {
//     disabled: false,
//   };
//
//   handleDisabledChange = disabled => {
//     this.setState({ disabled });
//   };
//
//   render() {
//     const { disabled } = this.state;
//     return (
//       <div>
//         <Slider defaultValue={30} disabled={disabled} />
//         <Slider range defaultValue={[20, 50]} disabled={disabled} />
//         Disabled: <Switch size="small" checked={disabled} onChange={this.handleDisabledChange} />
//       </div>
//     );
//   }
// }

// // ReactDOM.render(<Slider2 />, document.getElementById('container'));

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Slider } from 'antd';

export default class Slider2 extends React.Component {
  state = {
    disabled: false,
  };

  handleDisabledChange = disabled => {
    this.setState({ disabled });
  };

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <Slider
        range defaultValue={[1900, 2020]}
        disabled={disabled}
        trackStyle={{
              backgroundColor: 'red',
              height: '5px',
            }}
        />
      </div>
    );
  }
}
