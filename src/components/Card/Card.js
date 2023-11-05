import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Anuroop from "../../assets/Anuroop.jpeg";
import Ramesh from "../../assets/Ramesh.jpeg";
import Suresh from "../../assets/Suresh.jpeg";
import Shankar from "../../assets/shankar.jpeg";
import Yogesh from "../../assets/yogesh.jpg";

import "./Card.css";

const imagUrl = [Anuroop, Yogesh, Shankar, Ramesh, Suresh];
let avatar = [
  "more_horiz",
  "signal_cellular_1_bar",
  "signal_cellular_3_bar",
  "signal_cellular_4_bar",
  "campaign",
];
const Card = ({ index, ticket, idx, users }) => {
  return (
    <Draggable key={idx} draggableId={idx} index={index}>
      {(provided) => (
        <div
          className="custom__card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="card__text">
            <p>{ticket.id}</p>
            <div className="card__avatar">
              <img
                className="card__img"
                src={imagUrl[ticket.userId[ticket.userId.length - 1] - 1]}
                alt="avatar"
              />
              <span
                className="card__status"
                style={{
                  background: users[ticket.userId[ticket.userId.length - 1] - 1]
                    .available
                    ? "#99CC00"
                    : "gray",
                }}
              ></span>
            </div>
          </div>
          <div className="card__title">{ticket.title}</div>
          <div className="card__not">
            <p className="card__noti">
              <span class="material-symbols-outlined">
                {avatar[ticket.priority]}
              </span>
            </p>

            {ticket.tag.map((tag, index) => (
              <p className="card__tags" key={index}>
                <span className="card__circle"></span>
                {tag}
              </p>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
