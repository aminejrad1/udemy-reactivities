import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";
import ActivityFilter from "./ActivityFilter";
import ActivityList from "./ActivityList";

export default observer (function ActivityDashboard(){
    const {activityStore}= useStore();
    const { loadActivities, activityRegistry }= activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])
  
    if(activityStore.loadingInitial)
    {
    return (
      <LoadingComponent></LoadingComponent>
    )
    }
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList></ActivityList>
            </Grid.Column>
            <GridColumn width='6'>
                <ActivityFilter/>
            </GridColumn>
        </Grid>
    )
})