export type Photo = {
  id: number;
  url: string;
  event: string;
  date: string;
};

export type UploadEvent = {
  id: number;
  name: string;
  photoCount: number;
  status: 'pending' | 'processing' | 'completed';
  uploadDate: string;
  progress?: number;
};

export type ManagedUser = {
  id: number;
  name: string;
  userId: string;
  email: string;
  joinDate: string;
  status: 'pending' | 'approved' | 'rejected';
  role: 'user' | 'uploader' | 'admin';
  facePhotoCount: number;
};

export type RoleUser = {
  id: number;
  name: string;
  userId: string;
  currentRole: 'user' | 'uploader' | 'admin';
  email: string;
};

const mockPhotos: Photo[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1662151900393-97f6bc1567ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwc2VydmljZXxlbnwxfHx8fDE3NjY1MzYwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Sunday Worship - December 15', date: '2024-12-15' },
  { id: 2, url: 'https://images.unsplash.com/photo-1764726354739-1222d1ea5b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHBob3RvJTIwZXZlbnR8ZW58MXx8fHwxNzY2NTM2MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Sunday Worship - December 15', date: '2024-12-15' },
  { id: 3, url: 'https://images.unsplash.com/photo-1764933361142-fc28a024f3da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzY2NDU5ODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Community Gathering - December 10', date: '2024-12-10' },
  { id: 4, url: 'https://images.unsplash.com/photo-1766018096217-1d930a54d36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZXZlbnQlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjY1MjQ2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Outdoor Celebration - December 8', date: '2024-12-08' },
  { id: 5, url: 'https://images.unsplash.com/photo-1632858265907-961f1454ccf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwbWVldGluZyUyMHBlb3BsZXxlbnwxfHx8fDE3NjY1MzYwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Leadership Conference - December 5', date: '2024-12-05' },
  { id: 6, url: 'https://images.unsplash.com/photo-1764072970350-2ce4f354a483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGdyb3VwJTIwYWN0aXZpdHl8ZW58MXx8fHwxNzY2NTM2MDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Youth Group Activity - December 3', date: '2024-12-03' },
  { id: 7, url: 'https://images.unsplash.com/photo-1662151900393-97f6bc1567ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwc2VydmljZXxlbnwxfHx8fDE3NjY1MzYwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Sunday Worship - December 15', date: '2024-12-15' },
  { id: 8, url: 'https://images.unsplash.com/photo-1764726354739-1222d1ea5b63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHBob3RvJTIwZXZlbnR8ZW58MXx8fHwxNzY2NTM2MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Community Gathering - December 10', date: '2024-12-10' },
  { id: 9, url: 'https://images.unsplash.com/photo-1764933361142-fc28a024f3da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBwZW9wbGV8ZW58MXx8fHwxNzY2NDU5ODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Leadership Conference - December 5', date: '2024-12-05' },
  { id: 10, url: 'https://images.unsplash.com/photo-1766018096217-1d930a54d36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZXZlbnQlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjY1MjQ2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080', event: 'Youth Group Activity - December 3', date: '2024-12-03' },
];

const mockUploadEvents: UploadEvent[] = [
  { id: 1, name: 'Sunday Worship - December 15', photoCount: 45, status: 'completed', uploadDate: '2024-12-15' },
  { id: 2, name: 'Community Gathering - December 10', photoCount: 32, status: 'completed', uploadDate: '2024-12-10' },
  { id: 3, name: 'Youth Group Activity - December 8', photoCount: 28, status: 'processing', uploadDate: '2024-12-08', progress: 65 },
  { id: 4, name: 'Leadership Conference - December 5', photoCount: 18, status: 'pending', uploadDate: '2024-12-05' },
];

let managedUsers: ManagedUser[] = [
  { id: 1, name: 'John Doe', userId: 'john.doe', email: 'john@example.com', joinDate: '2024-12-15', status: 'pending', role: 'user', facePhotoCount: 3 },
  { id: 2, name: 'Sarah Johnson', userId: 'sarah.j', email: 'sarah@example.com', joinDate: '2024-12-14', status: 'pending', role: 'user', facePhotoCount: 2 },
  { id: 3, name: 'Michael Chen', userId: 'mchen', email: 'michael@example.com', joinDate: '2024-12-10', status: 'approved', role: 'uploader', facePhotoCount: 3 },
  { id: 4, name: 'Emily Davis', userId: 'emily.d', email: 'emily@example.com', joinDate: '2024-12-08', status: 'approved', role: 'user', facePhotoCount: 1 },
  { id: 5, name: 'David Wilson', userId: 'dwilson', email: 'david@example.com', joinDate: '2024-12-05', status: 'approved', role: 'user', facePhotoCount: 3 },
  { id: 6, name: 'Lisa Martinez', userId: 'lisa.m', email: 'lisa@example.com', joinDate: '2024-12-03', status: 'rejected', role: 'user', facePhotoCount: 1 },
];

let roleUsers: RoleUser[] = [
  { id: 1, name: 'Michael Chen', userId: 'mchen', currentRole: 'uploader', email: 'michael@example.com' },
  { id: 2, name: 'Emily Davis', userId: 'emily.d', currentRole: 'user', email: 'emily@example.com' },
  { id: 3, name: 'David Wilson', userId: 'dwilson', currentRole: 'user', email: 'david@example.com' },
  { id: 4, name: 'Sarah Johnson', userId: 'sarah.j', currentRole: 'user', email: 'sarah@example.com' },
  { id: 5, name: 'James Anderson', userId: 'janderson', currentRole: 'uploader', email: 'james@example.com' },
  { id: 6, name: 'Jessica Brown', userId: 'jbrown', currentRole: 'admin', email: 'jessica@example.com' },
];

export const dataClient = {
  async listPhotos(): Promise<Photo[]> {
    return mockPhotos;
  },
  async listUploadEvents(): Promise<UploadEvent[]> {
    return mockUploadEvents;
  },
  async listManagedUsers(): Promise<ManagedUser[]> {
    return managedUsers;
  },
  async approveUser(userId: number): Promise<ManagedUser[]> {
    managedUsers = managedUsers.map((user) =>
      user.id === userId ? { ...user, status: 'approved' } : user
    );
    return managedUsers;
  },
  async rejectUser(userId: number): Promise<ManagedUser[]> {
    managedUsers = managedUsers.map((user) =>
      user.id === userId ? { ...user, status: 'rejected' } : user
    );
    return managedUsers;
  },
  async listRoleUsers(): Promise<RoleUser[]> {
    return roleUsers;
  },
  async updateUserRole(userId: number, newRole: RoleUser['currentRole']): Promise<RoleUser[]> {
    roleUsers = roleUsers.map((user) =>
      user.id === userId ? { ...user, currentRole: newRole } : user
    );
    return roleUsers;
  },
};
