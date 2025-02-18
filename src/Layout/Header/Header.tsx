import style from './header.module.css';
import PlaneSvg from '../../Svg/svgLogo';

function Header() {
    return (
        <header className={style.header}>
            <div>
                <PlaneSvg />
            </div>
            <h1 className={style.headertext}>Поиск авиабилетов</h1>
        </header>
    )
}

export default Header;