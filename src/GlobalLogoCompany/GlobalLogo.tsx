import { company } from '../Types/Types';
import style from './globalLogo.module.css';

const GlobalSvg = ({ company }: company) => {

    switch (company) {
        case 'Pobeda':
            return (
                <div className={style.pobeda}></div>   
            ) 
            case 'Redwings':
                return (
                    <div className={style.redwings}></div>   
                )
            case 'S7':
            return (
                <div className={style.s7}></div>   
            )
        default:
            return null;
    }
}

export default GlobalSvg;