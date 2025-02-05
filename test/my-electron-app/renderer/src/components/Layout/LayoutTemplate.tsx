import React from 'react';
import Menubar from './Menubar/Menubar';
import MainBody from './MainBody/MainBody';
import Footer from './Footer/Footer';

const Layout: React.FC = () => {
  return (
    <div>
      <Menubar />
      <MainBody />
      <Footer />
    </div>
  );
}

export default Layout;
