import { displayFilterMenu } from '../Api/Slice';
import { useAppDispatch } from '../Api/Store';
import style from './svgArrowDown.module.css';

function SvgArrowDown() {
    const dispatch = useAppDispatch();
    const heandleDisplayFilter = () => {
        dispatch(displayFilterMenu())
    }

    return (
        <button onClick={heandleDisplayFilter} className={style.menuApear_button}></button>
    )
}

export default SvgArrowDown;