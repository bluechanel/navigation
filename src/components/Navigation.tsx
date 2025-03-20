"use client";

import { Category, Website } from '@/types/navigation';
import { SearchEngine } from '@/types/searchEngine';
import { useEffect, useState } from 'react';
import { loadCategories } from '@/data/loadCategories';
import { getImageDominantColor, getTextColor } from '@/utils/colorUtils';
import searchEnginesData from '@/data/searchEngines.json';

const WebsiteCard = ({ website }: { website: Website }) => {
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    if (website.icon) {
      getImageDominantColor(website.icon).then(setBgColor);
    }
  }, [website.icon]);

  const textColorClass = getTextColor(bgColor);

  return (
    <a
      href={website.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col gap-1.5 ${textColorClass}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center gap-2">
        {website.icon && (
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src={website.icon}
              alt={website.title}
              className="max-w-full max-h-full"
            />
          </div>
        )}
        <h3 className="text-base font-semibold">{website.title}</h3>
      </div>
      {website.description && (
        <p className="text-xs opacity-85 truncate" title={website.description}>
          {website.description}
        </p>
      )}
    </a>
  );
};

const CategorySection = ({ category }: { category: Category }) => (
  <section className="w-full flex flex-col items-center mb-8">
    <div className="mb-4 w-full">
      <div className="flex items-center gap-2">
        {category.icon && (
          <div className="w-6 h-6 flex items-center justify-center">
            <img src={category.icon} alt={category.name} className="max-w-full max-h-full" />
          </div>
        )}
        <h2 className="text-xl font-bold">{category.name}</h2>
      </div>
      {/* {category.description && (
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {category.description}
        </p>
      )} */}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
      {category.websites.map((website) => (
        <WebsiteCard key={website.url} website={website} />
      ))}
    </div>
  </section>
);

const SearchBox = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedEngine, setSelectedEngine] = useState<SearchEngine>(searchEnginesData.engines[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    if (searchText.trim()) {
      const searchUrl = selectedEngine.searchUrl.replace('{query}', encodeURIComponent(searchText));
      window.open(searchUrl, '_blank');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="relative flex gap-2">
        <div className="relative flex-1 flex items-center">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="absolute left-2 h-full px-2 flex items-center gap-2 focus:outline-none"
          >
            {selectedEngine.icon && (
              <img
                src={selectedEngine.icon}
                alt={selectedEngine.name}
                className="w-6 h-6 object-contain"
              />
            )}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入关键词搜索"
            className="w-full pl-16 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {isDropdownOpen && (
            <div className="absolute left-0 top-full mt-1 w-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden z-10">
              {searchEnginesData.engines.map(engine => (
                <button
                  key={engine.id}
                  onClick={() => {
                    setSelectedEngine(engine);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full p-2 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {engine.icon && (
                    <img
                      src={engine.icon}
                      alt={engine.name}
                      className="w-6 h-6 object-contain"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          搜索
        </button>
      </div>
    </div>
  );
};

export default function Navigation() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories().then(setCategories);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-3/5 mx-auto px-4 py-8 space-y-8">
        <SearchBox />
        {categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}