import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import SearchEmployees from "./SearchEmployees";
import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  // const handleFilter = (event) => {
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = data.filter((value) => {
  //     return value.company.toLowerCase().includes(searchWord.toLowerCase());
  //   });

  //   if (searchWord === "") {
  //     setFilteredData([]);
  //   } else {
  //     setFilteredData(newFilter);
  //   }
  // };

  const onInputChange = (event) => {
    setWordEntered(event.target.value);

    const word = event.target.value;
    fetch(`http://localhost:5000/alumni/searchEmployees/${word}`)
      .then((data) => data.json())
      .then((data) => setData(data));
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/alumni/searchEmployees/amazon")
      .then((data) => data.json())
      .then((data) => setData(data));
  }, []);

  const sendReuest = (id) => {
    fetch("http://localhost:5000/student/requestReferral", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, student_id: "12345" }),
    }).then((response) => {
      if (response.status === 200) {
        alert("Request sent!");
      } else {
        alert("A request already exists.");
      }
    });
  };

  const renderPerson = (value) => {
    return (
      <div className="flex  mt-4 w-1/2 px-3 py-2 bg-white flex-col border-2 border-slate-600 rounded-2xl shadow-md shadow-neutral-200">
        <div className="items-center flex flex-col">
          <div className="flex">
            <img
              src="https://d2tgh1fvbc3wmo.cloudfront.net/ic_user.png/2022/5/2/2022-05-02T14:08:38.832266-ic_user.png"
              className="h-16 w-16 border-2 border-black shadow-md shadow-gray-900 rounded-full"
            />
            <span className="ml-4">{value.first_name}</span>
            <span className="ml-1">{value.last_name}</span>
          </div>
          <button
            className="self-end"
            onClick={() => {
              sendReuest(value._id);
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  };
  return (
    <div
      className="flex flex-col pt-5 h-full justify-start items-center"
      style={{
        width: "100%",
        height: "100vh",
        paddingLeft: "10px",
        backgroundColor: "#6b5b95",
      }}
    >
      <div
        className="py-3 bg-white border-0"
        style={{
          width: "50%",
          border: "2px solid black",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <input
          value={wordEntered}
          onChange={onInputChange}
          style={{ width: "100%" }}
        />
      </div>
      {data != null &&
        data.map((value) => {
          return renderPerson(value);
        })}
    </div>
  );
}

export default SearchBar;
