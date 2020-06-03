import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/Chat';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import { NavLink } from "react-router-dom";
import { ChatsLink } from './ChatsLink';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},
		appBar: {
			// boxShadow: `0px -40px 0px 0px ${theme.palette.primary.main}`,
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		appBarTitle: {
			display: 'none',
			// [theme.breakpoints.up('sm')]: {
			// },
		},
		// necessary for content to be below app bar
		toolbar: {
			...theme.mixins.toolbar,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontWeight: 900,
		},
		drawerPaper: {
			width: '70%',
			minWidth: drawerWidth,
			maxWidth: '100%',
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				minWidth: 'auto',
				maxWidth: 'auto',
			},
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			// paddingTop: theme.spacing(1),
			// [theme.breakpoints.up('sm')]: {
			// 	paddingTop: 0,
			// },
		},
		grow: {
			flexGrow: 1,
		},
	}),
);


const ListItemNavLink = (Props) => (
	<ListItem
		button
		onClick={Props.onClick}
		component={NavLink}
		activeClassName="Mui-selected"
		to={Props.to}
		exact
	>
		<ListItemIcon><Props.Icon /></ListItemIcon>
		<ListItemText primary={Props.title} />
	</ListItem>
);

export interface NavigationProps {
	user: {
		firstName: string;
		middleName: string;
		lastName: string;
	}
}

export function Navigation(props: NavigationProps) {
	const classes = useStyles();
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = React.useCallback(() => {
		setMobileOpen(!mobileOpen);
	}, [mobileOpen]);

	const handleDrawerClose = React.useCallback(() => {
		setMobileOpen(false);
	}, []);

	const drawer = (
		<div>
			<div className={classes.toolbar}>
				<Typography variant="h6">
					Студпост
				</Typography>
			</div>
			<Divider />
			<List>
				<ListItemNavLink onClick={handleDrawerClose} to="/" title="Головна" Icon={DashboardIcon} />
				{/*<ListItemNavLink onClick={handleDrawerClose} to="/chat" title="Чати" Icon={ChatIcon} />*/}
				<ChatsLink onClick={handleDrawerClose} />
				<ListItemNavLink onClick={handleDrawerClose} to="/schedule" title="Розклад занять" Icon={ScheduleIcon} />
				<ListItemNavLink onClick={handleDrawerClose} to="/students" title="Студенти" Icon={PeopleIcon} />
				<ListItemNavLink onClick={handleDrawerClose} to="/academics" title="Викладачі" Icon={PeopleAltIcon} />
			</List>
			{/*<Divider />
			<List>
				<ListItemNavLink onClick={handleDrawerClose} to="/settings" title="Налаштування" Icon={SettingsIcon} />
			</List>*/}
		</div>
	);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{/*<MenuItem onClick={handleMenuClose} component={NavLink} to="/profile" exact>Профіль</MenuItem>*/}
			<MenuItem onClick={handleMenuClose}>Вихід</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap className={classes.appBarTitle}>
						Студпост
					</Typography>
					<div className={classes.grow} />
					<strong onClick={handleProfileMenuOpen}>{props.user.firstName} {props.user.lastName}</strong>
					<IconButton
						edge="end"
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="inherit"
					>
						{/*<AccountCircle />*/}
						<Avatar alt="Avatar" src="https://material-ui.com/static/images/avatar/1.jpg" />
					</IconButton>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}
			</main>
			{renderMenu}
		</div>
	);
}