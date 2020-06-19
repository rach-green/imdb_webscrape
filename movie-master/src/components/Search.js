import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'

export default class Search extends Component {
    data = [
    {
      key: 'john',
      value: 'John Doe',
    },
    {
      key: 'jane',
      value: 'Jane Doe',
    },
    {
      key: 'mary',
      value: 'Mary Phillips',
    },
    {
      key: 'robert',
      value: 'Robert',
    },
    {
      key: 'karius',
      value: 'Karius',
    },
  ]

  fields = []

  addField = name => {
    this.setState({fields: this.fields.push(name)});
    console.log("fields", this.fields);
  };

  removeField = index => {
    this.setState({fields: this.fields.splice(index)});
    console.log("fields", this.fields);
  };

  render() {
    return (
      <div className = "search-container">
        <ReactSearchBox
        placeholder="Search a Person"
        data={this.data}
        onSelect={record => this.addField(record)}
        />
        <div className = "search-list">
        People
        {this.fields.map((name, index) => (
            <div key={index} className = "name-button">
                <div onClick = {record => this.removeField(index)}>x</div>
                {name.value}
            </div>
        ))}
        </div>
      </div>
  );
  }
}
