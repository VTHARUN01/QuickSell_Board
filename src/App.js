import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { InitalizeTickets } from "./redux/slice/ticketSlice";
import { InitalizeUsers } from "./redux/slice/userSlice";

import "./css/App.css";
import Board from "./components/Board/Board";

function App() {
  // Dispatch
  const dispatch = useDispatch();

  // States
  const tickets = useSelector((state) => state.tickets.tickets);
  const users = useSelector((state) => state.users.users);

  // Fetch data from API
  const getData = async () => {
    const response = await fetch(process.env.REACT_APP_URL);
    const data = await response.json();
    dispatch(InitalizeTickets(data.tickets));
    dispatch(InitalizeUsers(data.users));
  };

  // States
  const [data, setData] = useState({});
  const [status] = useState(true);
  const [user] = useState(false);
  const [boards, setBoards] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    if (user) {
      const newData = data;
      newData[destination.droppableId].tickets = [
        ...newData[destination.droppableId].tickets,
        newData[source.droppableId].tickets[source.index],
      ];
      newData[source.droppableId].tickets.splice(source.index, 1);
      setData(newData);
    }

    if (status) {
      console.log(source, destination);
      const newData = data;
      newData[destination.droppableId] = [
        ...newData[destination.droppableId],
        newData[source.droppableId][source.index],
      ];
      newData[source.droppableId].splice(source.index, 1);
      setData(newData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (tickets.length > 0 && users.length > 0) {
      if (status) {
        const newData = {};
        const newBoard = [];
        tickets.forEach((ticket, index) => {
          const userIdx = ticket.userId;
          const idx = userIdx.split("-")[1];
          if (!newBoard.includes(ticket.status)) {
            newBoard.push(ticket.status);
            setBoards(newBoard);
            newData[ticket.status] = [
              [
                {
                  ...ticket,
                  user: users[idx],
                },
              ],
            ];
          } else {
            newData[ticket.status] = [
              ...newData[ticket.status],
              [
                {
                  ...ticket,
                  user: users[idx],
                },
              ],
            ];
          }
        });
        setData(newData);
      }
      if (user) {
        const newData = {};
        const newBoard = [];

        users.forEach((user) => {
          const userIdx = user.id;
          if (!newBoard.includes(user.name)) {
            newBoard.push(user.name);
            setBoards(newBoard);
            const newTic = tickets.filter(
              (ticket, index) => ticket.userId === userIdx
            );
            newData[user.name] = {
              ...user,
              tickets: newTic,
            };
          }
        });
        setData(newData);
      }
    }
  }, [status, user]);

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
