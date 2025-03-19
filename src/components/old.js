import React, { useState } from 'react';

const WutheringWavesGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample character data
  const characters = [
    { id: 1, name: 'T_IconRole_Pile_baizhi_UI', image: 'https://wuthering.gg/_ipx/q_70&s_800x1104/images/IconRolePile/T_IconRole_Pile_bailian_UI.png' },
    // { id: 2, name: 'T_IconRole_Pile_zhujue_UI', image: '/api/placeholder/300/300' },
    // { id: 3, name: 'T_IconRole_Pile_yinlin_UI', image: '/api/placeholder/300/300' },
    // { id: 4, name: 'T_IconRole_Pile_yangyang_UI', image: '/api/placeholder/300/300' },
    // { id: 5, name: 'T_IconRole_Pile_taohua_UI', image: '/api/placeholder/300/300' },
    // { id: 6, name: 'T_IconRole_Pile_rover_UI', image: '/api/placeholder/300/300' },
    // { id: 7, name: 'T_IconRole_Pile_jiyan_UI', image: '/api/placeholder/300/300' },
    // { id: 8, name: 'T_IconRole_Pile_bailian_UI', image: '/api/placeholder/300/300' },
  ];

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl">⚔️</div>
          <div className="flex space-x-2">
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors">
              <span className="text-white">↓</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors">
              <span className="text-white">🔍</span>
            </button>
          </div>
        </div>
      </header>


      {/* Search and filter */}
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:border-purple-500 focus:outline-none transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 text-gray-300">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded flex items-center transition-colors">
            <span className="mr-2">👁️</span> Mode: View
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded flex items-center transition-colors">
            <span className="mr-2">↓</span> Newest
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded flex items-center transition-colors">
            <span>⋮</span>
          </button>
        </div>
      </div>

      {/* Characters grid */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredCharacters.map((character) => (
            <div key={character.id} className="bg-gray-800 rounded overflow-hidden cursor-pointer group transform hover:scale-105 hover:shadow-lg transition-all duration-300">
              <div className="aspect-square bg-gray-800 relative overflow-hidden">
                <img 
                  src={character.image} 
                  alt={character.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <div className="p-3 text-gray-300 text-sm truncate border-t border-gray-700 group-hover:bg-purple-900 group-hover:text-white transition-colors duration-300">
                {character.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto p-4 bg-gray-800 text-gray-400 text-sm">
        <div className="container mx-auto">
          © 2025 Wuthering Waves Gallery
        </div>
      </footer>
    </div>
  );
};

export default WutheringWavesGallery;