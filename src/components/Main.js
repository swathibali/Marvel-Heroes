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

  function debounce(cb, delay = 250) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  function searchMarvelCharacters(searchInput) {
    if (!searchInput) {
      setUrl(
        "https://gateway.marvel.com:443/v1/public/characters?limit=30&ts=1&apikey=a972fb1c42f56020625d88f70bd403f5&hash=ac01de495062c916cc7137c12360b6cb"
      );
    } else {
      setUrl(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchInput}&ts=1&apikey=a972fb1c42f56020625d88f70bd403f5&hash=ac01de495062c916cc7137c12360b6cb`
      );
    }
  }

  const debouncedSearch = debounce(searchMarvelCharacters, 400);

  return (
    <>
      <div className="header">
        <div className="search-bar">
          <img src="./images/logo.jpg" alt="logo" />
          <input
            type="search"
            placeholder="Search Here"
            className="search"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="content">
        {!characters.length ? (
          <p>Not Found</p>
        ) : (
          characters.map((character) => (
            <Card key={character.id} character={character}></Card>
          ))
        )}
      </div>
    </>
  );
};

export default Main;
