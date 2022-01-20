import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CallIcon from '@mui/icons-material/Call';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import SettignsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@material-ui/core';

import SidebarChannel from '../Components/SidebarChannel';
import SidebarCategory from '../Components/SidebarCategory';
import './css/Sidebar.css';

import db, { auth } from '../firebase';
import { selectUser } from '../features/userSlice';


function Sidebar() {
    const user = useSelector(selectUser);
    const [categories, setCategories] = useState([]);
    
    useEffect(() =>  {
        db.collection('channelCategories').onSnapshot(snapshot => {
            setCategories(snapshot.docs.map(doc => ({
                    id: doc.id,
                    category: doc.data()
                }))
            );
        });
    }, []);

    const handleAddCategory = () => {
        const categoryName = prompt('Enter a new category name');

        if (categoryName) {
            db.collection('channelCategories').add({
                categoryName: categoryName,
            })
        }
    }

    return (
        <div className='sidebar'>
            <div className='sidebar__top'>
                <h3>STCA</h3>
            </div>

            <div className='sidebar__categories'>
                <div className='sidebar__addCategoryContainer' onClick={ handleAddCategory }>
                    <p>Add Category</p><AddIcon className='sidebar__addCategory' />
                </div>
                { categories.map(cat => (
                    <SidebarCategory name={ cat.category.categoryName } id={ cat.id }/>
                ))}
            </div>

            <div className='sidebar__voice'>
                <SignalCellularAltIcon className='sidebar__voiceIcon' fontSize='large '/>
                <div className='sidebar__voiceInfo'>
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className='sidebar__voiceIcons'>
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>


            <div className='sidebar__profile'>
                <Avatar onClick={ () => auth.signOut() } src={ user.photo }/>
                <div className='sidebar__profileInfo'>
                    <h3>{ user.displayName }</h3>
                    <p>#{ user.uid.substring(0, 5) }</p>
                </div>
                <div className='sidebar__profileIcons'>
                    <MicIcon />
                    <HeadsetIcon />
                    <SettignsIcon />
                </div>
            </div>
        </div>
    )
}


export default Sidebar
