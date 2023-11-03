import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AvatarGenerator } from "random-avatar-generator";
import "./Card.css";

const Card = ({ index, ticket, idx }) => {
  const generator = new AvatarGenerator();
  const [imgUrl] = useState(generator.generateRandomAvatar(ticket.id));
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
              <img className="card__img" src={imgUrl} alt="avatar" />
              <span
                className="card__status"
                style={{ background: Math.random() > 0.5 ? "#99CC00" : "gray" }}
              ></span>
            </div>
          </div>
          <div className="card__title">{ticket.title}</div>
          <div className="card__not">
            <p className="card__noti">
              {ticket.tag.length ? (
                <span class="material-symbols-outlined">priority_high</span>
              ) : (
                ""
              )}
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
