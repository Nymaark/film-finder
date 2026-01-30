import Image from "next/image"

export default function MovieCard({ movie }) {
    console.log(movie)
    
    return (
        <>
            <li className="text-white bg-indigo-950/30 p-5 rounded-2xl shadow-inner shadow-gray-100/20 m-3 lg:w-85" key={movie.id}>
                <div className="image-container flex justify-center">
                    <Image className="rounded-lg" alt={`Movie poster for ${movie.title}`} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-movie.png'} width={450} height={100} />
                </div>
                <div className="info-container relative bottom-1">
                    <p className="ml-1 mt-3 font-semibold text-lg">{movie.title}</p>
                    <p className="info text-gray-400 flex">
                        <img className="inline mr-1" src="/star.svg" />
                        <span className="text-white font-bold">{Number(movie.vote_average).toFixed(1)}</span>
                        <span className="ml-2 mr-2">•</span>
                        <span>{String(movie.original_language).charAt(0).toUpperCase() + String(movie.original_language).slice(1)}</span>
                        <span className="ml-2 mr-2">•</span>
                        <span>{movie.release_date.slice(0, 4)}</span>
                    </p>
                </div>
            </li>
        </>
    )
}