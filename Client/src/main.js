import React from 'react'
import TopBar from './topbar'
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card'
import Button from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import styles from './index.scss'
import io from 'socket.io-client'
import MsgList from './msgList'
import UserList from './userList'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//var socket = io(`http://localhost:3020`);
var socket = io()

class ExerciseComponent extends React.Component {

	constructor() {
		super()
		this.state = {
			users: [],
			messages: [],
			loggedIn: false,
			message: "",
			user: "",
			color: "#7E7E7E",
			ErrMsg: "",
			showUsers: false,
			statusMsg: ""
		}
	}
	componentDidMount() {
		socket.on('init', this.initialize);
		socket.on('user.join', this.userJoinedHandler)
		socket.on('user.left', this.userLeftHandler)
		socket.on('send.message', this.sendMessageHandler)
		socket.on('user.typed', this.userTypedHandler)
	}

	initialize = (data) => {
		this.setState({users: data.users, color: data.color})
	}

	sendMessageHandler = (data) => {
		if(this.state.loggedIn) {
			var {messages, statusMsg} = this.state
			statusMsg = ""
			data.marginLeft = '40%'
			messages.push(data)
			this.setState({messages, statusMsg})
		}
	}

	userJoinedHandler = (data) => {
		var {users, messages} = this.state;
		users.push({name: data.user, color: data.userColor})
		messages.push({
			user: 'Admin',
			text: data.user + ' has joined',
			time: data.time,
			color: data.color,
			marginLeft: '40%'
		});
		this.setState({users, messages})
	}

	userLeftHandler = (data) => {
		var {users, messages} = this.state
		var index = users.indexOf(data.user)
		users.splice(index, 1);
		messages.push({
			user: 'Admin',
			text : data.user +' has left',
			time: data.time,
			color: data.color,
			marginLeft: '40%'
		});
		this.setState({users, messages})
	}

	userTypedHandler = (data) => {
		if(this.state.loggedIn)
		{
			this.setState({statusMsg: data.user + " is typing.."})
		}
	}

	login = () =>{
		socket.emit('user.join', { name: this.state.user }, (result) => {
			if(!result) {
				this.setState({ErrMsg: "A user with that name already exists"})
			}
			else{
				var d = new Date()
				var {loggedIn, messages} = this.state
				messages.push({
					user: 'Admin',
					text : 'Welcome ' + this.state.user,
					time: d.toTimeString().substring(0, 8),
					color: '#7E7E7E',
					marginLeft: '40%'
				})
				loggedIn = true;
				this.setState({loggedIn, messages})
			}
		})
	}

	submitMessage = () => {
		var {messages} = this.state
		var d = new Date()
		var newMessage =
			{
				user: this.state.user,
				text: this.state.message,
				time: d.toTimeString().substring(0, 8),
				color: this.state.color,
				marginLeft: '0%'
			}
		messages.push(newMessage)
		this.setState({messages})
		socket.emit('send.message', newMessage)
	}

	nameChangeHandler = (e) => {
		this.setState({ user: e.target.value })
	}

	nameKeyHandler = (e) => {
		if (e.key === 'Enter') {
			this.login()
		}
	}

	messageChangeHandler = (e) => {
		if(e.target.value.length == 1)
			socket.emit('user.typed')
		this.setState({ message: e.target.value })
	}

	messageKeyHandler = (e) => {
		if (e.key === 'Enter' && this.state.message !== "") {
			this.submitMessage()
			this.setState({message: ""})
		}
	}

	handleOpenDialog = () => {
		this.setState({showUsers: true});
	}

	handleCloseDialog = () => {
		this.setState({showUsers: false});
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<div>
					<TopBar viewDialog={this.handleOpenDialog}/>

					<Dialog title="Current Users" style={{textAlign: "center"}} modal={false} open={this.state.showUsers}
									onRequestClose={this.handleCloseDialog}>
						<div className={styles.usersList}>
							<UserList users={this.state.users} />
						</div>
					</Dialog>

					<span>{this.state.statusMsg}</span>

					{ this.state.loggedIn === false &&
						<Card style={{textAlign: 'center', marginLeft: '10%', width: '80%',}}>
							<CardHeader>
								<div><label style={{textAlign: 'center'}} htmlFor="chatName">Sign In</label></div>
							</CardHeader>
							<TextField
								id = "chatName"
								label="Chat Name"
								onChange={this.nameChangeHandler}
								onKeyPress={this.nameKeyHandler}
								value={this.state.user}
								style={{width: '60%'}}
								errorText={this.state.ErrMsg}
							/>
							<CardActions>
								{ this.state.user === "" &&
									<Button onClick={this.login} disabled>JOIN CHAT</Button>
								}
								{ this.state.user !== "" &&
									<Button className={styles.enabledBtn} onClick={this.login}>JOIN CHAT</Button>
								}
							</CardActions>
						</Card>
					}

					{ this.state.loggedIn === true &&
						<Card style={{marginLeft: '10%', width: '80%'}}>
							<CardText style={{textAlign: 'center'}}>
								<div className={styles.messageList}>
									<MsgList messages={this.state.messages} />
								</div>
								<TextField
									id = "messageText"
									label="Message"
									onChange={this.messageChangeHandler}
									onKeyPress={this.messageKeyHandler}
									value={this.state.message}
									style={{width: '80%'}}
								/>
							</CardText>
						</Card>
					}

				</div>
			</MuiThemeProvider>
		)
	}
}
export default ExerciseComponent
