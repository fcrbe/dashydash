"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class Family extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      unfinished : 0,
      title: '',
      text : '',
      image: '',
      done : false
    }
    this.interval = moment.duration(1, 'hour');
    this.callback = function(body) {
      let unfinished = 0;
      for (let i = 0; i < body.length - 1; i++) {
        if (!body[i].done) {
          unfinished++;
        }
      }
      const latest = body[body.length - 1];
      this.setState({
        unfinished : unfinished,
        title : latest.title,
        text : latest.text,
        image : latest.image,
        done : latest.done
      });
    }
  }

  render() {
    var style = {
      backgroundImage: 'url(' + this.state.image + ')'
    }
    let emoji = '';
    if (this.state.title)  {
      emoji = 'white_check_mark';
      if (!this.state.done) {
        let day = new Date().getDate();
        if (day <= 5) {
          emoji = 'slight_smile';
        }
        else if (day <= 10) {
          emoji = 'neutral_face';
        }
        else if (day <= 15) {
          emoji = 'thinking';
        }
        else if (day <= 25) {
          emoji = 'angry';
        }
        else {
          emoji = 'rage';
        }
      }
    }
    return (
      <div className='family' style={style}>
        <div className="family-overlay">
          <p className="padded">{this.state.title}</p>
          <p className="padded small-text">{this.state.text}</p>
        </div>
        <p className="status biggest-text">
          {this.state.unfinished > 0 &&
            <span>{this.state.unfinished}</span>
          }
          <i className={'e1a-' + emoji}></i>
        </p>
      </div>
    );
  }
};

module.exports = Family;
