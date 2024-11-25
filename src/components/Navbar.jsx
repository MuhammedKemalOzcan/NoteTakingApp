import React, { useState } from "react";
import "../App.css"
import archived from "../Images/folder.svg"
import priceTag from "../Images/price-tag.svg"
import notes from "../Images/writing.svg"
import { Button } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";

function Navbar() {

    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setTags([...tags, inputValue]);
        setInputValue("");
    }




    return (
        <Card className="navbar h-screen w-1/4 p-4 shadow-xl shadow-blue-gray-900/5 border ">
            <div className="mb-2 flex items-center gap-4 p-4 ">
                <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
                <Typography variant="h5" color="blue-gray">
                    Notes
                </Typography>
            </div>
            <List className="w-1/4">
                <ListItem>
                    <img
                        src={notes}
                        className="w-6"
                    />
                    <NavLink
                        to={"/notes"}
                        className="ml-3"
                    >
                        All Notes
                    </NavLink>
                </ListItem>
                <ListItem className="">
                    <img
                        src={archived}
                        className="w-6"
                    />
                    <p className="ml-3">Archived Notes</p>
                </ListItem>
                <hr className="my-2 border-blue-gray-50" />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="relative border border-gray-500 rounded p-2 m-4"
                        placeholder="Tags"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button
                        className="ml-4"
                        type="submit"
                    >
                        Add Tag
                    </Button>
                </form>
                {
                    tags.map((tag, index) => (
                        <ListItem key={index}>
                            <ListItemPrefix>
                                <img src={priceTag} className="w-6" />
                            </ListItemPrefix>
                            <p>{tag}</p>
                        </ListItem>
                    ))
                }

            </List>
        </Card>
    )
}

export default Navbar
