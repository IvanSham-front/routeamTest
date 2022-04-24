import { useEffect, useState } from "react";

function FormEl(props) {
    const [searchValue, setSearchValue] = useState('')

    function onChangeValue(e) {
        setSearchValue(e.target.value)
    }

    return (
        <form 
        className="container search-form"
        onSubmit={(e) => props.onSubmitServe(e, searchValue)}>
            <div className="row justify-content-center">
            <input type="text" className="form-control col-10 search-form__input" onChange={(e) => onChangeValue(e)}
            placeholder="Начните вводить текст для поиска (не менее трех символов)"
            ></input>
            <button type="submit" className="btn btn-primary col-1 search-form__btn"></button>
        </div>
      </form>
    )
}

export default FormEl;