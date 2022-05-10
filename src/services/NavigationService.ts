import {NavigationProp} from '@react-navigation/native';

class NavigationService {
  navigator: NavigationProp<any> | undefined = undefined;

  logout = () => {
    if (this.navigator) {
      this.navigator.reset({
        index: 0,
        routes: [{name: 'Preload'}],
      });
    }
  };
}

export default new NavigationService();
