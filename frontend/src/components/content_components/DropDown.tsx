import React, { useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider,
} from '@mui/material';
import { Logout, Settings, Edit, Notifications } from '@mui/icons-material';

interface DropDownProp {
	user: string;
	avatar: string;
}

export default function DropDown({
	user,
	avatar,
}: DropDownProp){
    
    //skal ændres
    const userImg = avatar

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  


    return(
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Avatar
          src={userImg}
          alt="User"
          onClick={handleClick}
          sx={{
            width: 56,
            height: 56,
            cursor: 'pointer',
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Typography
            variant="h6"
            sx={{ px: 2, pt: 1, pb: 0.5, fontWeight: 'bold' }}
          >
            {user}
          </Typography>
          
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Avatar src={userImg} sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Edit Profile
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Notifications fontSize="small" />
            </ListItemIcon>
            View Notifications
          </MenuItem>
          <MenuItem >
          Add More Subjects
        </MenuItem>
        <MenuItem>
          Become Tutee
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem>
          <Settings fontSize="small" sx={{ marginRight: '10px' }} />
          Settings
        </MenuItem>
        <MenuItem>
          <Logout fontSize="small" sx={{ marginRight: '10px', color: '#e74c3c' }} />
          Logout
        </MenuItem>
        </Menu>
      </div>

    );
}
