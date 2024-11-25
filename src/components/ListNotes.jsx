import React, { useState } from 'react'
import { Button } from "@material-tailwind/react";

function ListNotes({ setIsactive, data }) {

    const handleClick = () => {
        setIsactive(true);
    }
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
                    data.map((data, index) =>
                        <div className='mb-4 mt-4' key={index}  >
                            <button
                                className='border rounded-xl w-full h-auto p-2 hover:bg-gray-500 flex flex-col'
                            >
                                {data.title}
                            </button>
                        </div>

                    )
                }
            </div>
        </div>

    )
}

export default ListNotes
