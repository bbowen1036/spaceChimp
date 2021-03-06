import React from 'react'

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/Button';

export default ({ children, onClick, btnClassName, tipClassName, tip }) => {
  return (
    <Tooltip title={tip} className={tipClassName} placement='top'>
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  )
}
  