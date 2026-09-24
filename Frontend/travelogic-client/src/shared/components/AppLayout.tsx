import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined'
import {
  AppBar,
  Box,
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ColorModeToggle } from '../../app/theme/ColorModeProvider'

const drawerWidth = 240

const navItems = [
  { to: '/', label: 'Home', icon: <HomeOutlinedIcon /> },
  { to: '/suppliers', label: 'Suppliers', icon: <BusinessOutlinedIcon /> },
  { to: '/services', label: 'Services', icon: <MiscellaneousServicesOutlinedIcon /> },
]

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawer = (
    <Box sx={{ pt: 2 }}>
      <Typography variant="overline" sx={{ px: 3, color: 'text.secondary' }}>
        Menu
      </Typography>
      <List sx={{ px: 1 }}>
        {navItems.map((item) => {
          const selected =
            item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to)

          return (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              selected={selected}
              onClick={() => setMobileOpen(false)}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          {isMobile ? (
            <Typography
              variant="subtitle2"
              sx={{ mr: 2, cursor: 'pointer' }}
              onClick={() => setMobileOpen((open) => !open)}
            >
              Menu
            </Typography>
          ) : null}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Travelogic
          </Typography>
          <ColorModeToggle />
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                mt: '64px',
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                mt: '64px',
                borderRight: 1,
                borderColor: 'divider',
                bgcolor: 'background.default',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          py: 4,
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  )
}
