import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Card from "../Card/Card";
import "./Board.css";

export default function Board({ status, user, board, index: id, data }) {
  return (
    <div className="board" key={id}>
      <div className="board__top">
        <div>
          <p className="board__title">
            {board || "Name of Board"}
            <span className="board__number">{user ? data[board]?.tickets?.length : ""}</span>
            <span className="board__number">{status ? data[board]?.length : ""}</span>
          </p>
        </div>
        <div>
          <span class="material-symbols-outlined">add</span>
          <span class="material-symbols-outlined">more_horiz</span>
        </div>
      </div>
      <Droppable droppableId={board}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {user ? (
              <>
                {data[board]?.tickets?.map((ticket, index) => {
                  const userIdx = ticket.id;
                  const idx = userIdx.split("-")[1];
                  return (
                    <Card
                      index={index}
                      ticket={ticket}
                      status={status}
                      user={user}
                      idx={idx}
                    />
                  );
                })}
              </>
            ) : (
              <div></div>
            )}

            {status ? (
              <>
                {data[board]?.map((ticket, index) => {
                  const userIdx = ticket.id;
                  const idx = userIdx.split("-")[1];

                  return (
                    <Card
                      index={index}
                      ticket={ticket}
                      status={status}
                      user={user}
                      idx={idx}
                    />
                  );
                })}
              </>
            ) : (
              <div></div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
