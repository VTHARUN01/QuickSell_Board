import React, { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";

import Card from "../Card/Card";
import "./Board.css";
const priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];
export default function Board({
  status,
  user,
  board,
  index: id,
  data,
  priority,
  tickets,
  users,
  grp,
}) {
  const [cardList, setCardList] = React.useState([]);
  useEffect(() => {
    if (user) {
      setCardList(data[board]?.tickets);
    } else if (status) {
      setCardList(data[board]);
    } else if (priority) {
      setCardList(data[board]);
    }
  }, [status, user, priority, tickets, users, data, grp]);
  return (
    <div className="board" key={id}>
      <div className="board__top">
        <div>
          <p className="board__title">
            {status || user ? board : priorityList[board]}
            <span className="board__number">
              {cardList?.length > 0 ? cardList.length : 0}
            </span>
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
            {cardList?.map((ticket, index) => {
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
