import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useContext, useRef } from 'react';
import GlobalContext from '../store/GlobalContext';

export default function Header({ selection }) {

    const navigate = useNavigate();
    const { setToken, setProfile, setSearchQuery } = useContext(GlobalContext);

    return (
        <header className='flex'>
            <nav className='flex-between inner'>
                <ul className='flex-between'>
                    <li className={selection == 0 && "selected"}>
                        <Link to="/profile">
                            My profile
                        </Link>
                    </li>
                    <li className={selection == 1 && "selected"}>
                        <Link to="/players">
                            Footballers
                        </Link>
                    </li>
                    <li className={selection == 2 && "selected"}>
                        <Link to="/coaches">
                            Coaches
                        </Link>
                    </li>
                    <li className={selection == 3 && "selected"}>
                        <Link to="/favorites">
                            Favorites
                        </Link>
                    </li>
                </ul>
                <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search by name"/>
                <button onClick={()  => {
                    setToken(null);
                    setProfile(null);
                    navigate('/');
                }}>Log out</button>
            </nav>
        </header>
    )
}