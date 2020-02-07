import React from "react";
import Answers from "./Answers";
import Questions from "./Questions";
import Votes from "./Votes";
import UserDateInfo from "./UserDateInfo";
import { useQuery } from "@apollo/react-hooks";
import { FIND_USER } from "../../store/graphql/queries";
import Loading from "../loading/";
import Error from "../error";
import * as URLS from "../../util/urls";

export default function User(props) {
  let usernameFromURL = props.match.params.slug.toString();

  const { data, error, loading } = useQuery(FIND_USER, {
    variables: {
      username: usernameFromURL
    },
    pollInterval: 500
  });

  if (loading) return <Loading message="Getting User Data" />;

  if (!loading && !data.findUserByUsername)
    return <Error message="Could not find user" />;

  let userData = data.findUserByUsername;

  return (
    <div style={{ width: "100%", margin: "20px auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1%",
          margin: "5% auto",
          justifyContent: "center",
          width: "30%"
        }}
      >
        <img
          style={{ maxHeight: "100px" }}
          src={`${URLS.images}/single_question.svg`}
        />
        <h2 style={{ margin: "0 auto", textAlign: "center" }}>
          Meet {userData.username}
        </h2>
        <h6 style={{ margin: "0 auto", textAlign: "center" }}>
          <React.Suspense fallback="...">
            <UserDateInfo inputDate={userData.createdAt} />
          </React.Suspense>
        </h6>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          margin: "1% auto",
          justifyContent: "center",
          width: "100%"
        }}
        className="row"
      >
        <div className="col-md-4  col-sm-12" style={{ marginBottom: "5%" }}>
          <Questions questions={userData.questions} />
        </div>
        <div className="col-md-4  col-sm-12" style={{ marginBottom: "5%" }}>
          <Answers answers={userData.answers} />
        </div>
        <div className="col-md-4  col-sm-12" style={{ marginBottom: "5%" }}>
          <Votes votes={userData.votes} />
        </div>
      </div>
    </div>
  );
}
