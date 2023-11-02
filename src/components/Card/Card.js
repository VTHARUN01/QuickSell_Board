import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Card.css";

const Card = ({ index, ticket, status, user, idx }) => {
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
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
