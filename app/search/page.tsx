import MainLayout from '../components/MainLayout';
import { SearchBar } from './components/SearchBar';
import { SearchSuggestions } from './components/SearchSuggestions';
import { RecentSearches } from './components/RecentSearches';

export default function SearchPage() {
  return (
    <MainLayout>
      <div className="flex flex-col min-h-[calc(100vh-4rem)] max-w-5xl mx-auto px-4 w-full">
        <div className="space-y-8 py-8">
          {/* Search Bar */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <SearchBar />
            </div>
          </div>

          {/* Search Suggestions */}
          <div className="mt-8">
            <SearchSuggestions />
          </div>

          {/* Recent Searches */}
          <div className="mt-8">
            <RecentSearches />
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 