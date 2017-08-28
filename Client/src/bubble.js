/**
 * Created by jwb19 on 2017-03-27.
 */
import React from 'react'
import styles from './index.scss'
const Bubble = (props) => {
	return (
		<div className={styles.msgBubble} style={{
			marginLeft: props.margin,
			backgroundColor: props.color,
			marginLeft: props.marginLeft
		}}>
			<span style={{fontSize: 'smaller', textAlign:'right'}}>At: {props.time}</span>
			<br/>
			<span style={{fontWeight:'bold'}}>{props.user} says:</span>
			<br />
			<span>{props.text}</span>
		</div>
	)
}
export default Bubble
