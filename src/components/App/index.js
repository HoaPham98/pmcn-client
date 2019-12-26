import React, { Fragment } from 'react';

import './style.scss';

import NavBar from '../NavBar';
import Footer from '../Footer';

function App({ children }) {
  return (
    <Fragment>
      <Fragment>
        <NavBar/>
        {children}
        <Footer />
      </Fragment>
    </Fragment>
  );
}

export default App;
