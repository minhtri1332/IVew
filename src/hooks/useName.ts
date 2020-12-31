import {useMemo} from 'react';
import {translate} from '@/global';
import {usePosition} from '@/store/positions';
import {useOffice} from '@/store/offices';
import {useEmployee, useEmployeeType} from '@/store/employees';
import {useArea} from '@/store/areas';
import {useTimesheet} from '@/store/timesheets';
import {useCareerPolicy} from '@/store/policies';
import {useUser} from '@base/core';

export const usePositionName = (
  id: string | undefined,
  unknownTitle: string = 'career.unknown_position',
) => {
  const origin = usePosition(id);
  const name = useMemo(() => {
    if (origin) {
      return origin.name;
    }
    return translate(unknownTitle);
  }, [origin, unknownTitle]);
  return {origin, name};
};

export const useOfficeName = (
  id: string | undefined,
  unknownTitle: string = 'career.unknown_office',
) => {
  const origin = useOffice(id);
  const name = useMemo(() => {
    if (origin) {
      return origin.name;
    }
    return translate(unknownTitle);
  }, [origin, unknownTitle]);
  return {origin, name};
};

export const useEmployeeTypeName = (
  id: string | undefined,
  unknownTitle: string = 'career.unknown_employee_type',
) => {
  const origin = useEmployeeType(id);
  const name = useMemo(() => {
    if (origin) {
      return origin.name;
    }
    return translate(unknownTitle);
  }, [origin, unknownTitle]);
  return {origin, name};
};

export const useAreaName = (
  id: string | undefined,
  unknownTitle: string = 'career.unknown_area',
) => {
  const origin = useArea(id);
  const name = useMemo(() => {
    if (origin) {
      return origin.name;
    }
    return translate(unknownTitle);
  }, [origin, unknownTitle]);
  return {origin, name};
};

export const useTimeSheetName = (
  id: string | undefined,
  unknownTitle: string = 'career.unknown_timesheet',
) => {
  const origin = useTimesheet(id);
  const name = useMemo(() => {
    if (origin) {
      return origin.name;
    }
    return translate(unknownTitle);
  }, [origin, unknownTitle]);
  return {origin, name};
};

export const useCareerPolicyName = (
  id: string | undefined,
  unknownTitle: string = 'common.no_information',
) => {
  const origin = useCareerPolicy(id);
  const name = useMemo(() => {
    if (origin) {
      return origin.name;
    }
    return translate(unknownTitle);
  }, [origin, unknownTitle]);
  return {origin, name};
};

export const useFullNameByEmployeeId = (id: string | undefined) => {
  const employee = useEmployee(id);
  const user = useUser(employee?.user_id);
  return user?.name;
};
