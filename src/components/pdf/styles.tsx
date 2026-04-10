import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '20px',

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: '5px',
    borderBottom: '1px',
    borderBottomColor: '#9616cc',
  },
  image :{
    with: 180,
    height: 60,
  },
  textheader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2px'
  },
  h1: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#9616cc',
  },
  h2: {
    fontSize: '6px',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: '6px',
  },
  text: {
    fontSize: '12px',
  },
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titles: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '16px',
    textDecoration: 'underline',
  },
  date: {
    flexDirection: 'row',
    gap: '300px',
    paddingBottom: '20px'
  },
  nom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px'
  },
  concerne: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  table: {
    padding: '20px',
  },
  th:{
    fontWeight: 'bold',
    fontSize: '12px',
    padding: '5px'
  },
  tr: {
    padding: '5px'
  },
  headtable: {
  },
  footer: {

  }
});