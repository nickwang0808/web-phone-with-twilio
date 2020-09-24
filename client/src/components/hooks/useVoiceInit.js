import { useEffect, useState } from "react";
import { Device } from "twilio-client";

export default function useVoiceInit(DEVMODE) {
  const [deviceReady, setDeviceReady] = useState(false);
  const [initError, setInitError] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const deviceSetup = async () => {
    try {
      // check if token is stored
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token");
        Device.setup(token);
      } else {
        const url =
          "https://us-central1-autodialer-285913.cloudfunctions.net/api/token";
        let response = await fetch(url, {
          method: "POST",
        }).then((body) => body.json());
        sessionStorage.setItem("token", response.token);
        console.log("token received");
        Device.setup(response.token);
      }
    } catch (err) {
      console.log(err);
      setInitError(true);
    }
  };

  useEffect(() => {
    deviceSetup();
  }, [deviceReady]);

  useEffect(() => {
    Device.on("ready", () => {
      console.log("device ready");
      setDeviceReady(true);
      setConnectionError(null);
      setInitError(null);
    });

    Device.on("error", (error) => {
      console.log("error log", error);
      setConnectionError(`An Error occurred, error code: ${error.code}`);
      setDeviceReady(false);
      sessionStorage.clear();
      deviceSetup();
    });

    // eslint-disable-next-line
    return () => {
      Device.destroy();
    };
  }, []);

  return {
    deviceReady,
    initError,
    connectionError,
  };
}
