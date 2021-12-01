import React, { useEffect, useMemo } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { getArticles, setArticleTerm } from '../../actions/wiki';

const ArticleSearch = ({ searchTerm, getArticles, setArticleTerm }) => {
  const memoized = useMemo(() => _.debounce(() => getArticles(searchTerm), 500),
    [getArticles, searchTerm]);

  useEffect(() => {
    memoized();
    return () => memoized.cancel();
  }, [memoized])

  return (
    <div className='ui row'>
      <div className="ui form">
        <div className='ui fluid icon input'>
          <input value={searchTerm} onChange={e => setArticleTerm(e.target.value)} placeholder="Search" type="text" className='item' />
          <i className="inverted circular search link icon"></i>
        </div>
      </div>
    </div >
  )
}

const mapStateToProps = ({ articles }) => ({
  searchTerm: articles.search.term
})

export default connect(mapStateToProps, { getArticles, setArticleTerm })(ArticleSearch)
