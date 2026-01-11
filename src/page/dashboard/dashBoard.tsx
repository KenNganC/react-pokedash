import { useState, useMemo, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonPage, type PokemonDetail } from "../../api/api";
import { useIntersectionObserver } from "../../hooks";
import { BookMarked, Loader2, Search } from "lucide-react";
import PokemonCard from "./pokemonCard";
import Loading from "./loading";
import Error from "./error";
import Drawer from "./drawer";
function DashBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemonPage,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: 1000 * 60 * 5,
    initialPageParam: 0,
  });

  const allPokemon = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  const filteredList = useMemo(() => {
    return allPokemon.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allPokemon, searchTerm]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !searchTerm) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, searchTerm]);

  const loadMoreRef = useIntersectionObserver(handleLoadMore);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <div
        className={`flex-1 flex flex-col h-full transition-all duration-300 ${
          selectedPokemon ? "lg:ml-112.5" : ""
        }`}
      >
        <header className="bg-red-800 border-b border-slate-200 px-6 py-4 shrink-0 z-20">
          <div className="max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm">
                    <BookMarked
                      className="w-5 h-5 fill-current"
                      color="black"
                    />
                  </div>
                  PokeDash
                </h1>
                <p className="text-sm text-slate-300 font-medium">
                  Pokemon Dashboard
                </p>
              </div>

              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search filtered loaded Pokemon..."
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent text-slate-900 placeholder-slate-400 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 relative">
          <div className="max-w-5xl mx-auto min-h-full flex flex-col">
            {isLoading && <Loading />}

            {isError && (
              <Error
                message={error?.message}
                onRetry={() => window.location.reload()}
              />
            )}
            {!isLoading && !isError && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div />
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    {filteredList.length} Loaded
                  </h2>
                </div>

                {filteredList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                    {filteredList.map((pokemon) => (
                      <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={setSelectedPokemon}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-slate-400 font-medium">
                      No Pokemon found matching "{searchTerm}"
                    </p>
                  </div>
                )}

                {!searchTerm && (
                  <div
                    ref={loadMoreRef}
                    className="py-8 flex justify-center items-center w-full mt-auto"
                  >
                    {isFetchingNextPage ? (
                      <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-medium">
                          Catching more Pokemon...
                        </span>
                      </div>
                    ) : hasNextPage ? (
                      <span className="h-8 block"></span>
                    ) : (
                      <div className="text-slate-400 text-sm font-medium">
                        You've caught 'em all! (All loaded)
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
      <Drawer
        pokemon={selectedPokemon}
        isOpen={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}

export default DashBoard;
