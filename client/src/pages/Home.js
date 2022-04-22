import { gql, useQuery } from "@apollo/client";
import PostCard from "../comonents/PostCard";
import MenuSpinner from "../comonents/Spinner";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = loading ? [] : data.getPosts;

  return (
    <>
      {loading ? (
        <MenuSpinner />
      ) : (
        posts.map((post) => <PostCard post={post} />)
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
