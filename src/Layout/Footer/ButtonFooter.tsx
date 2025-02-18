import style from './buttonFooter.module.css';
import { selectStatus, selectStateParams, increaseLimit } from '../../Api/Slice';
import { useAppSelector, useAppDispatch } from '../../Api/Store';
import { fetchTickets } from '../../Api/FetchTickets';
import { TicketsParamsFetchState } from '../../Api/Slice'; 

function Footer() {
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    const paramsFetch: TicketsParamsFetchState = useAppSelector(selectStateParams); 

    const handleLoadMore = () => {
         dispatch(increaseLimit());
         dispatch(fetchTickets(paramsFetch)); 
    };

    return (
        <footer className={style.footer}>
            <button onClick={handleLoadMore} className={style.button}>
                {status === "loading"
                    ? "Загрузка..."
                    : "Загрузить еще билеты"}
            </button>
        </footer>
    );
}

export default Footer;

