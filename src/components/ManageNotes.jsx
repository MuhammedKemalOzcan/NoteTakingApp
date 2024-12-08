import React from 'react'
import { Button } from "@material-tailwind/react"

function ManageNotes({ isActive }) {
    return (
        <div className='p-8'>
            {
                isActive === false ?
                    <div className='flex flex-col gap-8 w-full'>
                        <Button
                            variant="outlined"
                            className='w-3/4'
                        >
                            outlined
                        </Button>
                        <Button
                            variant="outlined"
                        >
                            outlined
                        </Button>
                    </div>
                    :
                    <div></div>

            }

        </div>
    )
}

export default ManageNotes
