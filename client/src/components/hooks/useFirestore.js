import { useState, useEffect } from "react";
import { db } from "../../firebase/config";

export function useFireStoreOneDoc(collection, docID) {
  const [messages, setMessages] = useState([]);
  const [from, setFrom] = useState("");

  useEffect(() => {
    const unsub = db
      .collection(collection)
      .doc(docID)
      .onSnapshot((doc) => {
        setMessages(doc.data().message);
        setFrom(doc.data().from);
        // console.log(doc.data().message);
      });

    return () => unsub();
  }, [collection, docID]);

  return { messages, from };
}

export function useFireStoreAllDocs(collection) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // get a list of docs
    const unsub = db.collection(collection).onSnapshot((snap) => {
      const previewData = [];
      snap.forEach((doc) => {
        let data = {
          from: doc.data().from,
          ...doc.data().message[doc.data().message.length - 1], // get last elem
        };
        previewData.push(data);
      });
      setMessages(previewData);
      console.log(previewData);
    });

    return () => unsub();
  }, [collection]);

  return { messages };
}
