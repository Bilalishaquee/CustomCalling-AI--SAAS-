import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout: React.FC = () => {
  return (
    <div className="h-screen bg-black flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;