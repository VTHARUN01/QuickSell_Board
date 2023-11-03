import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { InitalizeTickets } from "./redux/slice/ticketSlice";
import { InitalizeUsers } from "./redux/slice/userSlice";
import { updateBoard } from "./redux/slice/boardSlice";
import { updateData } from "./redux/slice/dataSlice";

import "./css/App.css";
import Board from "./components/Board/Board";
import { sortPri } from "./js/sortIng";

function App() {
  // Dispatch
  const dispatch = useDispatch();

  // States
  const tickets = useSelector((state) => state.tickets.tickets);
  const users = useSelector((state) => state.users.users);
  const boards = useSelector((state) => state.board.board);
  const data = useSelector((state) => state.data.data);

  // Fetch data from API
  const getData = async () => {
    const response = await fetch(process.env.REACT_APP_URL);
    const data = await response.json();
    dispatch(InitalizeTickets(data.tickets));
    dispatch(InitalizeUsers(data.users));
  };

  // States
  const [status] = useState(true);
  const [user] = useState(false);
  const [priority] = useState(false);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    if (user) {
      let newData = data;
      // add to destination
      let addIdx = [...newData[destination.droppableId].tickets];
      addIdx.push(newData[source.droppableId].tickets[source.index]);
      addIdx.sort(sortPri);
      newData[destination.droppableId].tickets = addIdx;
      // remove from source
      let removeIdx = [...newData[source.droppableId].tickets];
      removeIdx.splice(source.index, 1);
      removeIdx.sort(sortPri);
      newData[source.droppableId].tickets = removeIdx;
      //updateData
      dispatch(updateData(newData));
    }

    if (status) {
      let newData = {};
      Object.assign(newData, data);
      // add to destination
      let addIdx = [...newData[destination.droppableId]];
      addIdx.push(newData[source.droppableId][source.index]);
      addIdx.sort(sortPri);
      newData[destination.droppableId] = addIdx;
      // remove from source
      let removeIdx = [...newData[source.droppableId]];
      removeIdx.splice(source.index, 1);
      removeIdx.sort(sortPri);
      newData[source.droppableId] = removeIdx;
      //updateData
      dispatch(updateData(newData));
    }

    // if (priority) {
    // }
  };

  useEffect(() => {
    if (tickets.length === 0 && users.length === 0) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (tickets.length > 0 && users.length > 0) {
      if (status) {
        const newData = {};
        const newBoard = [];
        tickets.forEach((ticket) => {
          const userIdx = ticket.userId;
          const idx = userIdx.split("-")[1];
          if (!newBoard.includes(ticket.status)) {
            newBoard.push(ticket.status);
            newData[ticket.status] = [
              {
                ...ticket,
                user: users[idx],
              },
            ];
          } else {
            newData[ticket.status] = [
              ...newData[ticket.status],
              {
                ...ticket,
                user: users[idx],
              },
            ].sort(sortPri);
          }
        });
        console.log(newData);
        dispatch(updateBoard(newBoard));
        dispatch(updateData(newData));
      }
      if (user) {
        const newData = {};
        const newBoard = [];

        users.forEach((user) => {
          const userIdx = user.id;
          if (!newBoard.includes(user.name)) {
            newBoard.push(user.name);
            newBoard.sort();

            const newTic = tickets.filter(
              (ticket, index) => ticket.userId === userIdx
            );
            newTic.sort(sortPri);
            newData[user.name] = {
              ...user,
              tickets: newTic,
            };
          }
        });
        dispatch(updateBoard(newBoard));

        dispatch(updateData(newData));
      }
      if (priority) {
      }
    }
  }, [status, user, tickets, users, dispatch]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {/* <NavBar /> */}
        <div className="app_outer">
          <div className="app_boards">
            {boards.map((board, index) => (
              <Board
                status={status}
                user={user}
                board={board}
                index={index}
                data={data}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
