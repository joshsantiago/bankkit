export class UploadAvatarResponseDto {
  success: boolean;
  data: {
    avatarUrl: string;
  };
  message: string;
}
