import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { tutorListFilterType, YearGroup } from "~/types/data_types";
import { TuteeProfileType, TutorProfileType } from "~/types/entity_types";

export const useRoleService = () => {
  const assignTuteeRole = useMutation({
    mutationKey: ["assignTuteeRole"],
    mutationFn: async (studentId: number) => {
      const { data } = await apiClient.post<number>("/api/role", studentId);
      return data;
    },
    onError: (e: AxiosError<{ detail: string }>) => {
      toast.error(e?.response?.data?.detail);
    },
    onSuccess: () => {
      toast.success("Tutee assigned");
    },
  });

  const removeRole = useMutation({
    mutationKey: ["removeRole"],
    mutationFn: async (roleId: number) => {
      const { data } = await apiClient.post<number>("/api/role", roleId);
      return data;
    },
    onError: (e: AxiosError<{ detail: string }>) => {
      toast.error(e?.response?.data?.detail);
    },
    onSuccess: () => {
      toast.success("Tutee assigned");
    },
  });
  /* 
		// Assuming student id array gets returned
		const getTutees = useQuery({
			queryKey: ["getTutees"],
			queryFn: async () => {
				const { data } = await apiClient.get<number[]>(
					`/api/role`
				);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
		});
	 */
  // tutor information gets returned
  const getTutors = useMutation({
    mutationKey: ["getTutors"],
    mutationFn: async (filters: tutorListFilterType) => {
      const { data } = await apiClient.post<TutorProfileType[]>(`/api/role`, filters);
      return data;
    },
    onError: (e: AxiosError<{ detail: string }>) => {
      toast.error(e?.response?.data?.detail);
    },
    onSuccess: () => {
      //
    },
  });

  const useGetTutorProfile = (id: number | null) => {
    return useQuery({
      queryKey: ["getProfile", id],
      queryFn: async () => {
        const { data } = await apiClient.get<TutorProfileType>(`/api/role/${id}/Tutor`);
        return data;
      },
      refetchOnWindowFocus: false,
      enabled: id !== null,
      placeholderData: {
        contact_info: [],
        description: "",
        full_name: "",
        time_availability: [],
        tutoring_subjects: [],
        year_group: "PRE_IB",
        languages: [],
      },
    });
  };

  const useGetTuteeProfile = (id: number | null) => {
    return useQuery({
      queryKey: ["getProfile", id],
      queryFn: async () => {
        const { data } = await apiClient.get<TuteeProfileType>(`/api/role/${id}/Tutee`);
        return data;
      },
      refetchOnWindowFocus: false,
      enabled: id !== null,
      placeholderData: {
        full_name: "",
        year_group: YearGroup.Enum.IB_1,
        languages: [],
        contact_info: [],
      },
    });
  };

  const editTuteeProfile = useMutation({
    mutationKey: ["editTuteeProfile"],
    mutationFn: async ({ id, profile }: { id: number | null; profile: TuteeProfileType }) => {
      const { data } = await apiClient.put(`/api/role/tutee/${id}`, profile);
      return data;
    },
    onError: (e: AxiosError<{ detail: string }>) => {
      toast.error(e?.response?.data?.detail || "Failed to save tutee profile.");
    },
    onSuccess: () => {
      toast.success("Tutee profile saved successfully.");
    },
  });

  const editTutorProfile = useMutation({
    mutationKey: ["editTutorProfile"],
    mutationFn: async ({ id, profile }: { id: number | null; profile: TutorProfileType }) => {
      const { data } = await apiClient.put(`/api/role/tutor/${id}`, profile);
      return data;
    },
    onError: (e: AxiosError<{ detail: string }>) => {
      toast.error(e?.response?.data?.detail || "Failed to save tutor profile.");
    },
    onSuccess: () => {
      toast.success("Tutor profile saved successfully.");
    },
  });

  return {
    assignTuteeRole,
    removeRole,
    getTutors,
    useGetTutorProfile,
    useGetTuteeProfile,
    editTuteeProfile,
    editTutorProfile,
  };
};
