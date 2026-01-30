import MovieCard from "./movie-cards";
import postgres from "postgres";
import { supabase } from "../lib/supabase";

const sql = postgres(process.env.NEXT_PUBLIC_SUPABASE_URL!, { ssl: 'require'})

const api_key = process.env.TMDB_API_READ_ACCESS_TOKEN;

const TMDB_URL = "https://api.themoviedb.org/3"

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api_key}`
    }
};  


    
export default async function MovieResults({ query }) {
    
    async function fetchMovies() {
        try {
            const response = await fetch(
                query 
                    ? `${TMDB_URL}/search/movie?query=${query}` 
                    : `${TMDB_URL}/discover/movie?sort_by=popularity.desc`, 
                options
            );
            
            if (!response.ok) {
                console.error('Fetch failed:', response.status, response.statusText);
                return [];
            }
            
            const data = await response.json();
            
            const { data: dbData, error } = await supabase
                .rpc('upsert_movie', {
                    movie_id: data.results[0].id,
                    movie_data: data.results[0].poster_path
                })
            
            if (error) {
                console.log(error)
            }
            console.log(dbData)

            return data.results || [];
        } catch (err) {
            console.error('Error fetching movies:', err);
            return [];
        }
    }

    const searchResults = await fetchMovies();

    if (!searchResults || searchResults.length === 0) {
        return <p className="text-xl font-semibold mt-5">No results found</p>;
    }

    return (
        <ul className="results grid lg:grid-cols-3 grid-cols-2 md:grid-rows-5 md:gap-4">
            {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
    );
}