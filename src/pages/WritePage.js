import React from "react";
import Responsive from "../components/common/Responsive";
import EditorContainer from "../containers/write/EditorContainer";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import WriteActionButtonsContainer from "../containers/write/WriteActionButtonsContainer";
import HeaderContainer from "../containers/common/HeaderContainer";
import { Helmet } from "react-helmet-async";

const WritePage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <Helmet>
          <title>글 작성하기 - JUNHLR BOARD</title>
        </Helmet>
        <EditorContainer />
        <TagBoxContainer />
        <WriteActionButtonsContainer />
      </Responsive>
    </>
  );
};

export default WritePage;
