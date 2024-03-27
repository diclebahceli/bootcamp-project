

export async function GetAllComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${apiUrl}/comments/${postId}`);
  const comments = await response.json();
  return comments;
}

export async function GetAllCommentsFromPostId(
  postId: number
): Promise<Comment[]> {
  const response = await fetch(`${apiUrl}/comments/${postId}`);
  const comments = await response.json();
  return comments;
}

export async function addComment(comment: Comment): Promise<Comment> {
  const response = await fetch(`${apiUrl}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const newComment = await response.json();
  return newComment;
}

export async function deleteComment(id: number): Promise<void> {
  await fetch(`${apiUrl}/comments/${id}`, {
    method: "DELETE",
  });
}

export async function updateComment(comment: Comment): Promise<Comment> {
  const response = await fetch(`${apiUrl}/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const updatedComment = await response.json();
  return updatedComment;
}

export async function getCommentById(id: number): Promise<Comment> {
  const response = await fetch(`${apiUrl}/comments/${id}`);
  const comment = await response.json();
  return comment;
}

export async function GetCommentsByPostId(postId: number): Promise<Comment[]> {
  const response = await fetch(`${apiUrl}/comments/${postId}`);
  const comments = await response.json();
  return comments;
}

// Path: hobby-hub/src/app/Models/comment.tsx
