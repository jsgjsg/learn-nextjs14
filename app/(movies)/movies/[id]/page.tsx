import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

type IParams = Promise<{
  id: string;
}>;

export async function generateMetadata(props: { params: IParams }) {

  const params = await props.params;
  const id = params.id;
  const movie = await getMovie(id);
  
  return {
    title: movie.title
  }
}

export default async function MovieDetailPage(props: { params: IParams }) {
  const params = await props.params;
  const id = params.id;

  return (
    <div>
      <Suspense fallback={<h2>Loading movie info</h2>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h2>Loading movie videos</h2>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}