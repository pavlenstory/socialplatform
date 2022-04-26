import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

function PostCard({ post }) {
  const {
    id,
    body,
    createdAt,
    username,
    likeCount,
    commentCount,
    likes,
    comments,
  } = post;

  function likePost() {}
  function commentPost() {}
  return (
    <>
      <Card.Body>
        <Card.Img src="holder.js/100px180" />
        <Card.Title>{username}</Card.Title>
        <Card.Text as={Link} to={`posts/${id}`} bg="dark" variant="dark">
          {moment(createdAt).fromNow(true)}
        </Card.Text>
        <Card.Body>{body}</Card.Body>
        <Button variant="primary" onClick={likePost}>
          Like button
        </Button>
        <Button variant="primary" onClick={commentPost}>
          Comment post
        </Button>
        {likeCount}
      </Card.Body>
    </>
  );
}

export default PostCard;
