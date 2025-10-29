import { useEffect, useState } from "react";
import { postService } from "../services/api";

export const useFetchSinglePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false); // for delete/edit actions
  const [commentLoading, setCommentLoading] = useState(false); // for comment submission

  useEffect(() => {
    setLoading(true);
    postService.getPost(id)
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const deletePost = async () => {
    setActionLoading(true);
    try {
      await postService.deletePost(id);
      setPost(null); // clear post after deletion
    } catch (err) {
      setError(err);
    } finally {
      setActionLoading(false);
    }
  };

  const editPost = async (updatedData) => {
    setActionLoading(true);
    try {
      const updatedPost = await postService.updatePost(id, updatedData);
      setPost(updatedPost); // update local state
    } catch (err) {
      setError(err);
      console.error("Edit failed:", err.response?.data || err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const addComment = async (content) => {
    setCommentLoading(true);
    try {
      const updatedComments = await postService.addComment(id, { content });
      setPost(prev => ({
        ...prev,
        comments: updatedComments
      }));
    } catch (err) {
      setError(err);
    } finally {
      setCommentLoading(false);
    }
  };

  return {
    post,
    loading,
    error,
    deletePost,
    editPost,
    addComment,
    actionLoading,
    commentLoading
  };
};