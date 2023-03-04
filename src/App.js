// src/App.js
import "./App.css";
import contactsJSON from "./contacts.json"
import { useState } from 'react';

function App() {

  // ARRAY OF FIVE 
  let contactArr = contactsJSON.slice(0, 5)
  const [contacts, setContacts] = useState(contactArr);


  let addRandom = () => {
    const randCont = contactsJSON[Math.ceil(Math.random() * contactsJSON.length)]
    contacts.forEach(contact => {
      if (contact.id === randCont.id) return
    })
    setContacts([randCont, ...contacts]);
    console.log(randCont)
  };

  const sortName = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  const sortByName = () => {
    setContacts(sortName);
  };

  const sortedContacts = [...contacts].sort((a, b) => b.popularity - a.popularity);
  const sortByPopularity = () => {
    setContacts(sortedContacts);
  };

  const deleteHandler = (idActor)=>{
    const deleteArr = contacts.filter(contact => contact.id !== idActor); //LIFT STATE UP
    setContacts(deleteArr); //LIFT STATE UP
  }

  let oscar = <i className="fa-sharp fa-solid fa-award"></i>
  let emmy = <i className="fa-sharp fa-solid fa-award"></i>

  return (
    <div className="App m-5">
      <h1> IronContacts</h1>
      <button className=" border border-dark rounded  px-5 pt-3 pb-3" type="button" style={{ backgroundColor: 'rgb(255, 0, 0)' }} onClick={addRandom}>
        <span> Add Random Contact</span>
      </button>
      <button className=" border border-dark rounded  px-5 pt-3 pb-3" type="button" style={{ backgroundColor: 'rgb(255, 0, 0)' }} onClick={sortByPopularity}>
        <span> Sort by popularity</span>
      </button>
      <button className=" border border-dark rounded  px-5 pt-3 pb-3" type="button" style={{ backgroundColor: 'rgb(255, 0, 0)' }} onClick={sortByName}>
        <span> Sort by Name</span>
      </button>
      <br />
      <br />
      <table>
        <tr className="border border-dark w-100">
          <th className="border border-dark w-20">Image</th>
          <th className="border border-dark w-20">Name</th>
          <th className="border border-dark w-20">Popularity</th>
          <th className="border border-dark w-20">Won Oscar</th>
          <th className="border border-dark w-20">Won Emmy</th>
          <th className="border border-dark w-20">Actions</th>
        </tr>
        {contacts.map(contact => {
          return (
            <tr key={contact.id}>

              <td className="border border-dark "><img src={contact.pictureUrl} alt={contact.name} height={200} width={200} /></td>
              <td className="border border-dark ">{contact.name}</td>
              <td className="border border-dark ">{contact.popularity.toFixed(2)}</td>
              <td className="border border-dark">{contact.wonOscar && oscar}</td>
              <td className="border border-dark">{contact.wonEmmy && emmy}</td>
              <td className="border border-dark"><button className=" border border-dark rounded  px-5 pt-3 pb-3" type="button" style={{ backgroundColor: 'rgb(255, 0, 0)' }} onClick={() => deleteHandler(contact.id)}>
                <span> Delete</span>
              </button></td>

            </tr>
          );
        })}
      </table>
    </div>
  );
}
export default App;