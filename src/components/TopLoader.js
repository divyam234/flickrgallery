import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: 'transparent',
        height: '4px',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'dark' ? '#fff' : 'default'
     }
  }));

  const LinearProgressPar = styled(Box)(({ theme }) => ({
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.drawer + 2,
  }));

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <LinearProgressPar>
      <BorderLinearProgress variant="determinate" value={progress} />
    </LinearProgressPar>
  );
}