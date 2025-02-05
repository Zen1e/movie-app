import FetchPopular from './fetch/FetchPopular'
import Link from 'next/link';

type el = {
    poster_path: string
    vote_average: number
    title: string
    id: number
}

export default function Popular(){
    const popular = FetchPopular();
    popular.length = 10;
    return(
        <div className="max-w-[1260px] mt-[100px]">
            <div className="w-[95%] mx-auto h-[50px] flex justify-between font-bold mb-[50px]">
                <p className="text-[30px]">Popular</p>
                <Link href={{pathname: '/category', query: {category: 'popular', page: 1}}}><button>See more...</button></Link>
            </div>
            <div className='flex flex-wrap justify-center gap-y-[30px] gap-x-[20px]'>
                {popular.map((element:el,index)=>(
                    <div className='w-[230px] h-[440px] bg-gray-500/20 rounded-[10px] overflow-hidden' key={element.id}>
                        <Link href={`./details/${element.id}`}>
                        <div className='w-[230px] h-[340px]'>
                            <img src={`https://image.tmdb.org/t/p/original/${element.poster_path}`} alt="" />
                        </div>
                        <div className="flex gap-[6px] mt-[15px] ml-[13px]">
                            <img src="./star.svg" className='w-[20px] h-[20px] mt-[2px]'/>
                            <p className="font-bold text-[16px]">{Math.round(element.vote_average*10)/10}<span className="font-semibold text-[14px] text-gray-500">/10</span></p>
                        </div>
                        <p className='ml-[13px] mt-[5px] line-clamp-2'>{element.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}