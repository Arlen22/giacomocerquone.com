import Typography from "typography"
import oceanBeachTheme from "typography-theme-ocean-beach"

const linkColor = "#039be5"

oceanBeachTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  a: {
    color: linkColor,
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
  },
  "h1, h2, h3, h4, h5, h6": {
    marginTop: "1.5em",
    marginBottom: "0.8em",
  },
  h1: {
    color: "#555",
    fontSize: "3em",
  },
  h2: {
    color: "#777",
  },
  h3: {
    color: "#888",
  },
  p: {
    color: "#666",
  },
  "img, figure": {
    marginBottom: "0",
  },
})

const typography = new Typography(oceanBeachTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
