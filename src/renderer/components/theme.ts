import { createMuiTheme } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import createTypography from '@material-ui/core/styles/createTypography'
import createPalette from '@material-ui/core/styles/createPalette'

const palette = createPalette({
  primary: purple,
  type: 'dark',
  background: {
    default: '#616161',
  },
})

const typography = createTypography(palette, { fontFamily: ['Sintony', 'Share Tech Mono'].join(',') })

export default createMuiTheme({
  palette,
  typography,
  spacing: 2,
})
