import React, { Component } from 'react';
import axios from 'axios';
import _ from 'underscore';

import SearchForm from './SearchForm';
import Gallery from './Gallery';

class FlickrSearch extends Component {
  constructor() {
    super();
    this.state = { images: [] };
    this.fetchImages = this.fetchImages.bind(this);
  }

  fetchImages(terms) {
    const generateURL = function (p) {
      return [
        'http://farm',
        p.farm,
        '.static.flickr.com/',
        p.server,
        '/',
        p.id,
        '_',
        p.secret,
        '_q.jpg' // Change 'q' to something else for different sizes (see docs)
      ].join('');
    };

    console.log('Searching flickr for', terms);
    const flickrURL = 'https://api.flickr.com/services/rest';
    const flickrParams = {
      method: 'flickr.photos.search',
      api_key: '2f5ac274ecfac5a455f38745704ad084',
      text: terms,
      format: 'json',
      nojsoncallback: 1 // why? read the Flickr docs if you're terribly bored.
    };

    axios(flickrURL, { params: flickrParams }).then((results) => {
      const images = _(results.data.photos.photo).map(generateURL);
      this.setState({images: images});
    });
  }

  render() {
    return (
      <div>
        <h1>Image Search</h1>
        <SearchForm onSubmit={ this.fetchImages } />
        <Gallery images={ this.state.images } />
      </div>
    );
  }
};

export default FlickrSearch;
