export declare global {
    namespace ReactNavigation {
        interface RootParamList{
            groups: undefined; /*Aqui defino a rota e o parâmetro */
            NewGroup: undefined;
            Players: {
                group :string
            }
        }
    }
}

/*Como na rota groups e NewGroup não tenho parâmetros podemos colocar undefined

  --Na rota Players eu espero um parâmetro por isso passei o mesmo.

  -- Não se deve passar muitos parâmetros entre rotas por uma questão de performance.
*/