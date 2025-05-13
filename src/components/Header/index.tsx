import { useNavigation } from "@react-navigation/native";
import { Container, Logo, BackButton,BackIcon } from "./styles";

import logoImg from '@assets/logo.png'

type Props = {
    showBackbutton?: boolean
}

export function Header ({showBackbutton = false}:Props){

    const navigation = useNavigation()

    function handleGoBack (){
        navigation.navigate('groups')
    }


    return(
        <Container>
            {   showBackbutton && //O && significa que se for verdadeiro então mostre os itens abaixo.
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            }
            
            
            <Logo source={logoImg}/>
        </Container>
    )
}