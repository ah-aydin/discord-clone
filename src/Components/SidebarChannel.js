import React from 'react'
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../features/appSlice';
import './css/SidebarChannel.css'

function SidebarChannel({ id, name, display, category_id, category_name }) {
    const dispatch = useDispatch();

    // If the category is collapsed, return an empty div
    if (!display) 
        return <div />
    
    return (
        <div className='sidebarChannel' 
            onClick={
                () => dispatch(setChannelInfo({
                    channelId: id,
                    channelName: name,
                    categoryId: category_id,
                    categoryName: category_name
                }))
            }
        >
            <h4><span className='sidebarChannel__hash'>#</span>{ name }</h4>
        </div>
    )
}

export default SidebarChannel
