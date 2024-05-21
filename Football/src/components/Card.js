import { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import './Card.css';

export default function Card({ player, coach }) {
    if (player) {
        return (
            <li className="card flex-column">
                <img src={player.user.photo} />
                <p>{player.user.username}</p>
                <p>{player.teamName} - {player.position}</p>
                <ul className="flex">
                    <li>{player.pace}       PAC</li>
                    <li>{player.shooting}   SHO</li>
                    <li>{player.passing}    PAS</li>
                    <li>{player.dribbling}  DRI</li>
                    <li>{player.physique}   PHY</li>
                    <li>{player.defending}  DEF</li>
                </ul>
            </li>
        );
    } else {
        return (
            <li className="card flex-column">
                <img src={coach.user.photo} />
                <p>{coach.user.username}</p>
                <p>{coach.teamName}</p>
                <ul className='flex text-align-center'>
                    <li className='p-0'>{coach.coachType}</li>
                    <li className='p-0'>{coach.experience} years</li>
                </ul>
            </li>
        )
    }
}