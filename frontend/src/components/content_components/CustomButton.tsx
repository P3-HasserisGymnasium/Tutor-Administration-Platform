import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material';
import { darken } from '@mui/system';

interface CustomButtonProps extends ButtonProps{
    customType?: "success" | "warning"
}

const SucessButton = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover':{
        backgroundColor: darken(theme.palette.success.main, 0.1),
    }
}))

const WarningButton = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover':{
        backgroundColor: darken(theme.palette.error.main, 0.1),
    }
}))

const CustomButton: React.FC<CustomButtonProps> = ({customType, ...props}) => {
    switch(customType){
        case "success":
            return <SucessButton {...props} />
        case "warning":
            return <WarningButton {...props} />
        default:
            return <Button {...props} />
    }
}

export default CustomButton;
