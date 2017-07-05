"use strict";

var React = require('react');
var Weather = require('../modules/weather/weather.jsx');
var Blog = require('../modules/blog/blog.jsx');
var Bus = require('../modules/bus/bus.jsx');
var Calendar = require('../modules/calendar/calendar.jsx');
var TimeOfDay = require('../modules/timeofday/timeofday.jsx');
var Abc = require('../modules/abc/abc.jsx');


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id : props.match.params.boardId,
      name : '',
      modules: []
    };
  }

  componentDidMount() {
    this.setState({ 
      name : 'Board',
      modules : [ 
        { name : 'abc' },
        { name : 'calendar' },
        //{ name : 'timeofday' },
        { name : 'weather' },
        { name : 'blog' },
        { name : 'bus' },
      ]
    });
  }
  
  render() {
    var createModule = function(moduleInfo) {
      const name = moduleInfo.name;
      var Module = require('../modules/' + name + '/' + name + '.jsx');
      return <Module key={name} />
    };

    return (
      <div>
        <h1>{this.state.name} : {this.state.id}</h1>
        {this.state.modules.map(createModule, this)}
      </div>
    );
  }
};

module.exports = Board;