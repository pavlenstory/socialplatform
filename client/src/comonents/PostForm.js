import { useForm } from "../util/hooks";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import FormElement from "./FormElement";
import { FETCH_POSTS_QUERY } from "../util/graphql";
function PostForm() {
  const { onChange, onSubmit, values, setValues } = useForm(
    createPostCallBack,
    {
      body: "",
    }
  );

  const [createPost, { data, loading, error }] = useMutation(
    CREATE_POST_MUTATION,
    {
      update(cache, result) {
        const data = cache.readQuery({ query: FETCH_POSTS_QUERY });
        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: [result.data.createPost, ...data.getPosts],
          },
        });

        setValues({ body: "" });
      },
      variables: values,
    }
  );

  function createPostCallBack() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create post:</h2>
      <FormElement
        label="Post"
        value={values.body}
        type="text"
        placeholder="Post message"
        name="body"
        onChange={onChange}
      />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
