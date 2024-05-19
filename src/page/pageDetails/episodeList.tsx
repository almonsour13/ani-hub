
interface EpisodesProps{
    id:number,
    title:string
}
const EpisodesList: React.FC = ()=>{
    return(
        <>
          <div className="grid grid-cols-1 gap-0">
            {[...Array(100)].map((_, index) => (
                <a className="group bg-base-100 hover:bg-base-300 flex h-auto w-full rounded p-3 pl-0 hover:pl-3 transition-all">
                    <div className="w-full group-hover:text-primary">
                        Chapter {index+1}
                    </div>
                    <div className="">
                        a
                    </div>
                </a>
            ))}
          </div>
        </>
    );
}
export default EpisodesList;