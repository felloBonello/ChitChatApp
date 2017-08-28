/**
 * Created by jwb19 on 2017-03-27.
 */
import React from 'react'
import styles from './index.scss'
const Triangle = (props) => {
	return (
		<div
			className={styles.msgTriangle}
			style={{
				borderColor: `${props.color} transparent`,
				marginLeft: props.marginLeft
			}} />
	)
}
export default Triangle
