import { useCallback, useState } from "react";
import { auth, db } from "../config/config";
// errorHandler: (err: string) => void

interface configuration {
  userType: string;
  method: string;
  body: { email: string; password: string };
}

const useHttpRequest = () => {
  const [error, setError] = useState("");

  const sendRequest = useCallback(
    async (
      requestConfig: configuration,
      applyTransform: (data: any) => void
    ) => {
      try {
        let response;

        console.log(requestConfig.userType);
        if (requestConfig.userType === "NEW") {
          response = await auth.createUserWithEmailAndPassword(
            requestConfig.body.email,
            requestConfig.body.password
          );
        } else {
          response = await auth.signInWithEmailAndPassword(
            requestConfig.body.email,
            requestConfig.body.password
          );
        }

        const userId = response.user?.uid;

        console.log(userId);
        const document = await db.collection("users").doc(userId).get();

        console.log("--->");
        console.log(document);
        if (document && document.exists) {
          console.log("document exists");
        } else {
          console.log("making new doc");
          await document.ref.set({
            createdAt: new Date().toISOString(),
            email: requestConfig.body.email,
            uid: userId,
          });
        }

        applyTransform({
          email: requestConfig.body.email,
          password: requestConfig.body.password,
          uid: response.user?.uid,
        });
      } catch (err: any) {
        setError(err.message);
      }
    },
    []
  );
  return { error: error, sendRequest: sendRequest };
};

export default useHttpRequest;
