import React, { useState } from 'react';

const WutheringWavesGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample character data with rarity added
  const characters = [
    { id: 1, name: 'T_IconRole_Pile_baizhi_UI', image: 'https://wuthering.gg/_ipx/q_70&s_800x1104/images/IconRolePile/T_IconRole_Pile_bailian_UI.png', rarity: 5 },

  ];

  // Function to get glow color based on rarity
  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 5: return 'from-yellow-400 to-yellow-600';
      case 4: return 'from-purple-500 to-purple-700';
      case 3: return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header with logo */}
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl">WutheringStats</div>
          <div className="flex space-x-2">
            {/* <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors">
              <span className="text-white">↓</span>
            </button> */}
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors">
              <span className="text-white">🔍</span>
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb navigation */}
      <div className="container mx-auto p-4 flex items-center space-x-2 text-gray-400">
        <a href="#" className="hover:text-white transition-colors">🏠</a>
        <span>›</span>
        <a href="#" className="hover:text-white transition-colors">Wuthering Waves</a>
        <span>›</span>
        <span className="text-white">Portraits</span>
      </div>

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
            <div key={character.id} className="rounded overflow-hidden cursor-pointer group transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                {/* Character image container with aspect ratio */}
                <div className="aspect-[400/552] bg-gray-800 relative overflow-hidden">
                  {/* Grayscale image that becomes colored on hover */}
                  <img 
                    src={character.image} 
                    alt={character.name} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  
                  {/* Rarity-based glow effect that appears on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${getRarityColor(character.rarity)} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>
                
                {/* Character name (no border or background) */}
                <div className="py-2 px-1 text-gray-300 text-sm truncate group-hover:text-white transition-colors duration-300">
                  {character.name}
                </div>
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