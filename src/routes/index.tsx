import {NavigationContainer} from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { View } from 'react-native'
import { useTheme } from 'styled-components/native'


//Aqui é o Core da minha navegação.


export function Routes (){

    const {COLORS} = useTheme();

    return(
        <View style={{flex:1, backgroundColor:COLORS.GRAY_600}}>
            <NavigationContainer>
                <AppRoutes/>
            </NavigationContainer>
        </View>
    )
}

/*Coloquei uma view com essar cor para que o glitch de cores entre rotas não aparecesse */