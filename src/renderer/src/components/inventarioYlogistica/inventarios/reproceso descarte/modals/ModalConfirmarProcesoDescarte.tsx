/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext';
import { lotesType } from '@renderer/types/lotesType';
import { useState } from 'react'

type propsType = {
  procesar: (data: string) => void
  propsModal: { action: string; data: object }
  unCheck: (data: boolean) => void
  reset: () => void
  table: lotesType[]
}

export default function ModalConfirmarProcesoDescarte(props: propsType): JSX.Element {
  const { messageModal } = useAppContext();
  const [cliente, setCliente] = useState<string>('')
  const [placa, setPlaca] = useState<string>('')
  const [nombreConductor, setNombreConductor] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')
  const [cedula, setCedula] = useState<string>('')
  const [remision, setRemision] = useState<string>('')

  const finalizar = async (): Promise<void> => {
    try {
      if (props.propsModal.action === 'Enviar descarte') {

        const historial = {
          fecha: new Date(),
          accion: "Salida de fruta",
          cliente: cliente,
          nombreConductor: nombreConductor,
          telefono: telefono,
          cedula: cedula,
          remision: remision,
          predios: {}
        }

        //se eliminan los datos
        const objRequest = {}
        Object.keys(props.propsModal.data).forEach(item => {
          const [id, tipoDescarte, descarte] = item.split("/")
          if (!Object.prototype.hasOwnProperty.call(objRequest, id)) {
            objRequest[id] = {}
          }
          objRequest[id][`inventarioActual.${tipoDescarte}.${descarte}`] = 0;
        });
        // se hace la peticion para poner en 0 los inventarios de los lotes
        for (const item of Object.keys(objRequest)) {
          const enf = props.table.find(id => id._id === item);
          const request = {
            data: {
              lote: {
                ...objRequest[item],
                _id: item,
              }
            },
            collection: 'lotes',
            action: 'putLotes',
            query: 'proceso',
            record: "salidaDescarte"
          };
          await window.api.server(request);
          if (enf && enf.enf && enf?.inventarioActual) {
            historial.predios[enf?.enf] = {
              descarteLavado: enf?.inventarioActual.descarteLavado,
              descarteEncerado: enf?.inventarioActual.descarteEncerado
            }
          }
          // Puedes manejar la respuesta aquí antes de pasar al siguiente elemento
        }

        // se crea el historial descarte
        const requestHistorial = {
          data: historial,
          collection: 'historialDescartes',
          action: 'addHistorialDescarte',
          query: 'proceso',
          record: 'historialDescarte'
        };
        await window.api.server(requestHistorial)


      } else if (props.propsModal.action === 'Reprocesar como Celifrut') {


        //se eliminan los datos
        const kilos = Object.keys(props.propsModal.data).reduce((acu, item) => acu += props.propsModal.data[item], 0);
        const objRequest = []
        const objectInventario = {
          descarteLavado:{descarteGeneral:0, pareja:0,balin:0},
          descarteEncerado:{descarteGeneral:0,pareja:0,balin:0,extra:0,suelo:0 }
        }
        let _id;
        Object.keys(props.propsModal.data).forEach(item => {
          const [id, tipoDescarte, descarte] = item.split("/")
          if (!Object.prototype.hasOwnProperty.call(objRequest, id)) {
            objRequest[id] = {}
            _id = id
          }
          console.log(descarte)
          objRequest[id][`${tipoDescarte}.${descarte}`] = props.propsModal.data[item];
          objectInventario[tipoDescarte][descarte] += - props.propsModal.data[item];
        });
        const array = Object.keys(objRequest).map(key => {
          return {
            _id: key,
            ...objRequest[key]
          };
        });
        const lote = props.table.find(lote => lote._id === _id);

       
        const datos = {
          predio: "65c27f3870dd4b7f03ed9857",
          canastillas: "0",
          kilos: kilos,
          placa: "AAA000",
          tipoFruta: lote?.tipoFruta,
          observaciones: "Reproceso",
          promedio: Number(kilos) / (lote?.tipoFruta === "Naranja" ? 19 : 20),
          descarteLavado: { balin: 0, pareja: 0, descarteGeneral: 0, descompuesta: 0, piel: 0, hojas: 0 },
          descarteEncerado: { balin: 0, pareja: 0, extra: 0, descarteGeneral: 0, descompuesta: 0, suelo: 0 },
        }  
 
        const request = {
            lote: datos,
            lotes: array,
            inventario: objectInventario,
          action: 'reprocesar_celifrut',
        };

        const responseReprocesoCelifrut = await window.api.server2(request);
        if(responseReprocesoCelifrut.status !== 200)
          throw new Error(`Code ${responseReprocesoCelifrut}: ${responseReprocesoCelifrut.message}`)

      } else if (props.propsModal.action === 'Reprocesar el lote') {
        const objRequest = {}
        const objRequestDescarte = {}
        let _id;
        Object.keys(props.propsModal.data).forEach(item => {
          const [id, tipoDescarte, descarte] = item.split("/")
          if (!Object.prototype.hasOwnProperty.call(objRequest, tipoDescarte)) {
            objRequest[tipoDescarte] = {}
            _id = id
          }
          objRequest[tipoDescarte][descarte] = - props.propsModal.data[item];
          objRequestDescarte[`${tipoDescarte}.${descarte}`] = 0;
        });
        const request = {
          _id: _id,
          query: objRequestDescarte,
          inventario: objRequest,
          action: 'reprocesar_predio',
        }
        const response = await window.api.server2(request)
        if (response.status !== 200) {
          throw new Error(`Code ${response}: ${response.message}`)

        }
      }

      messageModal("success", "Fruta vaciada!")
    } catch (e) {
      if (e instanceof Error) {
        messageModal("error", `Error: ${e.message}`)
      }
    } finally {
      propsAction()
      props.unCheck(false)
      props.procesar('')
    }
  }

  const propsAction = (): void => {
    props.unCheck(true)
    props.procesar('')
    props.reset()
  }

  return (
    <div className="fondo-modal">
      <div className={`modal-container`}>
        <div className='modal-header-agree'>
          <h2>
            {props.propsModal.action.charAt(0).toUpperCase() + props.propsModal.action.slice(1)}{' '}
          </h2>
        </div>
        <div className='modal-container-body'>
          <h2 className="text-center">¿Desea {props.propsModal.action} seleccionado?</h2>
          {props.propsModal.action === 'Enviar descarte' && (
            <>
              <label>Nombre del cliente</label>
              <input
                type="text"
                onChange={(e): void => setCliente(e.target.value)}
              />
              <label >Placa</label>
              <input
                type="text"
                value={placa}
                maxLength={6}
                onChange={(e): void => setPlaca(e.target.value)}
              />
              <label >Nombre conductor</label>
              <input
                type="text"
                onChange={(e): void => setNombreConductor(e.target.value)}
              />
              <label >Telefono</label>
              <input
                type="text"
                onChange={(e): void => setTelefono(e.target.value)}
              />
              <label >Cedula</label>
              <input
                type="number"
                onChange={(e): void => setCedula(e.target.value)}
              />
              <label >Remision</label>
              <input
                type="number"
                onChange={(e): void => setRemision(e.target.value)}
              />
            </>
          )}
        </div>
        <div className="modal-container-buttons">
          <button onClick={finalizar} className='agree'>Vaciar</button>
          <button onClick={(): void => props.procesar('')} className='cancel'>Cancelar</button>
        </div>

      </div>
    </div>
  )
}
