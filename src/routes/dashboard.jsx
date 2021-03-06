import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";
import TranslationRequests from "views/TranslationRequests/TranslationRequests";
import MyAvailability from "../views/MyAvailability/MyAvailablility";
import Admin from "../views/Admin/Admin";
import Converter from '../views/Converter/Converter.jsx'
import MainPlanning from '../views/Planning/MainPlanning'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
  },
  { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
  },
  {
    path: "/translationrequests",
    name: "Translation Requests",
    icon: "pe-7s-help1",
    component: TranslationRequests,
  },
  {
    path: "/mainplanning",
    name: "Planning",
    icon: "pe-7s-timer",
    component: MainPlanning,
  },
  {
    path: "/converter",
    name: "Converter",
    icon: "pe-7s-help1",
    component: Converter,
  },
  {
    path: "/myavailability",
    name: "My Availability",
    icon: "pe-7s-angle-down-circle",
    component: MyAvailability,
  },
  {
    path: "/admin",
    name: "Admin",
    icon: "pe-7s-angle-down-circle",
    component: Admin,
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade,
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" },
];



export default dashboardRoutes;
