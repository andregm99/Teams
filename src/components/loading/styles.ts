
import styled from "styled-components/native";//coloco native para especificar que é para mobile


export const Container = styled.View`
flex: 1;
align-items: center;
justify-content: center;
background-color: ${({theme})=> theme.COLORS.GRAY_600};
`

export const LoadIndicator = styled.ActivityIndicator.attrs(({theme})=>({
    color: theme.COLORS.GREEN_700
}))``