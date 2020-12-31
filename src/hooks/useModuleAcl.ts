import {useMemo} from 'react';
import {useAcl, RawAcl} from '@/store/acl';

const SYS_OWNER = 10;

export const useIsModuleOwner = (moduleName: keyof RawAcl) => {
  const [acl] = useAcl();
  return useMemo(() => acl && acl[moduleName] === SYS_OWNER, [acl, moduleName]);
};
