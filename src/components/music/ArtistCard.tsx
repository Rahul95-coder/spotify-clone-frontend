export default function ArtistCard({artist}:{artist:string}){

    return(

        <div className="bg-neutral-900 p-4 rounded">

            <div className="w-full h-32 bg-neutral-700 rounded mb-2"/>

            <h3>{artist}</h3>

        </div>

    )

}