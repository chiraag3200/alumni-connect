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

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.company.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
      return <div>{SearchEmployees}</div>;
    }
  };
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/alumni/searchEmployees/amazon")
      .then((data) => data.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <div
      className="flex flex-col pt-5 h-full justify-center items-center"
      style={{
        width: "100%",
        height: "100vh",
        paddingLeft: "10px",
        backgroundColor: "#6b5b95",
      }}
    >
      <div
        style={{
          width: "80%",
          border: "2px solid black",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <input className="bg-white border-0" style={{ width: "100%" }} />
      </div>
      {data.length > 0 && data.map((value) => {})}
    </div>
  );
}

export default SearchBar;
