import { useState, useEffect } from "react";
import { db } from "../../firebase/config";

//========================================================
export function useFireStoreOneDoc(collection, docID) {
  const [messages, setMessages] = useState([]);
  const [isRead, setIsRead] = useState();

  useEffect(() => {
    const unsub = db
      .collection(collection)
      .doc(docID)
      .onSnapshot((doc) => {
        setMessages(doc.data().message);
        setIsRead(doc.data().isRead);
        // console.log(doc.data().isRead);
      });

    return () => unsub();
  }, [collection, docID]);

  return { messages, isRead };
}

// =========================================================
export function useFireStoreAllDocs(collection) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // get a list of docs
    const unsub = db.collection(collection).onSnapshot((snap) => {
      const previewData = [];
      snap.forEach((doc) => {
        let data = {
          from: doc.data().from,
          isRead: doc.data().isRead,
          ...doc.data().message[doc.data().message.length - 1], // get last elem
        };
        previewData.push(data);
      });
      previewData.sort((a, b) => b.timeStamp.toDate() - a.timeStamp.toDate());
      setMessages(previewData);
      // console.log(previewData);
    });
    return () => unsub();
  }, [collection]);

  return { messages };
}
// ===============================================================
export function FireStoreUpdateReadStatus(collection, docID) {
  const docRef = db.collection(collection).doc(docID);

  return docRef
    .update({
      isRead: true,
    })
    .then(() => console.log("message read!"))
    .catch((err) => console.log(err));
}
