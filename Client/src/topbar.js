/**
 * Created by jwb19 on 2017-03-20.
 */
import React from 'react'; // pulls Component object out of React library
import PersonIcon from 'material-ui/svg-icons/Action/accessibility'
import ContactsIcon from 'material-ui/svg-icons/communication/contacts'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'

const TopBar = (props) => {
	const iconStyles = {
			height: 50,
			width: 50,
			marginTop: -10
		},
		onIconClicked = () => {
			props.viewDialog(); // notify the parent
		}
	return (
		<Toolbar style={{backgroundColor: '#19c69b', color: 'white', marginBottom:20}}>
			<ToolbarTitle style={{fontWeight: 20}} text='ChitChat Messaging App'/>
			<IconButton tooltip="Show Who's Online"
									tooltipPosition="bottom-left"
									onClick={onIconClicked}
									iconStyle={iconStyles}
			>
				<ContactsIcon style={iconStyles} color='white' />
			</IconButton>
		</Toolbar>
	)
}
export default TopBar
