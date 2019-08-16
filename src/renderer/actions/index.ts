import { CmdrStateAction } from './cmdrStateActions';

export type RootActions = CmdrStateAction[keyof CmdrStateAction];
