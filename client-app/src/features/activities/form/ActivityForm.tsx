import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";
import { v4 as uuid} from 'uuid';

export default observer(function ActivityForm(){
    const history= useHistory();
    const {activityStore}= useStore();
    const { updateActivivty, createActivity, loading, loadActivity, loadingInitial} =activityStore;
    const {id} = useParams<{id:string}>();

    const [activity, setActivity]= useState({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))   
    }, [id, loadActivity]) // => dependend if id or load activity changes which runs useEffect only if they change
    
    function handleSubmit(){ 
        console.log(activity);
        if(activity.id.length===0)
        {
            let newActivivty= {
                ...activity, id: uuid()
            };
            createActivity(newActivivty).then(() => history.push(`/activities/${newActivivty.id}`));
        } 
        else
        {
            updateActivivty(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ){
        const {name, value}= event.target;
        setActivity(
            {
                ...activity, [name]: value
            }
        )
    }

    if(loadingInitial) return <LoadingComponent></LoadingComponent>
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autocompleted='off'>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} ></Form.Input>
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Date" type='date' value={activity.date} name="date" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}></Form.Input>
                <Button loading={loading} floated='right' positive type='submit' content='submit'></Button>
                <Button as={Link} to={'/activities'} floated='right' type='button' content='Cancel'></Button>
            </Form>
        </Segment>
    )
        
})