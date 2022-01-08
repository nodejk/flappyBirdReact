import { useCallback, useState } from "react";
import { auth, db } from "../config/config";
// errorHandler: (err: string) => void
import { scoreRequestconfiguration, scoreBoardInterface } from "../interfaces";

const useSendScoreReq = () => {
  const [error, setError] = useState("");

  const sendRequest = useCallback(
    async (
      requestConfig: scoreRequestconfiguration,
      applyTransform: (data: any) => void
    ) => {
      try {
        console.log(requestConfig);
        let response;
        const path = requestConfig.path;

        if (path === "gamesPlayed") {
          const document = await db.collection(path).get();

          console.log(document.docs);
          const documentData = document.docs.map((doc) => doc.data());

          applyTransform(documentData);
        } else {
          console.log("here now");
          const userId = requestConfig.uid;
          const document = await db
            .collection("users")
            .doc(userId)
            .collection("gamesPlay")
            .get();

          const documentData = document.docs.map((doc) => doc.data());

          applyTransform(documentData);
        }
      } catch (err: any) {
        // console.log("error while getting score", err.message);
        setError(err);
      }
    },
    []
  );
  return { error: error, sendRequest: sendRequest };
};

export default useSendScoreReq;
