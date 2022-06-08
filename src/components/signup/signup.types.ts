import { ChangeEvent, MouseEvent } from "react";
import { IQuery } from "../types/types";

export interface IPropsSignUpUI {
  handleSignUpInputs: (e: ChangeEvent<HTMLInputElement>) => void;
  signUpFunc: () => void;
  onClickEventTag: (e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLSpanElement>) => void;
  overLapId: () => void;
  overLapNic: () => void;
  inputs: {
    nickname: string;
    email: string;
    password: string;
    passwordOk: string;
    phone: string;
    authNumber: string;
    gender: string;
    style: string;
    region: string;
  };
  createPhoneAuth: () => void;
  confirmAuthNumber: () => void;
  onClickTagGender: (id: string) => void;
  socialLoginData: Pick<IQuery, "fetchUser">;
  updateUserFunc: () => void;
  clickGender: string;
  onClickTagStyle: (id: string) => void;
  clickStyle: string;
  onClickRegion: (id: string) => void;
  clickRegion: string;
}
