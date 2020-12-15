import Home from "@views/Home";
import LearnMore from "@views/LearnMore";
import Signup from "@views/Auth/Signup/Signup";
import Login from "@views/Auth/Login/Login";
import PhoneVerification from "@views/Auth/Signup/PhoneVerification";
import EmailVerification from "@views/Auth/Signup/EmailVerification";
import EmployerForm from "@views/Auth/Signup/EmployerForm";
import EmployeeForm from "@views/Auth/Signup/EmployeeForm";
import EmployeeAccount from "@views/Employee/Dashboard/EmployeeAccount";
import EmployerAccount from "@views/Employer/form/EditEmployerAccountForm";
import EmployeeDashbaord from "@views/Employee/Dashboard/Dashboard";
import DashboardCandidate from "@views/Employer/candidate/DashboardCandidate";
import EmployerDashbaord from "@views/Employer/dashboard/DashboardEmployer";
import SkillsForm from "@views/Employee/form/SkillsForm";
import ProfessionDetailsForm from "@views/Employee/form/ProfessionDetailsForm";
import WorkHistory from "@views/Employee/form/WorkHistory";
import ForgotPassword from "@views/Auth/Password/ForgotPasswordForm";
import ResetPasswordForm from "@views/Auth/Password/ResetPasswordForm";
import SearchResults from "@views/Employer/SearchResult/SearchResults";
import Interest from "@views/Pages/Interest";
import NoInterest from "@views/Pages/NoInterest";
import Payment from "@views/Employer/Payment/Payment";
import { getUser } from "@helpers/auth-helpers";
import Contact from "@views/Contact";
import CartList from "@views/Employer/cart/CartList";
import Purchased from "@views/Employer/purchased";
import Contest from "@views/Contest";

const user = JSON.parse(getUser());

export const AppRouterData = [
  { path: "/", component: Home },
  { path: "/contest", component: Contest },
  { path: "/about", component: LearnMore },
  { path: "/resetpassword/:slug", component: ResetPasswordForm },
  { path: "/signup", component: Signup },
  { path: "/signup/phoneverify", component: PhoneVerification },
  { path: "/signup/employer", component: EmployerForm },
  { path: "/signup/emailverify", component: EmailVerification },
  { path: "/signup/employee", component: EmployeeForm },
  { path: "/login", component: Login },
  { path: `/forgotPassword`, component: ForgotPassword },
  { path: `/contactus`, component: Contact },
  { path: `/test`, component: PhoneVerification },
  { path: `/sendmail/employerint/:slug`, component: Interest },
  { path: `/sendmail/employernoint/:slug`, component: NoInterest },
];

export const AppPrivateRouterEmployerData = [
  { path: "/", component: Home },
  { path: "/about", component: LearnMore },
  { path: "/search/:slug", component: SearchResults },
  { path: `/employers/${user && user.slug}`, component: EmployerDashbaord },
  {
    path: `/employers/${user && user.slug}/account`,
    component: EmployerAccount,
  },
  { path: `/candidate/:slug`, component: DashboardCandidate },
  { path: `/payment/:slug`, component: Payment },
  { path: `/contactus`, component: Contact },
  { path: "/carts", component: CartList },
  { path: "/purchased", component: Purchased },
];

export const AppPrivateRouteeEmployeeData = [
  { path: "/", component: Home },
  { path: "/about", component: LearnMore },
  {
    path: `/employee/${user && user.slug}/account`,
    component: EmployeeAccount,
  },
  { path: `/employees/${user && user.slug}`, component: EmployeeDashbaord },
  { path: `/${user && user.slug}/skills`, component: SkillsForm },
  {
    path: `/${user && user.slug}/professiondetails-form`,
    component: ProfessionDetailsForm,
  },
  { path: `/${user && user.slug}/work-experience`, component: WorkHistory },
  { path: `/contactus`, component: Contact },
  { path: `/sendmail/employerint/:slug`, component: Interest },
  { path: `/sendmail/employernoint/:slug`, component: NoInterest },
];
