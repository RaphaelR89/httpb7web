import "./styles.css";
import { Movie } from "./types/Movie";

import { useState, useEffect, ChangeEvent } from "react";
export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // const loadMovies = () => {
  //   fetch("https://api.b7web.com.br/cinema")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       setMovies(json);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       setMovies([]);
  //       console.error(err);
  //     });
  // };

  const loadMovies = async () => {
    try {
      setLoading(true);
      let response = await fetch("https://api.b7web.com.br/cinema");
      let json = await response.json();
      setLoading(false);
      setMovies(json);
    } catch (err) {
      setLoading(false);
      setMovies([]);
      console.error(err);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      {loading && <div>Carregando...</div>}
      {!loading && movies.length > 0 && (
        <>
          <div>Total de Filmes :{movies.length}</div>
          <div>
            {movies.map((item, index) => (
              <div>
                <img src="{item.avatar}" alt="" />
                {item.titulo}
              </div>
            ))}
          </div>
        </>
      )}
      {!loading && movies.length === 0 && <div>tente novamente mais tarde</div>}
    </div>
  );
}
