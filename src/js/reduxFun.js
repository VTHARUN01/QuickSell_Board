import { sortNam, sortPri } from "./sortFun";

const updateReduxPriorityStatus = (
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
) => {
  // editable data
  let newData = {};
  Object.assign(newData, data);

  // editable tickets
  let newTickets = tickets?.length > 0 ? [...tickets] : [];

  // add ticket to destination
  let addIdx =
    newData[destination.droppableId]?.length > 0
      ? [...newData[destination.droppableId]]
      : [];

  // new ticket
  let newAddIdx = { ...newData[source.droppableId][source.index] };
  if (status) newAddIdx.status = destination.droppableId;
  if (priority) newAddIdx.priority = destination.droppableId;
  addIdx.push(newAddIdx);

  // update tickets
  newTickets = newTickets.map((ticket) => {
    let newTicket = { ...ticket };
    if (newTicket.id === newData[source.droppableId][source.index].id) {
      if (status) newTicket.status = destination.droppableId;
      if (priority) newTicket.priority = destination.droppableId;
    }
    return newTicket;
  });

  //sorting
  if (grp) addIdx.sort(sortPri);
  else addIdx.sort(sortNam);

  // assign to new data destination
  newData[destination.droppableId] = addIdx;

  // remove from source
  let removeIdx = [...newData[source.droppableId]];
  removeIdx.splice(source.index, 1);

  //sorting
  if (grp) removeIdx.sort(sortPri);
  else removeIdx.sort(sortNam);

  // assign to new data source
  newData[source.droppableId] = removeIdx;

  //updateData
  dispatch(InitalizeTickets(newTickets));
  dispatch(updateData(newData));
};

const updateReduxUser = (
  source,
  destination,
  tickets,
  data,
  grp,
  dispatch,
  InitalizeTickets,
  updateData
) => {
  // editable data
  let newData = {};
  Object.assign(newData, data);

  // editable tickets
  let newTickets = tickets?.length > 0 ? [...tickets] : [];

  // add ticket to destination
  let addIdx =
    newData[destination.droppableId].tickets?.length > 0
      ? [...newData[destination.droppableId].tickets]
      : [];

  // new ticket
  let newAddIdx = { ...newData[source.droppableId].tickets[source.index] };
  newAddIdx.userId = newData[destination.droppableId]?.id;
  addIdx.push(newAddIdx);

  // update tickets
  newTickets = newTickets.map((ticket) => {
    let newTicket = { ...ticket };
    if (newTicket.id === newData[source.droppableId].tickets[source.index].id) {
      newTicket.userId = newData[destination.droppableId]?.id;
    }
    return newTicket;
  });

  //sorting
  if (grp) addIdx.sort(sortPri);
  else addIdx.sort(sortNam);

  // assign to new data destination
  let newBoardIdx = { ...newData[destination.droppableId] };
  newBoardIdx.tickets = addIdx;
  newData[destination.droppableId] = newBoardIdx;

  // remove from source
  let removeIdx = [...newData[source.droppableId].tickets];
  removeIdx = removeIdx.filter((ticket) => ticket.id !== newAddIdx.id);

  //sorting
  if (grp) removeIdx.sort(sortPri);
  else removeIdx.sort(sortNam);

  // assign to new data source
  let newBoardId = { ...newData[source.droppableId] };
  newBoardId.tickets = removeIdx;
  newData[source.droppableId] = newBoardId;

  //updateData
  dispatch(InitalizeTickets(newTickets));
  dispatch(updateData(newData));
};

export { updateReduxPriorityStatus, updateReduxUser };
