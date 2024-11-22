import React from "react";
import { string, object } from "yup";

import { Form, Field, Submit } from "./form";

const ValidationSchema = object().shape({
  postText: string().required().label("Post Text"),
});

interface CommentFormProp {
  postId: number;
}

import { usePostCommentQuery } from "../store/comment";

const CommentForm: React.FC<CommentFormProp> = (props) => {
  const {} = usePostCommentQuery(props.postId);
  return (
    <Form
      initialValues={{
        postId: null,
      }}
      validationSchema={ValidationSchema}
      onSubmit={async () => {}}
    >
      <Field name="postId" autoFocus />
      <Submit title="submit" appearance="ghost" />
    </Form>
  );
};

export default CommentForm;
