import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(5); // Change this value to adjust contacts per page

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

    return (
        <div className='flex flex-col items-center pt-24'>
            <button className='bg-[#fb153b] text-white font-bold py-1 px-2 mt-4 mb-4'>
                <Link to="/sign">Create new contact</Link>
            </button>
            {contacts.length > 0 ? (
                <>
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

