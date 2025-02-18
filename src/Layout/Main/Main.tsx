import style from './main.module.css';
import ButtonsNavigation from './ButtonsNavigation/ButtonsNavigation';
import TicketsInfo from './TicketsInfo/TicketsInfo';
import SvgArrowDown from '../../Svg/svgArrowDown';
import BlockFilterTransfer from './BlockFilterTransfer/BlockFilterTransfer';
import BlockFilterCompanies from './BlockFilterCompanies/BlockFilterCompanies';
import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../Api/Store';
import { fetchTickets } from '../../Api/FetchTickets';
import { selectListTickets, selectStateParams, selectStateDisplayFilter, selectSelectedTransfers, selectSelectedCompanies } from '../../Api/Slice'; 

function Main() {
    const stateParams = useAppSelector(selectStateParams);
    const stateDisplayFilter = useAppSelector(selectStateDisplayFilter);
    const dispatch = useAppDispatch();
    const listTickets = useAppSelector(selectListTickets) || [];
    const selectedTransfers = useAppSelector(selectSelectedTransfers) || [];
    const selectedCompanies = useAppSelector(selectSelectedCompanies) || []; 
    console.log("выбранные компании:", selectedCompanies); 

    useEffect(() => {
        dispatch(fetchTickets(stateParams));
    }, [dispatch, stateParams]);

        const filteredAndSortedTickets = useMemo(() => {
        let filteredTickets = [...listTickets]; // 

       
        console.log("выбранные компании после фильтра:", filteredTickets);
        if (selectedTransfers.length > 0) {
            filteredTickets = filteredTickets.filter(ticket => {
                let transfersCount;
                
                if (ticket.transfers === "Без пересадок") {
                    transfersCount = 0;
                } else {
                    const match = ticket.transfers.match(/\d+/);
                    transfersCount = match ? parseInt(match[0]) : -1; 
                }
                return selectedTransfers.includes(transfersCount);
            });
        }
        console.log("билеты с учетом количества пересадок:", filteredTickets);

        console.log("билеты до фильтров:", filteredTickets); 
        if (selectedCompanies.length > 0) { 
            filteredTickets = filteredTickets.filter(ticket =>
                selectedCompanies.some(company => ticket.company.toLowerCase() === company.toLowerCase()) 
            );
        }
        console.log("билеты с фильтром по авиакомпаниям:", filteredTickets); 

        filteredTickets.sort((a, b) => {
            if (stateParams.sortBy === "price") {
                if (a.price === b.price && stateParams.sortBySecondary === "duration") {
                    return a.duration - b.duration;
                } else if (a.price === b.price && stateParams.sortBySecondary === "transfers") {
                    return a.transfers - b.transfers;
                } else {
                    return a.price - b.price;
                }
            } else if (stateParams.sortBy === "duration") {
                if (a.duration === b.duration && stateParams.sortBySecondary === "price") {
                    return a.price - b.price;
                } else if (a.duration === b.duration && stateParams.sortBySecondary === "transfers") {
                    return a.transfers - b.transfers;
                } else {
                    return a.duration - b.duration;
                }
            } else if (stateParams.sortBy === "transfers") {
                if (a.transfers === b.transfers && stateParams.sortBySecondary === "price") {
                    return a.price - b.price;
                } else if (a.transfers === b.transfers && stateParams.sortBySecondary === "duration") {
                    return a.duration - b.duration;
                } else {
                    return a.transfers - b.transfers;
                }
            }
            return 0;
        });

        return filteredTickets;
    }, [listTickets, selectedTransfers, selectedCompanies, stateParams.sortBy, stateParams.sortBySecondary]); 

    return (

        <main className={style.blockMain}>
            <div className={style.blockFilters}>
                <BlockFilterTransfer />
                <BlockFilterCompanies />
            </div>

            <div className={style.blockInfo}>
                <div className={style.block_info__navigation}>
                    <ButtonsNavigation />
                </div>
                <div className={stateDisplayFilter ? style.menuApearHeaderWithBottom : style.menuApearHeader}>
                    <h2 className={style.menuApearTitle}>Любая авиакомпания, любое кол-во пересадок</h2>
                    <h2 className={style.menuApearTitleAction}>Открыть настройки</h2>
                    <SvgArrowDown />
                    {stateDisplayFilter &&
                        <div className={style.menuApearFilter}>
                            <BlockFilterCompanies />
                            <BlockFilterTransfer />
                        </div>}
                </div>
                <div className={style.block_info__tickets}>
                    {filteredAndSortedTickets?.map((ticket) => (
                        <TicketsInfo key={ticket.id} {...ticket} />
                    ))}
                </div>
            </div>

        </main>
    );
}

export default Main;