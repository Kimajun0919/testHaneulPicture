import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Users, Clock, FolderUp, TrendingUp } from 'lucide-react';

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

interface AdminDashboardProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const stats = [
    {
      label: 'Total Users',
      value: '248',
      icon: Users,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      change: '+12 this month'
    },
    {
      label: 'Pending Approvals',
      value: '7',
      icon: Clock,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      change: 'Awaiting review'
    },
    {
      label: 'Total Events',
      value: '34',
      icon: FolderUp,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      change: '+5 this month'
    },
    {
      label: 'Photos Processed',
      value: '12,450',
      icon: TrendingUp,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      change: '+1,234 this month'
    }
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'Sarah Johnson', time: '5 minutes ago' },
    { action: 'Event uploaded', user: 'Michael Chen', time: '23 minutes ago' },
    { action: 'User approved', user: 'Emily Davis', time: '1 hour ago' },
    { action: 'New user registration', user: 'David Wilson', time: '2 hours ago' },
    { action: 'Event uploaded', user: 'Lisa Martinez', time: '3 hours ago' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onNavigate={onNavigate} 
        isLoggedIn={true} 
        onLogout={onLogout}
        userRole="admin"
      />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Overview of your photo recognition service</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
                <p className="text-3xl text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('admin-users')}
                  className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-left"
                >
                  Review Pending Users (7)
                </button>
                <button
                  onClick={() => onNavigate('admin-users')}
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  Manage Users
                </button>
                <button
                  onClick={() => onNavigate('admin-roles')}
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  Manage Roles & Permissions
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">System Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Storage Used</p>
                <p className="text-2xl text-gray-900">24.5 GB</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">45% of 50 GB</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">AI Processing Queue</p>
                <p className="text-2xl text-gray-900">3</p>
                <p className="text-xs text-gray-500 mt-1">Events in queue</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Sessions</p>
                <p className="text-2xl text-gray-900">42</p>
                <p className="text-xs text-gray-500 mt-1">Users online now</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">System Status</p>
                <p className="text-2xl text-green-600">Healthy</p>
                <p className="text-xs text-gray-500 mt-1">All services operational</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}