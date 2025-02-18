import style from './blockFilterCompanies.module.css';
import { useAppDispatch, useAppSelector } from '../../../Api/Store'; 
import { setSelectedCompanies } from '../../../Api/Slice'; 
import { useCallback } from 'react';
import { getSelectedCompanies } from '../../../Api/Slice'; 

function BlockFilterCompanies() {
    const dispatch = useAppDispatch();
    const selectedCompanies = useAppSelector(getSelectedCompanies); 
    const handleCompanyChange = useCallback((event) => {
        const company = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
              dispatch(setSelectedCompanies([...selectedCompanies, company])); 
        } else {
            dispatch(setSelectedCompanies(selectedCompanies.filter(c => c !== company))); 
        }
    }, [dispatch, selectedCompanies]); 
    return (
        <div className={style.blockFilterCompanies}>
            <h2 className={style.titleFilter}>Компании</h2>
            <div className={style.positionRadiobutton}>
                <label className={style.label}>
                    <input
                        type="checkbox"
                        name="pobeda"
                        value="Pobeda"
                        onChange={handleCompanyChange}
                        checked={selectedCompanies.includes("Pobeda")} 
                    />
                    <span className={style.label_text}>Победа</span>
                </label>

                <label className={style.label}>
                    <input
                        type="checkbox"
                        name="redwings"
                        value="Redwings"
                        onChange={handleCompanyChange}
                        checked={selectedCompanies.includes("Redwings")}
                    />
                    <span>Red Wings</span>
                </label>

                <label className={style.label}>
                    <input
                        type="checkbox"
                        name="s7"
                        value="S7"
                        onChange={handleCompanyChange}
                        checked={selectedCompanies.includes("S7")} 
                    />
                    <span>S7 Airlines</span>
                </label>
            </div>
        </div>
    );
}

export default BlockFilterCompanies;