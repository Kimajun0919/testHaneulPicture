import { useEffect, useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Search, Filter, CheckCircle, XCircle, Eye } from 'lucide-react';
import { dataClient, ManagedUser } from '../../services/dataClient';

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

interface UserManagementPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function UserManagementPage({ onNavigate, onLogout }: UserManagementPageProps) {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const data = await dataClient.listManagedUsers();
        if (isMounted) {
          setUsers(data);
        }
      } catch (error) {
        if (isMounted) {
          setUsersError('사용자 정보를 불러오는 중 문제가 발생했습니다.');
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (user: ManagedUser) => {
    const updatedUsers = await dataClient.approveUser(user.id);
    setUsers(updatedUsers);
    alert(`Approving user: ${user.name} (Demo)`);
  };

  const handleReject = async (user: ManagedUser) => {
    const updatedUsers = await dataClient.rejectUser(user.id);
    setUsers(updatedUsers);
    alert(`Rejecting user: ${user.name} (Demo)`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs"><CheckCircle className="w-3 h-3" /><span>Approved</span></span>;
      case 'rejected':
        return <span className="inline-flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs"><XCircle className="w-3 h-3" /><span>Rejected</span></span>;
      case 'pending':
        return <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Pending</span>;
      default:
        return null;
    }
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
            <h1 className="text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage user accounts and approvals</p>
          </div>

          {usersError && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {usersError}
            </div>
          )}

          {isLoadingUsers && (
            <div className="mb-4 text-sm text-gray-500">사용자 정보를 불러오는 중...</div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, user ID, or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users List */}
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
                    <th className="text-left py-4 px-6 text-sm text-gray-700">Join Date</th>
                    <th className="text-left py-4 px-6 text-sm text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm text-gray-700">Role</th>
                    <th className="text-left py-4 px-6 text-sm text-gray-700">Actions</th>
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
                        <p className="text-sm text-gray-600">{user.joinDate}</p>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="py-4 px-6">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {user.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(user)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleReject(user)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
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
                    <div>
                      <p className="text-sm text-gray-900 mb-1">{user.name}</p>
                      <p className="text-xs text-gray-500">@{user.userId}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      {getStatusBadge(user.status)}
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{user.email}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        View
                      </button>
                      {user.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(user)}
                            className="px-3 py-1.5 text-xs text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(user)}
                            className="px-3 py-1.5 text-xs text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
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
        </div>
      </main>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-gray-900">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div>
                <h3 className="text-sm text-gray-700 mb-3">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="text-sm text-gray-900">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">User ID</p>
                    <p className="text-sm text-gray-900">{selectedUser.userId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Join Date</p>
                    <p className="text-sm text-gray-900">{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Role</p>
                    <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                  </div>
                </div>
              </div>

              {/* Face Photos */}
              <div>
                <h3 className="text-sm text-gray-700 mb-3">Face Photos ({selectedUser.facePhotoCount})</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: selectedUser.facePhotoCount }).map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {selectedUser.status === 'pending' && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      handleApprove(selectedUser);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Approve User
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedUser);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject User
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
