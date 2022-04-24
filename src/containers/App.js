import React from "react";
import FormEl from "../components/FormEl";
import ProjectList from "../components/Project-list";
import {URL} from '../url'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      loadProjects: false,
      emptyProject: false,
      fetchOnServe: false,
      error: false,
    }
  }

  onSubmitServe(e, value) {
    e.preventDefault();
    if (value.length >= 3) {
      this.setState({fetchOnServe: true})
      fetch(URL + value)
      .then(response => response.json())
      .then(projects => new Promise(resolve => {
        const projectsItems = projects.items;
        if(projectsItems.length === 0) {
          this.setState({emptyProject: true})
          resolve()
        }
        for (let i= 0; i < projectsItems.length; i++) {
          projectsItems[i].comment = '';
        }
        this.setState({
          projects: projectsItems,
          searchValue: value,
          loadProjects: true,
        });
        localStorage.setItem('projects', JSON.stringify(projectsItems))
        if(projectsItems.length !== 0 && this.state.emptyProject) {
          this.setState({emptyProject: false})
        }
        resolve()
      }))
      .catch(err => {
        this.setState({error: true})
        console.log(new Error(err))
      })
    } else {
      alert ('Поисковой запрос должен быть не менее трех символов')
    }
  }

  onSubmitComment(e, value, id) {
    e.preventDefault();
    const projects = this.state.projects
    for (let index in this.state.projects) {
      if(projects[index].id === id) {
        this.setState(prevState => {
          const newProjects = [...prevState.projects];
          newProjects[index].comment = value;
          localStorage.setItem('projects', JSON.stringify(this.state.projects))
          return {projects: newProjects}
        })
      }
    }
  }

  componentWillMount() {
     const localData = JSON.parse(localStorage.getItem('projects'));
     if (localData && localData.length > 0) {
        this.setState({
          projects:localData,
          loadProjects: true,
          fetchOnServe: true
        })
     }
  }

  render () {
    const loadProjects = this.state.loadProjects;
    const fetchOnServe = this.state.fetchOnServe;
    const emptyProject = this.state.emptyProject;
    const error = this.state.error;

    let loadMain;
    let anotherResult
    if (fetchOnServe && !loadProjects) {
      anotherResult = 'Поиск проектов...'

    } else if (fetchOnServe && loadProjects && emptyProject) {
      anotherResult = 'По вашему запросу ничего не найдено'
    } else if (!fetchOnServe) {
       anotherResult ='Здесь будут найденные проекты'
    } 


    if (loadProjects && fetchOnServe && !error && !emptyProject) {
      loadMain = <main>
                  <ProjectList
                    projects={this.state.projects}
                    onSubmitComment={this.onSubmitComment.bind(this)}
                  />
                </main> 
    } else { 
      loadMain = <div className="another-result">
                    <h2 className="another-result__title">{anotherResult}</h2>
                  </div>
    } 

    return (
      <div className="background">
        <header className="header container-fluid col-12">
          <h1 className="hidden">Поиск репозиториев github</h1>
          <FormEl
          onSubmitServe={this.onSubmitServe.bind(this)}
          searchValue={this.state.searchValue}
          />  
        </header>

      {loadMain}
      </div>
    );
  }

}

export default App;
