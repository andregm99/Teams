import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";//coloco native para especificar que é para mobile


export const Container = styled(SafeAreaView)`
flex: 1;
background-color: ${({theme})=> theme.COLORS.GRAY_400};
padding: 24px;
`

