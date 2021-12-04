import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Grid, GridColumn } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default observer(function ActivityDetails() {
  const {activityStore}= useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial}= activityStore;
  const {id} = useParams<{id:string}>();

  useEffect(() => {
    if(id) loadActivity(id)
  }, [id, loadActivity])

  if(loadingInitial || !activity)
  return <LoadingComponent/>

  return (
      <Grid>
        <GridColumn width={10}>
          <ActivityDetailsHeader activity={activity}></ActivityDetailsHeader>
          <ActivityDetailsInfo activity={activity}></ActivityDetailsInfo>
          <ActivityDetailsChat></ActivityDetailsChat>
        </GridColumn>
        <GridColumn width={6}>
          <ActivityDetailsSidebar></ActivityDetailsSidebar>
        </GridColumn>
      </Grid>
    )
})