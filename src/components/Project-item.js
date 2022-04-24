import { useEffect, useState } from "react"

export default function ProjectItem(props) {
    const [commentValue, setCommentValue] = useState(props.comment)
    const [presenceComment, setPresenceComment] = useState(false)

    function onChangeValue(e) {
        setCommentValue(e.target.value)
    }

    function editComment() {
        setPresenceComment(false);
    }

    useEffect(() => {
        if(props.comment.length > 0) {
            setPresenceComment(true)
        }
    },[])


    let commentItem;
    if (presenceComment) {
        commentItem = <div className="project__comments comment-value flex-nowrap">
                            <span className="form-control comment-value__text">{props.comment}</span>
                            <button type="button" className="btn btn-primary col-1 project__btn comment-value__btn"
                            onClick={editComment}
                            ></button>
                      </div>
    } else {
        commentItem = <form className="project__comments comment-form row flex-nowrap"
                            onSubmit={(e) => props.onSubmitComment(e, commentValue, props.id)}
                            >
                                <input type="text" className="form-control col-8 project__input" placeholder="Комментарий к проекту"
                                onChange={(e) => onChangeValue(e)}
                                ></input>
                                <button type="submit" className="btn btn-primary col-1 project__btn"></button>
                            </form>
         }

    return(
        <div>
            <a href={props.link} className="project">
                <h3 className="project__title">{props.title}</h3>
                <figure className="project__author-info author">
                    <img alt="author" src={props.authorPhoto} className="author__photo"></img>
                    <figcaption className="author__name">{props.authorName}</figcaption>
                </figure>
                <div className="row d-flex flex-row flex-nowrap project__props">
                    <span className="project__stars">{props.stars}</span>
                    <span className="project__views">{props.views}</span>
                </div>
            </a>  

            {commentItem}
        </div>
    )
}
