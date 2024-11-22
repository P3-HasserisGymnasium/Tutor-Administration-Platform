import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../apiClient";
import { Subject } from "~/types/enums";

export type PostType = {
	id: number;
	title: string;
	description: string;
	subject: Subject;
	duration: string;
	state: string;
};

export const usePostService = () => {
	const getPosts = useQuery({
		queryKey: ["getPosts"],
		queryFn: async () => {
			const { data } = await apiClient.get<PostType[]>(
				`/api/post_service`
			);
			return data;
		},
		refetchOnWindowFocus: false,
		placeholderData: [],
	});

	const createPost = useMutation({
		mutationKey: ["createPost"],
		mutationFn: async (post: PostType) => {
			const { data } = await apiClient.post<PostType>(
				"/api/post_service",
				post
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Post oprettet");
		},
	});

	const deletePost = useMutation({
		mutationKey: ["deletePost"],
		mutationFn: async (postId: number) => {
			await apiClient.delete(`/api/post_service/${postId}`);
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Post slettet");
		},
	});

	const editPost = useMutation({
		mutationKey: ["editPost"],
		mutationFn: async (post: PostType) => {
			if (!post.id) {
				throw new Error("Post id is required");
			}
			const { data } = await apiClient.put<PostType>(
				`/api/post_service/`,
				post
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Post redigeret");
		},
	});

	return {
		createPost,
		deletePost,
		editPost,
		getPosts,
	};
};
