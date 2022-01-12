import * as React from "react";
import PropTypes from "prop-types";
import { fetchRepos } from "../utils/api";

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      reposByLanguage: {},
    };

    this.changeLanguage = this.changeLanguage.bind(this);
    this.addRepos = this.addRepos.bind(this);
  }

  componentDidMount() {
    //update to new selected language
    this.changeLanguage(this.state.selectedLanguage);
  }

  changeLanguage(language) {
    const { reposByLanguage } = this.state;

    //should mean updaate the selected state
    this.setState({ selectedLanguage: language });

    if (!reposByLanguage[language]) {
      //fetch the repos
      //update reposBylanguage
      fetchRepos(language).then((repos) => this.addRepos({ language, repos }));
    }
  }

  addRepos({ language, repos }) {
    this.setState((state) => this.state.reposByLanguage = {
      ...state.reposByLanguage,
      [language]: repos
    });
  }

  render() {
    const { selectedLanguage, reposByLanguage } = this.state;
    return (
      <React.Fragment>
        <LanguageSelector
          selected={selectedLanguage}
          onClick={this.changeLanguage}
        />
        <CardGrid repos={reposByLanguage[selectedLanguage]} />
      </React.Fragment>
    );
  }
}

function LanguageSelector({ selected, onClick }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            style={selected === language ? { color: "rgb(187,46,31)" } : null}
            onClick={() => onClick(language)}
            className="btn-clear nav-link"
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

//grid of cards
function CardGrid({ repos }) {
  return (
    <div className="flex-center card-grid">
      {!repos && <h1>Loading...</h1>}
      {repos && repos.map((repo) => <Card key={repo.id} repo={repo} />)}
    </div>
  );
}

function Card({ repo }) {
  return (
    <div className="card">
      <h3>{repo.name}</h3>
      <img className="card-img" src={repo.owner.avatar_url}></img>
      <span>
        <p>stars: {repo.stars}</p>
        <p>forks: {repo.forks}</p>
      </span>
    </div>
  );
}

LanguageSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
