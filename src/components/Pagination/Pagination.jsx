import './pagination.css'

const Pagination = ({contactPerPage, totalContact, paginate}) => {

    const pagesNumber = [];


    for(let i = 1; i <= Math.ceil( totalContact / contactPerPage); i++) {

        
        pagesNumber.push(i)
    }


  return (
    <nav className="container_pagination ">
        <ul className="ul_pagination">
            {pagesNumber?.map(number => (

                <a key={number}  onClick={() => paginate(number)} href="#">

                    {number}

                </a>

            ))}


        </ul>
    </nav>
  )
}

export default Pagination