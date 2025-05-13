import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Groups } from '@screens/groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';

const {Navigator,Screen,Group } = createNativeStackNavigator();


//O headerShown é para fazer sumir o cabeçalho das rotas.
export function AppRoutes(){
    return(
        <Navigator screenOptions={{headerShown:false}}>
            <Screen
                name='groups'
                component={Groups}
            />

            <Screen
                name='NewGroup'
                component={NewGroup}
            />
            
            <Screen
                name='Players'
                component={Players}
            />
            
        </Navigator>
    )
}