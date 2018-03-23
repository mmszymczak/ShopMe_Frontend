import React from 'react';
import SearchInput from 'components/Search/SearchInput';
import Logo from 'components/UI/Logo';
import 'components/Search/Search.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <header>
          <nav />
          <Logo />
        </header>
        <content>
          <SearchInput />
        </content>
        <footer />
      </div>
    );
  }
}