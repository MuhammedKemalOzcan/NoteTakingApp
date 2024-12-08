import { useState } from "react";
import ArchiveNote from "../components/ArchiveNote";
import DisplayNote from "../components/DisplayNote";
import ListNotes from "../components/ListNotes";
import ManageNotes from "../components/ManageNotes";


function Notes() {

    const [isActive, setIsactive] = useState(false);
    const [selectedNote, setSelectedNote] = useState([]);

    const onDisplay = (note) => {
        setSelectedNote(note);
    }

    return (
        <div className='w-screen h-auto flex flex-col'>
            <div className='p-8 border-b border-full flex justify-between'>
                <h1 className='font-bold text-3xl'>All Notes</h1>
                <input
                    type="text"
                    className='border border-black rounded p-2'
                    placeholder='Search by title or tags'
                />
            </div>
            <div className="flex">
                <ListNotes setIsactive={setIsactive} isActive={isActive} onDisplay={onDisplay} selectedNote={selectedNote} />
                <DisplayNote isActive={isActive} setIsActive={setIsactive} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
                {/* <ManageNotes isActive={isActive} /> */}
                <ArchiveNote />
            </div>

        </div>
    )
}

export default Notes;
