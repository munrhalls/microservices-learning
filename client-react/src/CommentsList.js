const CommentsList = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment}</li>
      ))}
    </ul>
  );
};

export default CommentsList;
