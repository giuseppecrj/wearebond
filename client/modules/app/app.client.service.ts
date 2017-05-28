import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { ReplaySubject, Observable } from 'rxjs'

export const MOVIES_URL = 'http://localhost:3005/movie_metadata'
export const THEATERS_URL = 'http://localhost:3005/theater_showtimes'
export const INITIAL_THEATRE = 0 // this could a location or a choose button

@Injectable()
export class AppService {
  constructor (http: Http) {
    this.http = http
    this.props = {}
    this.cache = {}
  }

  getMoviesOfSingleTheatre (showtimes, movies) {
    // use cache if no movies are passed
    let storedMovies = movies || this.cache.movies

    const findMovie = (movies, showTimeId) =>
      movies.find(movie => movie.id === showTimeId)

    const foundMovies = Object.keys(showtimes)
      .map((showTimeId, index) =>
        Object.assign({}, findMovie(storedMovies, showTimeId), { showtimes: showtimes[showTimeId] }))

    return foundMovies

    // O(n)?
    // const newShowtimes = []
    // Object.keys(showtimes).map((showTimeId, index) => {
    //   const foundMovie = movies.find((movie) => movie.id === showTimeId)
    //   newShowtimes[index] = Object.assign({}, foundMovie, { times: showtimes[showTimeId] })
    // })

    // console.log(newShowtimes)
    // O(n^2)
    // const finalMovies = []
    // Object.keys(showtimes).map((each, index) => {
    //   movies.map((movie) => {
    //     if (movie.id === each) {
    //       finalMovies[index] = Object.assign({}, movie, { times: showtimes[each] })
    //     }
    //   })
    // })
    // return finalMovies
  }

  init () {
    let subject = new ReplaySubject(1)

    let theatres = this.http.get(THEATERS_URL)
      .map((res) => res.json())
      .catch((err) => Observable.just({ error: err.data.error || 'Server Error' }))

    let movies = this.http.get(MOVIES_URL)
      .map((res) => res.json())
      .catch((err) => Observable.just({ error: err.data.error || 'Server Error' }))

    let finalStream = Observable.forkJoin([theatres, movies])

    finalStream
      .map((source) => source.filter(stream => !stream.error).map(resource => resource))
      .map((stream) => {
        let [theatres, movies] = stream

        if (theatres) {
          this.props.theatres = theatres

          if (movies) {
            // create a simple cache so we don't make an api call every time we click on the button
            this.cache.movies = [...movies]

            // getting only for the first theater in order to avoid handling entire data set at once
            this.props.movies = this.getMoviesOfSingleTheatre(theatres[INITIAL_THEATRE].showtimes, movies)
          }
        }
      })
      .subscribe(() => subject.next(), (err) => subject.error(err))

    return subject
  }
}
