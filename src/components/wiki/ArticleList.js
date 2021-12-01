import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { selectArticle } from "../../actions/wiki";

const ArticleList = ({ articles, current_id, selectArticle }) => {
  const renderList = () => {
    return (
      <div className="ui divided list">
        {articles.search.map(article => (
          <div key={article.pageid} className={article.pageid === current_id ? "item clickable active" : "item clickable"} onClick={e => selectArticle(article)}>
            <h4 className="ui header">{article.title}</h4>
          </div>
        ))}
      </div>
    )
  }


  const { search } = articles;
  if (!search) return <h2>No Results</h2>;
  return (
    <Fragment>
      <h1 className='ui header'>Wikipedia Results</h1>
      {renderList()}
    </Fragment>

  );
}

const mapStateToProps = ({ articles: { list, selected: { present } } }) => ({
  articles: list,
  current_id: present ? present.pageid : null
})

export default connect(mapStateToProps, { selectArticle })(ArticleList)
