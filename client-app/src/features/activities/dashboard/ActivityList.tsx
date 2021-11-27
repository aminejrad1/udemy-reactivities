import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";


export default observer(function ActivityList(){
    const {activityStore}= useStore();
    const [target, setTarget]=useState('');
    const {deleteActivity, loading, activtiesbyDate}=activityStore;

    function handleDeleteActivity(event: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {activtiesbyDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                 <div>{activity.description}</div>
                                 <div>{activity.city},{activity.venue}</div>
                            </Item.Description> 
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${activity.id}`} ></Button>
                                <Button name={activity.id} loading={loading && target===activity.id} floated='right' content='Delete' color='red' onClick={(e) => handleDeleteActivity(e, activity.id)}></Button>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>        
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})