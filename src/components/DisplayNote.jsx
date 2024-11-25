import React, { useState } from 'react'
import { Button } from "@material-tailwind/react";

function DisplayNote({ isActive, setIsActive, onSave, chooseTags }) {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(title, desc);
        setTitle("");
        setDesc("");
        setIsActive(false);

    }

    return (
        <div className='w-1/3'>
            {
                isActive === true ? (
                    <form className='p-8 flex flex-col gap-4' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className='border'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className='border'
                            rows={10}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <Button
                            color="blue"
                            type='submit'
                        >
                            Save note
                        </Button>
                    </form>
                ) :
                    <div>

                    </div>
            }
        </div>
    )
}

export default DisplayNote
