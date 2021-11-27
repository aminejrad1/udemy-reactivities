import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/Store';


export default function NavBar() {
    const {activityStore}= useStore();
    
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item Header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={() => activityStore.openForm()} />
                </Menu.Item>
            </Container>
        </Menu>
    )
}