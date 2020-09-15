function sort(a, b) {
  return b.timeStamp.toDate() - a.timeStamp.toDate();
}

export default function sortMessage(message) {
  return message.sort(sort);
}
