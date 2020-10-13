
import Home from '@views/Home';
import Signup from '@views/Auth/Signup/Signup';
import Login from '@views/Auth/Login/Login';
import PhoneVerification from '@views/Auth/Signup/PhoneVerification';
import EmailVerification from '@views/Auth/Signup/EmailVerification';
import EmployerForm from '@views/Auth/Signup/EmployerForm';
import EmployeeForm from '@views/Auth/Signup/EmployeeForm';
import EmployeeAccount from '@views/Employee/Dashboard/EmployeeAccount';
import EmployeeDashbaord from '@views/Employee/Dashboard/Dashboard';
import EmployerDashbaord from '@views/Employer/dashboard/DashboardEmployer';
import SkillsForm from '@views/Employee/form/SkillsForm';
import ProfessionDetailsForm from '@views/Employee/form/ProfessionDetailsForm';
import ExperienceForm from '@views/Employee/form/ExperienceForm';
import { getUser } from '@helpers/auth-helpers';

const user = JSON.parse(getUser())

export const AppRouterData = [
  { "path": "/", component: Home },
  { "path": "/signup", component: Signup },
  { "path": "/signup/phoneverify", component: PhoneVerification },
  { "path": "/signup/employer", component: EmployerForm },
  { "path": "/signup/emailverify", component: EmailVerification },
  { "path": "/signup/employee", component: EmployeeForm },
  { "path": "/login", component: Login },
  // { "path": "/", component: Home },
]

export const AppPrivateRouterData = [
  { "path": "/", component: Home },
  { 'path': `/employee/${user && user.slug}/account`, component: EmployeeAccount },
  { 'path': `/employees/${user && user.slug}`, component: EmployeeDashbaord },
  { 'path': `/employers/${user && user.slug}`, component: EmployerDashbaord },
  { 'path': `/${user && user.slug}/skills`, component: SkillsForm },
  { 'path': `/${user && user.slug}/professiondetails-form`, component: ProfessionDetailsForm },
  { 'path': `/${user && user.slug}/work-experience`, component: ExperienceForm },
  // { 'path': "", component: Dashbaord }
]
