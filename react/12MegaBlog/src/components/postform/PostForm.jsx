import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import databaseService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm(post) {
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.user.userdata);
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const submit = async (data) => {
    if (post) {
      const file = data.featuredImage[0]
        ? databaseService.uploadfile(data.featuredImage[0])
        : null;
      if (file) {
        databaseService.deleteFile(post.featuredImage);
      }
      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        const file = databaseService.uploadfile(data.featuredImage[0]);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await databaseService.createPost({
            ...data,
            userId: userdata.$id,
          });
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    }
  };
  const slugTransform=useCallback((value)=>{
    if(value && typeof value==='string'){
        return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }
},[])
  return <div>PostForm</div>;
}

export default PostForm;
