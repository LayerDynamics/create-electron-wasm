import React from 'react';

const Menubar = () => {
  const links = {{links}};
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      {links.map(link => (
        <a key={link.url} href={link.url}>{link.name}</a>
      ))}
    </nav>
  );
}

export default Menubar;
