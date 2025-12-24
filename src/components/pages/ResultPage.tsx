import { useEffect, useMemo, useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Download, ChevronLeft, ChevronRight, X, Filter } from 'lucide-react';
import { dataClient, Photo } from '../../services/dataClient';
import { Page } from '../../types';

interface ResultPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userRole: 'user' | 'uploader' | 'admin';
}

export function ResultPage({ onNavigate, onLogout, userRole }: ResultPageProps) {
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadPhotos = async () => {
      try {
        setIsLoading(true);
        const data = await dataClient.listPhotos();
        if (isMounted) {
          setPhotos(data);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage('사진을 불러오는 중 문제가 발생했습니다.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  const events = useMemo(
    () => ['all', ...Array.from(new Set(photos.map(p => p.event)))],
    [photos]
  );
  const filteredPhotos = useMemo(
    () => (
      selectedEvent === 'all'
        ? photos
        : photos.filter(p => p.event === selectedEvent)
    ),
    [photos, selectedEvent]
  );

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
              {isLoading ? '사진을 불러오는 중입니다...' : `${filteredPhotos.length}장의 사진에서 회원님이 발견되었습니다`}
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

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 mb-6">
              {errorMessage}
            </div>
          )}

          {/* Photo Grid */}
          {!isLoading && !errorMessage && (
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
          )}

          {isLoading && (
            <div className="text-center py-16 text-gray-500">사진을 불러오는 중...</div>
          )}

          {/* Empty State */}
          {!isLoading && !errorMessage && filteredPhotos.length === 0 && (
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
