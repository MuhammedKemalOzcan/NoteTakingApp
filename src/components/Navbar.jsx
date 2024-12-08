import React, { useEffect, useState } from "react";
import "../App.css"
import archived from "../Images/folder.svg"
import priceTag from "../Images/price-tag.svg"
import notes from "../Images/writing.svg"
import { Button } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import api from "../Api/axios";
import axios from "axios"

function Navbar({ refresh, refreshData }) {

    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState([]);




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
    }, [inputValue, refresh])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Veritabanına `POST` isteği gönder
            const response = await axios.post('https://localhost:7145/api/Tags', {
                name: inputValue // Gönderilen veri sadece `name` alanı
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Yeni Tag Eklendi: ", response.data);
            setInputValue(""); // Input alanını temizle
        } catch (error) {
            console.error('Veri gönderilirken bir hata oluştu:', error);
        }

    }

    const deleteTag = async (id) => {
        try {
            const response = await axios.delete(`https://localhost:7145/api/Tags/${id}`);
            console.log('Silme işlemi başarılı:', id);
        } catch (error) {
            console.error('Silme işleminde hata:', error);
        }
        refreshData();
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
                    
                    <button
                        onClick={(() => (navigate("/notes")))}
                        className="flex items-center mb-4"
                    >
                        <img
                        src={notes}
                        className="w-6"
                    />
                        <p className="ml-3">All Notes</p>
                    </button>
                <button
                    className="flex items-center"
                    onClick={(() => (navigate("/archieved-notes")))}
                >
                    <img
                        src={archived}
                        className="w-6"
                    />
                    <p className="ml-3">Archived Notes</p>
                </button>
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
                    tags.map((tag) => (
                        <ListItem key={tag.id} className="relative">
                            <ListItemPrefix>
                                <img src={priceTag} className="w-6" />
                            </ListItemPrefix>
                            <div className="flex">
                                <p>{tag.name}</p>
                                <button
                                    className="absolute right-4"
                                    type="button"
                                    onClick={() => deleteTag(tag.id)}
                                >
                                    x
                                </button>
                            </div>

                        </ListItem>
                    ))
                }

            </List>
        </Card >
    )
}

export default Navbar
