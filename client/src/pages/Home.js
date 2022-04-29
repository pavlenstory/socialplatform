import { useContext } from "react";
import { useQuery } from "@apollo/client";
import PostCard from "../comonents/PostCard";
import MenuSpinner from "../comonents/Spinner";
import { Card } from "react-bootstrap";
import { AuthContext } from "../context/auth";
import PostForm from "../comonents/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = loading ? [] : data.getPosts;

  return (
    <>
      <div>Posts</div>
      {loading ? (
        <MenuSpinner />
      ) : (
        <>
          {user && <PostForm />}
          {posts.map((post) => (
            <Card style={{ width: "18rem" }} key={post.id}>
              <PostCard post={post} />
            </Card>
          ))}
        </>
      )}
    </>
  );
}

export default Home;
