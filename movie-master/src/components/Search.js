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

  fields = [{name : 'Sophie Keller'}, {name: 'Rachel Green'}]

  addField = name => {
    this.fields.push({name: name});
    console.log(this.fields);
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
            <p key={index}> {name.name} </p>
        ))}
        </div>
      </div>
  );
  }
}
