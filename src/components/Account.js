import React, { useState, useEffect } from 'react';
import { parseURL, fetchData } from '../utils/URL';
import { savePlayerData } from '../Storage/API';
import { FaCheck, FaCopy, FaInfoCircle, FaUpload, FaDownload, FaTimes, FaSpinner, FaChevronRight } from 'react-icons/fa';

const Account = () => {
    const [importMethod, setImportMethod] = useState('automatic');
    const [urlInput, setUrlInput] = useState('');
    const [copied, setCopied] = useState(false);
    const [shareStats, setShareStats] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(true);
    const [file, setFile] = useState(null);
    
    // Notification state
    const [notification, setNotification] = useState({
        show: false,
        type: '', // 'loading', 'success', or 'error'
        message: ''
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isAuthenticated = false;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const powershellScript = `iwr -useb "https://wuwutracker.com/import.ps1" | iex`;

    useEffect(() => {
        const images = document.querySelectorAll('img');
        let loadedCount = 0;

        const handleImageLoad = () => {
            loadedCount += 1;
            if (loadedCount === images.length) {
                setAllImagesLoaded(true);
            }
        };

        images.forEach(image => {
            if (image.complete) {
                handleImageLoad();
            } else {
                image.addEventListener('load', handleImageLoad);
                image.addEventListener('error', handleImageLoad);
            }
        });
    }, []);

    // Auto-hide notification after 3 seconds
    useEffect(() => {
        let timer;
        if (notification.show && notification.type !== 'loading') {
            timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000);
        }
        
        return () => clearTimeout(timer);
    }, [notification.show, notification.type]);

    const handleCopyScript = () => {
        navigator.clipboard.writeText(powershellScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const showNotification = (type, message) => {
        setNotification({
            show: true,
            type,
            message
        });
    };

    const handleImport = async () => {
        // Validate input
        if (importMethod === 'automatic' && !urlInput.trim()) {
            showNotification('error', 'Please enter a valid URL');
            return;
        }

        if (importMethod === 'manual' && !file) {
            showNotification('error', 'Please upload the Client.log file');
            return;
        }

        try {
            // Show loading notification
            showNotification('loading', 'Importing data...');
            
            console.log('Importing with URL:', urlInput);
            
            const dat = parseURL(urlInput);
            const rawDatas = await fetchData(dat.svr_id, dat.player_id, dat.record_id, dat.cardPoolId, dat.lang);
            
            if (rawDatas.status === 0 && savePlayerData(dat.player_id, rawDatas)) {
                localStorage.setItem("Acc_id", dat.player_id);
                showNotification('success', 'Data imported successfully');
            } else {
                showNotification('error', 'Failed to save player data. Token Expired');
            }
        } catch (error) {
            console.error('Import error:', error);
            showNotification('error', error.message || 'An error occurred during import');
        }
    };

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    // Render notification component
    const renderNotification = () => {
        if (!notification.show) return null;

        const notificationClasses = `fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center transition-all duration-300 transform translate-y-0 opacity-100 z-50 ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-gray-700 text-white'
        }`;

        return (
            <div className={notificationClasses}>
                {notification.type === 'loading' && (
                    <FaSpinner className="animate-spin mr-2" />
                )}
                {notification.type === 'success' && (
                    <FaCheck className="mr-2" />
                )}
                {notification.type === 'error' && (
                    <FaTimes className="mr-2" />
                )}
                <p>{notification.message}</p>
                <button 
                    onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                    className="ml-4 text-white hover:text-gray-200"
                >
                    <FaTimes />
                </button>
            </div>
        );
    };

    // Render the appropriate content based on the selected import method
    const renderContent = () => {
        if (importMethod === 'automatic') {
            return (
                <>
                    {/* Step 1: PowerShell Script */}
                    <div className="mb-8">
                        <h2 className="text-amber-100 text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-800 rounded-full w-6 h-6 text-sm mr-2 border border-gray-700">1</span>
                            First, launch the game and open your in-game history details
                        </h2>
                        <p className="text-gray-300 mb-4 ml-8">
                            Afterwards, open Windows PowerShell, and then paste the following script:
                        </p>
                        <div className="relative ml-8">
                            <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-blue-300 border border-gray-700">
                                {powershellScript}
                                <button
                                    onClick={handleCopyScript}
                                    className="absolute right-2 top-2 p-2 rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    {copied ? (
                                        <FaCheck className="text-green-400" />
                                    ) : (
                                        <FaCopy className="text-gray-400" />
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center mt-2 text-xs text-gray-400">
                                <span className="text-yellow-500 mr-2">•</span>
                                NOTE: The script does not edit your files, it simply extracts your Convene History URL from your game logs.
                            </div>
                        </div>
                    </div>

                    {/* Step 2: URL Input */}
                    <div className="mb-8">
                        <h2 className="text-amber-100 text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-800 rounded-full w-6 h-6 text-sm mr-2 border border-gray-700">2</span>
                            Paste the URL here
                        </h2>
                        <div className="relative ml-8">
                            <input
                                type="text"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                placeholder="Paste the URL here"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
                            />
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    {/* Step 1: Launch Game */}
                    <div className="mb-8">
                        <h2 className="text-amber-100 text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-800 rounded-full w-6 h-6 text-sm mr-2 border border-gray-700">1</span>
                            First, launch the game and open your in-game history details
                        </h2>
                    </div>

                    {/* Step 2: Find Installation Directory */}
                    <div className="mb-8">
                        <h2 className="text-amber-100 text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-800 rounded-full w-6 h-6 text-sm mr-2 border border-gray-700">2</span>
                            Go to your game's installation directory
                        </h2>
                        <p className="text-gray-300 mb-2 ml-8">
                            Right click your Wuthering Waves game launcher and select <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-200 border border-gray-700">Open file location</span>.
                        </p>
                        <p className="text-gray-300 ml-8">
                            You should see <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-200 border border-gray-700">launcher.exe</span> and a lot of <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-200 border border-gray-700">.dll</span> files.
                        </p>
                    </div>

                    {/* Step 3: Upload Client.log */}
                    <div className="mb-8">
                        <h2 className="text-amber-100 text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-800 rounded-full w-6 h-6 text-sm mr-2 border border-gray-700">3</span>
                            Search for <span className="bg-gray-800 px-2 py-0.5 rounded text-blue-300 border border-gray-700">Client.log</span> and upload it here
                        </h2>
                        <div 
                            className="ml-8 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-amber-500 transition-colors bg-gray-800"
                            onClick={() => document.getElementById('fileInput').click()}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                id="fileInput"
                                type="file"
                                accept=".log,.txt"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <FaUpload className="mx-auto text-amber-100 text-3xl mb-2" />
                            <p className="text-gray-300 mb-1">Click to upload or drag & drop</p>
                            <p className="text-gray-500 text-sm">Accepted formats: text/plain</p>
                            {file && (
                                <div className="mt-4 p-2 bg-gray-700 rounded text-left flex items-center">
                                    <span className="text-green-400 mr-2">✓</span>
                                    <span className="text-white">{file.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <div className={`flex flex-col min-h-screen bg-black font-inter ${allImagesLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            {/* Background Image Overlay */}
            <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/background.jpg)', opacity: 0.2 }}></div>
            
            <header className="relative z-10 p-4 border-b border-gray-800">
                <div className="container mx-auto flex justify-center items-center px-4">
                    <div className="text-amber-100 text-2xl font-serif tracking-wider">Wuthering Stats</div>
                    <div className="flex space-x-2 ml-auto">
                    {isAuthenticated ? (
                            <button
                                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-md transition-colors flex items-center border border-gray-700"
                                onClick={toggleSidebar}
                            >
                                <span className="text-white">⚙️</span>
                                <span className="ml-2 text-white">Settings</span>
                            </button>
                        ) : (
                            <button
                                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-md transition-colors flex items-center border border-gray-700"
                                onClick={toggleSidebar}
                            >
                                <img
                                    src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
                                    alt="Google Logo"
                                    className="w-5 h-5"
                                />
                                <span className="ml-2 text-white">Login</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-grow container mx-auto p-4">
                <div className="max-w-2xl mx-auto">
                    {/* Title with decorative elements */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif text-amber-100 tracking-wide mb-2">Import Game Data</h1>
                        <div className="flex items-center justify-center">
                            <div className="h-px w-16 bg-amber-500"></div>
                            <div className="mx-4 text-amber-500">Wuthering Waves</div>
                            <div className="h-px w-16 bg-amber-500"></div>
                        </div>
                    </div>
                    
                    {/* Import Method Toggle */}
                    <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-6 mb-6 border border-gray-800 shadow-xl">
                        <div className="flex justify-center mb-8">
                            <div className="bg-gray-800 p-1 rounded-lg inline-flex w-full border border-gray-700">
                                <button
                                    className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                                        importMethod === 'automatic'
                                            ? 'bg-amber-800 text-gray-300 hover:text-amber-100 font-medium'
                                            : 'text-gray-300 hover:text-amber-100'
                                    }`}
                                    onClick={() => setImportMethod('automatic')}
                                >
                                    Automatic
                                </button>
                                <button
                                    className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                                        importMethod === 'manual'
                                            ? 'bg-amber-800 text-gray-300 hover:text-amber-100 font-medium'
                                            : 'text-gray-300 hover:text-amber-100'
                                    }`}
                                    onClick={() => setImportMethod('manual')}
                                >
                                    Manual
                                </button>
                            </div>
                        </div>

                        {/* Render content based on selected method */}
                        {renderContent()}

                        {/* Step 4: Import Button and Checkbox */}
                        <div>
                            <h2 className="text-amber-100 text-xl font-semibold mb-3 flex items-center">
                                <span className="flex items-center justify-center bg-gray-800 rounded-full w-6 h-6 text-sm mr-2 border border-gray-700">{importMethod === 'automatic' ? '3' : '4'}</span>
                                Press the "Import History" button on this website
                            </h2>
                            <div className="flex items-center mb-6 ml-8">
                                <input
                                    type="checkbox"
                                    id="shareStats"
                                    checked={shareStats}
                                    onChange={(e) => setShareStats(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500 focus:ring-offset-gray-800"
                                />
                                <label htmlFor="shareStats" className="ml-2 text-gray-300">
                                    Submit pull data for global statistics
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleImport}
                                    className="relative flex items-center justify-center px-6 py-3 overflow-hidden font-medium bg-amber-800 text-amber-100 font-medium border border-amber-900 rounded-lg group"
                                    disabled={notification.type === 'loading'}
                                >
                                    <span className="absolute flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-amber-600 group-hover:translate-x-0 ease">
                                        <FaChevronRight className="ml-2 text-amber-100" />
                                    </span>
                                    <span className="absolute flex items-center justify-center w-full h-full text-amber-100 transition-all duration-300 transform group-hover:translate-x-full ease">
                                        {notification.type === 'loading' ? (
                                            <FaSpinner className="animate-spin mr-2" />
                                        ) : (
                                            <FaDownload className="mr-2" />
                                        )}
                                        {notification.type === 'loading' ? 'Importing...' : 'Import History'}
                                    </span>
                                    <span className="relative invisible">
                                        {notification.type === 'loading' ? 'Importing...' : 'Import History'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto p-4 bg-black text-gray-500 text-sm border-t border-gray-800">
                <div className="container mx-auto flex justify-between">
                    <div>© 2025 Wuthering Stats</div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-amber-100">Terms</a>
                        <a href="#" className="hover:text-amber-100">Privacy</a>
                        <a href="#" className="hover:text-amber-100">Contact</a>
                    </div>
                </div>
            </footer>

            {/* Render notification */}
            {renderNotification()}
        </div>
    );
};

export default Account;