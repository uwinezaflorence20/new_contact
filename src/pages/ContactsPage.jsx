import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(5); // Change this value to adjust contacts per page
    const [displayMode, setDisplayMode] = useState('table'); // Default display mode is 'table'

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        axios.get('https://contact-app-server-nxgi.onrender.com/api/v1/contactapp/contact/list')
            .then((res) => {
                setContacts(res.data.contacts);
            })
            .catch((err) => {
                console.log(err);
                alert("Fetching contacts failed");
            });
    };

    // Get current contacts
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Toggle display mode between table and cards
    const toggleDisplayMode = () => {
        setDisplayMode(prevMode => prevMode === 'table' ? 'cards' : 'table');
    };

    return (
        <div className='flex flex-col items-center pt-24'>
            <button className='bg-[#fb153b] text-white font-bold py-1 px-2 mt-4 mb-4'>
                <Link to="/sign">Create new contact</Link>
            </button>
            <button onClick={toggleDisplayMode} className='bg-[#fb153b] text-white font-bold py-1 px-2 mt-2 mb-2'>
                 click to change to table or cards
            </button>
            {contacts.length > 0 ? (
                <>
                    {displayMode === 'table' ? (
                        <table className='table-auto '>
                            <thead>
                                <tr>
                                    <th className='px-4 py-2'>Full Name</th>
                                    <th className='px-4 py-2'>More Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentContacts.map((contact, index) => (
                                    <tr key={index}>
                                        <td className='border px-4 py-2'>{contact.fullName}</td>
                                        <td className='border px-4 py-2'>
                                            <Link to={`/details/${contact._id}`} className='bg-[#fb153b] text-white font-bold py-1 px-2 rounded-lg'>
                                                More Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {currentContacts.map((contact, index) => (
                                <div key={index} className="bg-gray-200 p-4 rounded-md">
                                    <h2 className="text-lg font-semibold">{contact.fullName}</h2>
                                    <Link to={`/details/${contact._id}`} className='bg-[#fb153b] text-white font-bold py-1 px-2 rounded-lg mt-2 inline-block'>
                                        More Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    <ul className="pagination flex bg-black rounded-lg mt-4">
                        <li>
                            <button onClick={() => paginate(currentPage - 1)} className='px-3 py-1 text-white' disabled={currentPage === 1}>
                                &lt; Prev
                            </button>
                        </li>
                        {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }).map((_, index) => (
                            <li key={index} className={currentPage === index + 1 ? 'active' : null}>
                                <button onClick={() => paginate(index + 1)} className='px-3 py-1 text-white'>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button onClick={() => paginate(currentPage + 1)} className='px-3 py-1 text-white' disabled={currentPage === Math.ceil(contacts.length / contactsPerPage)}>
                                Next &gt;
                            </button>
                        </li>
                    </ul>

                </>
            ) : (
                <p>No contacts found!</p>
            )}
        </div>
    );
};

export default ContactsPage;
