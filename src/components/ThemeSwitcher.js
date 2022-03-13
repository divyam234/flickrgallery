import { useThemeContext } from '../contexts/ThemeContext'
import { DarkModeOutlined, LightModeRounded } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

const ThemeSwitcherButton = ({ ...rest })=> {

    const { themeMode, toggleTheme } = useThemeContext()
    return (
        <Tooltip
            title={themeMode === 'light' ? `Switch to dark mode` : `Switch to light mode`}
        >
            <IconButton
                {...rest}
                onClick={toggleTheme}
            >
                {themeMode === 'light' ? <DarkModeOutlined /> : <LightModeRounded />}
            </IconButton>
        </Tooltip>
    )
}
export default ThemeSwitcherButton