import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [
        'Tags',
        'Input'
      ]
    };
  }

  removeTag = (i) => {
    const newTags = [ ...this.state.tags ];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
    this.props.update(newTags);
  }

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      this.setState({ tags: [...this.state.tags, val]});
      this.props.update([...this.state.tags, val]);
      this.tagInput.value = null;
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(this.state.tags.length - 1);
    }
  }

  render() {
    const { tags } = this.state;

    return (
      <div className="input-tag">
        <ul className="input-tag__tags">
          <li className="input-tag__tags__input"><input class = "input-tags" type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
          <div className = "input-tag-list">
              { tags.map((tag, i) => (
                <li key={tag}>
                  {tag}
                  <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                </li>
              ))}
         </div>
        </ul>
      </div>
    );
  }
}
