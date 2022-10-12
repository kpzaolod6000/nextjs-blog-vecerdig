import 'bootstrap/dist/css/bootstrap.css'
import _ld from 'lodash'

const PaginationTrust = ({items, pageSize, currentPage, onPageChange}) => {
    const pageCount =  items / pageSize;
    if (Math.ceil(pageCount) === 1 ) return null;
    const pages = _ld.range(1,pageCount + 1);

    return (
    <nav>
        <ul className='pagination'>
            {
                pages.map(page => (
                    <li 
                        key = {page}
                        className={page === currentPage ? "page-item active" : "page-item"}
                    >
                        <a
                            style={{cursor:'pointer'}} 
                            onClick={() => onPageChange(page) } 
                            className='page-link'
                        >
                            {page}
                        </a>
                    </li>
                    
                ))
            }
        </ul>
    </nav>
  )
}

export default PaginationTrust;