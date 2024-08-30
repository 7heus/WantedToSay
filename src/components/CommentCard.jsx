export default function CommentCard({ comment }) {
  return (
    <div className="comment">
      <p style={{ textAlign: "left" }}>Anonymous commented:</p>
      <div className="wrapper">
        <p>{comment && comment.content}</p>
      </div>
    </div>
  );
}
