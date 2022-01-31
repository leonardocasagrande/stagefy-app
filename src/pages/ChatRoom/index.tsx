import React from 'react';
import ProfessionalStreamRoom from '../../components/ProfessionalStreamRoom';
import UserStreamRoom from '../../components/UserStreamRoom';
import { useAuth } from '../../context/auth';
import { ProfileRoleEnum } from '../../models/role';

const ChatRoom: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.profileRole === ProfileRoleEnum.Professional ? (
        <ProfessionalStreamRoom />
      ) : (
        <UserStreamRoom />
      )}
    </>
  );
};

export default ChatRoom;
