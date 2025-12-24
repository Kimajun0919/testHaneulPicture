import { useState } from 'react';
import { MainPage } from './components/pages/MainPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignUpPage } from './components/pages/SignUpPage';
import { FindAccountPage } from './components/pages/FindAccountPage';
import { ProfileSettingsPage } from './components/pages/ProfileSettingsPage';
import { ResultPage } from './components/pages/ResultPage';
import { UploaderPage } from './components/pages/UploaderPage';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { UserManagementPage } from './components/pages/UserManagementPage';
import { RoleManagementPage } from './components/pages/RoleManagementPage';
import { PendingApprovalPage } from './components/pages/PendingApprovalPage';

type Page = 
  | 'main' 
  | 'login' 
  | 'signup' 
  | 'find-account' 
  | 'profile' 
  | 'results' 
  | 'uploader'
  | 'admin-dashboard'
  | 'admin-users'
  | 'admin-roles'
  | 'pending-approval';

type UserRole = 'user' | 'uploader' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('user');

  const handleLogin = (role: UserRole = 'user') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentPage('results');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
    setCurrentPage('main');
  };

  const handleSignUp = () => {
    setCurrentPage('pending-approval');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'signup':
        return <SignUpPage onNavigate={setCurrentPage} onSignUp={handleSignUp} />;
      case 'find-account':
        return <FindAccountPage onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfileSettingsPage onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'results':
        return <ResultPage onNavigate={setCurrentPage} onLogout={handleLogout} userRole={userRole} />;
      case 'uploader':
        return <UploaderPage onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'admin-users':
        return <UserManagementPage onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'admin-roles':
        return <RoleManagementPage onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'pending-approval':
        return <PendingApprovalPage onNavigate={setCurrentPage} />;
      default:
        return <MainPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}
    </div>
  );
}

export default App;
