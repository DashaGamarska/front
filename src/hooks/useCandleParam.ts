'use client';
import { useState } from 'react';
import { getInitParamCandle } from '@components/helpers';

export const useCandleParam = () => {


  const handleChangeCandleParam = (key: string, param: number) => {
    setParamCandle({ ...paramCandle, [key]: param });
  };

  return {
    paramCandle,
    handleChangeCandleParam,
  };
};
