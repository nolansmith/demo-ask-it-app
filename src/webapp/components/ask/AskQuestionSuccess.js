import React from "react";
import Container from "../containers/";
import { NavLink as Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AskQuestionSuccess(props) {
  const { created } = useSelector(state => state.askForm);

  return (
    <Container id="_question_success" header="Great Question!">
      <h4 style={{ textAlign: "center" }}>
        Good Question! See it{" "}
        <Link className="aw-link" to={`/question/${created.id}`}>
          Here
        </Link>
      </h4>
    </Container>
  );
}
