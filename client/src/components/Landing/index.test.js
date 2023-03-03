import React from 'react';
import { render, screen, getByRole, fireEvent } from '@testing-library/react';
//import Landing from '/index.js';


//import AddRun from '../AddRun/index.js';
//import Landing from './index.js';
import Landing from './index.js';

/*
describe('Landing component', () => {
  test('renders the Road element', () => {
    const { getByText } = render(<Landing />);
    const roadElement = getByText(/Road/);
    expect(roadElement).toBeInTheDocument();
  });
});
*/



describe ('Landing', () => {
    function renderComponent() {
        render(<Landing/>)
    }
    it ("checking words", () => {
        renderComponent();
        expect(screen.getByText('Road')).toBeInTheDocument()
        //expect(screen.getByText('Run')).toBeInTheDocument()
        //expect(screen.getByText('week')).toBeInTheDocument()
    })
})


/*
describe ('AddRun', () => {
  function renderComponent() {
      render(<AddRun/>)
  }
  it ("checking words", () => {
      renderComponent();
      expect(screen.getByText('Add')).toBeInTheDocument()
      //expect(screen.getByText('Run')).toBeInTheDocument()
      //expect(screen.getByText('week')).toBeInTheDocument()
  })
})

*/