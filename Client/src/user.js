/**
 * Created by jwb19 on 2017-03-20.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import ListItem from 'material-ui/List/ListItem'
import ContactsIcon from 'material-ui/svg-icons/communication/contacts'

class User extends React.Component {
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
			<ListItem ref='User' style={{textAlign: 'center'}} disabled={true}>
				<table style={{width: '100%'}}>
					<tbody>
					<tr>
						<td style={{width: '50%', textAlign: 'center'}}><ContactsIcon color={this.props.color} /></td>
						<td style={{width: '50%', textAlign: 'center'}}>{this.props.user}</td>
					</tr>
					</tbody>
				</table>
			</ListItem>
		)
	}
}
export default User
