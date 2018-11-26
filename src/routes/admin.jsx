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

const adminRoutes = [
  {
    path: '/manageusers',
    name: 'Manage Users',
    component: ManageUsers,
  },
  {
    path: '/manageroles',
    name: 'Manage Roles',
    component: ManageRoles,
  },
  {
    path: '/managelanguages',
    name: 'Manage Languages',
    component: ManageLanguages,
  },
  {
    path: '/managedomains',
    name: 'Manage Domains',
    component: ManageDomains,
  },
  {
    path: '/editdomain',
    name: 'Edit a domain',
    component: EditDomain,
  },
  {
    path: '/adddomain',
    name: 'Add a domain',
    component: AddDomain,
  },
  {
    path: '/editlanguage',
    name: 'Edit a language',
    component: EditLanguage,
  },
  {
    path: '/addlanguage',
    name: 'Add a language',
    component: AddLanguage,
  },
  {
    path: '/editrole',
    name: 'Edit a role',
    component: EditRole,
  },
  {
    path: '/addrole',
    name: 'Add a role',
    component: AddRole,
  },
  {
    path: '/edituser',
    name: 'Edit a user',
    component: EditUser,
  },
  {
    path: '/adduser',
    name: 'Add a user',
    component: AddUser,
  },
];

export default adminRoutes
