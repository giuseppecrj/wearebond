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

  setActiveButton (id) {
    this.state.buttonActive = id
  }

  createCopy () {
    this.movies = Object.assign([], this.props.movies)
  }

  initialValues () {
    this.sub = this.appService
      .init()
      .subscribe(() => {
        this.props = this.appService.props
        this.setActiveButton(this.props.theatres[INITIAL_THEATRE]['id'])
        this.createCopy()
      })
  }

  ngOnInit () {
    this.initialValues()
  }

  chooseTheater (theatre) {
    this.setActiveButton(theatre.id)
    this.props.movies = this.appService.getMoviesOfSingleTheatre(theatre.showtimes)
    this.queryString = ''
    this.createCopy()
  }

  filterMovies (value) {
    if (!value) this.createCopy()
    this.movies = Object.assign([], this.props.movies).filter((item) => {
      return item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    })
  }
}
