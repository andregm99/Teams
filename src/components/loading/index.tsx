import { Container,LoadIndicator } from "./styles";

export function Loading (){
    return(
        <Container>
            <LoadIndicator color={'yellow'}/>
        </Container>
    )
}