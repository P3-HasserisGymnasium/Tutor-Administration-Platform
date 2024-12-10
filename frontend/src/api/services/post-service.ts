import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { PostType } from "~/types/entity_types";

export const usePostService = () => {
	const useGetPosts = () => {
		return useQuery({
			queryKey: ["getPosts"],
			queryFn: async () => {
				const { data } = await apiClient.get<PostType[]>(`/api/post`);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
		});
	};

	const useGetTuteePosts = () => {
		return useQuery({
			queryKey: ["getTuteePosts"],
			queryFn: async () => {
				const { data } = await apiClient.get<PostType[]>(`/api/post/tutee`);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
		});
	};

	const useCreatePost = () => {
		return useMutation({
			mutationKey: ["createPost"],
			mutationFn: async (post: PostType) => {
				const { data } = await apiClient.post<PostType>("/api/post", post);
				return data;
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: () => {
				toast.success("Post oprettet");
			},
		});
	};

	const useDeletePost = () => {
		return useMutation({
			mutationKey: ["deletePost"],
			mutationFn: async (postId: number) => {
				await apiClient.delete(`/api/post/${postId}`);
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: () => {
				toast.success("Post slettet");
			},
		});
	};

	const useEditPost = () => {
		return useMutation({
			mutationKey: ["editPost"],
			mutationFn: async (post: PostType) => {
				if (!post.id) {
					throw new Error("Post id is required");
				}
				const { data } = await apiClient.put<PostType>(`/api/post/${post.id}`, post);
				return data;
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: () => {
				toast.success("Post redigeret");
			},
		});
	};

	return {
		useGetPosts,
		useGetTuteePosts,
		useCreatePost,
		useDeletePost,
		useEditPost,
	};
};
