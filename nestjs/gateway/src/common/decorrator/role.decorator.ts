import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'ROLE_KEY';
export const Role = () => {
  return SetMetadata(ROLE_KEY, true);
};
