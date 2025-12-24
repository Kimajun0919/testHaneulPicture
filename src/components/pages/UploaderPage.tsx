import { useEffect, useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Upload, X, FolderUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { dataClient, UploadEvent } from '../../services/dataClient';

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

interface UploaderPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function UploaderPage({ onNavigate, onLogout }: UploaderPageProps) {
  const [eventName, setEventName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [events, setEvents] = useState<UploadEvent[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const data = await dataClient.listUploadEvents();
        if (isMounted) {
          setEvents(data);
        }
      } catch (error) {
        if (isMounted) {
          setEventsError('업로드 이력을 불러오는 중 문제가 발생했습니다.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingEvents(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventName.trim()) {
      alert('Please enter an event name');
      return;
    }
    
    if (selectedFiles.length === 0) {
      alert('Please select at least one photo');
      return;
    }
    
    alert(`Uploading ${selectedFiles.length} photos for "${eventName}"... (Demo)`);
    setEventName('');
    setSelectedFiles([]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Completed</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            <span>Processing</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Pending</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onNavigate={onNavigate} 
        isLoggedIn={true} 
        onLogout={onLogout}
        userRole="uploader"
      />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Upload Event Photos</h1>
            <p className="text-gray-600">Upload photos for face recognition processing</p>
          </div>

          {/* Upload Form */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Name */}
              <div>
                <label htmlFor="eventName" className="block text-sm text-gray-700 mb-2">
                  Event Name *
                </label>
                <input
                  id="eventName"
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g., Sunday Worship - December 24"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Drag and Drop Area */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Upload Photos *
                </label>
                
                {/* Desktop: Drag and Drop */}
                <div className="hidden sm:block">
                  <label
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`block border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <FolderUp className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-gray-700 mb-2">
                        Drag and drop photos here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports multiple files and folder uploads
                      </p>
                    </div>
                  </label>
                </div>

                {/* Mobile: File Selection Button */}
                <div className="sm:hidden">
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                      <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                      <p className="text-gray-700 mb-1">Tap to select photos</p>
                      <p className="text-sm text-gray-500">Multiple files supported</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    Selected Files ({selectedFiles.length})
                  </p>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-blue-100 rounded flex-shrink-0 flex items-center justify-center">
                            <span className="text-sm">📷</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Upload Photos
              </button>
            </form>
          </div>

          {/* Upload History */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
            <h2 className="text-gray-900 mb-6">Upload History</h2>

            {eventsError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {eventsError}
              </div>
            )}

            {isLoadingEvents && (
              <div className="text-center py-8 text-sm text-gray-500">
                업로드 이력을 불러오는 중...
              </div>
            )}

            {/* Desktop: Table View */}
            {!isLoadingEvents && !eventsError && (
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm text-gray-700">Event Name</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-700">Photos</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-700">Upload Date</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-700">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-900">{event.name}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-600">{event.photoCount} photos</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-600">{event.uploadDate}</p>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(event.status)}
                        </td>
                        <td className="py-4 px-4">
                          {event.status === 'processing' && event.progress ? (
                            <div className="w-full max-w-xs">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all"
                                  style={{ width: `${event.progress}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{event.progress}%</p>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Mobile: Card View */}
            {!isLoadingEvents && !eventsError && (
              <div className="md:hidden space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">{event.name}</p>
                        <p className="text-xs text-gray-500">{event.uploadDate}</p>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{event.photoCount} photos</span>
                      {event.status === 'processing' && event.progress && (
                        <span className="text-blue-600">{event.progress}% complete</span>
                      )}
                    </div>
                    {event.status === 'processing' && event.progress && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${event.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!isLoadingEvents && !eventsError && events.length === 0 && (
              <div className="text-center py-8 text-sm text-gray-500">
                아직 업로드된 사진이 없습니다.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
