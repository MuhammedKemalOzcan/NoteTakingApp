import { useState } from "react";
import ArchiveNote from "../components/ArchiveNote";
import DisplayNote from "../components/DisplayNote";
import ListNotes from "../components/ListNotes";


function Notes({chooseTags=[]}) {

    const [isActive, setIsactive] = useState(false);
    const [data, setData] = useState([])

    const onSave = (title, desc) => {
        setData([...data, { title, desc }]);
        console.log("title : ", title);
        console.log("desc : ", desc);
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
                <ListNotes setIsactive={setIsactive} data={data} />
                <DisplayNote isActive={isActive} setIsActive={setIsactive} onSave={onSave} chooseTags={chooseTags} />
                <ArchiveNote />
            </div>

        </div>
    )
}

export default Notes;
