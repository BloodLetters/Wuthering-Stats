import React, { useState, useEffect } from 'react';
import { FaCheck, FaCopy, FaInfoCircle, FaUpload, FaDownload } from 'react-icons/fa';

const Account = () => {
    const [importMethod, setImportMethod] = useState('automatic');
    const [urlInput, setUrlInput] = useState('');
    const [copied, setCopied] = useState(false);
    const [shareStats, setShareStats] = useState(false);
    const [allImagesLoaded, setAllImagesLoaded] = useState(true);
    const [file, setFile] = useState(null);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isAuthenticated = false;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const powershellScript = `iwr -useb "https://wwutracker.com/import.ps1" | iex`;

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

    const handleCopyScript = () => {
        navigator.clipboard.writeText(powershellScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleImport = () => {
        // Handle the import logic here
        console.log('Importing with URL:', urlInput);
        console.log('Share stats:', shareStats);
        console.log('File:', file);
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

    // Render the appropriate content based on the selected import method
    const renderContent = () => {
        if (importMethod === 'automatic') {
            return (
                <>
                    {/* Step 1: PowerShell Script */}
                    <div className="mb-6">
                        <h2 className="text-white text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-700 rounded-full w-6 h-6 text-sm mr-2">1</span>
                            First, launch the game and open your in-game history details
                        </h2>
                        {/* <div className="ml-8 mb-4">
                            <button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
                                <span className="mr-2">📹</span> Tutorial Video
                            </button>
                        </div> */}
                        <p className="text-gray-300 mb-4 ml-8">
                            Afterwards, open Windows PowerShell, and then paste the following script:
                        </p>
                        <div className="relative ml-8">
                            <div className="bg-gray-700 rounded-lg p-4 font-mono text-sm text-blue-400">
                                {powershellScript}
                                <button
                                    onClick={handleCopyScript}
                                    className="absolute right-2 top-2 p-2 rounded-md hover:bg-gray-600 transition-colors"
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
                                NOTE: The script does not edit your files, it simply extracts your Convene History URL from your game logs. You can view the script
                                <a>test</a>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: URL Input */}
                    <div className="mb-6">
                        <h2 className="text-white text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-700 rounded-full w-6 h-6 text-sm mr-2">2</span>
                            Paste the URL here
                        </h2>
                        <div className="relative ml-8">
                            <input
                                type="text"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                placeholder="Paste the URL here"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    {/* Step 1: Launch Game */}
                    <div className="mb-6">
                        <h2 className="text-white text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-700 rounded-full w-6 h-6 text-sm mr-2">1</span>
                            First, launch the game and open your in-game history details
                        </h2>
                        <div className="ml-8 mb-4">
                            {/* <button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
                                <span className="mr-2">📹</span> Tutorial Video
                            </button> */}
                        </div>
                    </div>

                    {/* Step 2: Find Installation Directory */}
                    <div className="mb-6">
                        <h2 className="text-white text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-700 rounded-full w-6 h-6 text-sm mr-2">2</span>
                            Go to your game's installation directory
                        </h2>
                        <p className="text-gray-300 mb-2 ml-8">
                            Right click your Wuthering Waves game launcher and select <span className="bg-gray-700 px-2 py-0.5 rounded text-gray-200">Open file location</span>.
                        </p>
                        <p className="text-gray-300 ml-8">
                            You should see <span className="bg-gray-700 px-2 py-0.5 rounded text-gray-200">launcher.exe</span> and a lot of <span className="bg-gray-700 px-2 py-0.5 rounded text-gray-200">.dll</span> files.
                        </p>
                    </div>

                    {/* Step 3: Upload Client.log */}
                    <div className="mb-6">
                        <h2 className="text-white text-xl font-semibold mb-3 flex items-center">
                            <span className="flex items-center justify-center bg-gray-700 rounded-full w-6 h-6 text-sm mr-2">3</span>
                            Search for <span className="bg-gray-700 px-2 py-0.5 rounded text-blue-400">Client.log</span> and upload it here
                        </h2>
                        <div 
                            className="ml-8 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-500 transition-colors"
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
                            <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
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
        <div className={`flex flex-col min-h-screen bg-gray-900 font-inter ${allImagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <header className="p-4 border-b border-gray-800">
                <div className="container mx-auto flex justify-center items-center px-4">
                    <div className="text-white text-2xl">Wuthering Stats</div>
                    <div className="flex space-x-2 ml-auto">
                    {isAuthenticated ? (
                            <button
                                className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors flex items-center"
                                onClick={toggleSidebar}
                            >
                                <span className="text-white">⚙️</span>
                                <span className="ml-2 text-white">Settings</span>
                            </button>
                        ) : (
                            <button
                                className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors flex items-center"
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

            <main className="flex-grow container mx-auto p-4">
                <div className="max-w-2xl mx-auto">
                    {/* Import Method Toggle */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <div className="flex justify-center mb-6">
                            <div className="bg-gray-700 p-1 rounded-lg inline-flex w-full">
                                <button
                                    className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                                        importMethod === 'automatic'
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                    onClick={() => setImportMethod('automatic')}
                                >
                                    Automatic
                                </button>
                                <button
                                    className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                                        importMethod === 'manual'
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-300 hover:text-white'
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
                            <h2 className="text-white text-xl font-semibold mb-3 flex items-center">
                                <span className="flex items-center justify-center bg-gray-700 rounded-full w-6 h-6 text-sm mr-2">{importMethod === 'automatic' ? '3' : '4'}</span>
                                Press the "Import History" button on this website
                            </h2>
                            <div className="flex items-center mb-4 ml-8">
                                <input
                                    type="checkbox"
                                    id="shareStats"
                                    checked={shareStats}
                                    onChange={(e) => setShareStats(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-800"
                                />
                                <label htmlFor="shareStats" className="ml-2 text-gray-300">
                                    Submit pull data for global statistics
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleImport}
                                    className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 flex items-center"
                                >
                                    <FaDownload className="mr-2" />
                                    Import History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto p-4 bg-gray-800 text-gray-400 text-sm">
                <div className="container mx-auto">© 2025 Wuthering Stats</div>
            </footer>
        </div>
    );
};

export default Account;