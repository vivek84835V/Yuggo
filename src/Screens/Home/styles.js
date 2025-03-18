import { StyleSheet } from 'react-native';
import { getFontFamily } from '../../../assets/fonts/helper';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  primarycontainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
btncontainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems: 'center',
},
  backButton: {
    marginTop:10,
    top:30,
    right:10,
    borderWidth:2,
    borderRadius:10,
    marginBottom: 50,
  },
  backText: {
    fontSize: 24,
    color: 'black',
  },
  linearcontainer:{
    bottom:10,
    borderWidth:2,
    borderRadius:30,
  },
  TouchableIcon:{
    alignContent:'center',
    margin:10,
  },
  txtcontainer:{
    alignContent:'center',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  Icon:{
    alignSelf:'center',
    bottom:1,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius:10,
    marginRight:10,
  },
  header: {
    fontSize: 20,
    top:10,
    left:10,
    textAlign:'center',
    alignSelf:'center',
    alignContent:'center',
    color: 'white',
    fontFamily:getFontFamily('Poppins','300'),
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  spaceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },
  spaceText: {
    flex: 1,
    marginLeft: 10,
  },
  spaceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  joinButton: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
  },
  loadingText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
  },
  noRoomsText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
  },
  forwardButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forwardText: {
    fontSize: 24,
    color: 'black',
  },
});

export default styles;
