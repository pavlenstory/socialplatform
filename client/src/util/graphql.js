import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
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
