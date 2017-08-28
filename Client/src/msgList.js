/**
 * Created by jwb19 on 2017-03-20.
 */
import React from 'react'
import List from 'material-ui/List/List'
import User from './message'

const MsgList = (props) => {
	const msgs = props.messages.map((msg, i) =>
	{
		return (<User key={i} user={msg.user} text={msg.text} time={msg.time} color={msg.color} marginLeft={msg.marginLeft}/>);
	})
	return (
		<List>
			{msgs}
		</List>
	)
}
export default MsgList
