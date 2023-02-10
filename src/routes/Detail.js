import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function Detail() {
    const { id } = useParams();
    console.log(id);

    // Movie Info API
    const [movieinfo, setMovieInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMovieInfo = async () => {
        // Type 2
        const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        console.log(json);
        setMovieInfo(json.data.movie);
        setLoading(false);
        
    };


    useEffect(() => {
        getMovieInfo();
      }, []);


    
      return (
        <div>
            {loading ? <strong>Data Loading...</strong> : 
            (
                <div>
                    <img src={movieinfo.large_cover_image} alt={movieinfo.title} />
                    <h2><Link to={`/movie/`}>{movieinfo.title}</Link></h2>
                    <p>{movieinfo.description_full}</p>
                    <ul>
                      {movieinfo.genres.map((g, idx) => (
                          <li key={idx}>{g}</li>
                      ))}
                    </ul>
                    <p>{movieinfo.url}</p>
                  </div>
            )}
        </div>
    );

}

export default Detail;