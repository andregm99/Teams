import styled from "styled-components/native";
import theme from "src/theme";

declare module 'styled-components/native' {
    type ThemeType = typeof theme;

    export interface DefaultTheme extends ThemeType { }
}

//tipando o meu arquivo theme