import React, {
  memo,
  PropsWithChildren,
  ReactNode,
  useLayoutEffect,
  useRef,
  useMemo,
  useImperativeHandle,
  useContext,
  useEffect,
} from 'react';
import {
  Transition,
  Transitioning,
  TransitioningView,
  TransitioningViewProps,
} from 'react-native-reanimated';
import values from 'lodash/values';
import {Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export interface ITransitionRoutingContext {
  getCurrentTransitionKey: () => string | undefined;
  onMount: (transitionKey: string) => void;
  onFocus: (transitionKey: string) => void;
  onUnmount: (transitionKey: string) => void;
}

const TransitionRoutingContext = React.createContext<ITransitionRoutingContext>(
  {
    getCurrentTransitionKey: () => undefined,
    onMount: () => {},
    onFocus: () => {},
    onUnmount: () => {},
  },
);

const TransitionRoutingProvider = ({children}: PropsWithChildren<any>) => {
  const transitionKeyRef = useRef<string | undefined>(undefined);
  const contextValue = useMemo<ITransitionRoutingContext>(
    () => ({
      getCurrentTransitionKey: () => transitionKeyRef.current,
      onMount: (transitionKey: string) =>
        (transitionKeyRef.current = transitionKey),
      onFocus: (transitionKey: string) =>
        (transitionKeyRef.current = transitionKey),
      onUnmount: (transitionKey: string) => {
        if (transitionKeyRef.current === transitionKey) {
          transitionKeyRef.current = undefined;
        }
      },
    }),
    [],
  );

  return (
    <TransitionRoutingContext.Provider value={contextValue}>
      {children}
    </TransitionRoutingContext.Provider>
  );
};

const defaultTransition = (
  <Transition.Sequence>
    <Transition.Out type="fade" interpolation="linear" durationMs={250} />
    <Transition.Change interpolation="linear" durationMs={250} />
    <Transition.In type="fade" interpolation="linear" durationMs={250} />
  </Transition.Sequence>
);

const listTransition = (
  <Transition.Sequence>
    {Platform.OS === 'ios' && (
      <Transition.Out type="fade" interpolation="linear" durationMs={250} />
    )}
    <Transition.Change interpolation="linear" durationMs={250} />
    <Transition.In type="fade" durationMs={250} />
  </Transition.Sequence>
);

export interface ITransitionContext {
  next: () => void;
}

const TransitionContext = React.createContext<ITransitionContext>({
  next: () => {},
});

interface Props extends Omit<TransitioningViewProps, 'transition'> {
  transition?: any;
  transitionKey?: string;
}

const ForwardRefControlTransitionView = React.forwardRef<
  TransitioningView,
  any
>(
  (
    {children, transition, transitionKey, ...props}: PropsWithChildren<Props>,
    ref,
  ) => {
    return (
      <Transitioning.View
        {...props}
        transition={transition ? transition : defaultTransition}
        ref={ref}>
        {children}
      </Transitioning.View>
    );
  },
);

const ControlTransitionView = memo(ForwardRefControlTransitionView);

interface CommonProps extends Omit<TransitioningViewProps, 'transition'> {
  transitionKey?: string;
  transition?: ReactNode;
  [key: string]: any;
}

//Auto trigger transition animation if props change
const CommonTransitionView = memo(
  ({
    children,
    transition,
    transitionKey,
    ...props
  }: PropsWithChildren<CommonProps>) => {
    const transitionRef = useRef<TransitioningView>(null);
    const property = values(props);

    const {onMount, onUnmount, onFocus, getCurrentTransitionKey} = useContext(
      TransitionRoutingContext,
    );

    useFocusEffect(() => {
      if (typeof transitionKey === 'string') {
        onFocus(transitionKey);
      }
    });

    useEffect(() => {
      if (typeof transitionKey === 'string') {
        onMount(transitionKey);
      }
      return () => {
        if (typeof transitionKey === 'string') {
          onUnmount(transitionKey);
        }
      };
    }, []);

    useLayoutEffect(() => {
      const currentKey = getCurrentTransitionKey();
      if (!currentKey || !transitionKey || transitionKey === currentKey) {
        if (transitionRef.current) {
          transitionRef.current.animateNextTransition();
        }
      }
    }, property);

    return (
      <Transitioning.View
        {...props}
        {...{
          transition: transition ? transition : defaultTransition,
          ref: transitionRef,
        }}>
        {children}
      </Transitioning.View>
    );
  },
);

//Auto trigger transition animation if props change
//Skip trigger {skip value} times
const useTransitionViewController = ({skip, ...props}: any) => {
  const skipped = useRef<number>(0);
  const {next} = useContext(TransitionContext);
  const property = values(props);
  useLayoutEffect(() => {
    if (!skip || skipped.current >= skip) {
      next();
    } else {
      skipped.current = skipped.current + 1;
    }
  }, property);
};

const TransitionViewController = memo((props: any) => {
  useTransitionViewController(props);

  return null;
});

const defaultNextTransition = (
  <Transition.Sequence>
    {Platform.OS === 'ios' && (
      <Transition.Out type="fade" interpolation="easeInOut" durationMs={250} />
    )}
    <Transition.Change interpolation="easeInOut" durationMs={250} />
    <Transition.In type="fade" interpolation="easeInOut" durationMs={250} />
  </Transition.Sequence>
);

//next() via ref or TransitionViewController
const FRTransitionContextView = React.forwardRef<
  ITransitionContext,
  PropsWithChildren<Props>
>((props: PropsWithChildren<Props>, ref) => {
  const {transitionKey} = props;
  const {onMount, onUnmount, onFocus, getCurrentTransitionKey} = useContext(
    TransitionRoutingContext,
  );

  useFocusEffect(() => {
    if (typeof transitionKey === 'string') {
      onFocus(transitionKey);
    }
  });

  useEffect(() => {
    if (typeof transitionKey === 'string') {
      onMount(transitionKey);
    }
    return () => {
      if (typeof transitionKey === 'string') {
        onUnmount(transitionKey);
      }
    };
  }, []);

  const transitionRef = useRef<TransitioningView>(null);
  const contextValue = useMemo<ITransitionContext>(
    () => ({
      next: () => {
        const currentKey = getCurrentTransitionKey();
        if (!currentKey || !transitionKey || transitionKey === currentKey) {
          if (transitionRef.current) {
            transitionRef.current.animateNextTransition();
          }
        }
      },
    }),
    [],
  );

  useImperativeHandle(ref, () => contextValue);

  return (
    <TransitionContext.Provider value={contextValue}>
      <ControlTransitionView
        {...props}
        ref={transitionRef}
        transition={props.transition ? props.transition : defaultNextTransition}
      />
    </TransitionContext.Provider>
  );
});

const TransitionContextView = memo(FRTransitionContextView);

export {
  TransitionContextView,
  TransitionRoutingProvider,
  TransitionContext,
  listTransition,
  CommonTransitionView,
  TransitionViewController,
  useTransitionViewController,
};
