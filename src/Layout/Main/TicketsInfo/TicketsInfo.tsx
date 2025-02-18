import { propseTickets} from '../../../Types/Types';
import GlobalSvg from '../../../GlobalLogoCompany/GlobalLogo';
import style from './ticketsInfo.module.css';

function TicketsInfo({company, from, to, currency, price, startTime, endTime, duration, transfers }: propseTickets) {
    let format = new Date(duration)
    let durationData = format.toString().slice(16, 21).split(":")[0] + " " + "ч" + " " + format.toString().slice(16, 21).split(":")[1] + " " + "мин"

    return (
        <div className={style.ticket}>
            <div className={style.ticketInfoTop}>
                <div className={style.ticketInfoPrice}>{price} {currency}</div>
                <div className={style.ticketInfoCompany}><GlobalSvg company={company} /></div>
            </div>
            <div className={style.ticketInfoBottom}>
                <div className={style.ticketInfoTime}>
                    <h2 className={style.infoTextTitle}>{from} – {to}</h2>
                    <h3 className={style.infoTextData}>{startTime} – {endTime}</h3>
                </div>
                <div className={style.ticketInfoDurationFlight}>
                    <h2 className={style.infoTextTitle}>В пути</h2>
                    <h3 className={style.infoTextData}>{durationData}</h3>
                </div>
                <div className={style.ticketInfoTransfers}>
                    <h2 className={style.infoTextTitle}>Пересадки</h2>
                    <h3 className={style.infoTextData}>{transfers}</h3>
                </div>
            </div>
        </div>
    )
}

export default TicketsInfo;