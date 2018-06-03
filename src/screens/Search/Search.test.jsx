import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import SearchScreen from './Search';

it('renders without crashing', () => {
  const props = {
    location: {
      search: 'test',
    },
  };
  const http = {
    get: fetch.mockResponse(JSON.stringify({ data: '123' })),
  };
  const div = document.createElement('div');
  const component = (
    <MemoryRouter>
      <SearchScreen {...props} http={http} />
    </MemoryRouter>
  );
  ReactDOM.render(component, div);
});
