import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import './App.css';
import MusicHome from "./music/MusicHome";
import { Fragment } from "react";
import NavBar from "./layout/NavBar";
import Home from "./Home";
import NotFound from './layout/NotFound';
import ArticleHome from './wiki/ArticleHome';
import VideoHome from './video/VideoHome';

const App = () => {

  return (
    <Router>
      <Fragment>
        <div className='ui container'>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/music" element={<MusicHome />} />
            <Route exact path="/wiki" element={<ArticleHome />} />
            <Route exact path="/youtube" element={<VideoHome />} />
            <Route element={<NotFound />} />
          </Routes>
        </div>

      </Fragment>
    </Router>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(App);