export default function Paginator(props) {
    function dataSilce(data, sizePage) {
        return Math.ceil(data.length/sizePage)
    }

    const arrNumbers = [];
    for(let i = 0; i < dataSilce(props.data, props.sizePage); i++) {
        arrNumbers.push(i + 1);
    } 

    return (
        <nav aria-label="">
            <ul className="pagination pagination__position justify-content-center container-fluid">
                <li className={props.currentNumber <= 1  ? 'page-item disabled': 'page-item'}>
                    <button 
                    className='page-link'
                     onClick={()=>props.onClickPage(props.currentNumber-1)} 
                     disabled={props.currentNumber <= 1 ? 'disabled' : false}
                     aria-label="Previous">
                        <span aria-hidden="true">&#5176;</span>
                    </button>
                </li>
                {
                arrNumbers.map(number => {
                    return (
                        <li className={number === props.currentNumber ? 'page-item active' : 'page-item'} key={number}>
                            <button className="page-link"
                            onClick={() => props.onClickPage(number)}
                            type="button"
                            >{number}</button>
                        </li>
                    )
                })}
                <li className={props.currentNumber === arrNumbers[arrNumbers.length - 1] ? 'page-item disabled': 'page-item'}>
                    <button 
                    className="page-link" 
                    onClick={()=>props.onClickPage(props.currentNumber+1)} 
                    disabled={props.currentNumber === arrNumbers[arrNumbers.length - 1] ? 'disabled' : false}
                    aria-label="Previous">
                        <span aria-hidden="true">&#5171;</span>
                    </button>
                </li>
            </ul>
    </nav>
    )
}
