import { sortNam, sortPri } from "./sortFun";

const updatePriorityStatus = (
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
) => {
  const newData = {};
  const newBoard = [];
  tickets.forEach((ticket) => {
    const userIdx = ticket.userId;
    const idx = userIdx.split("-")[1];
    if (!newBoard.includes(status ? ticket.status : ticket.priority)) {
      newBoard.push(status ? ticket.status : ticket.priority);
      if (!status) newBoard.sort((a, b) => b - a);
      newData[status ? ticket.status : ticket.priority] = [
        {
          ...ticket,
          user: users[idx],
        },
      ];
    } else {
      newData[status ? ticket.status : ticket.priority] = [
        ...newData[status ? ticket.status : ticket.priority],
        {
          ...ticket,
          user: users[idx],
        },
      ].sort(grp ? sortPri : sortNam);
    }
  });
  if (status) {
    if (sboard.length === 0) {
      setSBoard(newBoard);
      localStorage.setItem("sboard", JSON.stringify(newBoard));
      dispatch(updateBoard(newBoard));
    } else {
      dispatch(updateBoard(sboard));
    }
  } else {
    if (pboard.length === 0) {
      setPBoard(newBoard);
      localStorage.setItem("pboard", JSON.stringify(newBoard));
      dispatch(updateBoard(newBoard));
    } else {
      dispatch(updateBoard(pboard));
    }
  }
  dispatch(updateData(newData));
};

const updateUser = (
  tickets,
  users,
  uboard,
  grp,
  setUBoard,
  dispatch,
  updateBoard,
  updateData
) => {
  const newData = {};
  const newBoard = [];

  users.forEach((user) => {
    const userIdx = user.id;
    if (!newBoard.includes(user.name)) {
      newBoard.push(user.name);
      newBoard.sort();
      const newTic = tickets.filter((ticket) => ticket.userId === userIdx);
      newTic.sort(grp ? sortPri : sortNam);
      newData[user.name] = {
        ...user,
        tickets: newTic,
      };
    }
  });
  if (uboard.length === 0) {
    setUBoard(newBoard);
    localStorage.setItem("uboard", JSON.stringify(newBoard));
    dispatch(updateBoard(newBoard));
  } else {
    dispatch(updateBoard(uboard));
  }
  dispatch(updateData(newData));
};

export { updatePriorityStatus, updateUser };
