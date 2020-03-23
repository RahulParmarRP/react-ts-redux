import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
import Album from '../Album/Album';

// Material Core Elements
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { MenuItem, InputBase, Button } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";

// Material Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import {
    makeStyles,
    useTheme,
    Theme,
    createStyles,
    fade
} from "@material-ui/core/styles";

// React Routing
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";

// Application styles
import useStyles from "./responsive-drawer-styles";
import mobileDrawerStyles from "./mobile-drawer-styles";
import { About } from "../About/About";
import VirtualizedList from "../FitnessCenter/FitnessCenter";
import Pricing from "../Pricing/Pricing";

// Application components
// import Products from "../products/products";
// import MainContent from "../main-content/main-content";
//import ShoppingCart from "../shopping-cart/shopping-cart";

const drawerWidth = 240;
const menuId = "primary-search-account-menu";

interface ResponsiveDrawerProps {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container?: Element;
}

export default function ResponsiveDrawer(props: ResponsiveDrawerProps) {

    const { container } = props;
    const classes = useStyles();

    const miniClasses = mobileDrawerStyles();

    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [
        mobileMoreAnchorEl,
        setMobileMoreAnchorEl
    ] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const menuId = "primary-search-account-menu";

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";

    const renderMobileMenu = (

        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    aria-label="show 4 new mails"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Badge badgeContent={4} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    // Drawer side navbar

    const drawer = (
        <div>
            <div className={classes.toolbar} />

            <List>
                {["FitnessCenters", "Filters", "Contact", "About1"].map(
                    (text, index) => (
                        <Link
                            to={"/" + text.toLowerCase()}
                            key={index}
                            className="SideNavLink"
                        >
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    )
                )}
            </List>
        </div>
    );

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    // On menu click render menu for desktop view
    function handleMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    return (
        <div className={classes.root}>
            <Hidden smUp implementation="css">
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

                        <Typography variant="h6" noWrap>
                            Responsive
                        </Typography>

                        {/* search input */}
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>

                        <div className={miniClasses.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>

                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                <Router>
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === "rtl" ? "right" : "left"}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />

                        <Switch>
                            <Route exact path="/fitnesscenters" />
                            {/* <Route exact path="/products" render={()=><Product products={products}> </Product>} */}
                            {/*For history match of Route <Route exact path="/products" render={(props)=><Product products={products}> </Product>}  {...props}*/}
                            <Route exact path="/contact" component={About} />
                        </Switch>
                    </main>
                </Router>
            </Hidden>
            <Hidden xsDown implementation="css">
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(miniClasses.appBar, {
                        [miniClasses.appBarShift]: open
                    })}
                >
                    <Toolbar>

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={open ? handleDrawerClose : handleDrawerOpen}
                            edge="start"
                        //   className={clsx(miniClasses.menuButton, {
                        //     [miniClasses.hide]: open
                        //   })}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" noWrap>
                            Mini variant
                            </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>

                        {/* Desktop section */}
                        <div className={classes.sectionDesktop}>

                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>

                            <IconButton
                                aria-label="show 4 new mails"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                color="inherit"
                            >
                                <Badge badgeContent={4} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>

                            {/* <ShoppingCart /> */}
                            <IconButton
                                aria-label="show 17 new notifications"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>

                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                            <Link to="/login">
                                <Button variant="contained" color="secondary">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="contained" color="secondary">
                                    SignUp
                                </Button>
                            </Link>

                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                <Router>
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        <Drawer
                            variant="permanent"
                            className={clsx(miniClasses.drawer, {
                                [miniClasses.drawerOpen]: open,
                                [miniClasses.drawerClose]: !open
                            })}
                            classes={{
                                paper: clsx({
                                    [miniClasses.drawerOpen]: open,
                                    [miniClasses.drawerClose]: !open
                                })
                            }}
                            open={open}
                        >
                            <div className={miniClasses.toolbar}></div>
                            {/* <Divider /> */}
                            {drawer}
                        </Drawer>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path="/about1">
                                <About name="Inside Dashboard" />
                            </Route>
                            <Route exact path="/pricing" component={Pricing} />
                            {/* <Route exact path="/products" render={()=><Product products={products}> </Product>} */}
                            {/*For history match of Route <Route exact path="/products" render={(props)=><Product products={products}> </Product>}  {...props}*/}
                            <Route exact path="/fitnesscenters/:fitnessCenterId" component={VirtualizedList} />
                            <Route exact path="/contact" component={About} />
                            <Route exact path="/fitnesscenters" component={Album} />
                            <Redirect exact from="/" to="/fitnesscenters" />
                        </Switch>
                    </main>
                </Router>

            </Hidden>
        </div>
    );
}