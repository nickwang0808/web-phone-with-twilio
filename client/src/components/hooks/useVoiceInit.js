import { useEffect, useState } from "react";
import { Device } from "twilio-client";

export default function useVoiceInit(DEVMODE) {
  const [deviceReady, setDeviceReady] = useState(false);
  const [initError, setInitError] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [incoming, setIncoming] = useState(false);

  const getToken = async () => {
    try {
      // const url = "http://localhost:3000/token/generate";
      const url =
        "https://us-central1-autodialer-285913.cloudfunctions.net/api/token";
      const response = await fetch(url, {
        method: "POST",
      }).then((body) => body.json());

      // console.log(response.token);
      console.log("token received");
      Device.setup(response.token);
    } catch (err) {
      console.log(err);
      setInitError(true);
    }
  };

  useEffect(() => {
    // device init
    if (DEVMODE) {
      setDeviceReady(true);
    } else {
      if (!deviceReady) {
        getToken();
        Device.on("ready", () => {
          console.log("device ready");
          setDeviceReady(true);
          connectionError === null && setConnectionError(null);
        });
      }
    }

    return () => {
      Device.destroy();
    };
  }, [deviceReady, connectionError, DEVMODE]);

  useEffect(() => {
    Device.on("error", (error) => {
      console.log("error log", error);
      setConnectionError(`An Error occurred, error code: ${error.code}`);
      setDeviceReady(false);
    });

    // Device.on("disconnect", () => setConnection(false));

    Device.on("incoming", (conn) => {
      setIncoming(true);
      console.log(conn);
    });

    return () => {
      Device.destroy();
    };
  }, []);

  return {
    deviceReady,
    initError,
    connectionError,
    incoming,
  };
}
