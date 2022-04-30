import React, { Component, useEffect, useState } from 'react'

function SearchEmployees() {
  console.log('!!!!!!!!!!!!!')
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [alumnis, setAlumnis] = useState([]);
  //
  // useEffect(() => {
  //   fetch("http://localhost:5000/alumni/searchEmployees/amazon")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setAlumnis(result);
  //       },
  //
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])
  //
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // } else {
    return (
      <div>
      hello
      </div>
      // <ul>
      //   {alumnis.map(alumni => (
      //     <li key={alumni.id}>
      //       {alumni.first_name}
      //     </li>
      //   ))}
      // </ul>
    );
  // }
}

export default SearchEmployees;
