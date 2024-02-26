/* eslint-disable prettier/prettier */

import { dataContext, messageContext, sectionContext, themeContext, userContext } from "@renderer/App";
import { userType } from "@renderer/types/login";
import { useContext } from "react";

type MyContextType = {
  setSection: React.Dispatch<React.SetStateAction<string>>;
};
type MyContextDataType = {
  dataComponentes: string
  setDataComponentes: React.Dispatch<React.SetStateAction<string>>;
};

type OpenModalFunction = (messageType: string, message: string) => void;

type AppContextType = {
  setSection: MyContextType
  dataGlobal: MyContextDataType
  theme: string
  user: userType
  messageModal:OpenModalFunction
};

export default function useAppContext(): AppContextType {
  const setSection = useContext(sectionContext)
  const dataGlobal = useContext(dataContext);
  const theme = useContext(themeContext)
  const user = useContext(userContext)
  const messageModal = useContext(messageContext)
  if(!dataGlobal){
      throw new Error("Error informes context data global")
    }
  if(!setSection){
    throw new Error("Error informes context secction menu")
  }
  if(!messageModal){
    throw new Error("Error informes context data messageModal")
  }

  return { setSection, dataGlobal, theme, user, messageModal};
}
