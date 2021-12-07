import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import ChatHeader from '../Components/ChatHeader';
import Message from '../Components/Message';

import './css/Chat.css';
import { selectCategoryId, selectCategoryName, selectChannelId, selectChannelName } from '../features/appSlice';
import { selectUser } from '../features/userSlice';

import db from '../firebase';
import firebase from 'firebase/compat/app';

function Chat() {
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const categoryId = useSelector(selectCategoryId);
    const categoryName = useSelector(selectCategoryName);
    const user = useSelector(selectUser);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!channelId) return;

        db.collection(`channelCategories/${categoryId}/channels`)
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snap) =>{
            setMessages(snap.docs.map((doc) => doc.data()))
        })
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection(`channelCategories/${categoryId}/channels`)
        .doc(channelId)
        .collection('messages')
        .add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput('');
    }

    return (
        <div className='chat'>
            <ChatHeader channelName={channelName}/>

            <div className='chat__messages'>
                {
                    messages.map(msg => (
                        <Message 
                            timestamp={msg.timestamp}
                            message={msg.message}
                            user={msg.user}
                        />
                    ))
                }
            </div>

            <div className='chat__input'>
                    <AddCircleIcon fontSize='large' />
                    <form>
                        <input 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            placeholder={ `Message #${channelName}` } 
                            disabled={!channelId}
                        />
                        <button className='chat__inputButton' type='submit' disabled={!channelId} onClick={ sendMessage }>Send Message</button>
                    </form>

                    <div className="chat__inputIcons">
                        <CardGiftcardIcon fontSize='large' />
                        <GifIcon fontSize='large' />
                        <EmojiEmotionsIcon fontSize='large' />
                    </div>
                </div>
        </div>
    )
}

export default Chat
