import React from 'react';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  borderRadius: 8,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.secondary.main,
  padding: theme.spacing(2),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
}));

const UserProfile: React.FC = () => {

  const user = {
    name: 'Лим Владислав Евгеньевич',
    email: 'velim@edu.hse.ru',
    group: 'Студент',
    avatarUrl: '',
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <StyledCard>
        <StyledCardHeader
          avatar={
            user.avatarUrl ? (
              <Avatar
                alt={user.name}
                src={user.avatarUrl}
                sx={{ width: 56, height: 56 }}
              />
            ) : (
              <Avatar sx={{ bgcolor: 'gold', color: 'black', width: 56, height: 56 }}>
                {user.name.charAt(0)}
              </Avatar>
            )
          }
          title={
            <Typography variant="h5" component="div" color="secondary">
              {user.name}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle1" color="secondary">
              {user.group}
            </Typography>
          }
        />
        <StyledDivider />
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body1" color="secondary" fontWeight="bold">
                Email:
              </Typography>
              <Typography variant="body2" color="secondary">
                {user.email}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" color="secondary" fontWeight="bold">
                Описание:
              </Typography>
              <Typography variant="body2" color="secondary">
                Just a chill guy.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default UserProfile;
