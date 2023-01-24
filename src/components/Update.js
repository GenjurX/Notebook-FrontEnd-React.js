import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';


const Update = () => {
    const [note, setNote] = useState([]);
    const id = localStorage.getItem('id');

    useEffect(() =>{
        async function fetchNote() {
            const response = await fetch (`http://localhost:4000/api/notes/${id}`); 
            const data = await response.json();
            setNote(data);
        }
        fetchNote();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const title = formData.get('title');
        const category = formData.get('category');
        const date = formData.get('date');
        const description = formData.get('description');
        const values = {title, category, date, description};

        const response = await fetch(`http://localhost:4000/api/note/${id}`,{
            method:'PUT' , headers: {
                'Content-Type' : 'application/json'
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
        if (response.ok) {
            alert(`You updated the note with id:${id} succesfully!`)
        }
    } 
  return (
    <div className='px-12 py-20'>
        <Header />
        <Link to='/' className='border border-black px-2 py-1 bg-blue-500 text-white mx-auto mt-5'>Go back</Link>
        {(note)? note.map(note=> {
            return(
                <form onSubmit={onSubmit} className='flex flex-col mx-auto w-[500px] border border-black p-5 gap-y-2 bg-blue-300'>
                <label className='mx-auto font-bold'>Title</label>
                <input className='border border-black p-1' type='text' name='title' defaultValue={note.title} required />
                <label className='mx-auto font-bold '>Category</label>
                <input className='border border-black p-1' type='text' name='category' defaultValue={note.category}  required />
                <label className='mx-auto font-bold'>Date</label>
                <input className='border border-black p-1' type='date' name='date' defaultValue={note.date}  required />
                <label className='mx-auto font-bold'>Description</label>
                <textarea className='border border-black p-1' name='description' rows="10" cols="50" defaultValue={note.description}  required/>
                <button className='border border-black px-2 py-1 bg-blue-500 text-white mx-auto mt-5' type='submit'>Submit</button>
            </form>
            )
        }): null}  
        <div className="fixed bottom-0 text-red-400 mb-5 text-center w-full">© 2023 NoteBook</div>
     </div>
  )
}
export default Update;