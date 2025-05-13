import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Groups } from '@screens/groups';
import  theme from './src/theme'
import {useFonts,Roboto_400Regular,Roboto_700Bold} from '@expo-google-fonts/roboto'
import { Loading } from '@components/loading';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';
import { Routes } from 'src/routes';

export default function App() {

 const [fontsLoaded]= useFonts({Roboto_400Regular,Roboto_700Bold})//Passando as fontes que quero carregar.

 /*O carregamento de fontes é assíncrono, e por isso tenho que me certificar que quando minha aplicação
 carregar as fontes estarão carregadas. 
 
 --O fontsLoaded é um valor boleano que irá verificar se as minhas fontes estão carregadas
 */
  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
      />
      {fontsLoaded ?  <Routes/> : <Loading/>}
    </ThemeProvider>
  );
}

