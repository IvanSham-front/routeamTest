import ProjectItem from "./Project-item"
import { useEffect, useState } from "react"
import Paginator from "./Paginator"
import SelectSize from "./selectSize";


function ProjectList(props) {
    const [currentNumber, setCurrentNumber] =  useState(1);
    const [sizePage, setSizePage] = useState(9);

    function paginatedProjects() {
        return (props.projects.slice(sizePage*(currentNumber-1), (sizePage*(currentNumber-1))+sizePage))
    }

    function onClickPage(number) {
        setCurrentNumber(number)
        localStorage.setItem('currentNumber', number)
    }

    function onChangeSetSize(value) {
        setSizePage(value)
        setCurrentNumber(1)
        localStorage.setItem('sizePage', value);
        localStorage.setItem('currentNumber', 1)
    }

    useEffect(() => {
        paginatedProjects()
    }, [sizePage])


    useEffect(() => {
        const number = +localStorage.getItem('currentNumber');
        const size = +localStorage.getItem('sizePage');
        if (number && size) {
            setCurrentNumber(number);
            setSizePage(size)
        }
        
    }, [])

    return (
        <div className="main-project container">
            <h2 className="hidden">Найденные проекты</h2>
            <ul className=" justify-content-between flex-wrap flex-row list-group projects projects__inner">
            {
                paginatedProjects().map((project, index) => {
                    return (
                        <li className="projects__item col-lg-6" key={Math.random(index * 13)}>
                            <ProjectItem
                                link={project.html_url}
                                title={project.name}
                                authorPhoto={project.owner.avatar_url}
                                authorName={project.owner.login}
                                stars={project.stargazers_count}
                                views={project.watchers_count}
                                id={project.id}
                                comment={project.comment}
                                onSubmitComment={props.onSubmitComment}/>
                        </li>
                    )
                })
            }
            </ul>

            <SelectSize
            onChangeSetSize={onChangeSetSize}
            sizePage={sizePage}
            />

            <Paginator
            sizePage={sizePage}
            currentNumber={currentNumber}
            onClickPage={onClickPage}
            data={props.projects}
            />
        </div>
        
    )
}

export default ProjectList