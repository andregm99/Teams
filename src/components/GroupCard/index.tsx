import {TouchableOpacityProps} from 'react-native'//importando propriedades do touchableOpacity 
import { Container, Icon, Title } from "./styles";

type Props = TouchableOpacityProps & {/*Este tipo será igual a touchableopacityprops e do tipo string */
    title:string
}

/*Importei o touchableopacityprops para que o container tenha as caracteristicas de um botão. 

...rest estou dizendo que peque qualquer outra nova tipagem criada.
*/

export function GroupCard ({title, ...rest}:Props){
    return(
        <Container {...rest}>
            <Icon/>
            <Title>
                {title}
            </Title>
        </Container>
    )
}


