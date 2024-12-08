import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";
import axios from "axios"
import api from "../Api/axios";


function ListNotes({ setIsactive, isActive, onDisplay, selectedNote }) {

    const [notes, setNotes] = useState([]);
    const handleClick = () => {
        setIsactive(true);
    }

    const displayNote = (id) => {
        const filterNotes = notes.filter(note => (
            note.id === id
        ));
        console.log(filterNotes);
        onDisplay(filterNotes);
    }

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get("/CreatedNotes");
                setNotes(response.data);
            } catch (error) {
                console.error('Get isteğinde bir hata oluştu:', error);
            }
        }
        fetchNotes();
    }, [setNotes, isActive, selectedNote])


    return (
        <div className='flex flex-col w-1/6 h-screen border-r border p-8'>
            <Button
                color="blue"
                onClick={handleClick}
            >
                + Create New Note
            </Button>
            <div>
                {
                    notes.map(note => (
                        <button
                            key={note.id}
                            className='w-7/8 h-auto mt-6 flex flex-col border-b p-2 gap-4'
                            onClick={() => displayNote(note.id)}
                        >
                            <p className='font-bold text-xl'>{note.title}</p>
                            <div className='grid grid-cols-3 gap-2'>
                                {
                                    note.tags.map((tag) => (
                                        <div key={tag.id} className='w-auto gap-8 truncate text-xs font-bold bg-gray-400 border rounded-xl p-1'>
                                            <p>{tag.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <p className='w-[100px] truncate overflow-hidden'>{note.createdTime}</p>
                        </button>
                    ))
                }
            </div>
        </div>


    )
}

export default ListNotes
