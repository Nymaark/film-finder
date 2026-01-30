'use client';
import { useState, useEffect } from "react";
import MovieCard from "./movie-cards";

export function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjY2MTUwYjhjNjMxNDdjN2Y1NWViYzA0OGI0YzcwOSIsIm5iZiI6MTc2OTYzODEzNS43MDIwMDAxLCJzdWIiOiI2OTdhODhmN2UwNzY0NWZjNDExZjM2YzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4P-kDGHALeT7Q-OiFkO1cicFM80xw4NtNa9cROgEXWs'
            }
        };

        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
            .then(res => res.json())
            .then(res => setSearchResults(res.results))
            .catch(err => console.error(err));
    }, [searchTerm])
    console.log(searchResults)
    return (
        <>
            <div className="searchbar w-90 md:w-100 md:h-12 h-13 bg-indigo-200/10 flex justify-center mt-10 mb-5 md:mt-18 items-center md:p-3 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-90 md:w-100 p-2 text-white" placeholder="Search more than a million movies..." />
            </div>
            <ul className="results grid lg:grid-cols-3 grid-cols-2 md:grid-rows-5 md:gap-4">
                {searchResults.map((movie) => (
                    <MovieCard movie={movie} />
                ))}
            </ul>
        </>
    )
}

/* results: 
Array(20)
0: 
adult: false
backdrop_path: "/5h2EsPKNDdB3MAtOk9MB9Ycg9Rz.jpg"
genre_ids: (5) [16, 35, 12, 10751, 9648]
id: 1084242
original_language: "en"
original_title: "Zootopia 2"
overview: "After cracking the biggest case in Zootopia's history, rookie cops Judy Hopps and Nick Wilde find themselves on the twisting trail of a great mystery when Gary De'Snake arrives and turns the animal metropolis upside down. To crack the case, Judy and Nick must go undercover to unexpected new parts of town, where their growing partnership is tested like never before."
popularity: 376.1868
poster_path: "/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg"
release_date: "2025-11-26"
title: "Zootopia 2"
video: false
vote_average: 7.6
vote_count: 1294


*/