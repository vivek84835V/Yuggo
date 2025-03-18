import 'react-native-gesture-handler';
import 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
