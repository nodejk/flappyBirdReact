import { AuthenticationContext } from "../store/AuthProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import userSendScoreReq from "../hooks/scoreHandler";
import { scoreRequestconfiguration } from "../interfaces";
import { scoreBoardInterface } from "../interfaces";
import classes from "./scoreList.module.css";
import { database } from "firebase-admin";
const initState: scoreBoardInterface[] = [];
export const ScoreList: React.FC<{ type: string }> = (props) => {
  const authCtx = useContext(AuthenticationContext);

  const [dataFirebase, setDataFirebase] = useState(initState);
  //   const [error, setError] = useState(null);

  const { error, sendRequest: sendScoreRequest } = userSendScoreReq();

  const userScoreHandler = (data: scoreBoardInterface[]) => {
    console.log("here in the score handler");
    console.log(data);

    data = data.filter((value) => Object.keys(value).length !== 0);
    let temptimeStamp: string;
    let tempData: scoreBoardInterface[] = [];

    for (let i = 0; i < data.length; i++) {
      //   console.log(new Date(data[i].timestamp));
      if (data[i].timestamp !== "") {
        temptimeStamp =
          new Date(data[i].timestamp).getHours().toString() +
          ":" +
          new Date(data[i].timestamp).getMinutes().toString() +
          " " +
          new Date(data[i].timestamp).toISOString().slice(0, 10);

        if (props.type === "LEADER_BOARD") {
          tempData.push({
            score: data[i].score,
            timestamp: temptimeStamp,
            userEmail: data[i].userEmail,
          });
        } else {
          tempData.push({
            score: data[i].score,
            timestamp: temptimeStamp,
            timeStampSort: new Date(data[i].timestamp),
          });
        }
      }
    }

    if (props.type === "LEADER_BOARD") {
      tempData = tempData
        .sort((a, b) => (a.score > b.score ? -1 : 1))
        .slice(0, 5);
    } else {
      tempData = tempData.sort((a, b) =>
        a.timeStampSort! > b.timeStampSort! ? -1 : 1
      );
    }

    console.log(tempData);
    setDataFirebase(tempData);
  };
  //   tempData.push({})

  useEffect(() => {
    if (props.type === "LEADER_BOARD") {
      const requestConfig: scoreRequestconfiguration = {
        path: "gamesPlayed",
        uid: authCtx.uid,
      };
      sendScoreRequest(requestConfig, userScoreHandler);
    }

    //   get userwise data from the firebase
    else {
      const requestConfig: scoreRequestconfiguration = {
        path: "",
        uid: authCtx.uid,
      };

      sendScoreRequest(requestConfig, userScoreHandler);
    }
  }, []);

  // get all the data from the firebase

  console.log(
    dataFirebase.map((data) => {
      console.log(data.score);
    })
  );

  return (
    <div className={classes.div}>
      <table className={classes.scoreboardTable}>
        <thead className={classes.scoreboardTableHeaderRow}>
          <tr>
            <th>Time</th>
            <th>Score</th>
            {props.type === "LEADER_BOARD" && <th>Email</th>}
          </tr>
        </thead>
        <tbody className={classes.scoreboardTableBodyRow}></tbody>
        {dataFirebase.map((data) => (
          <tr id={data.timestamp} className={classes.scoreboardTable}>
            <td>{data.timestamp}</td>
            <td>{data.score}</td>
            {props.type === "LEADER_BOARD" && <td>{data.userEmail}</td>}
          </tr>
        ))}
      </table>
    </div>
  );
  //   const [scoreList, setScoreList] = useState();
};
