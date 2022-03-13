import { createContext, useContext,useEffect } from 'react'
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'
import lightTheme from '../../themes/light'
import darkTheme from '../../themes/dark'
import { useLocalStorage } from 'usehooks-ts'

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'


const ThemeContext = createContext()

const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ children }) => {

    const isDarkOS = useMediaQuery(DARK_SCHEME_QUERY)

    const [themeMode, setThemeMode] = useLocalStorage('themeMode', isDarkOS ? 'light' : 'dark')

    const toggleTheme = () => {
        switch (themeMode) {
            case 'light':
                setThemeMode('dark')
                break
            case 'dark':
                setThemeMode('light')
                break
            default:
        }
    }

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export {
    useThemeContext,
    ThemeProvider,
}