import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { Card } from "./Card";

const Main = () => {
  const [characters, setCharacters] = useState([]);
  const [url, setUrl] = useState(
    "https://gateway.marvel.com:443/v1/public/characters?limit=30&ts=1&apikey=a972fb1c42f56020625d88f70bd403f5&hash=ac01de495062c916cc7137c12360b6cb"
  );
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get(url);
        setCharacters(res?.data?.data?.results);
      } catch (e) {
        setCharacters([]);
      }
    };
    fetchCharacters();
  }, [url]);

  function searchMarvelCharacters() {
    setUrl(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchInput}&ts=1&apikey=a972fb1c42f56020625d88f70bd403f5&hash=ac01de495062c916cc7137c12360b6cb`
    );
  }

  return (
    <>
      <div className="header">
        <div className="search-bar">
          <img src="./images/logo.jpg" alt="logo" />
          <input
            type="search"
            placeholder="Search Here"
            className="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={searchMarvelCharacters}
          />
        </div>
      </div>
      <div className="content">
        {!characters.length ? (
          <p>Not Found</p>
        ) : (
          characters.map((character) => <Card character={character}></Card>)
        )}
      </div>
    </>
  );
};

export default Main;
