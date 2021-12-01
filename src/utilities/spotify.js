const mapTracks = (tracks) => {
  return tracks.items.map(({ name, href, type, album }) => {
    return {
      name, href
    }
  })
}