/**
 * Created by jwb19 on 2017-03-20.
 */
import React from 'react'
import List from 'material-ui/List/List'
import User from './user'

const UserList = (props) => {
	const users = props.users.map((user, i) =>
	{
		return (<User key={i} user={user.name} color={user.color}/>);
	})
	return (
		<List>
			{users}
		</List>
	)
}
export default UserList
