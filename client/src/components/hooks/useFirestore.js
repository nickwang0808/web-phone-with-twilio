import { useState, useEffect } from "react";
import { db } from "../../firebase/config";

export default function useFireStore(collection) {
  const [messages, setMessages] = useState([]);
  const [from, setFrom] = useState("");

  useEffect(() => {
    const unsub = db
      .collection(collection)
      .doc("+8618612441878")
      .onSnapshot((doc) => {
        setMessages(doc.data().message);
        setFrom(doc.data().from);
        console.log(doc.data().message);
      });

    return () => unsub();
  }, [collection]);

  return { messages, from };
}
