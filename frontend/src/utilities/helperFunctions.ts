import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Theme } from "@mui/material/styles";
import baseTheme from "~/themes/baseTheme";
import tuteeTheme from "~/themes/tuteeTheme";
import tutorTheme from "~/themes/tutorTheme";
import unauthenticatedAppTheme from "~/themes/unauthenticatedAppTheme";
import { NotificationResponseType } from "~/types/entity_types";

/**
 * @returns {string} the heading of the current page based on the pathname.
 */
export function useHeading(): string {
	const location = useLocation().pathname;
	switch (location) {
		case "/":
			return "Homepage";
		case "/tutee":
			return "Tutee Dashboard";
		case "/tutor":
			return "Tutor Dashboard";
		case "/tutee/create-post":
			return "Create Post";
		case "/tutee/tutor-list":
			return "Tutor List";
		case "/tutee/profile":
			return "Profile";
		case "/tutee/request-admin":
			return "Request Administarator";
		case "/tutor/profile":
			return "Profile";
		case "/tutor/tutor-application":
		case "/tutee/tutor-application":
			return "Tutor Application";
		case "/tutor/posts-list":
			return "List of Posts";
		case "/tutee/notifications":
		case "/tutor/notifications":
		case "/notifications":
			return "Notifications";
		default:
			return "";
	}
}

export const useRolePrefix = (): string => {
	const rolePrefix = useLocation().pathname;
	switch (true) {
		case rolePrefix.startsWith("/tutee"):
			return "/tutee";
		case rolePrefix.startsWith("/tutor"):
			return "/tutor";
		case rolePrefix.startsWith("/login"):
			return "/login";
		case rolePrefix.startsWith("/register"):
			return "/register";
		case rolePrefix === null:
			return "";
		default:
			return "";
	}
};

/**
 *
 * @returns The current theme based on the first part of the pathname.
 *
 */
export function useCurrentTheme(): Theme {
	const firstPathPart = useRolePrefix();
	if (firstPathPart == null) {
		return baseTheme;
	}

	switch (firstPathPart) {
		case "/tutee":
			return tuteeTheme;
		case "/tutor":
			return tutorTheme;
		case "/login":
			return unauthenticatedAppTheme;
		case "/register":
			return unauthenticatedAppTheme;

		default:
			return baseTheme;
	}
}

/**
 * Custom hook to determine whether or not the screen is mobile or laptop.
 *
 * @returns {Object} a boolean value for a given condition
 *
 */
export const useBreakpoints = (): {
	isMobile: boolean;
	isLaptop: boolean;
	isShort: boolean;
	hasScrollbar: boolean;
} => {
	const isMobile = useMediaQuery("(max-width:664px)"); // 664 because of scrollbar appearance
	const isLaptop = useMediaQuery("(min-width:1919px)");
	const isShort = useMediaQuery("(max-height: 900px)");
	const [hasScrollbar, setHasScrollbar] = useState(false);

	// if the client height is less than the inner height, then the scrollbar is visible, otherwise it is not.
	const checkScrollbar = () => {
		const innerHeightPixels = window.innerHeight;
		const documentElementClientHeightPixels = document.documentElement.clientHeight;
		setHasScrollbar(innerHeightPixels > documentElementClientHeightPixels);
	};
	useEffect(() => {
		checkScrollbar();
		window.addEventListener("resize", checkScrollbar);
		return () => window.removeEventListener("resize", checkScrollbar);
	}, []);

	return { isMobile, isLaptop, hasScrollbar, isShort };
};

/**
 * Custom hook to determine the ideal width of a layout component based on whether or not the screen is mobile.
 *
 * @param {string | number} value - The fallback value in case the screen is not mobile.
 *
 * @returns {string} either returns "100%" if the screen is mobile or the value passed in if the screen is not mobile, leading to a responsive width.
 */
export const useVariableWidth = (value: string | number) => {
	if (useBreakpoints().isMobile) {
		return "100%";
	}

	if (typeof value === "number") {
		if (100 > value && value > 1) {
			return `${value}%`;
		}
		return `${(value * 100).toFixed(2)}%`;
	}

	return value;
};

/**
 * Custom hook to determine the wrap property of a layout component based on whether or not the screen is mobile.
 *
 * @returns {string} either returns "wrap" if the screen is mobile or "nowrap" if the screen is not mobile.
 */
export const useWrap = () => {
	if (useBreakpoints().isMobile) {
		return "wrap";
	} else {
		return "nowrap";
	}
};

/**
 * Custom hook to determine the ideal height of a layout component based on whether or not the screen is mobile.
 *
 * @param {string | number} value - The fallback value in case the screen is not mobile.
 *
 * @returns {string} either returns "auto" if the screen is mobile or the value passed in if the screen is not mobile, leading to a responsive height.
 */
export const useVariableHeight = (value?: string | number) => {
	if (useBreakpoints().isMobile) {
		return "auto";
	} else {
		if (value !== undefined) {
			if (typeof value === "number") {
				return `${(value * 100).toFixed(2)}%`;
			}
			return value;
		}
	}
};

/**
 * setCookie sets a cookie with a given name, value and expiration date.
 */
export const setCookie = (name: string, value: string, hours: number) => {
	const expires = new Date(Date.now() + hours * 36e5).toUTCString();
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

/**
 * getCookie retrieves a cookie with a given name.
 */
export const getCookie = (name: string) => {
	return document.cookie
		.split("; ")
		.find((row) => row.startsWith(name + "="))
		?.split("=")[1];
};

/**
 * deleteCookie deletes a cookie with a given name.
 */
export const deleteCookie = (name: string) => {
	document.cookie = `${name}=; path=/; max-age=0`;
};



export const generateNotificationMessage = (notification: NotificationResponseType): string => {
	switch (notification.context_type) {
		case "TutorApplication":
			if (notification.sender_type === "Admin") {
				return `You have received an update on your tutor application from an administrator`;
			}
			return `You have received a new tutor application request from ${notification.sender_name}`;


		case "Meeting":
			if (notification.sender_type === "Tutee") {
				return `You have received a new meeting request from ${notification.sender_name}`;
			}
			if (notification.sender_type === "Tutor") {
				return `You have received an update on your meeting request for ${notification.sender_name}`;
			}
			return `You have received an update on a meeting`;


		case "Collaboration":
			if (notification.sender_type === "Tutee") {
				return `You have received a new collaboration request from tutee ${notification.sender_name}`;
			}
			if (notification.sender_type === "Tutor") {
				return `You have received an update on your collaboration request for ${notification.sender_name}`;
			}
			return `You have received an update on a collaboration`;


		case "Feedback":
			return `You have received feedback from ${notification.sender_name} for tutor ${notification.receiver_name}`;

		default:
			return "You have received a new notification";
	}
}