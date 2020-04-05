import React, { forwardRef } from 'react';
import FlipMove from 'react-flip-move';

const FunctionalArticle = forwardRef((props, ref) => (
  <div ref={ref}>{props.articleName}</div>
));

// you do not have to modify the parent component
// this will stay as described in the quickstart
const Repos = ({ articles }) => (
  <FlipMove>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 234, 34, 45, 45, 6456, 2].map(article => (
      <FunctionalArticle key={article.id} {...article} />
    ))}
  </FlipMove>
);

export default Repos;
