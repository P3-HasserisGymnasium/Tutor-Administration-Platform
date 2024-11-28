import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        customColors: {
          buttonColor: string;
          collaborationBackgroundColor: string;
          postBackGroundColor: string;
          headingTextColor: string;
          subjectColors: Record<SubjectType, {background:string}>;
        };
      }
    
      interface ThemeOptions {
        customColors?: {
          buttonColor?: string;
          collaborationBackgroundColor?: string;
          postBackGroundColor?: string;
          headingTextColor?: string;
          subjectColors?: Record<SubjectType, {background:string}>;
        };
      }
}