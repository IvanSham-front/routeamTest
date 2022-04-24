export default function SelectSize(props) {
    return(
        <div className="custom-select custom-select__inner">
        <select className="" name="size-pages" 
            value={props.sizePage} 
            onChange={(e) => props.onChangeSetSize(e.target.value)}>
                <option value='9'>9</option>
                <option value='27'>27</option>
                <option value='49'>49</option>
            </select>
        </div>
        
    )
}