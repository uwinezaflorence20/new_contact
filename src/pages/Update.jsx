import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const params = useParams();
  const navigate = useNavigate();
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [contact, setContact] = useState({});

  // Fetch data
  useEffect(() => {
    axios.get(`https://contact-app-server-nxgi.onrender.com/api/v1/contactapp/contact/findById?id=${params.contactId}`)
      .then(response => {
        setContact(response.data.contact);
      })
      .catch(err => { console.error(err);})
  }, [params.contactId])

  // Function to update contact
  const updateContact = (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    axios.put(`https://contact-app-server-nxgi.onrender.com/api/v1/contactapp/contact/update?id=${params.contactId}`, contact)
    .then(response => {
      if (response.status === 200) {
        setMessage(response.data.message);
        setContact(response.data.contact);
        
        setTimeout(() => {
          setMessage('');
          navigate(`/details/${response.data.contact._id}`);
        }, 3000);
      }
    })
    .catch(err => { 
      setError(err);
      console.error(err);
    })  
  }

  const handleInputs = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  return (
    
    <div className="container mx-auto px-4 ">
      <div className="max-w-md mx-auto mt-10 bg-black rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <h1 className="text-3xl font-semibold mb-4">{contact.fullName}</h1>
          <form onSubmit={updateContact} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="font-semibold">Full name</label>
              <input 
                type="text" 
                name="fullName" 
                required
                value={contact.fullName || ''} 
                id="fullName" 
                onChange={handleInputs} 
                className="border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold">Email</label>
              <input 
                type="email" 
                name="email" 
                required
                value={contact.email || ''} 
                id="email" 
                onChange={handleInputs} 
                className="border border-gray-300 rounded-lg p-3"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-semibold">Phone</label>
              <input 
                type="phone" 
                name="phone"
                minLength={10}
                maxLength={10}
                required 
                value={contact.phone || ''} 
                id="phone" 
                onChange={handleInputs} 
                className="border border-gray-300 rounded-lg p-3"
              />
            </div>
            
            <button type="submit" className="mt-5 py-3 px-6 bg-red-600 text-white rounded-lg text-base hover:bg-red-300 transition duration-300">Update</button>
            {message && <p className="bg-gray-200 text-gray-900 p-3 rounded-lg">{message}</p>}
            {error && <p className="bg-red-200 text-red-900 p-3 rounded-lg">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
