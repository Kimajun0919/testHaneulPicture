import { useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Download, ChevronLeft, ChevronRight, X, Filter } from 'lucide-react';

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

interface ResultPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userRole: 'user' | 'uploader' | 'admin';
}

interface Photo {
  id: number;
  url: string;
  event: string;
  date: string;
}

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

export function ResultPage({ onNavigate, onLogout, userRole }: ResultPageProps) {
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const events = ['all', ...Array.from(new Set(mockPhotos.map(p => p.event)))];
  const filteredPhotos = selectedEvent === 'all' 
    ? mockPhotos 
    : mockPhotos.filter(p => p.event === selectedEvent);

  const handlePreviousPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    setSelectedPhoto(filteredPhotos[previousIndex]);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handleDownloadAll = () => {
    alert(`Downloading ${filteredPhotos.length} photos as ZIP... (Demo)`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onNavigate={onNavigate} 
        isLoggedIn={true} 
        onLogout={onLogout}
        userRole={userRole}
      />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">내 사진</h1>
            <p className="text-gray-600">
              {filteredPhotos.length}장의 사진에서 회원님이 발견되었습니다
            </p>
          </div>

          {/* Filter and Actions Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Event Filter */}
              <div className="flex items-center space-x-3 flex-1">
                <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                >
                  <option value="all">모든 행사</option>
                  {events.slice(1).map(event => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </div>

              {/* Download All Button */}
              <button
                onClick={handleDownloadAll}
                className="flex items-center justify-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>전체 ZIP 다운로드</span>
              </button>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredPhotos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden hover:ring-4 hover:ring-blue-300 transition-all"
              >
                <img
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    보기
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">📸</span>
              </div>
              <h2 className="text-gray-900 mb-2">사진을 찾을 수 없습니다</h2>
              <p className="text-gray-600">
                선택한 행사의 사진을 찾을 수 없습니다. 다른 행사를 선택해보세요.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePreviousPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-colors hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-colors hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-full">
            <img
              src={selectedPhoto.url}
              alt={`Photo ${selectedPhoto.id}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Info and Actions */}
            <div className="mt-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-white">
                  <p>{selectedPhoto.event}</p>
                  <p className="text-sm text-gray-300">{selectedPhoto.date}</p>
                </div>
                <button
                  onClick={() => alert('Downloading photo... (Demo)')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>다운로드</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-4 sm:hidden">
            <button
              onClick={handlePreviousPhoto}
              className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}