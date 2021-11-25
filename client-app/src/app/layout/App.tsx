import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity]= useState<Activity | undefined>(undefined);
  const [editMode, setEditMode]= useState<boolean>(false);
  const [loading, setLoading]= useState<boolean>(true);
  const [submitting, setSubmitting]= useState<boolean>(false);

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x=>x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id? : string){
    id? handleSelectActivity(id): handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateorEditActivity(activity: Activity){
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id!==activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }

    else
    {
      activity.id= uuid();
      agent.Activities.create(activity).then(
        ()=>{
          setActivities([...activities, activity])
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        }
      )
    }
  }

  function handleDeleteActivity(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id!== id)]);
      setSubmitting(false);
    }
    )
  }

  useEffect(() => {
    agent.Activities.list().then(response=>{
    let activities: Activity[]= [];
    response.forEach(a => 
      {
        a.date=a.date.split('T')[0];
        activities.push(a);
      })
    setActivities(activities);
    setLoading(false);
    })
  }, [])

  if(loading)
  {
  return (
    <LoadingComponent></LoadingComponent>
  )
  }

  return (
    <Fragment>
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
        <ActivityDashboard
         activities={activities}
         selectedActivity={selectedActivity}
         selectActivity={handleSelectActivity}
         cancelSelectActivity={handleCancelSelectActivity}
         editMode={editMode}
         openForm={handleFormOpen}
         closeForm={handleFormClose}
         createOrEdit={handleCreateorEditActivity}
         deleteActivity={handleDeleteActivity}
         submitting={submitting}
        /> 
        
        </Container>
    </Fragment>
  );
}

export default App;
