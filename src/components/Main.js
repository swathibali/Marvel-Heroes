import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [url, setUrl] = useState(
    "https://gateway.marvel.com:443/v1/public/characters?limit=30&ts=1&apikey=a972fb1c42f56020625d88f70bd403f5&hash=ac01de495062c916cc7137c12360b6cb"
  );
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await axios.get(url);
      console.log(res.data.data.results.length);
      setCharacters(res.data.data.results);
    };
    fetchCharacters();
  }, [url]);

  return <div>Main</div>;
};

export default Main;
