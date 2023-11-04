import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { InitalizeTickets } from "./redux/slice/ticketSlice";
import { InitalizeUsers } from "./redux/slice/userSlice";
import { updateBoard } from "./redux/slice/boardSlice";
import { updateData } from "./redux/slice/dataSlice";
import NavBar from "./components/NavBar/NavBar";
import Board from "./components/Board/Board";

import { updateReduxPriorityStatus, updateReduxUser } from "./js/reduxFun";
import { initalizePriorityStatus, initalizeUser } from "./js/initalizeFun";
import { updatePriorityStatus, updateUser } from "./js/updateFun";
import "./App.css";

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
    const response = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
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
  const [sboard, setSBoard] = useState(
    localStorage.getItem("sboard")
      ? JSON.parse(localStorage.getItem("sboard"))
      : []
  );
  const [uboard, setUBoard] = useState(
    localStorage.getItem("uboard")
      ? JSON.parse(localStorage.getItem("uboard"))
      : []
  );
  const [pboard, setPBoard] = useState(
    localStorage.getItem("pboard")
      ? JSON.parse(localStorage.getItem("pboard"))
      : []
  );

  // Drag and Drop
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    if (user) {
      updateReduxUser(
        source,
        destination,
        tickets,
        data,
        grp,
        dispatch,
        InitalizeTickets,
        updateData
      );
    }

    if (status) {
      updateReduxPriorityStatus(
        source,
        destination,
        tickets,
        data,
        status,
        priority,
        grp,
        dispatch,
        InitalizeTickets,
        updateData
      );
    }

    if (priority) {
      updateReduxPriorityStatus(
        source,
        destination,
        tickets,
        data,
        status,
        priority,
        grp,
        dispatch,
        InitalizeTickets,
        updateData
      );
    }
  };

  useEffect(() => {
    if (tickets.length === 0 && users.length === 0) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!boards.length) {
      if (tickets.length > 0 && users.length > 0) {
        if (status) {
          initalizePriorityStatus(
            tickets,
            users,
            status,
            grp,
            setSBoard,
            dispatch,
            updateBoard,
            updateData,
            setPBoard
          );
        }
        if (user) {
          initalizeUser(
            users,
            tickets,
            grp,
            setUBoard,
            dispatch,
            updateBoard,
            updateData
          );
        }
        if (priority) {
          initalizePriorityStatus(
            tickets,
            users,
            status,
            grp,
            setSBoard,
            dispatch,
            updateBoard,
            updateData,
            setPBoard
          );
        }
      }
    } else {
      if (status) {
        updatePriorityStatus(
          tickets,
          users,
          grp,
          status,
          sboard,
          setSBoard,
          dispatch,
          updateBoard,
          updateData,
          pboard,
          setPBoard
        );
      }
      if (user) {
        updateUser(
          tickets,
          users,
          uboard,
          grp,
          setUBoard,
          dispatch,
          updateBoard,
          updateData
        );
      }
      if (priority) {
        updatePriorityStatus(
          tickets,
          users,
          grp,
          status,
          sboard,
          setSBoard,
          dispatch,
          updateBoard,
          updateData,
          pboard,
          setPBoard
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="Quicksell__outer">
          <div className="Quicksell__boards">
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
