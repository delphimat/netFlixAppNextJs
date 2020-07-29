import { useRouter}  from "next/router";
import { getMovieById, deleteMovie } from "../../../actions"
import Link from 'next/link'

const Movie = (props) => {
    const router = useRouter()
    const { id } = router.query
    const {movie} = props

    const handleDelete = () => {
        deleteMovie(id).then(() => {
            router.push('/')
        })
    }

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">{movie.name}</h1>
                <p className="lead"></p>
                <hr className="my-4"/>
                <p>{movie.genre}</p>
                <button className="btn btn-primary btn-lg mr-1">Learn more</button>
                <button onClick={()=> handleDelete(id)} className="btn btn-danger btn-lg mr-1">Delete</button>
                <Link href="/movies/[id]/edit" as={`/movies/${id}/edit`}>
                    <button  className="btn btn-warning btn-lg">Edit</button>
                </Link>
            </div>
            <p>
                {movie.description}
            </p>


        </div>
    )
}


Movie.getInitialProps = async (context) => {

    const { id }  = context.query
    const movie = await getMovieById(id)

    return { movie }
}

export default Movie