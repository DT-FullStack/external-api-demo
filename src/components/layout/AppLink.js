import { Link, useMatch, useResolvedPath } from "react-router-dom";

import React from 'react'

const AppLink = ({ to, children }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  const className = match ? 'item active' : 'item';
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export default AppLink
