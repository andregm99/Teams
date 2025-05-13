import { Name,Container,Icon } from "./styles"; 
import { ButtonIcon } from "@components/ButtonIcon";


type Props ={
    name:string
    OnRemove:()=> void
}

export function PlayerCard ({name,OnRemove}:Props){
    return(
        <Container >
            <Icon 
                name="person"
            />

            <Name>
                {name}
            </Name>

            <ButtonIcon
                icon="close"
                type="SECONDARY"
                onPress={OnRemove}
            />

        </Container>
    )
}