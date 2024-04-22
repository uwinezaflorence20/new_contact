import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [contact, setContact] = useState({});

  useEffect(() => {
    axios.get(`https://contact-app-server-nxgi.onrender.com/api/v1/contactapp/contact/findById?id=${params.contactId}`)
      .then(response => {
        setContact(response.data.contact);
      })
      .catch(err => { console.error(err);})
  }, [params.contactId])

  const deleteContact = (e) => {
    e.preventDefault();
  
    setError('');
    setMessage('');
  
    // Ensure that the correct URL is used for the delete request
    axios.delete(`https://contact-app-server-nxgi.onrender.com/api/v1/contactapp/contact/delete?id=${params.contactId}`)
      .then(response => {
        if (response.status === 200) {
          setMessage(response.data.message);
          
          setTimeout(() => {
            navigate('/'); // Redirect to ContactsPage after successful deletion
          }, 3000);
        }
      })
      .catch(err => { 
        setError(err.message); // Set error message from the Axios error
        console.error(err);
      })
  };
  

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-md mx-auto mt-10 bg-black text-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          {message && <p className="bg-green-200 text-green-900 p-3 rounded-lg">{message}</p>}
          {error && <p className="bg-red-200 text-red-900 p-3 rounded-lg">{error}</p>}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold mb-3">{contact.fullName}</h1>
            <div className="flex gap-4">
              <button onClick={() => navigate(`/update/${contact._id}`)} className="py-3 px-6 bg-blue-500 text-white rounded-lg text-base hover:bg-blue-600 transition duration-300">Update</button>
              <button onClick={deleteContact} className="py-3 px-6 bg-red-500 text-white rounded-lg text-base hover:bg-red-600 transition duration-300">Delete</button>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold">Email:</p>
            <p>{contact.email}</p>
            <p className="font-bold">Phone:</p>
            <p>{contact.phone}</p>
            <p className="font-bold">Created on:</p>
            <p>{new Date(contact.createdAt).toUTCString()}</p>
            <p className="font-bold">Updated on:</p>
            <p>{new Date(contact.updatedAt).toUTCString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
