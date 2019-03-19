import ManageUsers from 'views/Admin/ManageUsers.jsx'
import ManageRoles from 'views/Admin/ManageRoles.jsx'
import ManageLanguages from 'views/Admin/ManageLanguages.jsx'
import ManageDomains from 'views/Admin/ManageDomains.jsx'
import EditDomain from 'views/Admin/EditDomain.jsx'
import EditLanguage from 'views/Admin/EditLanguage.jsx'
import EditRole from 'views/Admin/EditRole.jsx'
import EditUser from 'views/Admin/EditUser.jsx'
import AddUser from 'views/Admin/AddUser.jsx'
import AddRole from 'views/Admin/AddRole.jsx'
import AddLanguage from 'views/Admin/AddLanguage.jsx'
import AddDomain from 'views/Admin/AddDomain.jsx'
import WeeklyPlanning from '../views/Planning/WeeklyPlanning'
import MonthlyPlanning from '../views/Planning/MonthlyPlanning'
import RecurringTasks from '../views/Planning/RecurringTasks'
import Absences from '../views/Planning/Absences'
import TaskFinder from '../views/Planning/TaskFinder'
import WorkingHours from '../views/Planning/WorkingHours'
import AddAbsence from '../views/Planning/AddAbsence'
import AddRecurringTasks from '../views/Planning/AddRecurringTasks'

const adminRoutes = [
  {
    path: "/manageusers",
    name: "Manage Users",
    component: ManageUsers,
  },
  {
    path: "/manageroles",
    name: "Manage Roles",
    component: ManageRoles,
  },
  {
    path: "/managelanguages",
    name: "Manage Languages",
    component: ManageLanguages,
  },
  {
    path: "/managedomains",
    name: "Manage Domains",
    component: ManageDomains,
  },
  {
    path: "/editdomain/:id",
    name: "Edit a domain",
    component: EditDomain,
  },
  {
    path: "/adddomain",
    name: "Add a domain",
    component: AddDomain,
  },
  {
    path: "/editlanguage/:id",
    name: "Edit a language",
    component: EditLanguage,
  },
  {
    path: "/addlanguage",
    name: "Add a language",
    component: AddLanguage,
  },
  {
    path: "/editrole/:id",
    name: "Edit a role",
    component: EditRole,
  },
  {
    path: "/addrole",
    name: "Add a role",
    component: AddRole,
  },
  {
    path: "/edituser/:id",
    name: "Edit a user",
    component: EditUser,
  },
  {
    path: "/adduser",
    name: "Add a user",
    component: AddUser,
  },
  {
    path: "/weeklyplanning",
    name: "Weekly Planning",
    component: WeeklyPlanning,
  },
  {
    path: "/monthlyplanning",
    name: "Monthly Planning",
    component: MonthlyPlanning,
  },
  {
    path: "/recurringtasks",
    name: "Recurring Tasks",
    component: RecurringTasks,
  },
  {
    path: "/absences",
    name: "Absences",
    component: Absences,
  },
  {
    path: "/taskfinder",
    name: "Task finder",
    component: TaskFinder,
  },
  {
    path: "/workinghours",
    name: "Working hours",
    component: WorkingHours,
  },
  {
    path: "/addabsence",
    name: "Add an absence",
    component: AddAbsence,
  },
  {
    path: "/recurringtask",
    name: "Add a Recurring Task",
    component: AddRecurringTasks,
  }
];

export default adminRoutes
