import style from './blockFilterTransfer.module.css';
import { useState, useCallback } from 'react';
import { useAppDispatch } from '../../../Api/Store';
import { setCheckedTransfers } from '../../../Api/Slice';

function BlockFilterTransfer() {
    const [checkedValues, setCheckedValues] = useState<boolean[]>([false, false, false, false]);
    const dispatch = useAppDispatch();

        const handleCheckboxChange = useCallback((index: number) => () => {
        const newCheckedValues = [...checkedValues];
        newCheckedValues[index] = !newCheckedValues[index];
        setCheckedValues(newCheckedValues);
        console.log("Изменено количество пересадок:", index);
        const selectedTransfers = newCheckedValues
            .map((isChecked, i) => (isChecked ? i : null))
            .filter((index): index is number => index !== null);

        dispatch(setCheckedTransfers(selectedTransfers)); 
    }, [checkedValues, dispatch]);

    return (
        <div className={style.blockFilterTransfer}>
            <h2 className={style.titleFilter}>Количество пересадок</h2>
            <div className={style.positionCheckbox}>
                <label className={style.label}>
                    <input
                        type="checkbox"
                        name="0"
                        className={style.checkbox}
                        checked={checkedValues[0]}
                        onChange={handleCheckboxChange(0)}
                    />
                    <>
                        <span className={style.fake}></span>
                        <span>Без пересадок</span>
                    </>
                </label>
                <label className={style.label}>
                    <input
                        type="checkbox"
                        name="1"
                        className={style.checkbox}
                        checked={checkedValues[1]}
                        onChange={handleCheckboxChange(1)}
                    />
                    <>
                        <span className={style.fake}></span>
                        <span>1 пересадка</span>
                    </>
                </label>
                <label className={style.label}>
                    <input
                        type="checkbox"
                        name="2"
                        className={style.checkbox}
                        checked={checkedValues[2]}
                        onChange={handleCheckboxChange(2)}
                    />
                    <>
                        <span className={style.fake}></span>
                        <span>2 пересадки</span>
                    </>
                </label>
                <label className={style.label}>
                    <input
                        type="checkbox"
                        name="3"
                        className={style.checkbox}
                        checked={checkedValues[3]}
                        onChange={handleCheckboxChange(3)}
                    />
                    <>
                        <span className={style.fake}></span>
                        <span>3 пересадки</span>
                    </>
                </label>
                                     </div>
                                     
        </div>
    );
}

export default BlockFilterTransfer;