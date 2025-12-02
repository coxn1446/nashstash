import React, { createContext, useContext, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { Device } from '@capacitor/device';
import { useDispatch } from 'react-redux';
import { setNative, setPlatform, setKeyboardVisible } from '../store/native.reducer';

const NativeContext = createContext(null);

export function NativeProvider({ children }) {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const dispatch = useDispatch();
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    // Set native state
    dispatch(setNative(isNative));
    
    // Get platform info
    const getPlatformInfo = async () => {
      if (isNative) {
        try {
          const info = await Device.getInfo();
          setDeviceInfo(info);
          dispatch(setPlatform(info.platform));
        } catch (error) {
          console.warn('⚠️ [Native] Failed to get device info:', error);
        }
      } else {
        dispatch(setPlatform('web'));
      }
    };

    getPlatformInfo();

    // Keyboard listeners
    if (isNative) {
      Keyboard.addListener('keyboardWillShow', () => {
        dispatch(setKeyboardVisible(true));
      });

      Keyboard.addListener('keyboardWillHide', () => {
        dispatch(setKeyboardVisible(false));
      });
    }

    return () => {
      if (isNative) {
        Keyboard.removeAllListeners();
      }
    };
  }, [isNative, dispatch]);

  const value = {
    isNative,
    platform: deviceInfo?.platform || 'web',
    deviceInfo,
  };

  return (
    <NativeContext.Provider value={value}>
      {children}
    </NativeContext.Provider>
  );
}

export function useNative() {
  const context = useContext(NativeContext);
  if (!context) {
    throw new Error('useNative must be used within NativeProvider');
  }
  return context;
}

