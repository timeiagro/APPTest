const theme = {
    colors: {
        defaultBg: "#FFF",
        primary: "#4650c7",
        default: "#313233",
        default8: '#595a5a', 
        default6: '#818182',
        default4: '#a8a9a9',
        default2: '#d0d0d1',
        default1: '#e4e4e4',
        borderColor: '#d9d9d9',
        receita: '#155724',
        despesa: '#721c24'
    },
    baseContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#efefef'
    },
    shadow: {
        shadowColor: "#616161",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 1,
    },
}

const StackScreen = {
    headerTitleAlign: 'left',
    headerTitleStyle: { fontSize: 18, color: theme.colors.default, fontWeight: 'bold' ,overflow: 'hidden' },
    headerStyle: { 
        height: 95, 
        backgroundColor: '#FFF', 
        shadowColor: 'transparent',
        shadowRadius: 0,
        elevation: 0,
    },      
    headerBackTitle: "",
    cardOverlayEnabled: true,
    cardShadowEnabled: true,
    cardStyle: {
        backgroundColor: theme.colors.defaultBg
    }
}


export {
    theme,
    StackScreen
}