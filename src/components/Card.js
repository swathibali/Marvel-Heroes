import React from "react";

export const Card = ({ character }) => {
  return (
    <>
      <div className="card" key={character.id}>
        <div className="card-img">
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt=""
          />
        </div>
        <div className="title">
          <h3>{character.name}</h3>
        </div>
      </div>
    </>
  );
};
