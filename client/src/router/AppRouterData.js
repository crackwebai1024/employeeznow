
import Home from '@views/Home';
import Signup from '@views/Auth/Signup/Signup';
import Login from '@views/Auth/Login/Login';
import PhoneVerification from '@views/Auth/Signup/PhoneVerification';
import EmployerForm from '@views/Auth/Signup/EmployerForm';
import EmployeeForm from '@views/Auth/Signup/EmployeeForm';
import EmployerAccount from '@views/Employee/Dashboard/EmployeeAccount';
import Dashbaord from '@views/Employee/Dashboard/Dashboard';
import SkillsForm from '@views/Employee/form/SkillsForm';
import ProfessionDetailsForm from '@views/Employee/form/ProfessionDetailsForm';
import { getUser } from '@helpers/auth-helpers';

const user = JSON.parse(getUser())

export const AppRouterData = [
  { "path": "/", component: Home },
  { "path": "/signup", component: Signup },
  { "path": "/signup/phoneverify", component: PhoneVerification },
  { "path": "/signup/employer", component: EmployerForm },
  { "path": "/signup/employee", component: EmployeeForm },
  { "path": "/login", component: Login },
  // { "path": "/", component: Home },
]

export const AppPrivateRouterData = [
  { 'path': `/employee/${user && user.slug}/account`, component: EmployerAccount },
  { 'path': `/employees/${user && user.slug}`, component: Dashbaord },
  { 'path': "/skills", component: SkillsForm },
  { 'path': "/professiondetails-form", component: ProfessionDetailsForm },
  // { 'path': "", component: Dashbaord }
]
