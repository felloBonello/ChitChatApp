/**
 * Created by jwb19 on 2017-03-20.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from 'material-ui/List/ListItem'
import Bubble from './bubble'
import Triangle from './triangle'

class Message extends React.Component {
	constructor() {
		super()
	}
	componentDidMount = () => {
		var userDOM = ReactDOM.findDOMNode(this)
		userDOM.scrollIntoView({block: "end", behavior: "smooth"})
		userDOM.blur()
	}
	render() {
		return (
			<ListItem ref='Message' style={{textAlign: 'left'}} disabled={true}>
				<Bubble user={this.props.user} text={this.props.text} time={this.props.time} color={this.props.color} marginLeft={this.props.marginLeft}/>
				<Triangle color={this.props.color} marginLeft={this.props.marginLeft}/>
			</ListItem>
		)
	}
}
export default Message
