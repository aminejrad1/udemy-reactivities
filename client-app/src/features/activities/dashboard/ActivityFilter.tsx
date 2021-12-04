import React from "react";
import Calendar from "react-calendar";
import { Header, Menu, MenuItem } from "semantic-ui-react";

export default function ActivityFilter(){
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 28}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <MenuItem content='All activities'></MenuItem>
                <MenuItem content="I'm going "></MenuItem>
                <MenuItem content="I'm hosting"></MenuItem>
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}