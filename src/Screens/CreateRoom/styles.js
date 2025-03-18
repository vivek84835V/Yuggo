import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#8A56DD',
    padding: 20,
    justifyContent: 'center',
  },
  createBox: {
    backgroundColor:'rgba(255, 255, 255, 0.72)',
    padding: 20,
    borderRadius:10,
    alignItems: 'center',
  },
  TouchableIcon:{
    bottom:'28%',
  },
  createTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  createSubtitle: {
    fontSize: 14,
    color: '#111',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: 'black',
  },
});
export default styles;
