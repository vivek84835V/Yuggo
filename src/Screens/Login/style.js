import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: '#fff',
  },
  titleContainer: {
    position: 'absolute',
    top: 80,
    left: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E0C3FC',
  },
  subtitle: {
    fontSize: 24,
    color: '#C299FC',
  },
  meteorIcon: {
    position: 'absolute',
    top: 120,
    right: 40,
  },
  meteorText: {
    fontSize: 40,
  },
  inputContainer: {
    marginVertical: 20,
    width: '80%',
  },
  inputLabel: {
    color: '#E0C3FC',
    marginBottom: 10,
  },
  glowWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#8A56DD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  input: {
    color: '#E0C3FC',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#44107A',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,

  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  footerLogo: {
    position: 'absolute',
    bottom: 40,
    fontSize: 18,
    color: '#C299FC',
  },
});

export default styles;
