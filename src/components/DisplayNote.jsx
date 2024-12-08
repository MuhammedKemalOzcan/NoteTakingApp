import React, { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";
import api from "../Api/axios";
import priceTag from "../Images/price-tag.svg"
import axios from "axios"
import Edit from "../Images/wall-clock.svg"

function DisplayNote({ isActive, setIsActive, selectedNote, setSelectedNote }) {

    const [title, setTitle] = useState("");
    const [editedTitle, setEditedTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [EditedDesc, setEditedDesc] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await api.get("/Tags");
                setTags(response.data);
            } catch (error) {
                console.error('Get isteğinde bir hata oluştu:', error);
            }
        }
        fetchTags();
        const date = new Date();
        const isoDate = date.toISOString();
        setCurrentDate(isoDate);
        fetchTags();
    }, [isActive])

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitle("");
        setDesc("");
        setSelectedTags("");
        setIsActive(false);
    }

    const handleClick = (id) => {
        const updateTags = tags.filter((filteredTag) => (
            filteredTag.id !== id
        ))
        setTags(updateTags);

        const clickedTag = tags.find((tags) => (
            tags.id === id
        ));
        setSelectedTags((prevTags) => [...prevTags, clickedTag]);
        console.log(selectedTags);
    }

    const handleEdit = () => {
        setIsEditing(!isEditing);
    }

    const handleCancel = () => {
        setIsEditing(false);
    }

    const handleSave = async (id) => {
        try {
            const response = await axios.put(`https://localhost:7145/api/CreatedNotes/${id}`,
                {
                    id: id,
                    title: editedTitle,
                    description: EditedDesc,
                    createdTime: currentDate,
                    tags: selectedTags
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            setSelectedNote((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id
                        ? {
                            ...note, id: id,
                            title: editedTitle,
                            description: EditedDesc,
                            createdTime: currentDate,
                            tags: selectedTags
                        }
                        : note
                )
            );
            console.log("Güncellenen Note:", response.data);
        } catch (error) {
            console.error("Güncelleme sırasında bir hata oluştu:", error);
        }
        setIsEditing(false);
    }



    const saveNote = async () => {
        try {
            const tagToSend = selectedTags.map(tag => ({
                name: tag.name
            }))
            // Veritabanına `POST` isteği gönder
            const response = await axios.post('https://localhost:7145/api/CreatedNotes',
                {
                    title: title,
                    description: desc,
                    createdTime: currentDate,
                    tags: tagToSend
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            console.log("Yeni Note Eklendi: ", response.data);
        } catch (error) {
            console.error('Note eklenirken bir hata oluştu:', error);
        }
    }



    return (
        <div className='w-3/5'>
            {
                    isActive === true ? (
                        <form className='p-8 flex flex-col gap-4' onSubmit={handleSubmit}>
                            <h1 className='font-bold'>TITLE</h1>
                            <input
                                type="text"
                                className='border border-gray-500 rounded-2xl p-2 w-[800px] shadow-md mb-4 focus:outline-none'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <h1 className='font-bold'>DESCRIPTION</h1>
                            <textarea
                                className='border border-gray-500 rounded-2xl p-2 w-[800px] shadow-md mb-4 focus:outline-none'
                                rows={15}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <h1 className='font-bold'>TAGS</h1>
                            <div className='grid grid-cols-3 flex mb-8 gap-2 items-center'>

                                {
                                    tags.length > 0 ? tags.map((tag) => (
                                        <div key={tag.id} >
                                            <button
                                                type='button'
                                                onClick={() => handleClick(tag.id)}
                                                className='flex gap-4'
                                            >
                                                <img className="w-6" src={priceTag} />
                                                <p>{tag.name}</p>
                                            </button>
                                        </div>
                                    ))
                                        :
                                        <div></div>
                                }
                            </div>
                            <hr className='border-b w-[800px]' />
                            <Button
                                color="blue"
                                type='submit'
                                className='w-40 border-t-4 border-blue-400'
                                onClick={saveNote}
                            >
                                Save note
                            </Button>
                            <p className=''>Selected Tags</p>
                            <hr className='border-b w-[150px]' />
                            <div className='grid grid-cols-3 flex mb-8 gap-2 items-center'>
                                {
                                    selectedTags.length > 0 ? selectedTags.map((tag) => (
                                        <div className='flex mt-4 gap-4' key={tag.id}>
                                            <img className="w-6" src={priceTag} />
                                            <p>{tag.name}</p>
                                        </div>

                                    )) :
                                        <div>
                                            <p>No selected tags yet!</p>
                                        </div>
                                }
                            </div>

                        </form>
                    ) :
                        isEditing === false ?
                            selectedNote.map(note => (
                                <div key={note.id} className='p-6 w- border h-[1200px] flex flex-col'>
                                    <h1 className='font-bold text-2xl'>{note.title}</h1>
                                    <div className='flex mt-4 h-1000px'>
                                        <img className='size-5 mr-1' src={priceTag} />
                                        <p className='mr-28'>Tags</p>
                                        {
                                            note.tags.map(tag => (
                                                <p key={tag.id}>{tag.name},</p>
                                            ))
                                        }
                                    </div>
                                    <div className='flex'>
                                        <img className='size-5 mr-1' src={Edit} />
                                        <p className='mr-16'>Last Edited</p>
                                        <p>{note.createdTime}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <hr className='border-b w-[900px] mt-8' />
                                        <p className='mt-4'>{note.description}</p>
                                        <div className='absolute bottom-32'>
                                            <hr className='border-b w-[900px] ' />
                                            <div className='flex mt-8'>
                                                <Button
                                                    className='mr-8 w-28'
                                                    color="blue"
                                                    onClick={handleEdit}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="gradient"
                                                    onClick={handleSave}
                                                >
                                                    Save Note
                                                </Button>
                                                <Button
                                                    onClick={handleCancel}
                                                    color="red"
                                                    className='ml-8'
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) :
                            selectedNote.map(note => (
                                <div key={note.id} className='p-6 w- border h-[1200px] flex flex-col'>
                                    <input
                                        className='border w-full h-12 rounded-2xl shadow p-4'
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                    />
                                    <div className='flex mt-4 h-1000px'>
                                        <img className='size-5 mr-1' src={priceTag} />
                                        <p className='mr-28'>Tags</p>
                                        {
                                            note.tags.map(tag => (
                                                <p key={tag.id}>{tag.name},</p>
                                            ))
                                        }
                                    </div>
                                    <div className='flex'>
                                        <img className='size-5 mr-1' src={Edit} />
                                        <p className='mr-16'>Last Edited</p>
                                        <p>{note.createdTime}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <hr className='border-b w-[900px] mt-8' />
                                        <textarea
                                            className='border w-full rounded-2xl shadow p-4 mt-8'
                                            rows={15}
                                            value={EditedDesc}
                                            onChange={(e) => setEditedDesc(e.target.value)}
                                        />
                                        <div className='absolute bottom-32'>
                                            <hr className='border-b w-[900px] ' />
                                            <div className='flex mt-8'>
                                                <Button
                                                    className='mr-8 w-28'
                                                    color="blue"
                                                    onClick={handleEdit}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="gradient"
                                                    onClick={() => handleSave(note.id)}
                                                >
                                                    Save Note
                                                </Button>
                                                <Button
                                                    onClick={handleCancel}
                                                    color="red"
                                                    className='ml-8'
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
            }
        </div>
    )
}

export default DisplayNote
