import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../src/Login.css'
// import'../src/Dashboard.css'
import '../src/otp.css'
import '../src/reset.css'
import "./forget.css";
import "../src/Payroll.css";
import React from 'react';
import "../src/Employee.css";
import "../src/Timeoff.css";
import "../src/Performance.css";
import "../src/Calender.css";
import "../src/Recruitment.css";
import Reset from './components/Reset';
import "../src/Communication.css";
import "../src/Settings.css";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Employee from './components/Employee';
import Recruitment from './components/Recruitment';
import Profile from './components/Profile';
import Forget from './components/Forget';
import Otp from './components/Otp';
import About from './components/About';
import Calender from './components/Calender';
import Payroll from './components/Payroll';
import Timeoff from './components/Timeoff';
import Performance from './components/Performance';
import Communication from './components/Communication';
import Settings from './components/Settings';
import EmployeeList from './components/EmployeeList';
import Leaders from './components/Leaders';
import EmpSearch from './components/EmpSearch';
import AddEmp from './components/AddEmp';
import PerformEval from './components/PerformEval';
import PerformReview from './components/PerformReview';
import Feedback from './components/Feedback';
import GoalSetting from './components/GoalSetting';
import ScheduleMeeting from './components/ScheduleMeeting';
import ScheduleEvent from './components/ScheduleEvent';
import ProfileManage from './components/ProfileManage';
import IntegSetting from './components/IntegSetting';
import NotifiRefer from './components/NotifiRefer';
import JobPost from './components/JobPost';
import AppliTrack from './components/AppliTrack';
import Interview from './components/Interview';
import OfferManage from './components/OfferManage';
import Holidays from './components/Holidays';
import Events from './components/Events';
import Requests from './components/Requests';
import Approval from './components/Approval';
import Balance from './components/Balance';
import Messagebox from './components/Messagebox';
import "../src/About.css";
import AddRequest from "./components/AddRequest";
import UpdateRequest from './components/UpdateRequest';
import "../src/Approval.css";


// import "../src/Test.css";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/employee" element={<Employee />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/leaders" element={<Leaders />} />
        <Route path="/empsearch" element={<EmpSearch />} />
        <Route path="/addemp" element={<AddEmp />} />
        <Route path="/recruitment" element={<Recruitment/>}/>
        <Route path="/jobpost" element={<JobPost/>}/>
        <Route path="/applitrack" element={<AppliTrack/>}/>
        <Route path="/interview" element={<Interview/>}/>
        <Route path="/offermanage" element={<OfferManage/>}/>
        <Route path="/calender" element={<Calender/>}/>
        <Route path="/holidays" element={<Holidays/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/payroll" element={<Payroll/>}/>
        <Route path="/timeoff" element={<Timeoff/>}/>
        <Route path="/requests" element={<Requests/>}/>
        <Route path="/approval" element={<Approval/>}/>
        <Route path="/balance" element={<Balance/>}/>
        <Route path="/performance" element={<Performance/>}/>
        <Route path="/performeval" element={<PerformEval/>}/>
        <Route path="/performreview" element={<PerformReview/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/goalsetting" element={<GoalSetting/>}/>
        <Route path="/communication" element={<Communication/>}/>
        <Route path="/schedulemeeting" element={<ScheduleMeeting/>}/>
        <Route path="/scheduleevent" element={<ScheduleEvent/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/profilemanage" element={<ProfileManage/>}/>
        <Route path="/integsetting" element={<IntegSetting/>}/>
        <Route path="/notifirefer" element={<NotifiRefer/>}/>
        <Route path="/logout" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/forget" element={<Forget/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/reset" element={<Reset/>}/>    
        <Route path="/about" element={<About/>}/> 
        <Route path="/messagebox" element={<Messagebox/>}/>
        <Route path="/addrequest" element={<AddRequest/>}/>
        <Route path="/UpdateRequest/:id" element={<UpdateRequest/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
