/* eslint-disable prettier/prettier */
import useAppContext from "@renderer/hooks/useAppContext"
import { useEffect, useState } from "react"
import TablaDescarteLavado from "./components/TablaDescarteLavado";
import { inventarioDescarteType } from "./types/type";
import { inventarioInit } from "./func/functions";
import TablaDescarteEncerado from "./components/TablaDescarteEncerado";
import './styles/styles.css'
import TablaDescarteLavadoEnviar from "./components/TablaDescarteLavadoEnviar";
import TablaDescarteEnceradoEnviar from "./components/TablaDescarteEnceradoEnvio";
import { createPortal } from "react-dom";
import ModalEnviar from "./components/ModalEnviar";

export default function InventarioDescarte(): JSX.Element {
    const { messageModal } = useAppContext();
    const [data, setData] = useState<inventarioDescarteType>(inventarioInit)
    const [formState, setFormState] = useState<inventarioDescarteType>(inventarioInit);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        obtenerInentario();
    }, [])
    const obtenerInentario = async (): Promise<void> => {
        try {
            const request = {
                action: 'obtener_inventario_descartes'
            }
            const response = await window.api.server2(request);
            if (response.status !== 200) throw new Error(`Code ${response.status}: ${response.message}`);
            setData(response.data);
        } catch (err) {
            if (err instanceof Error)
                messageModal('error', `${err.name}: ${err.message}`);
        }
    }
    const handleChange = (name, value, type): void => {
        setFormState((prevState) => ({
          ...prevState,
          [name]: {
            ...prevState[name],
            [type]: value,
          },
        }));
    };
    const handleEnviar = ():void => {
        setModal(true)
    }
    const closeModal = (): void => {
        setModal(!modal)
    }
    return (
        <div className="componentContainer">
            <div className="navBar"></div>
            <h2>Inventario Descartes</h2>
            <div className="inventario-descartes-tables-container">
                <TablaDescarteLavado data={data.descarteLavado} />
                <TablaDescarteEncerado data={data.descarteEncerado} />
            </div>
            <h2>Enviar Descarte</h2>
            <hr />
            <div className="inventario-descartes-tables-container">
                <TablaDescarteLavadoEnviar data={data.descarteLavado} handleChange={handleChange}/>
                <TablaDescarteEnceradoEnviar data={data.descarteEncerado} handleChange={handleChange} />
            </div>
            <div className="inventario-descartes-container-button-enviar">
                <button className="defaulButtonAgree" onClick={handleEnviar}>Enviar</button>
            </div>
            {modal &&
        createPortal(
          <ModalEnviar
            formState={formState}
            closeModal={closeModal} />,
          document.body
        )}
        </div>
    )
}