import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Resources from './pages/Resources/Resources';
import Usage from './pages/Usage/Usage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" component={Home} />
          <Route path="/resources" component={Resources} />
          <Route path="/usage" component={Usage} />
          <Route path="/" component={Home} exact />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
