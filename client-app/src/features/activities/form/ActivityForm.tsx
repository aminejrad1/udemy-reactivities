import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

export default observer(function ActivityForm(){
    const {activityStore}= useStore();
    const {selectedActivity, closeForm, loading} =activityStore;
    
    const initialSate= selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity]= useState(initialSate);

    function handleSubmit(){
        
        console.log(activity);
        activity.id ? activityStore.updateActivivty(activity) : activityStore.createActivity(activity);
    
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ){
        const {name, value}= event.target;
        setActivity(
            {
                ...activity, [name]: value
            }
        )
    }
    
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
                <Button floated='right' type='button' content='Cancel' onClick={ closeForm }></Button>
            </Form>
        </Segment>
    )
        
})