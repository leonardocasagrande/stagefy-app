export enum MessageType {
  TextMessage = 'Text message',
  AnimationMessage = 'Animation message',
  Permission = 'Permission',
  PermissionConceded = 'Permission conceded',
  PermissionDenied = 'Permission denied',
  PermissionRevoked = 'Permission revoked',
}

export type MessageData = {
  id: string;
  type: MessageType;
  message: string;
  animation_link?: string;
  user: {
    name: string;
    avatar_url: string;
    id: string;
    uid?: number;
  };
};
