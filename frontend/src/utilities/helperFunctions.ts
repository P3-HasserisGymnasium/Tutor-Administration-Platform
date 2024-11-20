import { useLocation } from "react-router-dom";

// what is this used for ?
/* // IMPORTANT: Remember to add to this when adding a new page route
const locationNameMap = new Map<string, string>([
    ["/", "Homepage"],
    ["/test/anotherTest", "test"],
  ]); */

export function generateHeadingFromLocation(): string {
    const location = useLocation().pathname;
    switch (location) {
        case "/":
            return "Homepage";
        case "/tutee":
            return "Tutee Dashboard";
        case "/tutor":
            return "Tutor Dashboard";
        case "/tutee/create_post":
            return "Create Post";
        case "/tutee/tutor_list":
            return "Tutor List";
        case "/tutee/profile":
            return "Profile";
        case "/tutor/profile":
            return "Profile";
        default:
            return "";
    }
}


/* 
export function getDisplayText(): string {
    const location = useLocation().pathname;
    const text = locationNameMap.get(location);
    const regex = new RegExp("(?:.*[/])(.+)$");
    if (text != undefined) {
      return text;
    }
  
    // Handle path not found
    const match = regex.exec(location);
    if (match != null) {
      return match[1];
    }
  
    // Regex couldn't fix
    throw new Error("Regex could not handle pathname");
  } */