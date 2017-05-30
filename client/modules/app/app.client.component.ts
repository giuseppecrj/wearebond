import { Component } from '@angular/core'
import * as template from './app.client.component.pug'
import './app.client.component.sass'

import { AppService, INITIAL_THEATRE } from './app.client.service'

@Component({
  providers: [AppService],
  selector: 'app',
  template
})

export class AppComponent {
  constructor (appService: AppService) {
    this.appService = appService
    this.props = {}
    this.state = {}
  }

  // helpers
  ascending (items, criteria) {
    const asc = (a, b) => a[criteria] < b[criteria] ? -1 : (a[criteria] > b[criteria]) ? 1 : 0
    return items.slice().sort(asc)
  }

  descending (items, criteria) {
    const desc = (a, b) => a[criteria] > b[criteria] ? -1 : (a[criteria] < b[criteria]) ? 1 : 0
    return items.slice().sort(desc)
  }

  sortBy (movies, criteria = 'title', ascending = true) {
    if (ascending) {
      return this.ascending(movies, criteria)
    } else {
      return this.descending(movies, criteria)
    }
  }

  createCopy () {
    this.movies = this.sortBy(this.props.movies)
    this.ratings = Object.assign([], this.props.ratings)
  }

  // ui functions
  sortByTitle (criteria) {
    this.state.ascending = !this.state.ascending
    this.movies = this.sortBy(this.props.movies, criteria, this.state.ascending)
  }

  compareTimes (time) {
    const currentTime = new Date()
    const createTime = (current) => {
      return `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()} ${time}`
    }
    const scheduledTime = new Date(createTime(currentTime))

    return scheduledTime < currentTime
  }

  chooseTheater (theatre) {
    this.setActiveButton(theatre.id)
    this.props.movies = this.appService.getMoviesOfSingleTheatre(theatre.showtimes)
    this.props.ratings = this.appService.getRatingsOfSingleTheatre(this.props.movies)
    this.queryString = ''
    this.setRating()
    this.setSorting()
    this.createCopy()
  }

  filterMoviesByTitle (value) {
    if (!value) this.createCopy()

    this.setRating()
    this.movies = Object.assign([], this.props.movies).filter((item) => {
      return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    })
    this.ratings = this.appService.getRatingsOfSingleTheatre(Object.assign([], this.movies))
  }

  filterMoviesByRating (value) {
    if (!value) {
      this.createCopy()
    } else {
      this.movies = Object.assign([], this.props.movies).filter((item) => {
        return item.rating === value
      })
    }
  }

  openFilter () {
    this.state.showFilters = !this.state.showFilters
  }

  // initial values
  setActiveButton (id) {
    this.state.buttonActive = id
  }

  setSorting () {
    this.state.ascending = true
  }

  setRating () {
    this.state.ratings = []
    this.state.showFilters = false
    this.ratingQuery = 'back'
  }

  initialValues () {
    this.sub = this.appService
      .init()
      .subscribe(() => {
        this.props = this.appService.props
        this.setActiveButton(this.props.theatres[INITIAL_THEATRE]['id'])
        this.setSorting()
        this.setRating()
        this.createCopy()
      })
  }

  ngOnInit () {
    this.initialValues()
  }
}
