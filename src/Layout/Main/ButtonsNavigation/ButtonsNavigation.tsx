import style from './buttonsNavigation.module.css';
import { btnViewCheapReducer, btnViewFastReducer, btnViewOptimalReducer } from '../../../Api/Slice';
import { useAppSelector, useAppDispatch } from '../../../Api/Store'; 
import { selectStateBtnCheap, selectStateBtnFast, selectStateOptimal } from '../../../Api/Slice';
import React, { useState } from 'react';

function ButtonsNavigation() {
  const dispatch = useAppDispatch();
  const changeCheap = useAppSelector(selectStateBtnCheap);
  const changeFast = useAppSelector(selectStateBtnFast);
  const changeOptimal = useAppSelector(selectStateOptimal);

  const [isActive, setIsActive] = useState(''); 

  return (
    <>
      <button onClick={() => {
          dispatch(btnViewCheapReducer());
          setIsActive('cheap');
        }} 
        className={`${style.button} ${style.cheap} ${isActive === 'cheap' ? style.active : ''}`}>
        Самый дешевый
      </button>
      <button onClick={() => {
          dispatch(btnViewFastReducer());
          setIsActive('fast');
        }} 
        className={`${style.button} ${style.fast} ${isActive === 'fast' ? style.active : ''}`}>
        Самый быстрый
      </button>
      <button onClick={() => {
          dispatch(btnViewOptimalReducer());
          setIsActive('optimal');
        }} 
        className={`${style.button} ${style.optimal} ${isActive === 'optimal' ? style.active : ''}`}>
        Самый оптимальный
      </button>
    </>
  );
}

export default ButtonsNavigation;