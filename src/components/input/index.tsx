import { TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput| null>
}

export function Input ({ inputRef, ...rest }:Props){
    const {COLORS} = useTheme()/*Acessando minhas propriedades de temas fora do styled-component*/

    return(
        <Container
            ref={inputRef}
            placeholderTextColor={COLORS.GRAY_300}
            {...rest}
        />
    )
}