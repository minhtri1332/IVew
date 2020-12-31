import {useRef} from 'react';
import {shallowEqual} from 'react-redux';

export const useHolder = () => {
  const holderRef = useRef<Record<string, any>>({});

  const createCallback = (key: string, fn: (...args: any[]) => any) => {
    holderRef.current[key] = fn;
    return holderRef.current[key];
  };

  const getMemoizedValue = <T>(key: string, fn: () => T, deps: any) => {
    if (!deps) {
      if (!holderRef.current[`_committed_${key}`]) {
        holderRef.current[`_result_${key}`] = fn();
        holderRef.current[`_committed_${key}`] = true;
      }
      return holderRef.current[`_result_${key}`];
    }

    if (shallowEqual(holderRef.current[`_deps_${key}`], deps)) {
      return holderRef.current[`_result_${key}`];
    } else {
      holderRef.current[`_deps_${key}`] = deps;
      holderRef.current[`_result_${key}`] = fn();
      return holderRef.current[`_result_${key}`];
    }
  };

  return {
    createCallback,
    getMemoizedValue,

    // aliases
    cC: createCallback,
    mV: getMemoizedValue,
  };
};

export default useHolder;
