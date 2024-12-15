export const ROLES = {
  prodi: 'prodi',
  p2mpp: 'p2mpp',
  wd1: 'wd1',
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];
