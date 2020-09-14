const { useFireStoreAllDocs } = require("../hooks/useFirestore");

const { messages } = useFireStoreAllDocs("messages");

function sort(a, b) {
  const a1 = a.read;
  const b1 = b.read;

  if (a1 === false && b1 === true) {
    return -1;
  }

  if (a1 === true && b1 === false) {
    return 1;
  }

  return 0;
}
