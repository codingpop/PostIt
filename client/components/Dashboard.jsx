import React from 'react';
import DashHeader from './DashHeader.jsx';
import Group from './Group.jsx';
import CreateGroup from './CreateGroup.jsx';

const Dashboard = () => (
  <div className="dashboard">
    <DashHeader />
    <div className="row content">
      <div className="container-fluid">
        <div className="col m4 s12">
          <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
        </div>
        <div className="col m4 s12">
          <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
        </div>
        <div className="col m4 s12">
          <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
        </div>
        <div className="col m4 s12">
          <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
        </div>
        <div className="col m4 s12">
          <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
        </div>
        <div className="col m4 s12">
          <Group title="A new group" description="This is the description of a new group of groups in the name of God our Lord Almighty savior of the" />
        </div>
      </div>
    </div>
    <CreateGroup />
  </div>
);

export default Dashboard;
