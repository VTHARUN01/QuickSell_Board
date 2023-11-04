import { sortNam, sortPri } from "./sortFun";

const initalizePriorityStatus = (
  tickets,
  users,
  status,
  grp,
  setSBoard,
  dispatch,
  updateBoard,
  updateData,
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
    if (!localStorage.getItem("sboard")) {
      setSBoard(newBoard);
      localStorage.setItem("sboard", JSON.stringify(newBoard));
    }
  } else {
    if (!localStorage.getItem("pboard")) {
      setPBoard(newBoard);
      localStorage.setItem("pboard", JSON.stringify(newBoard));
    }
  }

  dispatch(updateBoard(newBoard));
  dispatch(updateData(newData));
};

const initalizeUser = (
  users,
  tickets,
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
  if (!localStorage.getItem("uboard")) {
    setUBoard(newBoard);
    localStorage.setItem("uboard", JSON.stringify(newBoard));
  }
  dispatch(updateBoard(newBoard));
  dispatch(updateData(newData));
};

export { initalizePriorityStatus, initalizeUser };
