import React from 'react';

interface Link {
  name: string;
  url: string;
}

const Menubar: React.FC = () => {
  const links: Link[] = {{links}};
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      {links.map(link => (
        <a key={link.url} href={link.url}>{link.name}</a>
      ))}
    </nav>
  );
}

export default Menubar;
