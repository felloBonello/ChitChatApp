/**
 * Created by jwb19 on 2017-03-20.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import ExerciseComponent from './main'
// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
ReactDOM.render(
	<ExerciseComponent />, document.getElementById('app')
)
