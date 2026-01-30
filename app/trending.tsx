import { supabase } from "./lib/supabase";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: "400"
})

export default async function Trending() {
    const { data: topMovies, error } = await supabase
        .from('movies')
        .select('movie')
        .order('count', { ascending: false })
        .limit(5)

    return (
        <>
            <h2 className="w-full xl:w-auto xl:mr-227 text-2xl mb-4 font-black">Trending Movies</h2>
            <ul className="flex flex-row overflow-x-auto gap-5 -mt-10 w-full xl:w-auto hide-scrollbar">
                {topMovies?.map((poster, index) => (
                    <li className="min-w-[230px] flex flex-row items-center" key={poster.movie}>
                        <p className="text-[190px] font-['Bebas_Neue'] [text-stroke:5px_rgba(206,206,251,0.5)] [-webkit-text-stroke:5px_rgba(206,206,251,0.4)] mt-[22px] text-transparent text-nowrap">{index + 1}</p>
                        <Image alt="Movie poster" src={poster.movie ? `https://image.tmdb.org/t/p/w500${poster.movie.replace(/"/g, "")}` : '/no-movie.png'} className="rounded-lg object-cover -ml-3.5" width={150} height={100} />
                    </li>
                ))}
            </ul>
            <h2 className="w-full xl:mr-200 xl:w-auto text-2xl mb-2"><span className="font-black">All Movies </span><span className="text-white/50">(by popularity)</span></h2>
        </>
    )
}


/*
  .trending {
    @apply mt-20;

    & ul {
      @apply flex flex-row overflow-y-auto gap-5 -mt-10 w-full hide-scrollbar;
    }

    & ul li {
      @apply min-w-[230px] flex flex-row items-center;
    }

    & ul li p {
      @apply fancy-text mt-[22px] text-nowrap;
    }

    & ul li img {
      @apply w-[127px] h-[163px] rounded-lg object-cover -ml-3.5;
    }
  } */