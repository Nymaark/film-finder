'use client';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(searchParams);
        

        if (query) {
            params.set('query', query);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 400)

    return (
        <>
            <div className="searchbar w-100 md:w-140 md:h-15 h-16 bg-indigo-200/10 flex justify-center mt-10 mb-8 md:mt-18 items-center md:p-3 p-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 md:size-8 text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input type="text" defaultValue={searchParams.get('query')?.toString()} onChange={(e) => handleSearch(e.target.value)} className="w-100 md:w-140 p-2 text-xl text-white focus:outline-none" placeholder="Search more than a million movies..." />
            </div>
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