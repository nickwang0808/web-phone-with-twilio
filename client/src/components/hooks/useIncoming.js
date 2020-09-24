import { useEffect, useState } from "react";
import { Device } from "twilio-client";

export default function useIncoming() {
  const [incoming, setIncoming] = useState(false);
  const [incomingConnection, setIncomingConnection] = useState(null);

  useEffect(() => {
    Device.on("incoming", (conn) => {
      console.log("incoming");
      setIncoming(true);
      setIncomingConnection(conn);
    });

    return () => {
      Device.destroy();
    };
  }, []);

  return { incoming, setIncoming, incomingConnection };
}
