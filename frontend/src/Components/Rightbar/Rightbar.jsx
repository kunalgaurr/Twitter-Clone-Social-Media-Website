import React, { useState } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import { Footer } from '../Footer/Footer';
import { RightbarUser } from '../RightbarUser/RightbarUser';
import { useEffect } from 'react';
import './Rightbar.css';

export const Rightbar = () => {
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  // const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get('/user/all');
      setUsers(res.data);
    };
    fetchApi();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const username = user.username.toLowerCase();
    return (
      name.includes(searchInput.toLowerCase()) ||
      username.includes(searchInput.toLowerCase())
    );
  });

  // useEffect(() => {
  //   if (users.length > 0) {
  //     const randomIndexes = [];
  //     while (randomIndexes.length < 2) {
  //       const randomIndex = Math.floor(Math.round() * users.length);
  //       if (!randomIndexes.includes(randomIndex)) {
  //         randomIndexes.push(randomIndex);
  //       }
  //     }
  //     const selectedUsers = randomIndexes.map((index) => users[index]);
  //     setRandomUsers(selectedUsers);
  //   }
  // }, [users]);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div id="rightbar-container">
      <div id="rightbar-wrapper">
        <div id="rightbar-top" onClick={handleClick}>
          <BsSearch />
          <input
            type="text"
            id="search-input"
            placeholder="Search you friends here"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <div
            id="search-results"
            style={{ display: toggle ? 'block' : 'none' }}
          >
            {filteredUsers.map((user) => (
              <RightbarUser key={user._id} data={user} />
            ))}
            {filteredUsers.length === 0 && (
              <span id="search-text">No results found</span>
            )}
          </div>
        </div>
        <div id="rightbar-bottom">
          <span id="suggested-user-heading">People you may know</span>
          {/* <RightbarUser data={randomUsers[0]} />
          <RightbarUser data={randomUsers[1]} /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
};
