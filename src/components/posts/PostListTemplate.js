import styled from 'styled-components';
import palette from '../../lib/styles/pallette';
import { Link } from 'react-router-dom';

const PostListTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostListTemplate = ({ children }) => {
  return <PostListTemplateBlock>{children}</PostListTemplateBlock>;
};

export default PostListTemplate;
