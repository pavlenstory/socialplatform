import { gql, useQuery } from "@apollo/client";
import PostCard from "../comonents/PostCard";
import MenuSpinner from "../comonents/Spinner";
import { Card } from "react-bootstrap";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = loading ? [] : data.getPosts;
  console.log(data);
  return (
    <>
      <div>Posts</div>
      {loading ? (
        <MenuSpinner />
      ) : (
        posts.map((post) => (
          <Card style={{ width: "18rem" }} key={post.id}>
            <PostCard post={post} />
          </Card>
        ))
      )}
    </>
  );
}
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        id
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
