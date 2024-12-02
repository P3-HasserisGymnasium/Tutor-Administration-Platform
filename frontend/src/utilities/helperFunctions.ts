import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Theme } from "@mui/material/styles";
import baseTheme from "~/themes/baseTheme";
import tuteeTheme from "~/themes/tuteeTheme";
import tutorTheme from "~/themes/tutorTheme";

/**
 * 
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
		case "/tutor/profile":
			return "Profile";
		case "/tutor/tutor-application": case "/tutee/tutor-application":
			return "Tutor Application";
		default:
			return "";
	}
}

export function useCurrentTheme(): Theme {
	const firstPathPart = location.pathname.split("/").filter(Boolean)[0];
	switch (firstPathPart) {
		case "tutee":
			return tuteeTheme;
		case "tutor":
			return tutorTheme;
		default:
			return baseTheme;
	}
}

/**
 * Custom hook to determine whether or not the screen is mobile or laptop.
 * 
 * @returns {Object} a boolean value for a given condition
 */
export const useBreakpoints = (): { isMobile: boolean; isLaptop: boolean; hasScrollbar: boolean } => {
	const isMobile = useMediaQuery("(max-width:664px)"); // 664 because of scrollbar appearance
	const isLaptop = useMediaQuery("(max-width:1920px)");
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

	return { isMobile, isLaptop, hasScrollbar };
}


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
		return `${(value * 100).toFixed(2)}%`;
	}

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
