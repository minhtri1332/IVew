declare type RootState = ReturnType<
  typeof import('./src/store')['store']['getState']
>;

declare module 'react-redux' {
  export * from 'react-redux/index';
  export function useSelector<TSelected = unknown>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected;
}
