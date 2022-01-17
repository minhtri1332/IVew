import {check, Permission} from 'react-native-permissions';
import {useAsync} from '@/global';
import {useAppState} from '@react-native-community/hooks';

export const usePermission = (
  permission: Permission,
  deps?: any[],
): undefined | 'unavailable' | 'denied' | 'blocked' | 'granted' => {
  const appState = useAppState();

  const {value} = useAsync(
    () => check(permission),
    [permission, appState, ...(deps || [])],
  );

  return value;
};

export default usePermission;
