import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';


export const Notes = () => {

    const [notes, setNotes] = useState([]);
    const [singleNote, setSingleNote] = useState("");
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    React.useEffect(() =>{
        async function fetchNotes() {
            const response = await fetch (`http://localhost:4000/api/notes`); 
            const data = await response.json();
            setNotes(data);
        }
        fetchNotes();
    }, []);

    async function showNote(e) {
        if(e.target.dataset.number) {
            const response = await fetch(`http://localhost:4000/api/notes/${e.target.dataset.number}`);
            const data = await response.json();
            setSingleNote(data);
        }
    }

    async function update(e) {
        if( e.target.dataset.number ){
            localStorage.setItem( 'id',e.target.dataset.number )
            navigate( '/update' );
           }
    }

    async function remove (e) {
        if(e.target.dataset.number) {
            const response = await fetch(`http://localhost:4000/api/note/${e.target.dataset.number}`, {
                method: 'DELETE'
            })
            alert ( `Your note with id ${e.target.dataset.number} has been deleted!` )
            setTimeout(()=>{
                window.location.reload()
               },1300)
        }
    }

    async function search(e) {
        e.preventDefault();
        if(e.target.value) {
            const response = await fetch(`http://localhost:4000/api/search/${e.target.value}`);
            const data = await response.json();
            setFilter(data);
        }
    }

  return (
    <div className='px-12 py-10 flex justify-center mt-16 space-x-16'>
        <div className='flex flex-col w-[450px]'>
            <form onSubmit={search} className='flex'>
              <input onChange={search} type='text' placeholder='Search your notes...' name='search' className='border border-black p-1'/>
              <button className='ml-2 bg-blue-500 text-white px-2 py-1 border border-black' ty1 border border-blacke='submit'>Search</button>
            </form>
            <span className='mt-3 font-bold text-lg'>All notes</span>
            {(filter)? filter.map(note=> {
                return (
                    <div className='flex space-x-1 justify-between'>
                        <button className='hover:font-bold hover:text-lg' data-number={note.id} onClick={showNote}>{note.title}</button>
                        <div className='flex space-x-1'>
                            <button className='hover:font-bold hover:text-lg' data-number={note.id} onClick={update}>Edit</button>
                            <button className='hover:font-bold hover:text-lg' data-number={note.id} onClick={remove}>Delete</button>
                        </div>
                    </div> 
                )
            }) : notes.map(note=> {
                return (
                    <div className='flex space-x-1 justify-between'>
                        <button className='hover:font-bold hover:text-lg' data-number={note.id} onClick={showNote}>{note.title}</button>
                        <div className='flex space-x-1'>
                            <button className="hover:font-bold hover:text-lg" data-number={note.id} onClick={update}>Edit</button>
                            <button className="hover:font-bold hover:text-lg" data-number={note.id} onClick={remove}>Delete</button>
                        </div>
                    </div> 
                )
            })}
            <Link to='/create' className='border border-black px-2 py-1 bg-blue-500 text-white mx-auto mt-5'>Add a new note</Link>
        </div>
        <div className='w-[500px]'>
            { (singleNote) ? singleNote.map(note => {
                return (
                    <div className='flex flex-col'>
                        <span className='text-xl font-bold mx-auto'>{note.title}</span>
                        <div className='flex space-x-5 mt-1 mx-auto'>
                            <span className='font-bold'>{note.category}</span>
                            <span className='font-bold'>Date: {note.date}</span>
                        </div>
                        <span className='mx-auto text-lg'>{note.description}</span>
                    </div>
                )
            }) : null}
        </div>
    </div>
  )
}

export default Notes;
