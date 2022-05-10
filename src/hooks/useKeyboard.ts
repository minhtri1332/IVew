import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export enum KeyboardState {
    SHOWING = 'showing',
    SHOWN = 'shown',
    HIDING = 'hiding',
    HIDEN = 'hiden'
}

const useKeyboard = () => {
    const [keyboardState, setKeyboardState] = useState(KeyboardState.HIDEN);

    useEffect(() => {
        const willHide = Keyboard.addListener('keyboardWillHide', () =>
            setKeyboardState(KeyboardState.HIDING)
        );
        const didHide = Keyboard.addListener('keyboardDidHide', () =>
            setKeyboardState(KeyboardState.HIDEN)
        );
        const willShow = Keyboard.addListener('keyboardWillShow', () =>
            setKeyboardState(KeyboardState.SHOWING)
        );
        const didShow = Keyboard.addListener('keyboardDidShow', () =>
            setKeyboardState(KeyboardState.SHOWN)
        );

        return () => {
            willHide.remove();
            didHide.remove();
            willShow.remove();
            didShow.remove();
        }
    }, []);

    return {
        keyboardState,
        dismiss: Keyboard.dismiss
    }
};

export default useKeyboard;
