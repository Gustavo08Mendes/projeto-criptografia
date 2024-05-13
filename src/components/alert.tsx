import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import { keyframes } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

export default function CustomAnimatedSnackbar(props: any) {
  const [open, setOpen] = React.useState(false);

  const animationDuration = 400;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="neutral" onClick={handleClick} sx={{ border: 'none', px: 0.1, '&:hover': { bgcolor: 'transparent' } }}>
      <ContentCopyIcon /> 
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="outlined"
        color='success'
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        animationDuration={animationDuration}
        sx={{
          ...(open && {
            animation: `${inAnimation} ${animationDuration}ms forwards`,
          }),
          ...(!open && {
            animation: `${outAnimation} ${animationDuration}ms forwards`,
          }),
        }}
      >
        {props.message}
      </Snackbar>
    </div>
  );
}