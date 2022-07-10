import React, { ChangeEvent, useEffect, useState } from 'react'

const initialState = [{
  name: "",
  username: "",
  email: "",
}]

interface IUser {
  id?: string | number;
  name: string;
  username: string;
  email: string;
}

const SearchComponent = () => {

  

  const [users, setUsers] = useState<IUser[]>(initialState)
  const [search, setSearch] = useState("");

  const URL = "https://jsonplaceholder.typicode.com/users";

  const showData = async () =>{
    const response = await fetch(URL);
    const data = await response.json();
    setUsers(data);
  }
  // console.log(!""); //true
  // console.log(!"bus");//false
  
  

  const seacher=  (  e: ChangeEvent<HTMLInputElement> ) =>{
    setSearch(e.target.value);
  }

  const results = !search
  ? users // los 10 datos users
  : users.filter((dato) =>
      dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    );


  useEffect(() => {
    showData();
  }, []);
    
  return (
    <>
    <div>SearchComponen</div>
    
      <div>
        <input 
          type="text" 
          placeholder="Seach"
          value={search}
          onChange={seacher}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>USER NAME</th>
            <th>EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {results.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default SearchComponent