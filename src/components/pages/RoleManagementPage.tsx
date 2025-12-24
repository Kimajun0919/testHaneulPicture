import { useEffect, useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Search, Shield } from 'lucide-react';
import { dataClient, RoleUser } from '../../services/dataClient';
import { Page } from '../../types';

interface RoleManagementPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function RoleManagementPage({ onNavigate, onLogout }: RoleManagementPageProps) {
  const [users, setUsers] = useState<RoleUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const data = await dataClient.listRoleUsers();
        if (isMounted) {
          setUsers(data);
        }
      } catch (error) {
        if (isMounted) {
          setUsersError('권한 사용자 정보를 불러오는 중 문제가 발생했습니다.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingUsers(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = async (userId: number, newRole: 'user' | 'uploader' | 'admin') => {
    const updatedUsers = await dataClient.updateUserRole(userId, newRole);
    setUsers(updatedUsers);
    const user = updatedUsers.find(u => u.id === userId);
    alert(`Changed role for ${user?.name} to ${newRole} (Demo)`);
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-700',
      uploader: 'bg-blue-100 text-blue-700',
      user: 'bg-gray-100 text-gray-700'
    };
    return <span className={`px-2 py-1 rounded text-xs ${colors[role as keyof typeof colors]}`}>{role.charAt(0).toUpperCase() + role.slice(1)}</span>;
  };

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
            <h1 className="text-gray-900 mb-2">Role Management</h1>
            <p className="text-gray-600">Manage user roles and permissions</p>
          </div>

          {usersError && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {usersError}
            </div>
          )}

          {isLoadingUsers && (
            <div className="mb-4 text-sm text-gray-500">권한 사용자 정보를 불러오는 중...</div>
          )}

          {/* Role Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <h3 className="text-gray-900">User</h3>
              </div>
              <p className="text-sm text-gray-600">
                Can view and download their own photos. Default role for all members.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📤</span>
                </div>
                <h3 className="text-gray-900">Uploader</h3>
              </div>
              <p className="text-sm text-gray-600">
                Can upload event photos for processing. Includes all User permissions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-gray-900">Admin</h3>
              </div>
              <p className="text-sm text-gray-600">
                Full system access. Can manage users, roles, and all settings.
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, user ID, or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Desktop: Table View */}
            {!isLoadingUsers && !usersError && (
              <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 text-sm text-gray-700">Name</th>
                    <th className="text-left py-4 px-6 text-sm text-gray-700">User ID</th>
                    <th className="text-left py-4 px-6 text-sm text-gray-700">Email</th>
                    <th className="text-left py-4 px-6 text-sm text-gray-700">Current Role</th>
                    <th className="text-left py-4 px-6 text-sm text-gray-700">Change Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">{user.name}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-600">{user.userId}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </td>
                      <td className="py-4 px-6">
                        {getRoleBadge(user.currentRole)}
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={user.currentRole}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-sm"
                        >
                          <option value="user">User</option>
                          <option value="uploader">Uploader</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}

            {/* Mobile: Card View */}
            {!isLoadingUsers && !usersError && (
              <div className="md:hidden divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-1">{user.name}</p>
                      <p className="text-xs text-gray-500 mb-1">@{user.userId}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <div>{getRoleBadge(user.currentRole)}</div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Change Role</label>
                    <select
                      value={user.currentRole}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-sm"
                    >
                      <option value="user">User</option>
                      <option value="uploader">Uploader</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              ))}
              </div>
            )}

            {!isLoadingUsers && !usersError && filteredUsers.length === 0 && (
              <div className="p-6 text-center text-sm text-gray-500">
                조건에 맞는 사용자가 없습니다.
              </div>
            )}
          </div>

          {/* Permission Matrix */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Permission Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-700">Permission</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-700">User</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-700">Uploader</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-700">Admin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">View own photos</td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">Download photos</td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">Update profile</td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">Upload event photos</td>
                    <td className="py-3 px-4 text-center"><span className="text-gray-300">✗</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">Manage users</td>
                    <td className="py-3 px-4 text-center"><span className="text-gray-300">✗</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-gray-300">✗</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">Approve/reject users</td>
                    <td className="py-3 px-4 text-center"><span className="text-gray-300">✗</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-gray-300">✗</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-gray-900">Manage roles</td>
                    <td className="py-3 px-4 text-center"><span className="text-gray-300">✗</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-gray-300">✗</span></td>
                    <td className="py-3 px-4 text-center"><span className="text-green-500">✓</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
