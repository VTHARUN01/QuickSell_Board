import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { InitalizeTickets } from "./redux/slice/ticketSlice";
import { InitalizeUsers } from "./redux/slice/userSlice";
import { updateBoard } from "./redux/slice/boardSlice";
import { updateData } from "./redux/slice/dataSlice";
import NavBar from "./components/NavBar/NavBar";
import Board from "./components/Board/Board";
import { sortPri, sortNam } from "./js/sortIng";
import "./css/App.css";

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

  // Grouping
  const [status, setStatus] = useState(true);
  const [user, setUser] = useState(false);
  const [priority, setPriority] = useState(false);
  // Priority
  const [grp, setGrp] = useState(true);

  //board
  const [sboard, setSBoard] = useState([]);
  const [uboard, setUBoard] = useState([]);
  const [pboard, setPBoard] = useState([]);

  // Drag and Drop
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    if (user) {
      let newData = data;
      let newTickets = tickets?.length > 0 ? [...tickets] : [];
      // add to destination
      let addIdx =
        newData[destination.droppableId].tickets?.length > 0
          ? [...newData[destination.droppableId].tickets]
          : [];
      let newAddIdx = { ...newData[source.droppableId].tickets[source.index] };
      newAddIdx.userId = newData[destination.droppableId]?.id;
      newTickets = newTickets.map((ticket) => {
        let newTicket = { ...ticket };
        if (
          newTicket.id === newData[source.droppableId].tickets[source.index].id
        ) {
          newTicket.userId = destination.droppableId;
        }
        return newTicket;
      });

      addIdx.push(newAddIdx);
      //sorting
      if (grp) addIdx.sort(sortPri);
      else addIdx.sort(sortNam);

      let newBoardIdx = { ...newData[destination.droppableId] };
      let newBoardTic = [...newData[destination.droppableId].tickets];
      newBoardTic = addIdx;
      newBoardIdx.tickets = newBoardTic;
      newData[destination.droppableId] = newBoardIdx;

      // remove from source
      let removeIdx = [...newData[source.droppableId].tickets];
      removeIdx.splice(source.index, 1);
      //sorting
      if (grp) removeIdx.sort(sortPri);
      else removeIdx.sort(sortNam);
      newData[source.droppableId].tickets = removeIdx;
      //updateData
      dispatch(InitalizeTickets(newTickets));
      dispatch(updateData(newData));
    }

    if (status) {
      let newData = {};
      let newTickets = tickets?.length > 0 ? [...tickets] : [];
      Object.assign(newData, data);
      // add to destination
      let addIdx =
        newData[destination.droppableId]?.length > 0
          ? [...newData[destination.droppableId]]
          : [];
      let newAddIdx = { ...newData[source.droppableId][source.index] };
      newAddIdx.status = destination.droppableId;
      newTickets = newTickets.map((ticket) => {
        let newTicket = { ...ticket };
        if (newTicket.id === newData[source.droppableId][source.index].id) {
          newTicket.status = destination.droppableId;
        }
        return newTicket;
      });
      addIdx.push(newAddIdx);
      //sorting
      if (grp) addIdx.sort(sortPri);
      else addIdx.sort(sortNam);
      newData[destination.droppableId] = addIdx;
      // remove from source
      let removeIdx = [...newData[source.droppableId]];
      removeIdx.splice(source.index, 1);
      //sorting
      if (grp) removeIdx.sort(sortPri);
      else removeIdx.sort(sortNam);
      newData[source.droppableId] = removeIdx;
      //updateData
      dispatch(InitalizeTickets(newTickets));
      dispatch(updateData(newData));
    }

    if (priority) {
      let newData = {};
      Object.assign(newData, data);
      let newTickets = tickets?.length > 0 ? [...tickets] : [];
      // add to destination
      let addIdx =
        newData[destination.droppableId]?.length > 0
          ? [...newData[destination.droppableId]]
          : [];
      let newAddIdx = { ...newData[source.droppableId][source.index] };
      newAddIdx.priority = destination.droppableId;
      newTickets = newTickets.map((ticket) => {
        let newTicket = { ...ticket };
        if (newTicket.id === newData[source.droppableId][source.index].id) {
          newTicket.priority = destination.droppableId;
        }
        return newTicket;
      });
      addIdx.push(newAddIdx);
      //sorting
      if (grp) addIdx.sort(sortPri);
      else addIdx.sort(sortNam);
      newData[destination.droppableId] = addIdx;

      // remove from source
      let removeIdx = [...newData[source.droppableId]];
      removeIdx.splice(source.index, 1);
      //sorting
      if (grp) removeIdx.sort(sortPri);
      else removeIdx.sort(sortNam);
      newData[source.droppableId] = removeIdx;
      //updateData
      dispatch(InitalizeTickets(newTickets));
      dispatch(updateData(newData));
    }
  };

  useEffect(() => {
    if (tickets.length === 0 && users.length === 0) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (boards.length === 0) {
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
              ].sort(grp ? sortPri : sortNam);
            }
          });
          setSBoard(newBoard);
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
              newTic.sort(grp ? sortPri : sortNam);
              newData[user.name] = {
                ...user,
                tickets: newTic,
              };
            }
          });
          setUBoard(newBoard);
          dispatch(updateBoard(newBoard));
          dispatch(updateData(newData));
        }
        if (priority) {
          const newData = {};
          const newBoard = [];
          tickets.forEach((ticket) => {
            const userIdx = ticket.userId;
            const idx = userIdx.split("-")[1];
            if (!newBoard.includes(ticket.priority)) {
              newBoard.push(ticket.priority);
              newBoard.sort((a, b) => b - a);
              newData[ticket.priority] = [
                {
                  ...ticket,
                  user: users[idx],
                },
              ];
            } else {
              newData[ticket.priority] = [
                ...newData[ticket.priority],
                {
                  ...ticket,
                  user: users[idx],
                },
              ].sort(grp ? sortPri : sortNam);
            }
          });
          setPBoard(newBoard);
          dispatch(updateBoard(newBoard));
          dispatch(updateData(newData));
        }
      }
    } else {
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
            ].sort(grp ? sortPri : sortNam);
          }
        });
        if (sboard.length === 0) {
          setSBoard(newBoard);
          dispatch(updateBoard(newBoard));
        } else {
          dispatch(updateBoard(sboard));
        }
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
            newTic.sort(grp ? sortPri : sortNam);
            newData[user.name] = {
              ...user,
              tickets: newTic,
            };
          }
        });
        if (uboard.length === 0) {
          setUBoard(newBoard);
          dispatch(updateBoard(newBoard));
        } else {
          dispatch(updateBoard(uboard));
        }
        dispatch(updateData(newData));
      }
      if (priority) {
        const newData = {};
        const newBoard = [];
        tickets.forEach((ticket) => {
          const userIdx = ticket.userId;
          const idx = userIdx.split("-")[1];
          if (!newBoard.includes(ticket.priority)) {
            newBoard.push(ticket.priority);
            newBoard.sort((a, b) => b - a);
            newData[ticket.priority] = [
              {
                ...ticket,
                user: users[idx],
              },
            ];
          } else {
            newData[ticket.priority] = [
              ...newData[ticket.priority],
              {
                ...ticket,
                user: users[idx],
              },
            ].sort(grp ? sortPri : sortNam);
          }
        });
        if (pboard.length === 0) {
          setPBoard(newBoard);
          dispatch(updateBoard(newBoard));
        } else {
          dispatch(updateBoard(pboard));
        }
        dispatch(updateData(newData));
      }
    }
  }, [status, user, tickets, users, grp]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <NavBar
          setGrp={setGrp}
          setStatus={setStatus}
          setPriority={setPriority}
          setUser={setUser}
          grp={grp}
        />
        <div className="app_outer">
          <div className="app_boards">
            {boards.map((board, index) => (
              <Board
                status={status}
                user={user}
                board={board}
                index={index}
                data={data}
                tickets={tickets}
                users={users}
                priority={priority}
                grp={grp}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
