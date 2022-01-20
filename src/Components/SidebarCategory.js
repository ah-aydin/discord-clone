import React, { useState, useEffect } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddIcon from '@mui/icons-material/Add';

import SidebarChannel from './SidebarChannel';

import './css/SidebarCategory.css'

import db from '../firebase';

function SidebarCategory({ id, name }) {
    const [collapsed, setCollapsed] = useState(false);
    const [channels, setChannels] = useState([]);
    let parentDiv;

    useEffect(() => {
        db.collection(`channelCategories/${id}/channels`).onSnapshot(snapshot => {
            setChannels(snapshot.docs.map(doc => ({
                    id: doc.id,
                    channel: doc.data()
                }))
            );
        });
    }, []);
    
    const handleAddChannel = () => {
        const channelName = prompt('Enter a new channel name');

        if (channelName) {
            db.collection(`channelCategories/${id}/channels`).add({
                channelName: channelName,
            })
        }
    }

    const onCategoryClick = (e) => {

        let target = e.target;
        // Ignore if we have clicked the add channel button
        if (target.className['baseVal']) {
            return;
        }
        setCollapsed(!collapsed);
    }
    
    return (
        <div className='sidebar__category' >
            <div className='sidebar__categoryHeader' onClick={ (e) => onCategoryClick(e) }>
                <div className='sidebar__header'>
                    { collapsed ?  <KeyboardArrowRightIcon /> : <ExpandMoreIcon /> }
                    <h4>{ name }</h4>
                </div>

                <AddIcon className='sidebar__addChannel' onClick={ handleAddChannel } />
            </div>
            <div className='sidebar__channelsList'>
                { channels.map(ch => (
                    <SidebarChannel name={ ch.channel.channelName } id={ ch.id } display={ !collapsed } category_id={ id } category_name = { name }/>
                ))}
            </div>
        </div>
    )
}

export default SidebarCategory